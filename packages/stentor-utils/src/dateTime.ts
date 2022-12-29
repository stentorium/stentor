/*! Copyright (c) 2019, XAPPmedia */
import { DateTime, DateTimeRange, RelativeDateRangeType, RelativeDateType, RequestSlotValues } from "stentor-models";
import {
    addDays,
    addMonths,
    addWeeks,
    addYears,
    eachWeekendOfInterval,
    endOfMonth,
    endOfWeek,
    endOfYear,
    format,
    formatISO,
    Interval,
    parse,
    startOfMonth,
    startOfWeek,
    startOfYear
} from "date-fns";
import { wordToNumber } from "./number";
import { pruneEmpty } from "./json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chrono = require("chrono-node");

export const ISO_8601 = /^(\d{4}-\d{2}-\d{2})?(?:T?(\d{2}:\d{2}:\d{2})((?:[-+]\d{2}:\d{2})|Z)?)?$/;
export const ISO_8601_RANGE = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}:\d{2})((?:[-+]\d{2}:\d{2})|Z)?)?\/(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}:\d{2})((?:[-+]\d{2}:\d{2})|Z)?)?$/;
export const ISO_8601_DATE_ONLY = /\d{4}-\d{2}-\d{2}/;
export const ISO_8601_TIME_ONLY = /(\d{2}:\d{2}:\d{2})(?:-\d{2}:\d{2})?/;

/**
 * Determine if the request slot value is a DateTime
 *
 * @public
 * @param slotValue - Slot value to check 
 */
export function isDateTime(slotValue: RequestSlotValues): slotValue is DateTime {
    return !!slotValue && (!!(slotValue as DateTime).date || !!(slotValue as DateTime).time);
}

/**
 * Determine if the request slot value is a DateTimeRange
 *
 * @public
 * @param slotValue - Slot value to check
 */
export function isDateTimeRange(slotValue: RequestSlotValues): slotValue is DateTimeRange {
    return !!slotValue && (!!(slotValue as DateTimeRange).start || !!(slotValue as DateTimeRange).end);
}

/**
 * Converts a date time object to a string.
 *
 * Either a single date (2020-07-19T23:59:59) or a range (2019-07-19T00:00:00 --> 2020-07-19T23:59:59).
 *
 * @param dateTime - Either DateTime or DateTimeRange to convert to a string
 */
export function dateTimeToString(dateTime: DateTime | DateTimeRange): string {

    if (typeof dateTime !== "object") {
        return "";
    }

    let str = "";

    try {
        if (isDateTime(dateTime)) {
            const date = dateTime.date ? format(parse(dateTime.date, "y-M-d", new Date()), "yyyy-MM-dd") : undefined;
            const time = dateTime.time;
            str = `${date ? date : ""}${date && time ? "T" : ""}${time ? time : ""}`;
        } else {
            const start = dateTime.start;
            const end = dateTime.end;

            if (start) {
                const date = start.date ? format(parse(start.date, "y-M-d", new Date()), "yyyy-MM-dd") : undefined;
                const time = start.time;
                str = `${date ? date : ""}${date && time ? "T" : ""}${time ? time : ""}`;
            }
            if (start && end) {
                str += ` --> `;
            }
            if (end) {
                const date = end.date ? format(parse(end.date, "y-M-d", new Date()), "yyyy-MM-dd") : undefined;
                const time = end.time;
                str += `${date ? date : ""}${date && time ? "T" : ""}${time ? time : ""}`;
            }
        }
    } catch (e) {
        console.error(e);
    }

    return str;
}

/**
 * Determines if the string is an ISO-8601 style string.
 *
 * @remarks
 * This does not cover the entire 8601 spec, just a version
 * that is commonly used by NLUs to communicate date & time.
 * For example, durations (like P1Y2M10D) are not supported.
 *
 * @public
 * @param potential - Potential ISO-8601 string
 * @returns - True if the string is ISO-8601 Date & Time string
 */
export function isISO8601(potential: string): boolean {
    if (!potential) {
        return false;
    }
    const regex = new RegExp(ISO_8601);
    const results = regex.exec(potential);

    return results ? true : false;
}

