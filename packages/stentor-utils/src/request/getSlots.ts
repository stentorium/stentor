/*! Copyright (c) 2022, XAPPmedia */
import { Request, RequestSlotMap } from "stentor-models";
import { isIntentRequest } from "stentor-guards";

/**
 * Helper method to get the slots from the request, regardless of the type of request
 *
 * @param request
 * @returns 
 */
export function getSlots(request: Request): RequestSlotMap | undefined {
    let slots: RequestSlotMap;

    if (isIntentRequest(request)) {
        slots = request.slots;
    }

    return slots;
}
