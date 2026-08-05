import { isInputUnknownRequest, isIntentRequest, isOptionSelectRequest, isLaunchRequest } from "stentor-guards";
import { hasSlots, requestSlotsToString } from "./request/index.js";
/**
 * Turns a user's request into a message
 *
 * @param request - The request from the user
 * @param context - Context object
 * @param appId - Default to "bot", used in to field as the receiver of the message
 * @returns
 */
export function requestToMessage(request, appId) {
    let userMessage;
    if (request.rawQuery || isIntentRequest(request) || isOptionSelectRequest(request) || isLaunchRequest(request) || isInputUnknownRequest(request)) {
        // ID of the bot is determined by the environment variable
        const id = appId || "bot";
        let message;
        if (isOptionSelectRequest(request)) {
            message = `Selected item with token ${request.token}`;
        }
        else if (isLaunchRequest(request)) {
            message = `Launch`;
        }
        else if (isInputUnknownRequest(request)) {
            message = request.rawQuery ? request.rawQuery : `Unknown Input`;
        }
        else if (isIntentRequest(request)) {
            // Raw query if available
            if (request.rawQuery) {
                message = request.rawQuery;
            }
            else if (hasSlots(request)) {
                message = requestSlotsToString(request.slots);
            }
            else {
                message = `Request ${request.intentId}`;
            }
        }
        else {
            message = request.rawQuery;
        }
        userMessage = {
            from: {
                id: request.userId
            },
            to: [
                { id }
            ],
            message,
            createdTime: request.createdTime || new Date().toISOString()
        };
    }
    return userMessage;
}
/**
 * Turns a response into a message
 *
 * @param response
 * @param request
 * @param appId - Optional, defaults to "bot"
 * @returns
 */
export function responseToMessage(response, request, appId) {
    let responseMessage;
    // Add the response to the transcript!
    if (response && response.outputSpeech) {
        // ID of the bot is determined by the environment variable
        const id = appId || "bot";
        // Try display text if it exists
        const message = response.outputSpeech.displayText || response.outputSpeech.ssml;
        responseMessage = {
            from: {
                id: id
            },
            to: [
                { id: request.userId }
            ],
            message,
            createdTime: new Date().toISOString(),
            response: response.outputSpeech
        };
    }
    return responseMessage;
}
//# sourceMappingURL=transcript.js.map