/**
 * Determines if the string is an ISO-8601 range style string.
 *
 * This does not cover the entire 8601 spec, just a version that is
 * commonly used by NLUs to communicate date & time.
 *
 *
 * {@link isISO8601}
 * {@link https://en.wikipedia.org/wiki/ISO_8601#Time_intervals}
 * @public
 * @param potential
 * @returns True if the string confirms to ISO-8601 range format
 */
export function isISO8601Range(potential: string): boolean {
    // Ranges have / in between them
    const regex = new RegExp(ISO_8601_RANGE);
    const results = regex.exec(potential);

    return results ? true : false;
}

/**
 * Is the string in the date time range format with two ISO-8601 strings
 * separated by "-->"
 *
 * @param potential
 * @returns 
 */
export function isDateTimeRangeString(potential: string): boolean {
    const regex = new RegExp(/^.+-->.+$/);
    const results = regex.exec(potential);

    return results ? true : false;
}

/**
 * From a Dialogflow style ISO-8601 time string: "2019-06-05T12:00:00-04:00",
 * it pulls out the date and the time.
 *
 * @param date
 * @param includeOnly
 * @returns A DateTime object based on the provided parameters 
 */
export function getDateTimeFrom(date: string | Date, includeOnly?: "time" | "date"): DateTime | undefined {
    let slotDateTime: DateTime;

    let dateTime: string;

    if (date instanceof Date) {
        dateTime = formatISO(date);
    } else {
        dateTime = date;
    }

    if (isISO8601(dateTime)) {
        const regex = new RegExp(ISO_8601);
        const results = regex.exec(dateTime);
        if (results) {
            if (includeOnly === "date") {
                slotDateTime = {
                    date: results[1]
                };
            } else if (includeOnly === "time") {
                slotDateTime = pruneEmpty({
                    time: results[2],
                    tz: results[3]
                });
            } else {
                slotDateTime = pruneEmpty({
                    date: results[1],
                    time: results[2],
                    tz: results[3]
                });
            }
        }
    } else {
        // Not a typical ISO from Dialogflow, going to try to pull out the individual components
        // First date.
        const dateRegex = new RegExp(ISO_8601_DATE_ONLY);
        const dateResults = dateRegex.exec(dateTime);
        if (dateResults) {
            slotDateTime = {
                date: dateResults[0]
            };
        }

        const timeRegex = new RegExp(ISO_8601_TIME_ONLY);
        const timeResults = timeRegex.exec(dateTime);
        if (timeResults) {
            slotDateTime = { ...slotDateTime, time: timeResults[1] };
        }
    }

    return slotDateTime;
}

/**
 * Parses the string and returns a DateTimeRange object.
 *
 * Supports both the ISO-8601 range & "-->" style date range.
 *
 * @param date
 * @returns
 */
export function getDateTimeRangeFrom(date: string): DateTimeRange | undefined {
    let delimiter: string;

    if (isDateTimeRangeString(date)) {
        delimiter = "-->";
    } else if (isISO8601Range(date)) {
        delimiter = "/";
    } else {
        // Don't know what it is, bye string.
        return undefined;
    }

    // Split, then parse the individual ones
    const split = date.split(delimiter);

    return {
        start: getDateTimeFrom(split[0]),
        end: getDateTimeFrom(split[1])
    };
}

/**
 * Parses the date within the string.  Returns undefined if
 * it cannot parse one.
 *
 * It does not handle date periods such as "last week" or "last month".
 *
 * Note: This is a wrapper around chrono-node parseDate.
 * See https://github.com/wanasit/chrono for more information.
 *
 * @public
 */
export function parseDate(parsable: string, returnOnly?: "date" | "time"): DateTime | undefined {
    // For docs on parseDate see
    // https://github.com/wanasit/chrono#usage
    const dateTime: Date = chrono.parseDate(parsable);

    if (!dateTime) {
        return undefined;
    }

    return getDateTimeFrom(dateTime, returnOnly);
}

/**
 * Parses the relative date string and returns a date time.
 *
 * Support is currently limited, see possible RelativeDateType & RelativeDateRangeType for current
 * supported values.
 *
 * @param relative - The relative date
 * @param now - Optional date to use to calculate date off of
 * @returns - Computed relative data time
 */
