/*! Copyright (c) 2019, XAPPmedia */
import { LastActiveResponse, Response, SchedulableResponse } from "stentor-models";
import { isLastActive, isScheduled } from "stentor-time";

/**
 * Type guard to determine if the Response is a LastActiveResponse.
 *
 * @export
 * @param {Response} response
 * @returns {response is LastActiveResponse}
 */
export function isLastActiveResponse(response: Response): response is LastActiveResponse {
    return !!response && isLastActive(response);
}

