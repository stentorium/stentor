/*! Copyright (c) 2019, XAPPmedia */
import { DateTime, DateTimeRange, RelativeDateRangeType, RelativeDateType } from "stentor-models";
import {
    addDays,
    addMonths,
    addWeeks,
    addYears,
    eachWeekendOfInterval,
    endOfMonth,
    endOfWeek,
    endOfYear,
    formatISO,
    Interval,
    startOfMonth,
    startOfWeek,
    startOfYear
} from "date-fns";
import { pruneEmpty } from "./json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chrono = require("chrono-node");

export const ISO_8601 = /^(\d{4}-\d{2}-\d{2})?(?:T?(\d{2}:\d{2}:\d{2})((?:[-+]\d{2}:\d{2})|Z)?)?$/;
export const ISO_8601_RANGE = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}:\d{2})((?:[-+]\d{2}:\d{2})|Z)?)?\/(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}:\d{2})((?:[-+]\d{2}:\d{2})|Z)?)?$/;
export const ISO_8601_DATE_ONLY = /\d{4}-\d{2}-\d{2}/;
export const ISO_8601_TIME_ONLY = /(\d{2}:\d{2}:\d{2})(?:-\d{2}:\d{2})?/;

/**
 * Used on a RequestSlot.dateTime to determine if it is just dateTime or a range.
 *
 * @export
 * @param {(DateTime | DateTimeRange)} item
 * @returns {item is DateTime}
 */
export function isDateTime(item: DateTime | DateTimeRange): item is DateTime {
    return !!item && (!!(item as DateTime).date || !!(item as DateTime).time);
}

/**
 * Used on a RequestSlot.dateTime to determine if it is just dateTime or a range.
 *
 * @export
 * @param {(DateTime | DateTimeRange)} item
 * @returns {item is DateTimeRange}
 */
export function isDateTimeRange(item: DateTime | DateTimeRange): item is DateTimeRange {
    return !!item && (!!(item as DateTimeRange).start || !!(item as DateTimeRange).end);
}


/**
 * Converts a date time object to a string.
 *
 * Either a single date (2020-07-19T23:59:59) or a range (2019-07-19T00:00:00 --> 2020-07-19T23:59:59).
 *
 * @param dateTime
 */
export function dateTimeToString(dateTime: DateTime | DateTimeRange): string {
    if (typeof dateTime !== "object") {
        return "";
    }

    if (isDateTime(dateTime)) {
        const date = (dateTime as DateTime).date;
        const time = (dateTime as DateTime).time;
        return `${date ? date : ""}${date && time ? "T" : ""}${time ? time : ""}`;
    } else {
        const start = (dateTime as DateTimeRange).start;
        const end = (dateTime as DateTimeRange).end;
        let str = "";
        if (start) {
            const date = (start as DateTime).date;
            const time = (start as DateTime).time;
            str = `${date ? date : ""}${date && time ? "T" : ""}${time ? time : ""}`;
        }
        if (start && end) {
            str += ` --> `;
        }
        if (end) {
            const date = (end as DateTime).date;
            const time = (end as DateTime).time;
            str += `${date ? date : ""}${date && time ? "T" : ""}${time ? time : ""}`;
        }
        return str;
    }
}

/**
 * Determines if the string is an ISO-8601 style string.
 *
 * This does not cover the entire 8601 spec, just a version
 * that is commonly used by NLUs to communicate date & time.
 *
 * For example, durations (like P1Y2M10D) are not supported
 *
 * @export
 * @param {string} potential
 * @returns {boolean}
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
 * @see isISO8601
 * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
 * @export
 * @param {string} potential
 * @returns {boolean}
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
 * @export
 * @param {string} potential
 * @returns {boolean}
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
 * @export
 * @param {(string | Date)} date
 * @param {("time" | "date")} [includeOnly]
 * @returns {(DateTime | undefined)}
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
                    // tslint:disable-next-line:no-magic-numbers
                    tz: results[3]
                });
            } else {
                slotDateTime = pruneEmpty({
                    date: results[1],
                    time: results[2],
                    // tslint:disable-next-line:no-magic-numbers
                    tz: results[3]
                });
            }
        }
    } else {
        // Not a typical ISO from dialogflow, going to try to pull out the individual components
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
 * @export
 * @param {string} date
 * @returns {(DateTimeRange | undefined)}
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
 * @export
 * @param {(RelativeDateType | RelativeDateRangeType)} relative
 * @param {Date} [now=new Date()]
 * @returns {(DateTime | DateTimeRange)}
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
        let delta = 0;
        if (relative.includes("LAST")) {
            delta = -1;
        } else if (relative.includes("NEXT")) {
            delta = 1;
        } else if (relative.includes("THIS")) {
            delta = 0;
        }

        if (relative.includes("WEEKEND")) {
            // Weekend is different.
            // THIS & NEXT can mean the same thing Monday - Friday
            // If currently in a weekend, THIS is the current one.
            // tslint:disable-next-line:no-magic-numbers
            let interval: Interval;
            if (delta === 0) {
                // This is where we have to account for if
                // we are in the weekend.
                // In case we are on Sunday, we go back one
                // and still go forward a week
                interval = {
                    start: addDays(now, -1),
                    // tslint:disable-next-line:no-magic-numbers
                    end: addDays(now, 7)
                };
            } else if (delta === -1) {
                interval = {
                    start: addWeeks(now, delta),
                    end: now
                };
            } else if (delta === 1) {
                interval = {
                    start: now,
                    end: addWeeks(now, delta)
                };
            }

            const weekends = eachWeekendOfInterval(interval);
            dateTime = {
                start: getDateTimeFrom(weekends[0], "date"),
                end: getDateTimeFrom(weekends[1], "date")
            };
        } else if (relative.includes("WEEK")) {
            const updatedDate = addWeeks(now, delta);
            const start = getDateTimeFrom(startOfWeek(updatedDate), "date");
            const end = getDateTimeFrom(endOfWeek(updatedDate), "date");
            // FYI: weeks start on Sunday
            dateTime = {
                start,
                end
            };
        } else if (relative.includes("MONTH")) {
            const updatedDate = addMonths(now, delta);
            const start = getDateTimeFrom(startOfMonth(updatedDate), "date");
            const end = getDateTimeFrom(endOfMonth(updatedDate), "date");
            dateTime = {
                start,
                end
            };
        } else if (relative.includes("YEAR")) {
            const updatedDate = addYears(now, delta);
            const start = getDateTimeFrom(startOfYear(updatedDate), "date");
            const end = getDateTimeFrom(endOfYear(updatedDate), "date");
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
                        .replace(/[\${}]/, "")
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