export function parseRelativeDate(
    relative: RelativeDateRangeType | RelativeDateType | string,
    now: Date = new Date()
): DateTime | DateTimeRange {
    let dateTime: DateTime | DateTimeRange;
    // Figure out if it is a date period.
    if (
        relative.includes("WEEK") ||
        relative.includes("MONTH") ||
        relative.includes("YEAR") ||
        relative.includes("WEEKEND")
    ) {
        // The delta tells us how much we add depending on the prefix of LAST, THIS, or NEXT
        let deltaStart = 0;
        let deltaEnd = 0;
        if (relative.includes("LAST")) {
            deltaStart = -1;
            deltaEnd = -1;
            // See if we have a number
            const possibleNumber = wordToNumber(relative.split("_")[1]);
            if (typeof possibleNumber === "number") {
                // Make it negative
                deltaStart = -possibleNumber;
            }
        } else if (relative.includes("NEXT")) {
            deltaEnd = 1;
            deltaStart = 1;
            // Search for other NUMBER words and change the delta
            const possibleNumber = wordToNumber(relative.split("_")[1]);
            if (typeof possibleNumber === "number") {
                deltaEnd = possibleNumber;
            }
        } else if (relative.includes("THIS")) {
            deltaStart = 0
            deltaEnd = 0;
        }

        if (relative.includes("WEEKEND")) {
            // Weekend is different.
            // THIS & NEXT can mean the same thing Monday - Friday
            // If currently in a weekend, THIS is the current one.
            let interval: Interval;
            if (deltaStart === 0) {
                // This is where we have to account for if
                // we are in the weekend.
                // In case we are on Sunday, we go back one
                // and still go forward a week
                interval = {
                    start: addDays(now, -1),
                    end: addDays(now, 7)
                };
            } else if (deltaStart === -1) {
                interval = {
                    start: addWeeks(now, deltaStart),
                    end: now
                };
            } else if (deltaEnd === 1) {
                interval = {
                    start: now,
                    end: addWeeks(now, deltaEnd)
                };
            }

            const weekends = eachWeekendOfInterval(interval);
            dateTime = {
                start: getDateTimeFrom(weekends[0], "date"),
                end: getDateTimeFrom(weekends[1], "date")
            };
        } else if (relative.includes("WEEK")) {
            const updatedDateStart = addWeeks(now, deltaStart);
            const start = getDateTimeFrom(startOfWeek(updatedDateStart), "date");
            const updatedDateEnd = addWeeks(now, deltaEnd);
            const end = getDateTimeFrom(endOfWeek(updatedDateEnd), "date");
            // FYI: weeks start on Sunday
            dateTime = {
                start,
                end
            };
        } else if (relative.includes("MONTH")) {
            const updatedDateStart = addMonths(now, deltaStart);
            const start = getDateTimeFrom(startOfMonth(updatedDateStart), "date");
            const updatedEndDate = addMonths(now, deltaEnd);
            const end = getDateTimeFrom(endOfMonth(updatedEndDate), "date");
            dateTime = {
                start,
                end
            };
        } else if (relative.includes("YEAR")) {
            const updatedStartDate = addYears(now, deltaStart);
            const start = getDateTimeFrom(startOfYear(updatedStartDate), "date");
            const updatedEndDate = addYears(now, deltaEnd);
            const end = getDateTimeFrom(endOfYear(updatedEndDate), "date");
            dateTime = {
                start,
                end
            };
        }
    } else {
        // Not a date period but need to figure out the format.
        // For each, we replace it.
        let withReplacements = relative;
        const es6Regex = new RegExp(/\${(\w*)}/, "g");
        let match = es6Regex.exec(relative);

        if (match) {
            while (match !== null) {
                const date = parseDate(
                    match[0]
                        .replace("_", " ")
                        .replace(/[\${}]/g, "")
                        .toLowerCase(),
                    "date"
                );
                withReplacements = withReplacements.replace(match[0], date.date);
                match = es6Regex.exec(relative);
            }

            if (isDateTimeRangeString(withReplacements) || isISO8601Range(withReplacements)) {
                dateTime = getDateTimeRangeFrom(withReplacements);
            } else if (isISO8601(withReplacements)) {
                dateTime = getDateTimeFrom(withReplacements);
            }
        } else {
            dateTime = parseDate(
                relative
                    .replace("_", " ")
                    .replace(/[\${}]/, "")
                    .toLowerCase(),
                "date"
            );
        }
    }

    return dateTime;
}

