/*! Copyright (c) 2019, XAPPmedia */
import { Context, Request, Response } from "stentor-models";
import { determine } from "./determine";
/**
 * Determines which response is best based on the provided list of possible responses.
 *
 * @export
 * @param {ResponseTypes[]} responses
 * @returns {(Response | undefined)}
 */
export function determineResponse(responses: Response[], request: Request, context: Context): Response | undefined {
    return determine(responses, request, context);
}
