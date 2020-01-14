/*! Copyright (c) 2019, XAPPmedia */
import { AbstractBuilder } from "@xapp/patterns";
import {
    AudioPlayerEvent,
    AudioPlayerRequest,
    InputUnknownRequest,
    IntentRequest,
    LanguageTag,
    LaunchRequest,
    OptionSelectRequest,
    PermissionRequest,
    PlaybackControlEvent,
    PlaybackControlRequest,
    RequestSlotMap,
    SessionEndedRequest,
    SignInRequest,
    ApiAccessData
} from "stentor-models";

import * as INTENT from "@xapp/stentor-interaction-model/lib/Intent/Constants";
import * as REQUEST from "./Constants";

/**
 * Builds a LaunchRequest
 *
 * @public
 */
export class LaunchRequestBuilder extends AbstractBuilder<LaunchRequest> {
    private accessToken?: string;
    private deviceId: string = "deviceId";

    /**
     * Add a access token to the request.
     *
     * @param token - Access token for the request
     */
    withAccessToken(token: string = "accessToken"): LaunchRequestBuilder {
        this.accessToken = token;
        return this;
    }

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    withDeviceId(deviceId: string): LaunchRequestBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Build the request.
     */
    build(): LaunchRequest {
        const { accessToken, deviceId } = this;

        return {
            intentId: REQUEST.LAUNCH_REQUEST_ID,
            type: REQUEST.LAUNCH_REQUEST_TYPE,
            isNewSession: true,
            deviceId,
            sessionId: "sessionId",
            userId: "userId",
            accessToken
        };
    }
}

/**
 * Builds an InputUnknownRequest
 *
 * @public
 */
export class InputUnknownRequestBuilder extends AbstractBuilder<InputUnknownRequest> {
    private deviceId: string = "deviceId";
    private rawQuery: string;

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    withDeviceId(deviceId: string): InputUnknownRequestBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Set the raw query on the request.
     *
     * @param rawQuery - The raw query for the request
     */
    withRawQuery(rawQuery: string): InputUnknownRequestBuilder {
        this.rawQuery = rawQuery;
        return this;
    }

    build(): InputUnknownRequest {
        const request: InputUnknownRequest = {
            intentId: REQUEST.INPUT_UNKNOWN_ID,
            type: REQUEST.INPUT_UNKNOWN_REQUEST_TYPE,
            sessionId: "sessionId",
            isNewSession: false,
            userId: "userId",
            deviceId: this.deviceId
        };

        if (this.rawQuery) {
            request.rawQuery = this.rawQuery;
        }

        return request;
    }
}

/**
 * Builds an IntentRequest.
 *
 * The defaults value for the required fields are typically the key name, for example
 * the default value for the intentId is "intentId".
 *
 * @public
 */
export class IntentRequestBuilder extends AbstractBuilder<IntentRequest> {
    private apiAccess: ApiAccessData;
    private deviceId: string = "deviceId";
    private intentId: string = "intentId";
    private isNewSession: boolean = false;
    private locale: LanguageTag = "en-US";
    private platform: string;
    private rawQuery: string;
    private slots: RequestSlotMap;
    private userId: string = "userId";

    /**
     * Set the platform for the request.
     *
     * @param platform - Platform for the request
     */
    onPlatform(platform: string): IntentRequestBuilder {
        this.platform = platform;
        return this;
    }

    /**
     * Set the raw query for the request.
     *
     * @param rawQuery - Raw query for the request
     */
    withRawQuery(rawQuery: string): IntentRequestBuilder {
        this.rawQuery = rawQuery;
        return this;
    }

    /**
     * Set the user ID for the request.
     *
     * @param userId - User ID for the request
     */
    withUserId(userId: string): IntentRequestBuilder {
        this.userId = userId;
        return this;
    }

