/*! Copyright (c) 2019, XAPPmedia */
import { Response, SchedulableResponse } from "stentor-models";
import { isScheduled } from "./isScheduled";

/**
 * Type guard to determine if the Response is a SchedulableResponse
 *
 * @param {Response} response
 * @returns {response is SchedulableResponse}
 */
export function isSchedulableResponse(response: Response): response is SchedulableResponse {
    return !!response && isScheduled(response);
}
