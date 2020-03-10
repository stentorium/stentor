/*! Copyright (c) 2020, XAPPmedia */
import { ConditionalCheck, Request, RequestDependable } from "stentor-models";

import {
    isRequestDependable,
    isNewSession,
    isAnonymousUser,
    isPlaybackControlRequest,
    isAudioPlayerRequest,
    isOptionSelectRequest,
    isSignInRequest,
    isSurfaceRequest,
    isNotificationPermissionRequest,
    isPermissionRequest,
    isIntentRequest,
    isSessionEndedRequest,
    isInputUnknownRequest,
    isLaunchRequest
} from "./Guards";
import { findRequestDependentMatch } from "./findRequestDependentMatch";

/**
 * Check if the request is the following type or types
 * 
 * @param request - Request under test
 * @param value - Value(s) to match the type for
 */
export function isRequestType(request: Request, value: string | string[]): boolean {
    return !!findRequestDependentMatch([{
        requestMatch: {
            name: 'type',
            value
        }
    }], request);
}

/**
 * Check if the request is for the following ID or IDs
 * @param request 
 * @param value - IDs to match against
 */
export function isRequestID(request: Request, value: string | string[]): boolean {
    return !!findRequestDependentMatch([{
        requestMatch: {
            name: 'intentId',
            value
        }
    }], request);
}

/**
 * Returns a RequestConditionalCheck for the provided request.
 * 
 * @param request 
 */
export function RequestConditionalCheck<T extends object>(request: Request): ConditionalCheck {
    return {
        test: isRequestDependable,
        check: (obj: RequestDependable<T>): boolean => {
            return !!findRequestDependentMatch([obj], request);
        },
        functions: [
            isAnonymousUser.bind(null, request),
            isAudioPlayerRequest.bind(null, request),
            isInputUnknownRequest.bind(null, request),
            isIntentRequest.bind(null, request),
            isLaunchRequest.bind(null, request),
            isNewSession.bind(null, request),
            isNotificationPermissionRequest.bind(null, request),
            isOptionSelectRequest.bind(null, request),
            isPermissionRequest.bind(null, request),
            isPlaybackControlRequest.bind(null, request),
            isRequestID.bind(null, request),
            isRequestType.bind(null, request),
            isSessionEndedRequest.bind(null, request),
            isSignInRequest.bind(null, request),
            isSurfaceRequest.bind(null, request),
        ]
    }
}