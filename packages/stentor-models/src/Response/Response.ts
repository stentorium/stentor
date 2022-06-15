/*! Copyright (c) 2019, XAPPmedia */
import { Actionable } from "../Action";
import { Conditioned } from "../Conditional";
import { LastActive, Scheduled } from "../DateTime";
import { Display } from "../Display";
import { JSONDependable } from "../JSONDependent";
import { Media } from "../Media";
import { RequestDependable, SystemDependable } from "../Request";
import { SlotDependable } from "../Slot";
import { StorageDependable } from "../Storage";
import { CanFulfillIntentResult } from "./CanFulfillIntentResult";
import { ResponseOutput } from "./ResponseOutput";
import { ResponseSegmentsMap } from "./ResponseSegment";

/**
 * Active Context Object
 * 
 */
export interface ActiveContext {
    /**
     * Name of the context
     */
    name: string;
    /**
     * Parameters passed around with the context
     */
    parameters?: {
        [key: string]: string;
    }
    timeToLive: {
        /**
         *  
         *  Note: Not supported on Dialogflow
         */
        timeToLiveInSeconds?: number;
        /**
         * How many conversational turns to keep the context alive.
         */
        turnsToLive?: number;
    }
}


/**
 * Additional response metadata.
 */
export interface ResponseData {
    /**
     * Provides context to the user for select system responses.
     *
     * Used for SURFACE_CHANGE, ACCOUNT_LINK,
     */
    content?: string;
    /**
     * Provides a title for select system responses.
     *
     * Used for SURFACE_CHANGE
     */
    title?: string;
    /**
     * If a request ({@link see IntentRequest.canFulfill}) has canFufill as true,
     * this provides information about it's ability to fulfill the request.
     *  
     */
    canFulfill?: CanFulfillIntentResult;
    /**
     * During media playback, expected previous token is used
     * as a reference point.  It is used by certain channels
     * to prevent race condition requests that can occur
     * when navigating content quickly.
     */
    expectedPreviousToken?: string;
    // Additional Keys
    [key: string]: string | number | boolean | object | undefined;
}

/**
 * A response that expects a user's input.
 */
export interface SimpleResponse<T = string | ResponseOutput> extends Partial<Actionable>, Partial<Conditioned> {
    /**
     * Name of the response.
     *
     * Used to help differentiate multiple responses.
     */
    name?: string;
    /**
     * Used for tracking the response in third party analytics.
     */
    tag?: string;
    /**
     * What the assistant will say first as part of the response.
     */
    outputSpeech?: T;
    /**
     * If provided, the output speech was most likely a question and requires a response from the user.
     * The reprompt is given if the user doesn't say anything or the assistant can't recognize the response.
     */
    reprompt?: T;
    /**
     * @deprecated This is not in use.
     */
    silencePrompt?: T;
    /**
     * Segments used for the outputSpeech and reprompt.
     */
    segments?: ResponseSegmentsMap;
    /**
     * Display elements for surfaces/devices with screens.
     */
    displays?: Display[];
    /**
     * Media for playback
     */
    media?: Media[];
    /**
     * System responses to perform account links, control media, surface changes, and permission requests.
     */
    system?:
    | "ACCOUNT_LINK"
    | "MEDIA_ENQUEUE"
    | "MEDIA_STOP"
    | "SURFACE_CHANGE"
    | "PERMISSION_LIST"
    | "PERMISSION_EMAIL"
    | "PERMISSION_PHONE_NUMBER"
    | "PERMISSION_LOCATION_PRECISE"
    | "PERMISSION_LOCATION_COARSE"
    | "PERMISSION_NOTIFICATION"
    | "TRANSFER_CALL"
    | "HANDOFF";
    /**
     * Supplemental data to augment the response.
     */
    data?: ResponseData;
    /**
     * Optional active contexts which help influence the NLU.
     * 
     * - {@link https://cloud.google.com/dialogflow/es/docs/contexts-input-output}
     * - {@link https://docs.aws.amazon.com/lex/latest/dg/context-mgmt-active-context.html}
     */
    context?: {
        /**
         * 
         * Matches to outputContexts on Dialogflow & activeContexts
         */
        active?: ActiveContext[];
    };
}
/**
 * A response that can be scheduled.
 */
export type SchedulableResponse<T = string | ResponseOutput> = Scheduled<SimpleResponse<T>>;
/**
 * A response that is contextual, it knows about your past interactions.
 */
export type LastActiveResponse<T = string | ResponseOutput> = LastActive<SimpleResponse<T>>;
/**
 * A response that is dependent on a slot value in the current request.
 */
export type SlotDependentResponse<T = string | ResponseOutput> = SlotDependable<SimpleResponse<T>>;
/**
 * A response that is dependent on a value on user storage.
 */
export type StorageDependentResponse<T = string | ResponseOutput> = StorageDependable<SimpleResponse<T>>;
/**
 * A response that is dependent on a value on the request.
 */
export type RequestDependentResponse<T = string | ResponseOutput> = RequestDependable<SimpleResponse<T>>;
/**
 * A response that is dependent on a system state such as if the user has linked their account.
 */
export type SystemDependentResponse<T = string | ResponseOutput> = SystemDependable<SimpleResponse<T>>;
/**
 * A response that is dependent on a particular JSON path matcher.
 */
export type JSONDependableResponse<T = string | ResponseOutput> = JSONDependable<SimpleResponse<T>>;

/**
 * A response is a possible response back to a user; it includes a prompt, reprompt, and visual
 * assets.
 */
export type Response<T = string | ResponseOutput> =
    | JSONDependableResponse<T>
    | LastActiveResponse<T>
    | RequestDependentResponse<T>
    | SchedulableResponse<T>
    | SimpleResponse<T>
    | SlotDependentResponse<T>
    | StorageDependentResponse<T>
    | SystemDependentResponse<T>;
