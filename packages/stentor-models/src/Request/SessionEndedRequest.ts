/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { SessionEndedRequestType } from "./Types";

/**
 * Session Ended Request, used by Alexa to signal the session has ended.
 *
 * @see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#sessionendedrequest
 *
 * @export
 * @interface SessionEndedRequest
 * @extends {BaseRequest}
 */
export interface SessionEndedRequest extends BaseRequest {
    type: SessionEndedRequestType;
    sessionId: string;
    reason: string;
    errorType?: string;
    errorMessage?: string;
}
