/*! Copyright (c) 2019, XAPPmedia */
export declare type RelativeDateType = "LAST_FRIDAY" | "LAST_MONDAY" | "LAST_SATURDAY" | "LAST_SUNDAY" | "LAST_THURSDAY" | "LAST_TUESDAY" | "LAST_WEDNESDAY" | "YESTERDAY" | "THIS_FRIDAY" | "THIS_MONDAY" | "THIS_SATURDAY" | "THIS_SUNDAY" | "THIS_THURSDAY" | "THIS_TUESDAY" | "THIS_WEDNESDAY" | "TODAY" | "NEXT_FRIDAY" | "NEXT_MONDAY" | "NEXT_SATURDAY" | "NEXT_SUNDAY" | "NEXT_THURSDAY" | "NEXT_TUESDAY" | "NEXT_WEDNESDAY" | "TOMORROW";
export declare type RelativeDateRangeType = "LAST_MONTH" | "LAST_WEEK" | "LAST_WEEKEND" | "LAST_YEAR" | "THIS_MONTH" | "THIS_WEEK" | "THIS_WEEKEND" | "THIS_YEAR" | "NEXT_MONTH" | "NEXT_WEEK" | "NEXT_WEEKEND" | "NEXT_YEAR";
/**
 * A relative date time contains data about relative dates such as "yesterday" or "last year".
 *
 * Typically, this object is then converted to a DateTime or DateTimeRange at runtime.
 *
 * @export
 * @interface RelativeDateTime
 */
export interface RelativeDateTime {
    /**
     * The relative date.  It can be just "LAST_WEEKEND" but can also be "${LAST_WEEKEND}", "${LAST_SUNDAY}T12:00:00",
     * "${LAST_FRIDAY}T12:00:00 --> ${LAST_SATURDAY}T12:00:00" or "${LAST_FRIDAY}T12:00:00/${LAST_SATURDAY}T12:00:00"
     *
     * @type {(RelativeDateType | RelativeDateRangeType | string)}
     * @memberof RelativeDateTime
     */
    relativity: RelativeDateType | RelativeDateRangeType | string;
    amount?: number;
}
