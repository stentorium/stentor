/*! Copyright (c) 2020, XAPPmedia */
import { Duration, DurationFormat } from "stentor-models";
import { durationFormatGreaterThan } from "./durationFormatGreaterThan";
import { isISO8601Duration } from "./isISO8601Duration";
import { toNumber } from "../string";
import { addDurations } from "./addDurations";

export enum GetDurationGroupBy {
    Largest,
    Smallest
}

/**
 * Parses the string, if in the ISO-8601 duration format, and returns
 * a {@link Duration} object.  If the provided string is not a duration 
 * string, it returns undefined.
 * 
 * {@link https://stackoverflow.com/a/29153059/1349766}
 * @param iso8601Duration 
 * @param groupBy If there are multiple duration formats specified, you can combine them by either the largest or smallest, defaults to largest.
 * @returns A duration object or undefined if the string is not of expected format.
 */
export function getDurationFrom(iso8601Duration: string, groupBy: GetDurationGroupBy = GetDurationGroupBy.Largest): Duration {

    let duration: Duration;

    if (isISO8601Duration(iso8601Duration)) {

        const splitter = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
        const matches = splitter.exec(iso8601Duration);

        // Not taking into account sign at the moment
        // const sign: "+" | "-" = matches[1] === undefined ? '+' : '-';

        type DurationFormatMatches = Partial<Record<DurationFormat, number>>;

        const durationsMap: DurationFormatMatches = {
            years: matches[2] === undefined ? 0 : toNumber(matches[2]),
            months: matches[3] === undefined ? 0 : toNumber(matches[3]),
            weeks: matches[4] === undefined ? 0 : toNumber(matches[4]),
            days: matches[5] === undefined ? 0 : toNumber(matches[5]),
            hours: matches[6] === undefined ? 0 : toNumber(matches[6]),
            minutes: matches[7] === undefined ? 0 : toNumber(matches[7]),
            seconds: matches[8] === undefined ? 0 : toNumber(matches[8])
        };

        let format: DurationFormat;

        const durations: Duration[] = [];

        Object.keys(durationsMap).forEach((durationString) => {
            // Object.keys is not typed, durations will not change so
            // it is safe to force type the as DurationFormat here.
            const potentialFormat: DurationFormat = durationString as DurationFormat;
            // We only care if the value is greater than 0
            const amount = durationsMap[potentialFormat]
            if (amount > 0) {
                if (!format) {
                    format = potentialFormat;
                }

                if (groupBy === GetDurationGroupBy.Largest) {
                    if (durationFormatGreaterThan(potentialFormat, format)) {

                        format = potentialFormat;
                    }
                } else {
                    if (durationFormatGreaterThan(format, potentialFormat)) {
                        format = potentialFormat;
                    }
                }

                durations.push({
                    amount,
                    format: potentialFormat
                });
            }
        });
        // We have the unit now, add them all up and convert it to the requested format
        duration = addDurations(durations, format, true);
    }

    return duration;
}