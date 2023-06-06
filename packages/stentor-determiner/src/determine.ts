/*! Copyright (c) 2019, XAPPmedia */
import { ConditionalDeterminer } from "stentor-conditional";
import { SESSION_STORAGE_SLOTS_KEY } from "stentor-constants";
import {
    isChannelable,
    isConditional,
    isIntentRequest,
    isJSONDependable,
    isRequestDependable,
    isSystemDependable,
    isTimeContextual
} from "stentor-guards";
import { findSlotDependentMatch, isSlotDependable, SlotConditionalCheck } from "stentor-interaction-model";
import { log } from "stentor-logger";
import {
    Context,
    JSONDependable,
    Request,
    RequestDependable,
    RequestSlotMap,
    SlotDependable,
    StorageDependable,
    SystemDependable,
    TimeContextual,
    Conditional,
    ConditionalCheck,
} from "stentor-models";
import {
    findRequestDependentMatch,
    findSystemDependentMatch,
    SystemConditionalCheck,
    RequestConditionalCheck
} from "stentor-request";
import { findStorageDependentMatch, isStorageDependable, StorageDependentCheck } from "stentor-storage";
import { findTimeContextualMatch, TimeConditionalCheck } from "stentor-time";
import { combineRequestSlots, random, existsAndNotEmpty, Compiler, channelMatchesRequest, MacroMap } from "stentor-utils";
import { findJSONDependentMatch, JSONConditionalCheck } from "./findJSONDependentMatch";

/**
 * Determine which of the provided objects is best based on provided request and context.
 *
 * @param potentials
 * @param request
 * @param context
 * @returns The best match from the provided potential matches, undefined if now match could be determined.
 */
export function determine<P extends object>(potentials: P[], request: Request, context: Context, additionalContext?: Record<string, unknown>, macros?: MacroMap): P | undefined {
    if (!Array.isArray(potentials) || potentials.length === 0) {
        return undefined;
    }

    const simpleObjects: P[] = [];
    const systemDependableObjects: SystemDependable<P>[] = [];
    const timeContextualObjects: TimeContextual<P>[] = [];
    const requestDependentObjects: RequestDependable<P>[] = [];
    const slotDependentObjects: SlotDependable<P>[] = [];
    const storageDependentObjects: StorageDependable<P>[] = [];
    const JSONDependentObjects: JSONDependable<P>[] = [];
    // The new ones, conditionals
    const conditionals: Conditional<P>[] = [];

    // Initial filter, if they specific channel
    // we only let it proceed if it matches the current request
    const filtered: P[] = [];

    for (const potential of potentials) {
        if (isChannelable(potential)) {
            // ok, check to see if it passes
            if (channelMatchesRequest(potential, request)) {
                filtered.push(potential);
            }
        } else {
            filtered.push(potential);
        }
    }

    // Sort the types of matches
    for (const potential of filtered) {
        // If conditionals exist, prefer that
        if (isConditional(potential)) {
            conditionals.push(potential);
        } else if (isRequestDependable(potential)) {
            requestDependentObjects.push(potential);
        } else if (isSlotDependable(potential)) {
            slotDependentObjects.push(potential);
        } else if (isStorageDependable(potential)) {
            storageDependentObjects.push(potential);
        } else if (isTimeContextual(potential)) {
            timeContextualObjects.push(potential);
        } else if (isJSONDependable(potential)) {
            JSONDependentObjects.push(potential);
        } else if (isSystemDependable(potential)) {
            systemDependableObjects.push(potential);
        } else {
            simpleObjects.push(potential);
        }
    }

    // the new path for the conditionals
    let conditionalMatch: Conditional<P>;
    if (existsAndNotEmpty(conditionals)) {
        // Compile the strings first, replacing them, but we need to hold on to the original!
        const originals: { [compiled: string]: Conditional<P> } = {};
        const compiledConditionals: Conditional<P>[] = [];

        const requestSlots: RequestSlotMap = isIntentRequest(request) && context.session ? combineRequestSlots(context.session.get(SESSION_STORAGE_SLOTS_KEY), request.slots) : context.session ? context.session.get(SESSION_STORAGE_SLOTS_KEY) : {};

        // We want to compile the conditions first 
        conditionals.forEach((conditional) => {
            if (typeof conditional.conditions === "string") {
                // Compile it
                //    replaceWhenUndefined is here so we can have logic like:
                //    !!${$.context.storage.user} <-- And it not throw an error when the user doesn't exist.
                const compiled: string = new Compiler({ additionalContext, replaceWhenUndefined: true, macros }).compile(conditional.conditions, request, context);
                // Keep hold of the original
                originals[compiled] = conditional;
                // Push a compiled version
                compiledConditionals.push({
                    ...conditional,
                    conditions: compiled
                });
            } else {
                // Nothing to compile
                compiledConditionals.push(conditional);
            }
        });

        // Build up our list of conditional checks
        const checks: ConditionalCheck[] = [
            JSONConditionalCheck(request, context),
            SystemConditionalCheck(request, context),
            RequestConditionalCheck(request),
            SlotConditionalCheck(requestSlots),
            StorageDependentCheck(request, context)
        ];

        const lastActiveTimestamp = typeof context?.storage?.lastActiveTimestamp === "number" ? context?.storage?.lastActiveTimestamp : undefined;
        checks.push(TimeConditionalCheck({ lastActiveTimestamp }));

        // Big show, determine the matches
        // need to pass the macros here
        const matches = new ConditionalDeterminer(checks, macros).determine<P>(compiledConditionals);
        // Look through them and match them up to the original
        const matchedOriginals: Conditional<P>[] = [];
        matches.forEach((match) => {
            if (typeof match.conditions === "string") {
                // pushing back the original
                matchedOriginals.push(originals[match.conditions]);
            } else {
                matchedOriginals.push(match);
            }
        });

        if (matchedOriginals.length > 1) {
            // this will help people figure out why it isn't picking what they want every time.
            log().warn(`Found ${matchedOriginals.length} conditional matches, picking a random one.`);
        }
        // Pick a random one
        conditionalMatch = random(matchedOriginals);
    }

    let timeContextualMatch: TimeContextual<P>;
    let storageDependentMatch: StorageDependable<P>;
    // These require storage on the context
    if (context && context.storage) {
        const lastActiveTimestamp = context.storage ? context.storage.lastActiveTimestamp : undefined;
        timeContextualMatch = findTimeContextualMatch(timeContextualObjects, { lastActiveTimestamp });
        storageDependentMatch = findStorageDependentMatch(storageDependentObjects, context.storage);
    }
    const systemDependentMatch = findSystemDependentMatch(systemDependableObjects, request);
    const requestDependentMatch = findRequestDependentMatch(requestDependentObjects, request);
    let slotDependentMatch: SlotDependable<P>;
    if (isIntentRequest(request)) {
        slotDependentMatch = findSlotDependentMatch(slotDependentObjects, request.slots);
    }
    const jsonDependentMatch = findJSONDependentMatch(JSONDependentObjects, request, context);
    // the fallback
    const simpleMatch = random(simpleObjects);

    // This order is important
    return (
        conditionalMatch || // Prefer this one first since it is new and others are now deprecated behavior
        systemDependentMatch ||
        slotDependentMatch ||
        requestDependentMatch ||
        storageDependentMatch ||
        jsonDependentMatch ||
        timeContextualMatch ||
        simpleMatch
    );
}
