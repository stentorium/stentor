/*! Copyright (c) 2019, XAPPmedia */
import { LastActiveResponse, Response } from "stentor-models";
import { isLastActive } from "./isLastActive";

/**
 * Type guard to determine if the Response is a LastActiveResponse.
 *
 * @param {Response} response
 * @returns {response is LastActiveResponse}
 */
export function isLastActiveResponse(response: Response): response is LastActiveResponse {
    return !!response && isLastActive(response);
}

