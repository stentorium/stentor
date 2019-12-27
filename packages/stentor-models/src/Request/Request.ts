/*! Copyright (c) 2019, XAPPmedia */
import { Locale } from "../Locale";
import { AudioPlayerRequest } from "./AudioPlayerRequest";
import { InputUnknownRequest } from "./InputUnknownRequest";
import { IntentRequest } from "./IntentRequest";
import { LaunchRequest } from "./LaunchRequest";
import { NotificationPermissionRequest } from "./NotificationPermissionRequest";
import { OptionSelectRequest } from "./OptionSelectRequest";
import { PermissionRequest } from "./PermissionRequest";
import { PlaybackControlRequest } from "./PlaybackControlRequest";
import { SessionEndedRequest } from "./SessionEndedRequest";
import { SignInRequest } from "./SignInRequest";
import { SurfaceChangeRequest } from "./SurfaceChangeRequest";
import { RequestTypes } from "./Types";

/**
 * Shared parameters for each Request
 *
 * @export
 * @interface BaseRequest
 */
export interface BaseRequest {
    /**
     * Type of the request.
     *
     * @type {RequestTypes}
     * @memberof BaseRequest
     */
    type: RequestTypes;
    /**
     * Used during forwarding and redirecting the request to another handler.  When set it
     * pulls content or paths for this key instead of for the request.
     */
    overrideKey?: string;
    /**
     * ID for the user making the request.
     *
     * @type {string}
     * @memberof BaseRequest
     */
    userId: string;
    /**
     * The user is anonymous, or a guest.
     *
     * The user either does not yet have a verified identity or have
     * chosen to not have any data saved about them.
     *
     * @type {boolean}
     * @memberof BaseRequest
     */
    anonymous?: boolean;
    /**
     * Is the request a new session.
     *
     * @type {boolean}
     * @memberof BaseRequest
     */
    isNewSession: boolean;
    /**
     * Access token from account linking
     *
     * @type {boolean}
     * @memberof BaseRequest
     */
    accessToken?: string;
    /**
     * API access data from the platform
     * In case there is an APIs that provides services like list management, messaging...
     *
     * @type {boolean}
     * @memberof BaseRequest
     */
    apiAccess?: ApiAccessData;
    /**
     * Raw speech to text (STT) query, not available on all platforms.
     *
     * @type {string}
     * @memberof BaseRequest
     */
    rawQuery?: string;
    /**
     * The platform the request came from
     */
    platform?: string;
    /**
     * User's locale, such as us-EN and es-MX.
     *
     * Possible values for Alexa are defined here: https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-locale
     * Possible values for Dialogflow are defined here: https://dialogflow.com/docs/reference/language
     *
     * @type {Locale}
     * @memberof BaseRequest
     */
    locale?: Locale;
    /**
     * Is the request a barge in
     *
     * Currently only set on Google and Dialogflow request
     */
    isBargeIn?: boolean;
    /**
     * Is the request a health check.
     *
     * Currently only Google and Dialogflow perform health checks.
     *
     * @type {boolean}
     * @memberof BaseRequest
     */
    isHealthCheck?: boolean;
}

export interface ApiAccessData {
    apiBaseUrl: string;
    apiAuthToken: string;
}

export type Request =
    | LaunchRequest
    | SessionEndedRequest
    | InputUnknownRequest
    | IntentRequest
    | AudioPlayerRequest
    | PlaybackControlRequest
    | PermissionRequest
    | SurfaceChangeRequest
    | NotificationPermissionRequest
    | SignInRequest
    | OptionSelectRequest;
