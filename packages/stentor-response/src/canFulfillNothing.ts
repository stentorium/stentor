/*! Copyright (c) 2019, XAPPmedia */
import { CanFulfillIntentResult, RequestSlotMap } from "stentor-models";
import { canFulfillAll } from "./canFulfillAll";

export function canFulfillNothing(slots: RequestSlotMap): CanFulfillIntentResult {
    return canFulfillAll(slots, true);
}
