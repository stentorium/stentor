/*! Copyright (c) 2019, XAPPmedia */
import {
    AudioPlayerRequest,
    InputUnknownRequest,
    IntentRequest,
    LaunchRequest,
    OptionSelectRequest,
    PermissionRequest,
    PlaybackControlRequest,
    Request,
    RequestDependable,
    RequestDependent,
    SessionEndedRequest,
    SignInRequest,
    SurfaceChangeRequest,
    SystemDependable,
    SystemDependent
} from "stentor-models";
import { NotificationPermissionRequest } from "stentor-models/lib/Request/NotificationPermissionRequest";
import {
    AUDIO_PLAYER_REQUEST_TYPE,
    INPUT_UNKNOWN_REQUEST_TYPE,
    INTENT_REQUEST_TYPE,
    LAUNCH_REQUEST_TYPE,
    NOTIFICATION_PERMISSION_REQUEST_TYPE,
    OPTION_SELECT_REQUEST_TYPE,
    PERMISSION_REQUEST_TYPE,
    PLAYBACK_CONTROL_REQUEST_TYPE,
    SESSION_ENDED_REQUEST_TYPE,
    SIGN_IN_REQUEST_TYPE,
    SURFACE_CHANGE_REQUEST_TYPE
} from "./Constants";

/**
 * Check if the request is a LaunchRequest
 *
 * @export
 * @param {Request} request
 * @returns {boolean}
 */
export function isLaunchRequest(request: Request): request is LaunchRequest {
    return !!request && request.type === LAUNCH_REQUEST_TYPE;
}

/**
 * Check if the request is an InputUnknownRequest
 *
 * @export
 * @param {Request} request
 * @returns {request is InputUnknownRequest}
 */
export function isInputUnknownRequest(request: Request): request is InputUnknownRequest {
    return !!request && request.type === INPUT_UNKNOWN_REQUEST_TYPE;
}
/**
 * Check if the request is a SessionEndedRequest
 *
 * @export
 * @param {Request} request
 * @returns {boolean}
 */
export function isSessionEndedRequest(request: Request): request is SessionEndedRequest {
    return !!request && request.type === SESSION_ENDED_REQUEST_TYPE;
}
/**
 * Check if the request is a IntentRequest
 *
 * @export
 * @param {Request} request
 * @returns {boolean}
 */
export function isIntentRequest(request: Request): request is IntentRequest {
    return !!request && request.type === INTENT_REQUEST_TYPE;
}
/**
 * Check if it is a PermissionGrant
 *
 * @export
 * @param {Request} request
 * @returns {request is PermissionGrant}
 */
export function isPermissionRequest(request: Request): request is PermissionRequest {
    return !!request && request.type === PERMISSION_REQUEST_TYPE;
}
/**
 * Check if it is a NotificationPermissionGrant
 *
 * @export
 * @param {Request} request
 * @returns {request is PermissionGrant}
 */
export function isNotificationPermissionRequest(request: Request): request is NotificationPermissionRequest {
    return !!request && request.type === NOTIFICATION_PERMISSION_REQUEST_TYPE;
}
/**
 * Check if it is a SurfaceChange
 *
 * @param {Request} request
 * @returns {request is SurfaceChangeRequest}
 */
export function isSurfaceRequest(request: Request): request is SurfaceChangeRequest {
    return !!request && request.type === SURFACE_CHANGE_REQUEST_TYPE;
}
/**
 * Check if it is a Sign
 *
 * @param {Request} request
 * @returns {request is SignInRequest}
 */
export function isSignInRequest(request: Request): request is SignInRequest {
    return !!request && request.type === SIGN_IN_REQUEST_TYPE;
}
/**
 * Check if it is a Option Select
 *
 * @param {Request} request
 * @returns {request is OptionSelectRequest}
 */
export function isOptionSelectRequest(request: Request): request is OptionSelectRequest {
    return !!request && request.type === OPTION_SELECT_REQUEST_TYPE;
}
/**
 * Check if the request is a AudioPlayerRequest
 *
 * @export
 * @param {Request} request
 * @returns {boolean}
 */
export function isAudioPlayerRequest(request: Request): request is AudioPlayerRequest {
    return !!request && request.type === AUDIO_PLAYER_REQUEST_TYPE;
}
/**
 * Check if the request is a PlaybackControlRequest
 *
 * @export
 * @param {Request} request
 * @returns {request is PlaybackControlRequest}
 */
export function isPlaybackControlRequest(request: Request): request is PlaybackControlRequest {
    return !!request && request.type === PLAYBACK_CONTROL_REQUEST_TYPE;
}

const EPOCH_ID_BUG_LIMIT_MS = 5000;
const EPOCH_LENGTH = 13;

/**
 * Detects if the user is anonymous.
 *
 * Google will make a user anonymous if they don't recognize the voice.
 *
 * @export
 * @param {Request} request
 * @returns {boolean}
 */
export function isAnonymousUser(request: Request): boolean {
    if (!request) {
        return false;
    }

    let isAnonymousUser: boolean = false;
    const userId = request.userId;

    if (typeof userId === "string" && userId.length > 0 && userId.startsWith("1")) {
        const userEpoch = parseInt(userId.substr(0, EPOCH_LENGTH), 10);
        const thisEpoch = new Date().getTime();

        if (thisEpoch - userEpoch < EPOCH_ID_BUG_LIMIT_MS) {
            isAnonymousUser = true;
        }
    }

    return isAnonymousUser;
}
/**
 * Helper function to determine if the request has a sessionID.
 *
 * @export
 * @param {Request} request
 * @returns {(request is IntentRequest | LaunchRequest | SessionEndedRequest | PermissionGrant)}
 */
export function hasSessionId(
    request: Request
): request is InputUnknownRequest | IntentRequest | LaunchRequest | SessionEndedRequest | PermissionRequest {
    return (
        isInputUnknownRequest(request) ||
        isIntentRequest(request) ||
        isLaunchRequest(request) ||
        isSessionEndedRequest(request) ||
        isPermissionRequest(request)
    );
}
/**
 * Guard to check if an object is RequestDependable
 *
 * @export
 * @template T
 * @param {object} item
 * @returns {item is RequestDependable<T>}
 */
export function isRequestDependable<T extends object>(item: object): item is RequestDependable<T> {
    return !!item && (<RequestDependent>item).requestMatch !== undefined;
}
/**
 * Guard to check if an object is SystemDependable
 *
 * @export
 * @template T
 * @param {object} item
 * @returns {item is SystemDependable<T>}
 */
export function isSystemDependable<T extends object>(item: object): item is SystemDependable<T> {
    return !!item && (<SystemDependent>item).systemCondition !== undefined;
}
