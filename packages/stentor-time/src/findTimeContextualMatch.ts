/*! Copyright (c) 2019, XAPPmedia */
import { LastActive, Scheduled, TimeContextual } from "stentor-models";
import { findLastActiveMatch } from "./findLastActiveMatch";
import { findSchedulableMatch } from "./findSchedulableMatch";
import { isLastActive, isScheduled } from "./Guards";

/**
 * Determines which response is best based on the provided list of possible responses.
 *
 * @export
 * @template T
 * @param {((T | TimeContextual<T>)[])} objects
 * @param {{ lastActiveTimestamp: number }} [context]
 * @returns {(TimeContextual<T> | undefined)}
 */
export function findTimeContextualMatch<T extends object>(
    objects: (T | TimeContextual<T>)[],
    context?: { lastActiveTimestamp: number }
): TimeContextual<T> | undefined {
    // A couple of exit conditions to start us off...
    // No objects or empty responses, bail
    if (!Array.isArray(objects) || objects.length === 0) {
        return undefined;
    }
    // Set up some buckets to store all the types of objects.
    const lastActive: LastActive<T>[] = [];
    const scheduled: Scheduled<T>[] = [];
    // iterate through, see if we can find one without a schedule
    // to be the default and also find all the SchedulableResponses
    for (const object of objects) {
        if (isScheduled<T>(object)) {
            scheduled.push(object);
        } else if (isLastActive<T>(object)) {
            lastActive.push(object);
        }
    }
    const scheduledMatch = findSchedulableMatch<T>(scheduled);
    const lastActiveMatch = findLastActiveMatch<T>(lastActive, context);
    const returnResponse = lastActiveMatch || scheduledMatch;
    if (!returnResponse) {
        // We want to keep track of this incase somebody was expecting a
        // response but didn't get one.
        console.error(`Could not determine a time contextual match for current time of ${new Date().toISOString()}.`);
    }
    return returnResponse;
}
