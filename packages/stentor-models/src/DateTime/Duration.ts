/*! Copyright (c) 2019, XAPPmedia */
// format is the moment.DurationConstructor.
export type DurationFormat =
    | "year"
    | "years"
    | "y" // Years
    | "quarter"
    | "quarters"
    | "Q" // Quarters
    | "month"
    | "months"
    | "M" // Months
    | "week"
    | "weeks"
    | "w" // Weeks
    | "day"
    | "days"
    | "d" // Days
    | "hour"
    | "hours"
    | "h" // Hours
    | "minute"
    | "minutes"
    | "m" // Minutes
    | "second"
    | "seconds"
    | "s" // Seconds
    | "millisecond"
    | "milliseconds"
    | "ms"; // Milliseconds

/**
 * Duration, amount and format.
 *
 * @export
 * @interface Duration
 */
export interface Duration {
    readonly amount: number;
    readonly format: DurationFormat;
}
