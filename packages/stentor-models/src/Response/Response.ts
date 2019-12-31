/*! Copyright (c) 2019, XAPPmedia */
import { Actionable } from "../Action";
import { LastActive, Scheduled } from "../DateTime";
import { Display } from "../Display";
import { JSONDependable } from "../JSONDependent";
import { Media } from "../Media";
import { RequestDependable, SystemDependable } from "../Request";
import { SlotDependable } from "../Slot";
import { StorageDependable } from "../Storage";
import { ResponseOutput } from "./ResponseOutput";
import { ResponseSegmentsMap } from "./ResponseSegment";

/**
 * Additional response metadata.
 * 
 * @export
 * @interface ResponseData
 */
export interface ResponseData {
    /**
     * Provides context to the user for select system responses.
     * 
     * Used for SURFACE_CHANGE, ACCOUNT_LINK,
     *
     * @type {string}
     * @memberof ResponseData
     */
    content?: string;
    /**
     * Provides a title for select system responses.
     * 
     * Used for SURFACE_CHANGE
     *
     * @type {string}
     * @memberof ResponseData
     */
    title?: string;
    /**
     * During media playback, expected previous token is used
     * as a reference point.  It is used by certain channels
     * to prevent race condition requests that can occur
     * when navigating content quickly.
     *
     * @type {string}
     * @memberof ResponseData
     */
    expectedPreviousToken?: string;

    [key: string]: string | number | boolean | undefined;
}


/**
 * A response that expects a user's input.
 *
 * @export
 * @interface SimpleResponse
 */
export interface SimpleResponse<T = string | ResponseOutput> extends Partial<Actionable> {
    /**
     * Name of the response.
     *
     * Used to help differentiate multiple responses.
     *
     * @type {string}
     * @memberof SimpleResponse
     */
    name?: string;
    /**
     * Used for tracking the response in third party analytics.
     *
     * @type {string}
     * @memberof SimpleResponse
     */
    tag?: string;
    /**
     * What the assistant will say first as part of the response.
     *
     * @type {(string | ResponseOutput)}
     * @memberof SimpleResponse
     */
    outputSpeech?: T;
    /**
     * If provided, the output speech was most likely a question and requires a response from the user.
     * The reprompt is given if the user doesn't say anything or the assistant can't recognize the response.
     *
     * @type {(string | ResponseOutput)}
     * @memberof SimpleResponse
     */
    reprompt?: T;
    /**
     * @deprecated This is not in use.
     *
     * @type {(string | ResponseOutput)}
     * @memberof SimpleResponse
     */
    silencePrompt?: T;
    /**
     * Segments used for the outputSpeech and reprompt.
     *
     * @type {ResponseSegmentsMap}
     * @memberof SimpleResponse
     */
    segments?: ResponseSegmentsMap;
    /**
     * Display elements for surfaces/devices with screens.
     *
     * @type {[]}
     * @memberof SimpleResponse
     */
    displays?: Display[];
    /**
     * Media for playback
     *
     * @type {Media[]}
     * @memberof SimpleResponse
     */
    media?: Media[];
    /**
     * System responses to perform account links, control media, surface changes, and permission requests.
     *
     * @type {string}
     * @memberof SimpleResponse
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
    | "PERMISSION_NOTIFICATION";

    /**
     * Supplemental data to augment the response.
     * 
     * @type ResponseData
     * @memberof SimpleResponse
     */
    data?: ResponseData;
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
