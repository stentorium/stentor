/*! Copyright (c) 2019, XAPPmedia */
import { Request } from "stentor-models";
import {
    isInputUnknownRequest,
    isIntentRequest,
    isLaunchRequest,
    isOptionSelectRequest,
    isPermissionRequest,
    isSignInRequest
} from "./Guards";

/**
 * From the provided request it pulls out the event that is used
 * to then get the content, forwards, and logic.
 *
 * @param {Request} request
 * @returns {string}
 */
export function keyFromRequest(request: Request): string {
    let key: string;

    if (!request) {
        return undefined;
    }

    if (
        isIntentRequest(request) ||
        isLaunchRequest(request) ||
        isInputUnknownRequest(request) ||
        isOptionSelectRequest(request) ||
        isPermissionRequest(request) ||
        isSignInRequest(request)
    ) {
        key = request.intentId;
    }

    if (request.overrideKey) {
        key = request.overrideKey;
    }

    return key;
}
