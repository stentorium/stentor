/*! Copyright (c) 2019, XAPPmedia */
import { SESSION_STORAGE_SLOTS_KEY } from "stentor-constants";
import { isHandler } from "stentor-guards";
import { Content, Context, Handler, Request, Response, Slot, RequestSlotMap } from "stentor-models";
import { keyFromRequest, isIntentRequest } from "stentor-request";
import { combineRequestSlots, findValueForKey, existsAndNotEmpty, random } from "stentor-utils";
import { compileResponse } from "./compileResponse";
import { determineResponse } from "./determineResponse";

/**
 * Get the compiled response from the provided
 * content, request and context.
 * 
 * In order to leverage slot filling, you must pass in a Handler for content.
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
        // Check for slot filling:
        // * If there is content it can't be for itself
        // * It needs to be an intent request
        // * We need slots on the content.
        if (!(responses && key !== content.intentId) && isIntentRequest(request) && existsAndNotEmpty(content.slots)) {
            //OK! Intent request and we have slots
            // See if we have an slotElicitationResponseKeys
            const required: Slot[] = content.slots.filter((slot) => {
                return typeof slot.slotElicitationContentKey === "string" && slot.slotElicitationContentKey.length > 0;
            });

            const sessionSlots: RequestSlotMap = context.session ? context.session.get(SESSION_STORAGE_SLOTS_KEY) || {} : {};

            const needFillingFromStorage: Slot[] = required.filter((slot) => {
                const slotFromSession = sessionSlots[slot.name];
                return !slotFromSession || !slotFromSession.value;
            });
            // See if we are about to fill the last required slot with the incoming request
            // need filling from storage needs to be length 1 and the incoming request needs to have the value
            if (needFillingFromStorage.length === 1 && request.slots && request.slots[needFillingFromStorage[0].name] && request.slots[needFillingFromStorage[0].name].value) {
                // The incoming request is going to fill the last required slot so 
                // we get the content for itself
                responses = findValueForKey(content.intentId, content.content);
            } else {
                // Otherwise, merge the request slots with the session slots 
                const requestSlots = combineRequestSlots(sessionSlots, request.slots);
                // Figure out which ones we don't have a value for
                const needFilling: Slot[] = required.filter((slot) => {
                    const slotFromRequest = requestSlots[slot.name];
                    return !slotFromRequest || !slotFromRequest.value
                });

                // We have slots that need filling
                if (existsAndNotEmpty(needFilling)) {
                    // Of the ones that need filling, we need to dwindle 
                    // it down again to those that
                    // can actually return a response. 
                    const haveResponses: Slot[] = needFilling.filter((slot) => {
                        const potentialResponses = findValueForKey(slot.slotElicitationContentKey, content.content);
                        return !!determineResponse(potentialResponses, request, context);
                    });
                    if (existsAndNotEmpty(haveResponses)) {
                        const slotToFill = random(haveResponses);
                        responses = findValueForKey(slotToFill.slotElicitationContentKey, content.content);
                    }
                }
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
