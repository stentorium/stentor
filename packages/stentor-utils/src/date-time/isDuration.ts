/*! Copyright (c) 2020, XAPPmedia */
import { Duration, RequestSlotValues } from "stentor-models";

/**
 * Determine if the request slot value is a Duration
 *
 * @public
 * @param slotValue - Slot value to check 
 */
export function isDuration(slotValue: RequestSlotValues): slotValue is Duration {
    return !!slotValue && typeof slotValue === "object" && typeof (slotValue as Duration).amount === "number" && typeof (slotValue as Duration).format === "string";
}