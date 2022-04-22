/*! Copyright (c) 2019, XAPPmedia */
import { Device } from "../Device";
import { Locale } from "../Locale";
import { AudioPlayerRequest } from "./AudioPlayerRequest";
import { InputUnknownRequest } from "./InputUnknownRequest";
import { IntentRequest } from "./IntentRequest";
import { LaunchRequest } from "./LaunchRequest";
import { NotificationPermissionRequest } from "./NotificationPermissionRequest";
import { OptionSelectRequest } from "./OptionSelectRequest";
import { PermissionRequest } from "./PermissionRequest";
import { PlaybackControlRequest } from "./PlaybackControlRequest";
import { RawQueryRequest } from "./RawQueryRequest";
import { SessionEndedRequest } from "./SessionEndedRequest";
import { SignInRequest } from "./SignInRequest";
import { SurfaceChangeRequest } from "./SurfaceChangeRequest";
import { RequestTypes } from "./Types";

/**
 * Shared parameters for each Request
 */
export interface BaseRequest {
    /**
     * Type of the request.
     */
    type: RequestTypes;
    /**
     * Used during forwarding and redirecting the request to another handler.  When set it
     * pulls content or paths for this key instead of for the request.
     */
    overrideKey?: string;
    /**
     * When the message was created, an ISO-8601 compatible date time string
     */
    createdTime?: string;
    /**
     * ID for the user making the request.
     */
    userId: string;
    /**
     * Unique identifier provided by the channel for the user's current device.
     */
    deviceId?: string;
    /**
     * Optional unique identifier for the request provided by the channel.
     */
    requestId?: string;
    /**
     * The user is anonymous, or a guest.
     *
     * The user either does not yet have a verified identity or have
     * chosen to not have any data saved about them.
     */
    anonymous?: boolean;
    /**
     * Is the request a new session.
     */
    isNewSession?: boolean;
    /**
     * Access token from account linking
     */
    accessToken?: string;
    /**
     * API access data from the platform
     * In case there is an APIs that provides services like list management, messaging...
     */
    apiAccess?: ApiAccessData;
    /**
     * Raw speech to text (STT) query, not available on all platforms.
     */
    rawQuery?: string;
    /**
     * The platform the request came from.
     * 
     * Example platforms are Google's Dialogflow & Amazon's Lex.  
     * 
     */
    platform?: string;
    /**
     * The specific channel that the platform provides.  
     */
    channel?: string;
    /**
     * Information about the device as far as capabilities such as screen or web browser available.
     * 
     * This information is available in two places, also on the context object, until it is removed from the context
     * in the next major release.
     */
    device?: Device;
    /**
     * User's locale, such as us-EN and es-MX.
     *
     * Possible values for Alexa are defined here: https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-locale
     * Possible values for Dialogflow are defined here: https://dialogflow.com/docs/reference/language
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
     */
    isHealthCheck?: boolean;
    /**
     * Optional request attributes to be passed through on the request.
     * 
     * If the channel supports it, it will be populated.
     */
    attributes?: Record<string, unknown>;
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
    | OptionSelectRequest
    | RawQueryRequest;
