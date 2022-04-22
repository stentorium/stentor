/*! Copyright (c) 2022, XAPPmedia */

import { Request } from "stentor-models";
import { isIntentRequest } from "stentor-guards";

/**
 * Helper method to determine if the request has slots.
 *
 * @param request
 * @returns 
 */
export function hasSlots(request: Request): boolean {
    let hasSlots = false;

    if (isIntentRequest(request)) {
        if (request.slots && Object.keys(request.slots).length > 0) {
            hasSlots = true;
        }
    }

    return hasSlots;
}