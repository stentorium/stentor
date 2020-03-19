/*! Copyright (c) 2020, XAPPmedia */
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { log } from "stentor-logger";
import { ConditionalCheck, TimeContextual, DurationFormat, Schedulable } from "stentor-models";
import { isTimeContextual } from "stentor-guards";
import { findTimeContextualMatch } from "./findTimeContextualMatch";
import { findSchedulableMatch } from "./findSchedulableMatch";

// Add the range plugin to moment
const moment = extendMoment(Moment);

/**
 * Depending on the provided last active timestamp and current time, has the user 
 * been active within 
 * 
 * @param context - Contains the last active timestamp
 * @param amount - Duration amount
 * @param format - Format of the duration amount
 */
export function activeWithin(context: { lastActiveTimestamp: number }, amount: number, format: DurationFormat): boolean {

    const now = moment();
    const lastActive = context.lastActiveTimestamp !== undefined ? moment(context.lastActiveTimestamp) : undefined;

    const rangeStart = moment(now).subtract(amount, format);
    const range = moment.range(rangeStart, now);

    if (lastActive && range.contains(lastActive)) {
        log().debug(`User was active within ${amount} ${format}`);
        return true;
    }
    log().debug(`User was NOT active within ${amount} ${format}`);
    return false;
}

/**
 * Is the current time within the provided schedule.
 * 
 * @param start - Start date
 * @param startFormat - Format of the start date string
 * @param duration - Duration
 * @param durationFormat - Format of the duration
 * @param timeZone - Optional time zone
 */
export function fitsSchedule(start: string, startFormat: string, duration: number, durationFormat: DurationFormat, timeZone?: string): boolean {
    const schedule: Schedulable = {
        schedule: {
            start: {
                time: start,
                format: startFormat,
                timeZone
            },
            duration: {
                amount: duration,
                format: durationFormat
            }
        }
    }

    const fitSchedule = !!findSchedulableMatch([schedule]);

    if (!fitSchedule) {
        log().debug(`Schedule starting ${start}, with format ${startFormat}, and running for ${duration} ${durationFormat} did NOT fit.  Current date ${new Date().toISOString()}`);
    } else {
        log().debug(`Schedule starting ${start}, with format ${startFormat}, and running for ${duration} ${durationFormat} fits.`);
    }

    return fitSchedule;
}

/**
 * Generate a time conditional check for the provided 
 * context with last active timestamp.
 * 
 * @param context 
 */
export function TimeConditionalCheck<T extends object>(context: { lastActiveTimestamp: number }): ConditionalCheck {
    return {
        test: isTimeContextual,
        check: (obj: TimeContextual<T>): boolean => {
            return !!findTimeContextualMatch([obj], context);
        },
        functions: [
            activeWithin.bind(null, context),
            fitsSchedule
        ]
    }
}