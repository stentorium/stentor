import { isInputUnknownRequest, isIntentRequest, isLaunchRequest, isOptionSelectRequest, isPermissionRequest, isSignInRequest } from "stentor-guards";
/**
 * From the provided request it pulls out the event that is used
 * to then get the content, forwards, and logic.
 *
 * @param {Request} request
 * @returns {string}
 */
export function keyFromRequest(request) {
    let key;
    if (!request) {
        return undefined;
    }
    if (isIntentRequest(request) ||
        isLaunchRequest(request) ||
        isInputUnknownRequest(request) ||
        isOptionSelectRequest(request) ||
        isPermissionRequest(request) ||
        isSignInRequest(request)) {
        key = request.intentId;
    }
    if (request.overrideKey) {
        key = request.overrideKey;
    }
    return key;
}
//# sourceMappingURL=keyFromRequest.js.map