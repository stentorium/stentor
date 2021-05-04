/*! Copyright (c) 2019, XAPPmedia */
import { Request } from "stentor-models";
import { STENTOR_PLATFORM } from "./Constants";
import { Deviceable } from "./Types";

/**
 * Determine if the request is for this channel
 *
 * @export
 * @returns {requestBody is Request}
 * @param request
 */
export function isStentorRequest(request: Request): request is Request {
    // Oh, so easy..
    return request.platform === STENTOR_PLATFORM;
}

/**
 * 
 * @param object 
 * @returns 
 */
export function isDeviceable(object: Record<string, unknown>): object is Deviceable {
    return !!object && typeof (object as Deviceable).device === "object";
}
