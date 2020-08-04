/*! Copyright (c) 2019, XAPPmedia */
import { SESSION_STORAGE_SLOTS_KEY } from "stentor-constants";
import { isHandler } from "stentor-guards";
import { Content, Context, Handler, Request, Response, Slot } from "stentor-models";
import { keyFromRequest, isIntentRequest } from "stentor-request";
import { combineRequestSlots, findValueForKey, existsAndNotEmpty, random } from "stentor-utils";
import { compileResponse } from "./compileResponse";
import { determineResponse } from "./determineResponse";

/**
 * Get the compiled response from the provided
 * content, request and context.
 *
 * @export
 * @param {(Content | Response[])} content
 * @param {Request} request
 * @param {Context} context
 * @returns {Response}
 */
export function getResponse(
    content: Handler | Content | Response[],
    request: Request,
    context: Context,
    additionalContext?: object
): Response {
    let responses: Response[];

    if (Array.isArray(content)) {
        responses = content;
    } else if (isHandler(content)) {
        const key = keyFromRequest(request);
        responses = findValueForKey(key, content.content);
        // Check for slot filling
        if (isIntentRequest(request) && existsAndNotEmpty(content.slots)) {
            //OK! Intent request and we have slots
            // See if we have an slotElicitationResponseKeys
            const required: Slot[] = content.slots.filter((slot) => {
                return typeof slot.slotElicitationContentKey === "string" && slot.slotElicitationContentKey.length > 0;
            });

            // Merged request slots
            const requestSlots = combineRequestSlots(context.session.get(SESSION_STORAGE_SLOTS_KEY), request.slots);
            // Figure out which ones we don't have a value for
            const needFilling: Slot[] = required.filter((slot) => {
                const slotFromRequest = requestSlots[slot.name];
                return !slotFromRequest || !slotFromRequest.value
            });

            if (existsAndNotEmpty(needFilling)) {
                // For the ones need filling, randomly take one.  
                // We may want to specify order in the future however
                // random will get it done for now
                const slotToFill = random(needFilling);
                responses = findValueForKey(slotToFill.slotElicitationContentKey, content.content);
            }
        }
    } else {
        const key = keyFromRequest(request);
        // Find the appropriate array of possible responses
        responses = findValueForKey(key, content);
    }
    // Determine the best one
    let response: Response = determineResponse(responses, request, context);
    // And compile
    response = compileResponse(response, request, context, additionalContext);
    // Check for actions and apply them?

    return response;
}
