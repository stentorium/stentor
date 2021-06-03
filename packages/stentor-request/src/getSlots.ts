/*! Copyright (c) 2019, XAPPmedia */
import { Request, RequestSlotMap } from "stentor-models";
import { isIntentRequest } from "./Guards";

/**
 * Helper method to get the slots from the request.
 *
 * @param {Request} request
 * @returns {(RequestSlotMap | undefined)}
 */
export function getSlots(request: Request): RequestSlotMap | undefined {
    let slots: RequestSlotMap;

    if (isIntentRequest(request)) {
        slots = request.slots;
    }

    return slots;
}
