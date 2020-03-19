/*! Copyright (c) 2019, XAPPmedia */
import { isActiveWithin, isFirstTime, isHaveNotSeenWithin } from "stentor-guards";
import { LastActive } from "stentor-models";
import * as Moment from "moment";
import { DateRange, extendMoment } from "moment-range";

// Add the range plugin to moment
const moment = extendMoment(Moment);

/**
 * Finds the most relevant contextual match.
 *
 * @export
 * @template T
 * @param {((T | LastActive<T>)[])} responses
 * @param {{ lastActiveTimestamp?: number }} context
 * @returns {(LastActive<T> | undefined)}
 */
export function findLastActiveMatch<T extends object>(
    responses: (T | LastActive<T>)[],
    context: { lastActiveTimestamp?: number }
): LastActive<T> | undefined {
    if (!Array.isArray(responses) || !context) {
        // Exit conditions, no array or context then bail
        return undefined;
    }

    const now = moment();
    const lastActive = context.lastActiveTimestamp !== undefined ? moment(context.lastActiveTimestamp) : undefined;

    let contextualResponse: LastActive<T>;
    let withinRange: DateRange;

    for (const response of responses) {
        // Make sure activeWithin exists, might have gotten bad data
        if (isActiveWithin(response)) {
            const activeWithin = response.activeWithin;
            // Construct the date range by starting with the current time
            // and subtracting the activeWithin amount
            const rangeStart = moment(now).subtract(activeWithin.amount, activeWithin.format);
            const range = moment.range(rangeStart, now);
            // Then see if the last time we saw them is within the range
            if (lastActive && range.contains(lastActive)) {
                // It is in range, see if we keep it...
                if (!withinRange) {
                    // If nothing previous, set it
                    contextualResponse = response;
                    withinRange = range;
                } else if (range < withinRange) {
                    // If the new range is smaller than the previous
                    contextualResponse = response;
                    withinRange = range;
                }
            }
        } else if (isHaveNotSeenWithin(response)) {
            const haveNotSeenWithin = response.haveNotSeenWithin;
            const rangeStart = moment(now).subtract(haveNotSeenWithin.amount, haveNotSeenWithin.format);
            const range = moment.range(rangeStart, now);
            // Range is between now and the haveNotSeenWithin duration
            // Make sure it is outside the range
            if (lastActive && !range.contains(lastActive)) {
                if (!withinRange) {
                    contextualResponse = response;
                    withinRange = range;
                } else if (range < withinRange) {
                    contextualResponse = response;
                    withinRange = range;
                }
            }
        } else if (isFirstTime(response)) {
            // Only qualifications for a FirstTime response
            // is a nonexistent lastActive, meaning we have never
            // seen them before.
            if (!lastActive) {
                contextualResponse = response;
            }
        }
    }

    return contextualResponse;
}