    /**
     * Set the API access data for the request.
     *
     * @param apiAccess - API access data for the request.
     */
    withAPIAccess(apiAccess: ApiAccessData): IntentRequestBuilder {
        this.apiAccess = apiAccess;
        return this;
    }

    /**
     * Sets the intentId for the request.
     *
     * If not set, the default is intentId.
     *
     * @param intentId - Intent ID for the request.
     */
    withIntentId(intentId: string): IntentRequestBuilder {
        this.intentId = intentId;
        return this;
    }

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    withDeviceId(deviceId: string): IntentRequestBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Sets the intent request to be for a resume intent.
     */
    resumeIntent(): IntentRequestBuilder {
        this.intentId = INTENT.RESUME_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a NextIntent
     */
    nextIntent(): IntentRequestBuilder {
        this.intentId = INTENT.NEXT_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a PreviousIntent
     */
    previousIntent(): IntentRequestBuilder {
        this.intentId = INTENT.PREVIOUS_INTENT;
        return this;
    }
    /**
     * Sets the intent request to be for a LatestIntent
     */
    latestIntent(): IntentRequestBuilder {
        this.intentId = INTENT.LATEST_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a RepeatIntent
     */
    repeatIntent(): IntentRequestBuilder {
        this.intentId = INTENT.REPEAT_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a CancelIntent
     */
    cancel(): IntentRequestBuilder {
        this.intentId = INTENT.CANCEL_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a HelpIntent
     */
    help(): IntentRequestBuilder {
        this.intentId = INTENT.HELP_INTENT;
        return this;
    }

    /**
     * Add slots to the request.
     *
     * @param slots - Slots for the request.
     */
    withSlots(slots: RequestSlotMap): IntentRequestBuilder {
        this.slots = slots;
        return this;
    }

    /**
     * Specify the locale for the request.
     *
     * @param locale - Locale for the intent request.
     */
    withLocale(locale: LanguageTag) {
        this.locale = locale;
        return this;
    }

    /**
     * Build the intent request.
     */
    build(): IntentRequest {
        const { apiAccess, deviceId, intentId, locale, platform, slots, userId, isNewSession, rawQuery } = this;

        const request: IntentRequest = {
            type: REQUEST.INTENT_REQUEST_TYPE,
            userId,
            sessionId: "sessionId",
            isNewSession,
            intentId,
            locale,
            deviceId
        };

        if (typeof apiAccess === "object") {
            request.apiAccess = apiAccess;
        }

        if (rawQuery) {
            request.rawQuery = rawQuery;
        }

        if (platform) {
            request.platform = platform;
        }

        if (typeof slots === "object") {
            request.slots = slots;
        }

        return request;
    }
}

/**
 * Build an AudioPlayerRequest
 *
 * @export
 * @class AudioPlayerRequestBuilder
 * @extends {Builder<AudioPlayerRequest>}
 */
export class AudioPlayerRequestBuilder extends AbstractBuilder<AudioPlayerRequest> {
    private event: AudioPlayerEvent = REQUEST.AUDIO_PLAYER_PLAYBACK_STARTED_EVENT;
    private token: string = "token";
    private offsetInMilliseconds: number = 0;

    withEvent(event: AudioPlayerEvent): AudioPlayerRequestBuilder {
        this.event = event;
        return this;
    }

    playbackStarted(): AudioPlayerRequestBuilder {
        this.event = REQUEST.AUDIO_PLAYER_PLAYBACK_STARTED_EVENT;
        return this;
    }

    playbackStopped(): AudioPlayerRequestBuilder {
        this.event = REQUEST.AUDIO_PLAYER_PLAYBACK_STOPPED_EVENT;
        return this;
    }

    withOffset(offsetInMilliseconds: number): AudioPlayerRequestBuilder {
        this.offsetInMilliseconds = offsetInMilliseconds;
        return this;
    }

    withToken(token: string): AudioPlayerRequestBuilder {
        this.token = token;
        return this;
    }

    build(): AudioPlayerRequest {
        const { event, token, offsetInMilliseconds } = this;

        return {
            type: REQUEST.AUDIO_PLAYER_REQUEST_TYPE,
            userId: "userId",
            event,
            token,
            offsetInMilliseconds,
            isNewSession: false // they are always false
        };
    }
}

/**
 * Builds a PlaybackControlRequest
 *
 * @export
 * @class PlaybackControlRequestBuilder
 * @extends {Builder<PlaybackControlRequest>}
 */
export class PlaybackControlRequestBuilder extends AbstractBuilder<PlaybackControlRequest> {
    private event: PlaybackControlEvent = REQUEST.PLAYBACK_CONTROL_NEXT_EVENT;

    withNextEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_NEXT_EVENT;
        return this;
    }

    withPreviousEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_PREVIOUS_EVENT;
        return this;
    }

    withPauseEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_PAUSE_EVENT;
        return this;
    }

    withPlayEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_PLAY_EVENT;
        return this;
    }

    build(): PlaybackControlRequest {
        const { event } = this;

        return {
            userId: "userId",
            type: REQUEST.PLAYBACK_CONTROL_REQUEST_TYPE,
            event,
            isNewSession: false
        };
    }
}

/**
 * Builds a PermissionGrant
 *
 * @export
 * @class PermissionGrantBuilder
 * @extends {Builder<PermissionRequest>}
 */
export class PermissionGrantBuilder extends AbstractBuilder<PermissionRequest> {
    build(): PermissionRequest {
        return {
            type: REQUEST.PERMISSION_REQUEST_TYPE,
            intentId: REQUEST.PERMISSION_GRANT_ID,
            sessionId: "sessionId",
            granted: true,
            userId: "userId",
            isNewSession: false,
            userProfile: {}
        };
    }
}

/**
 * Builds a SessionEndedRequest
 *
 * @export
 * @class SessionEndedRequestBuilder
 * @extends {Builder<SessionEndedRequest>}
 */
export class SessionEndedRequestBuilder extends AbstractBuilder<SessionEndedRequest> {
    build(): SessionEndedRequest {
        return {
            type: REQUEST.SESSION_ENDED_REQUEST_TYPE,
            sessionId: "sessionId",
            userId: "userId",
            isNewSession: false,
            reason: "ERROR",
            errorType: "INVALID_RESPONSE",
            errorMessage: "Your SSML is bad."
        };
    }
}

/**
 * Builds a OptionSelect
 *
 * @export
 * @class PermissionGrantBuilder
 * @extends {Builder<PermissionRequest>}
 */
export class OptionSelectBuilder extends AbstractBuilder<OptionSelectRequest> {
    private deviceId?: string;
    private token: string = "optionToken";

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    withDeviceId(deviceId: string): OptionSelectBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Set the selected token to the request.  By default the value is "optionToken".
     *
     * @param token - Set the selected token for the request
     */
    withSelectedToken(token: string): OptionSelectBuilder {
        this.token = token;
        return this;
    }

    build(): OptionSelectRequest {
        return {
            type: REQUEST.OPTION_SELECT_REQUEST_TYPE,
            intentId: REQUEST.OPTION_SELECT_ID,
            sessionId: "sessionId",
            token: this.token,
            userId: "userId",
            isNewSession: false,
            deviceId: this.deviceId
        };
    }
}

/**
 * Builder for SignInRequests
 */
export class SignInRequestBuilder extends AbstractBuilder<SignInRequest> {
    private granted = true;

    notGranted() {
        this.granted = false;
        return this;
    }

    build(): SignInRequest {
        const { granted } = this;
        return {
            type: REQUEST.SIGN_IN_REQUEST_TYPE,
            intentId: REQUEST.SIGN_IN_ID,
            sessionId: "sessionId",
            userId: "userId",
            isNewSession: false,
            granted
        };
    }
}
