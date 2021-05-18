/*! Copyright (c) 2019, XAPPmedia */
import { Request } from "stentor-models";
import { isIntentRequest } from "./Guards";

/**
 * Helper method to determine if the request has slots.
 *
 * @param {Request} request
 * @returns {boolean}
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
