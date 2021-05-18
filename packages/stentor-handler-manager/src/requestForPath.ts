/*! Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import { ExecutablePath, Request } from "stentor-models";
import {
    INTENT_REQUEST_TYPE,
    isInputUnknownRequest,
    isIntentRequest,
    isLaunchRequest,
    isOptionSelectRequest
} from "stentor-request";

/**
 * For the provided path, it updates the request.
 *
 * NOTE: This modifies the request that is passed in.
 *
 * @param {Request} request
 * @param {ExecutablePath} path
 * @returns {Request}
 */
export function requestForPath(request: Request, path: ExecutablePath): Request {
    if (!path) {
        return request;
    }

    // see if it is START type
    if (path.type === "START") {
        // TODO: Do we need this request check anymore?
        if (
            isIntentRequest(request) ||
            isLaunchRequest(request) ||
            isInputUnknownRequest(request) ||
            isOptionSelectRequest(request)
        ) {
            log().info(`Setting overrideKey on request to ${path.intentId}`);
            request.overrideKey = path.intentId;
        } else {
            console.warn(`Could not update request for a type: START path, passing through original`);
        }
    }

    if (path.slots) {
        // TODO: is there a better way to achieve this?
        // Slots always make it a IntentRequest
        request.type = INTENT_REQUEST_TYPE;
        if (isIntentRequest(request)) {
            request.slots = { ...path.slots };
        }
    }

    return request;
}
