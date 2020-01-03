/*! Copyright (c) 2019, XAPPmedia */
export type RelativeDateType =
    // PAST
    | "LAST_FRIDAY"
    | "LAST_MONDAY"
    | "LAST_SATURDAY"
    | "LAST_SUNDAY"
    | "LAST_THURSDAY"
    | "LAST_TUESDAY"
    | "LAST_WEDNESDAY"
    | "YESTERDAY"
    // CURRENT
    | "THIS_FRIDAY"
    | "THIS_MONDAY"
    | "THIS_SATURDAY"
    | "THIS_SUNDAY"
    | "THIS_THURSDAY"
    | "THIS_TUESDAY"
    | "THIS_WEDNESDAY"
    | "TODAY"
    // FUTURE
    | "NEXT_FRIDAY"
    | "NEXT_MONDAY"
    | "NEXT_SATURDAY"
    | "NEXT_SUNDAY"
    | "NEXT_THURSDAY"
    | "NEXT_TUESDAY"
    | "NEXT_WEDNESDAY"
    | "TOMORROW";

export type RelativeDateRangeType =
    // PAST
    | "LAST_MONTH"
    | "LAST_WEEK"
    | "LAST_WEEKEND"
    | "LAST_YEAR"
    // CURRENT
    | "THIS_MONTH"
    | "THIS_WEEK"
    | "THIS_WEEKEND"
    | "THIS_YEAR"
    // FUTURE
    | "NEXT_MONTH"
    | "NEXT_WEEK"
    | "NEXT_WEEKEND"
    | "NEXT_YEAR";

/**
 * A relative date time contains data about relative dates such as "yesterday" or "last year".
 *
 * Typically, this object is then converted to a DateTime or DateTimeRange at runtime.
 */
export interface RelativeDateTime {
    /**
     * The relative date.  It can be just "LAST_WEEKEND" but can also be "$\{LAST_WEEKEND\}", "$\{LAST_SUNDAY\}T12:00:00",
     * "$\{LAST_FRIDAY\}T12:00:00 --\> $\{LAST_SATURDAY\}T12:00:00" or "$\{LAST_FRIDAY\}T12:00:00/$\{LAST_SATURDAY\}T12:00:00"
     */
    relativity: RelativeDateType | RelativeDateRangeType | string;
    amount?: number;
}
