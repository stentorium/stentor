/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { LaunchRequestID, LaunchRequestType } from "./Types";

/**
 * The Launch Request, when the user says "open \{invocation name\}" or
 * "talk to \{invocation name\}"
 *
 * See {@link https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#launchrequest}
 * 
 * @public
 */
export interface LaunchRequest extends BaseRequest {
    /**
     * LaunchRequest has a constant type of "LAUNCH_REQUEST"
     */
    type: LaunchRequestType;
    /**
     * LaunchRequest has a constant intentId
     */
    intentId: LaunchRequestID;
    /**
     * Session ID
     */
    sessionId: string;
}
