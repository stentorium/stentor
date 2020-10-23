/*! Copyright (c) 2020, XAPPmedia */
import { RequestSlotValues } from "stentor-models";
import { dateTimeToString, isDateTime, isDateTimeRange } from "../dateTime";
/**
 * Convert a request slot value to a string, helpful for display or debugging.
 * 
 * @param value - Slot value to convert to a string
 * @returns String suitable for console statements or display
 */
export function requestSlotValueToString(value: RequestSlotValues): string {
    let displayValue = `${value}`;

    if (Array.isArray(value)) {
        displayValue = `[${value.toString()}]`;
    } else if (isDateTime(value) || isDateTimeRange(value)) {
        displayValue = dateTimeToString(value);
    }

    return displayValue;
}