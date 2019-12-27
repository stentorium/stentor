/*! Copyright (c) 2019, XAPPmedia */
/**
 * Duration formats.
 *
 * These coincide with moment.js duration formats.
 */
export declare type DurationFormat = "year" | "years" | "y" | "quarter" | "quarters" | "Q" | "month" | "months" | "M" | "week" | "weeks" | "w" | "day" | "days" | "d" | "hour" | "hours" | "h" | "minute" | "minutes" | "m" | "second" | "seconds" | "s" | "millisecond" | "milliseconds" | "ms";
/**
 * Duration of time, specified by an amount and format (such as days or hours).
 *
 * @export
 * @interface Duration
 */
export interface Duration {
    /**
     * Duration amount
     *
     * @type {number}
     * @memberof Duration
     */
    readonly amount: number;
    /**
     * The format of the duration, such as "hours" or "days"
     *
     * @type {DurationFormat}
     * @memberof Duration
     */
    readonly format: DurationFormat;
}
