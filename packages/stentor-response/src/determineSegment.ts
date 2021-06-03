/*! Copyright (c) 2019, XAPPmedia */
import { Context, Request, ResponseSegment } from "stentor-models";
import { determine } from "stentor-determiner";
/**
 * Determine which segment is the best based on the provided list of segments and context.
 *
 * @param {ResponseSegment[]} segments
 * @param {Request} request
 * @param {Context} context
 * @returns {(ResponseSegment | undefined)}
 */
export function determineSegment(
    segments: ResponseSegment[],
    request: Request,
    context: Context
): ResponseSegment | undefined {
    return determine(segments, request, context);
}
