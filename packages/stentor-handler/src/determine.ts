/*! Copyright (c) 2019, XAPPmedia */
import { ConditionalDeterminer } from "stentor-conditional";
import { findSlotDependentMatch, isSlotDependable } from "stentor-interaction-model";
import {
    Context,
    JSONDependable,
    Request,
    RequestDependable,
    SlotDependable,
    StorageDependable,
    SystemDependable,
    TimeContextual,
    Conditional
} from "stentor-models";
import {
    findRequestDependentMatch,
    findSystemDependentMatch,
    isIntentRequest,
    isRequestDependable,
    isSystemDependable
} from "stentor-request";
import { findStorageDependentMatch, isStorageDependable } from "stentor-storage";
import { findTimeContextualMatch, isTimeContextual } from "stentor-time";
import { random, existsAndNotEmpty } from "stentor-utils";
import { findJSONDependentMatch } from "./findJSONDependentMatch";
import { isJSONDependable, isConditional } from "./Guards";
import { compileJSONPaths } from "./compileJSONPaths";

/**
 * Determine which of the provided objects is best based on provided request and context.
 *
 * @export
 * @template P extends object
 * @param {P[]} potentials
 * @param {Request} request
 * @param {Context} context
 * @returns {(P | undefined)}
 */
export function determine<P extends object>(potentials: P[], request: Request, context: Context): P | undefined {
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

    // Sort the types of matches
    for (const potential of potentials) {
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

        conditionals.forEach((conditional) => {
            if (typeof conditional.conditions === "string") {
                // Compile it
                const compiled = compileJSONPaths(conditional.conditions, { request, context });
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
        // Big show, determine the matches
        const matches = new ConditionalDeterminer([]).determine<P>(compiledConditionals);
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
