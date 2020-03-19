/*! Copyright (c) 2020, XAPPmedia */
import { LAUNCH_REQUEST_ID, INPUT_UNKNOWN_ID } from "stentor-constants";
import { Intent, Handler } from "stentor-models";
import { isHandler } from "./isHandler";

/**
 * Global handlers have utterances and can be accessed
 * at any time.
 *
 * @export
 * @param handler
 * @returns {boolean}
 */
export function isGlobalHandler(handler: Intent | Handler): boolean {
    if (!handler) {
        return false;
    }

    // LaunchRequests & InputUnknowns are auto global
    if (handler.intentId === LAUNCH_REQUEST_ID || handler.intentId === INPUT_UNKNOWN_ID) {
        return true;
    }

    const isActualHandler: boolean = isHandler(handler);
    const hasUtterances: boolean = Array.isArray(handler.utterancePatterns) && handler.utterancePatterns.length > 0;
    return isActualHandler && hasUtterances;
}