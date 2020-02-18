/*! Copyright (c) 2019, XAPPmedia */
import { Scheduled } from "stentor-models";
import * as moment from "moment-timezone";
import { isScheduled } from "./Guards";


export interface ScheduleFormatScore {
    score: number;
    description?: string;
}

export interface ScheduleFormatScores {
    [format: string]: ScheduleFormatScore;
}

export const SCHEDULE_FORMAT_SCORES: ScheduleFormatScores = {
    // Year, applies to both YY and YYYY
    ["YY"]: { score: 1 },
    // Month, applies to both M and MM
    ["M"]: { score: 1 },
    // Day of month, applies to both D and DD
    ["D"]: { score: 1 },
    // Day of year, includes information about month and day of month
    ["DDD"]: { score: 2 },
    // Hour (24), includes information about hours and morning vs evening
    // applies to both H and HH
    ["H"]: { score: 2 },
    // Hour (12), includes information about hours
    // applies to both h and hh
    ["h"]: { score: 1 },
    // am/pm, includes information about morning or evening
    ["a"]: { score: 1 },
    // AM/PM
    ["A"]: { score: 1 },
    // Minutes, applies to both m and mm
    ["m"]: { score: 1 }
};

/**
 * Determine schedule specificity score, the higher the value
 * the more specific the schedule is.
 */
export function determineSpecificityScore<T extends object>(scheduled: Scheduled<T> | undefined): number {
    // exit conditions
    if (!scheduled || !scheduled.schedule) {
        return 0;
    }

    const schedule = scheduled.schedule;
    const start = schedule.start;
    let format = start.format;

    // Format doesn't always exist
    if (!format) {
        // If it doesn't use the defaultFormat from moment
        // which is what we use as the default
        format = moment.defaultFormat;
    }

    let score = 0;

    // Not in the format but adds specificity
    if (start.dayOfWeek) {
        score += 1;
    }
    // Iterate through the formats adding the score
    Object.keys(SCHEDULE_FORMAT_SCORES).forEach(key => {
        const formatScore = SCHEDULE_FORMAT_SCORES[key];

        // If it contains it
        if (format.includes(key)) {
            // add the score
            score += formatScore.score;
        }
    });

    return score;
}

/**
 * Finds the most specific schedule.
 *
 * If the array does not contain any scheduled objects, undefined is returned.
 */
export function findMostSpecificSchedulable<T extends object>(schedules: (T | Scheduled<T>)[] | undefined): Scheduled<T> | undefined {
    // Fast exit conditions
    // doesn't exist
    if (!schedules) {
        return undefined;
    }
    // empty array
    if (schedules.length === 0) {
        return undefined;
    }
    // only one in the array, just return it
    if (schedules.length === 1) {
        const firstItem = schedules[0];
        if (isScheduled(firstItem)) {
            return firstItem;
        } else {
            return undefined;
        }
    }

    let mostSpecific: Scheduled<T>;
    let currentScore = 0;

    schedules.forEach(scheduled => {
        if (!isScheduled(scheduled)) {
            // bail if it doesn't have a schedule
            return;
        }
        const score = determineSpecificityScore(scheduled);

        if (score > currentScore) {
            mostSpecific = scheduled;
            currentScore = score;
        }
    });

    return mostSpecific;
}




