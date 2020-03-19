/*! Copyright (c) 2019, XAPPmedia */
import { isScheduled } from "stentor-guards";
import { Scheduled } from "stentor-models";
import * as moment from "moment-timezone";
import { findMostSpecificSchedulable } from "./findMostSpecificSchedulable";
import { log } from "stentor-logger";

/**
 * Within a list of Schedulables, find a match for the provided time
 * or current time if no time is provided.
 */
export function findSchedulableMatch<T extends object>(
    schedules: (T | Scheduled<T>)[] | undefined,
    now = moment()
): Scheduled<T> | undefined {
    if (!Array.isArray(schedules)) {
        // bail if no schedule was passed in
        return undefined;
    }

    const matches: Scheduled<T>[] = [];

    schedules.forEach(item => {
        if (!isScheduled(item)) {
            // bail if it doesn't have a schedule
            return;
        }
        let start: moment.Moment;
        const { time, format, timeZone, dayOfWeek } = item.schedule.start;
        start = moment(time, format);
        // Convert to correct timezone if available
        if (timeZone) {
            // Update now with the tz
            now = now.tz(timeZone);
            // Create the start time with the provided time, format and timezone
            start = moment.tz(time, format, timeZone);
            // We now may need to set the year, month, date for the current
            // day if it wasn't provided on the format
            // The order here is important as if you try to update the date first
            // for a month that doesn't have that many days, it will default back to one
            // and you will be really confused.
            // They didn't give a year, set it.
            if (!format.includes("Y")) {
                const year = now.year();
                start.year(year);
            }

            // Since DDD or DDDD, day of year (1-365) includes both
            // data for day of month and month,
            // skip these two
            if (!format.includes("DDD")) {
                // 1st case, they don't give month
                if (!format.includes("M")) {
                    const month = now.month();
                    start.month(month);
                }
                // 2nd case, they don't give date
                if (!format.includes("D")) {
                    const date = now.date();
                    start.date(date);
                }
            }
        }

        const duration = item.schedule.duration;
        // calculate the end time based on the duration set
        const end = moment(start).add(duration.amount, duration.format);

        let correctDayOfWeek = true;

        // see if we have one.
        if (dayOfWeek) {
            // alright we have one, if it isn't included in the
            // day of week string, make that a false
            // This uses includes because dayOfWeek can be `0124` to denote multiple days of the week
            if (!item.schedule.start.dayOfWeek.includes(now.weekday().toString())) {
                correctDayOfWeek = false;
            }
        }

        if (correctDayOfWeek) {
            // See if it is in between, [) means we include
            // the start but exclude the end
            if (now.isBetween(start, end, undefined, "[)")) {
                matches.push(item);
            } else {
                log().debug(`Schedule starting ${time}, with format ${format}, and duration ${duration.amount} ${duration.format} was NOT in-between ${start.format()} --> ${end.format()}`);
            }
        } else {
            log().debug(`Incorrect day of the week for schedule starting ${time}, with format ${format}, and duration ${duration.amount} ${duration.format}`)
        }
    });

    return findMostSpecificSchedulable(matches);
}
