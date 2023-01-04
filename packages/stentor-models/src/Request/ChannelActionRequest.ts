/*! Copyright (c) 2022, XAPP AI */
import { BaseRequest } from "./Request";
import { ChannelActionRequestType } from "./Types";

/**
 * A user initiated action performed on the channel.  The most common is opening a URL.
 * 
 * This can be used to provide a follow up response to the user performing an action or simply for keeping
 * track of if the URL opened.
 * 
 * @beta This is new and subject to change
 */
export interface ChannelActionRequest extends BaseRequest {
    type: ChannelActionRequestType;
    /**
     * The current session ID
     */
    sessionId?: string;
    /**
     * Action taken
     */
    action: "OPEN_URL" | "FEEDBACK_RESPONSE" | string;
    /**
     * Optional, reference ID passed back.
     */
    referenceId?: string;
    /**
     * Optional, used differently depending on the action.
     * 
     * Use this for "OPEN_URL" action types.
     */
    uri?: string;
    /**
     * Optional, used to provide feedback on a posed question such as "How would you rate this experience?"
     * or "Was the response relevant?"
     */
    feedback?: "POSITIVE" | "NEGATIVE" | "RELEVANT" | "NOT_RELEVANT" | string;
    /**
     * Optional, open ended detail, can be used for stringified JSON or notes from the end user.
     */
    detail?: string;
}