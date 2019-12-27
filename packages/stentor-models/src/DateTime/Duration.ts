/*! Copyright (c) 2019, XAPPmedia */

/**
 * Duration formats.
 *
 * These coincide with moment.js duration formats.
 */
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
