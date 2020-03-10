/*! Copyright (c) 2020, XAPPmedia */
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { ConditionalCheck, TimeContextual, DurationFormat, Schedule } from "stentor-models";
import { isTimeContextual } from "./Guards";
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
        return true;
    }

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
    const schedule: Schedule = {
        start: {
            time: start,
            format: startFormat,
            timeZone
        },
        duration: {
            amount: duration,
            format: durationFormat
        }
    };

    return !!findSchedulableMatch([schedule]);
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
        functions: [activeWithin.bind(null, context), fitsSchedule]
    }
}