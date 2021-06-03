/*! Copyright (c) 2020, XAPPmedia */
import { DurationFormat } from "stentor-models";

export type DurationFormatToMSMultiplier = Record<DurationFormat, number>;

/**
 * Lookup table to convert a duration format to a multiplier that will convert it to milliseconds
 */
export const DURATION_FORMAT_TO_MS_MULTIPLIER: DurationFormatToMSMultiplier = {
    // smallest, just multiple by 1
    ms: 1,
    millisecond: 1,
    milliseconds: 1,

    s: 1000,
    second: 1000,
    seconds: 1000,

    m: 60000,
    minute: 60000,
    minutes: 60000,

    h: 3.6e+6,
    hour: 3.6e+6,
    hours: 3.6e+6,

    d: 8.64e+7,
    day: 8.64e+7,
    days: 8.64e+7,

    w: 6.048e+8,
    week: 6.048e+8,
    weeks: 6.048e+8,

    M: 2.628e+9,
    month: 2.628e+9,
    months: 2.628e+9,
    // Quarters are tricky, going to assume 90 days
    Q: 7.776e+9,
    quarter: 7.776e+9,
    quarters: 7.776e+9,
    // Largest
    y: 3.154e+10,
    years: 3.154e+10,
    year: 3.154e+10
    // Room to add on more such as decade or century
};

/**
 * Compare two duration formats {@link stentor-models#DurationFormat} is greater than the other.
 * 
 * For example, a year is greater than a month. 
 * 
 * @param one 
 * @param two 
 */
export function durationFormatGreaterThan(one: DurationFormat, two: DurationFormat): boolean {

    // If one is undefined and two exists, return true
    if (typeof DURATION_FORMAT_TO_MS_MULTIPLIER[one] !== "number" && typeof DURATION_FORMAT_TO_MS_MULTIPLIER[two] === "number") {
        return true;
    }

    if (DURATION_FORMAT_TO_MS_MULTIPLIER[one] > DURATION_FORMAT_TO_MS_MULTIPLIER[two]) {
        return true;
    }

    return false;
}