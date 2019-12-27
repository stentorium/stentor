/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { LaunchRequestID, LaunchRequestType } from "./Types";

/**
 * The Launch Request, when the user says "open {invocation name}" or
 * "talk to {invocation name}"
 *
 * @see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#launchrequest
 *
 * @export
 * @interface LaunchRequest
 * @extends {BaseRequest}
 */
export interface LaunchRequest extends BaseRequest {
    type: LaunchRequestType;
    /**
     * LaunchRequest has a constant intentId
     *
     * @type {LaunchRequestID}
     * @memberof LaunchRequest
     */
    intentId: LaunchRequestID;
    /**
     * Session ID
     */
    sessionId: string;
}
