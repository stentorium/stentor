/*! Copyright (c) 2019, XAPPmedia */
import { findSlotDependentMatch, isSlotDependable } from "stentor-interaction-model";
import {
    Context,
    JSONDependable,
    Request,
    RequestDependable,
    SlotDependable,
    StorageDependable,
    SystemDependable,
    TimeContextual
} from "stentor-models";
import {
    findRequestDependentMatch,
    findSystemDependentMatch,
    isIntentRequest,
    isRequestDependable,
    isSystemDependable
} from "stentor-request";
import { findStorageDependentMatch, isStorageDependable } from "@xapp/stentor-storage";
import { findTimeContextualMatch, isTimeContextual } from "@xapp/stentor-time";
import { random } from "stentor-utils";
import { findJSONDependentMatch } from "./findJSONDependentMatch";
import { isJSONDependable } from "./Guards";

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

    // Sort the types of matches
    for (const potential of potentials) {
        if (isRequestDependable(potential)) {
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

    return (
        systemDependentMatch ||
        slotDependentMatch ||
        requestDependentMatch ||
        storageDependentMatch ||
        jsonDependentMatch ||
        timeContextualMatch ||
        simpleMatch
    );
}
