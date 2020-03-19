/*! Copyright (c) 2019, XAPPmedia */
import { Content, Context, Request, Response } from "stentor-models";
import { keyFromRequest } from "stentor-request";
import { findValueForKey } from "stentor-utils";
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
    content: Content | Response[],
    request: Request,
    context: Context,
    additionalContext?: object
): Response {
    let responses: Response[];

    if (Array.isArray(content)) {
        responses = content;
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
