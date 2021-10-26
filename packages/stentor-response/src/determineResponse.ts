/*! Copyright (c) 2019, XAPPmedia */
import { Context, Request, Response } from "stentor-models";
import { determine } from "stentor-determiner";
/**
 * Determines which response is best based on the provided list of possible responses.
 *
 * @param responses
 * @returns {(Response | undefined)}
 */
export function determineResponse(responses: Response[], request: Request, context: Context, additionalContext?: Record<string, unknown>): Response | undefined {
    return determine(responses, request, context, additionalContext);
}
