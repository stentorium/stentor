/*! Copyright (c) 2019, XAPPmedia */
import {
    AudioPlayerRequest,
    ChannelActionRequest,
    EventRequest,
    InputUnknownRequest,
    IntentRequest,
    LaunchRequest,
    NotificationPermissionRequest,
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

import {
    AUDIO_PLAYER_REQUEST_TYPE,
    CHANNEL_ACTION_REQUEST_TYPE,
    EVENT_REQUEST_TYPE,
    INPUT_UNKNOWN_REQUEST_TYPE,
    INTENT_REQUEST_TYPE,
    LAUNCH_REQUEST_TYPE,
    NOTIFICATION_PERMISSION_REQUEST_TYPE,
    OPTION_SELECT_REQUEST_TYPE,
    PERMISSION_REQUEST_TYPE,
    PLAYBACK_CONTROL_REQUEST_TYPE,
    RAW_QUERY_REQUEST_TYPE,
    SESSION_ENDED_REQUEST_TYPE,
    SIGN_IN_REQUEST_TYPE,
    SURFACE_CHANGE_REQUEST_TYPE,
    TRANSACTION_DELIVERY_ADDRESS_REQUEST_TYPE,
} from "stentor-constants";
import { DeliveryAddressRequest } from "stentor-models/lib/Request/DeliveryAddressRequest";
import { TransactionDecisionRequest } from "stentor-models/lib/Request/TransactionDecisionRequest";
import { TransactionRequirementCheckRequest } from "stentor-models/lib/Request/TransactionRequirementCheckRequest";
import { RawQueryRequest } from "stentor-models/lib/Request/RawQueryRequest";

/**
 * Check if the request is a LaunchRequest
 *
 * @param request
 * @returns
 */
export function isLaunchRequest(request: Request): request is LaunchRequest {
    return !!request && request.type === LAUNCH_REQUEST_TYPE;
}

/**
 * Check if the request is a ChannelActionRequest
 *
 * @param request
 * @returns
 */
export function isChannelActionRequest(request: Request): request is ChannelActionRequest {
    return !!request && request.type === CHANNEL_ACTION_REQUEST_TYPE;
}

/**
 * Check if the request is an EventRequest
 *
 * @param request
 * @returns
 */
export function isEventRequest(request: Request): request is EventRequest {
    return !!request && request.type === EVENT_REQUEST_TYPE;
}

/**
 * Check if the request is an InputUnknownRequest
 *
 * @param request - Request
 * @returns If the request is an InputUnknown
 */
export function isInputUnknownRequest(request: Request): request is InputUnknownRequest {
    return !!request && request.type === INPUT_UNKNOWN_REQUEST_TYPE;
}
/**
 * Check if the request is a SessionEndedRequest
 *
 * @param request
 * @returns
 */
export function isSessionEndedRequest(request: Request): request is SessionEndedRequest {
    return !!request && request.type === SESSION_ENDED_REQUEST_TYPE;
}

/**
 * A request that requires resolution to a defined intentId, it is the raw query only (with other metadata);
 * @param request 
 * @returns 
 */
export function isRawQueryRequest(request: Request): request is RawQueryRequest {
    return !!request && request.type === RAW_QUERY_REQUEST_TYPE;
}

/**
 * Check if the request is a IntentRequest
 *
 * @param request
 * @returns
 */
export function isIntentRequest(request: Request): request is IntentRequest {
    return !!request && request.type === INTENT_REQUEST_TYPE;
}
/**
 * Check if it is a PermissionGrant
 *
 * @param {Request} request
 * @returns {request is PermissionGrant}
 */
export function isPermissionRequest(request: Request): request is PermissionRequest {
    return !!request && request.type === PERMISSION_REQUEST_TYPE;
}
/**
 * Check if it is a NotificationPermissionGrant
 *
 * @param {Request} request
 * @returns {request is PermissionGrant}
 */
export function isNotificationPermissionRequest(request: Request): request is NotificationPermissionRequest {
    return !!request && request.type === NOTIFICATION_PERMISSION_REQUEST_TYPE;
}
/**
 * Check if it is a SurfaceChange
 *
 * @deprecated Use isSurfaceChangeRequest
 * @param {Request} request
 * @returns {request is SurfaceChangeRequest}
 */
export function isSurfaceRequest(request: Request): request is SurfaceChangeRequest {
    return !!request && request.type === SURFACE_CHANGE_REQUEST_TYPE;
}

/**
 * Is the request a SurfaceChangeRequest
 * @param request 
 * @returns 
 */
export function isSurfaceChangeRequest(request: Request): request is SurfaceChangeRequest {
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
 * @param {Request} request
 * @returns {boolean}
 */
export function isAudioPlayerRequest(request: Request): request is AudioPlayerRequest {
    return !!request && request.type === AUDIO_PLAYER_REQUEST_TYPE;
}
/**
 * Check if the request is a PlaybackControlRequest
 *
 * @param {Request} request
 * @returns {request is PlaybackControlRequest}
 */
export function isPlaybackControlRequest(request: Request): request is PlaybackControlRequest {
    return !!request && request.type === PLAYBACK_CONTROL_REQUEST_TYPE;
}

/**
 * Check if it is a DeliveryAddress
 *
 * @param {Request} request
 * @returns {request is DeliveryAddressRequest}
 */
export function isDeliveryAddressRequest(request: Request): request is DeliveryAddressRequest {
    return !!request && request.type === TRANSACTION_DELIVERY_ADDRESS_REQUEST_TYPE;
}

/**
 * Check if it is a Transaction Decision
 *
 * @param {Request} request
 * @returns {request is TransactionDecisionRequest}
 */
export function isTransactionDecisionRequest(request: Request): request is TransactionDecisionRequest {
    return !!request && request.type === "TRANSACTION_DECISION_REQUEST";
}

/**
 * Check if it is a Transaction Requirement Check
 *
 * @param {Request} request
 * @returns {request is TransactionRequirementCheckRequest}
 */
export function isTransactionRequirementCheckRequest(request: Request): request is TransactionRequirementCheckRequest {
    return !!request && request.type === "TRANSACTION_REQUIREMENT_CHECK_REQUEST";
}

const EPOCH_ID_BUG_LIMIT_MS = 5000;
const EPOCH_LENGTH = 13;

/**
 * Detects if the user is anonymous.
 *
 * Google will make a user anonymous if they don't recognize the voice.
 *
 * @param {Request} request
 * @returns {boolean}
 */
export function isAnonymousUser(request: Request): boolean {
    if (!request) {
        return false;
    }

    let isAnonymousUser = false;
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
 * Is the request a new session.
 *
 * @param request
 */
export function isNewSession(request: Request): boolean {
    return request.isNewSession;
}

/**
 * Helper function to determine if the request has a sessionID.
 */
export function hasSessionId(
    request: Request
): request is InputUnknownRequest | IntentRequest | LaunchRequest | SessionEndedRequest | PermissionRequest | RawQueryRequest | ChannelActionRequest {
    return (
        isInputUnknownRequest(request) ||
        isIntentRequest(request) ||
        isLaunchRequest(request) ||
        isSessionEndedRequest(request) ||
        isPermissionRequest(request) ||
        isRawQueryRequest(request) ||
        isChannelActionRequest(request)
    );
}

/**
 * Determines if the request has an intentId.
 * @param request 
 * @returns 
 */
export function hasIntentId(request: Request): request is IntentRequest | InputUnknownRequest | LaunchRequest | OptionSelectRequest | SignInRequest | PermissionRequest {
    return isIntentRequest(request) || isInputUnknownRequest(request) || isOptionSelectRequest(request) || isSignInRequest(request) || isPermissionRequest(request);
}

/**
 * Guard to check if an object is RequestDependable
 *
 * @param {object} item
 * @returns {item is RequestDependable<T>}
 */
export function isRequestDependable<T extends object>(item: object): item is RequestDependable<T> {
    return !!item && (item as RequestDependent).requestMatch !== undefined;
}
/**
 * Guard to check if an object is SystemDependable
 *
 * @param {object} item
 * @returns {item is SystemDependable<T>}
 */
export function isSystemDependable<T extends object>(item: object): item is SystemDependable<T> {
    return !!item && (item as SystemDependent).systemCondition !== undefined;
}
