/*! Copyright (c) 2019, XAPPmedia */
import { AbstractBuilder } from "@xapp/patterns";
import { LAUNCH_REQUEST_ID, INPUT_UNKNOWN_ID, PERMISSION_GRANT_ID, SIGN_IN_ID, OPTION_SELECT_ID } from "stentor-constants";
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

import * as INTENT from "stentor-interaction-model/lib/Intent/Constants";
import * as REQUEST from "./Constants";

/**
 * Builds a LaunchRequest
 *
 * @public
 */
export class LaunchRequestBuilder extends AbstractBuilder<LaunchRequest> {
    private accessToken?: string;
    private deviceId = "deviceId";

    /**
     * Add a access token to the request.
     *
     * @param token - Access token for the request
     */
    public withAccessToken(token = "accessToken"): LaunchRequestBuilder {
        this.accessToken = token;
        return this;
    }

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    public withDeviceId(deviceId: string): LaunchRequestBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Build the request.
     */
    public build(): LaunchRequest {
        const { accessToken, deviceId } = this;

        return {
            intentId: LAUNCH_REQUEST_ID,
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
    private deviceId = "deviceId";
    private rawQuery: string;

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    public withDeviceId(deviceId: string): InputUnknownRequestBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Set the raw query on the request.
     *
     * @param rawQuery - The raw query for the request
     */
    public withRawQuery(rawQuery: string): InputUnknownRequestBuilder {
        this.rawQuery = rawQuery;
        return this;
    }

    public build(): InputUnknownRequest {
        const request: InputUnknownRequest = {
            intentId: INPUT_UNKNOWN_ID,
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
    private deviceId = "deviceId";
    private intentId = "intentId";
    private isNewSession = false;
    private locale: LanguageTag = "en-US";
    private platform: string;
    private rawQuery: string;
    private slots: RequestSlotMap;
    private userId = "userId";

    /**
     * Set the platform for the request.
     *
     * @param platform - Platform for the request
     */
    public onPlatform(platform: string): IntentRequestBuilder {
        this.platform = platform;
        return this;
    }

    /**
     * Set the raw query for the request.
     *
     * @param rawQuery - Raw query for the request
     */
    public withRawQuery(rawQuery: string): IntentRequestBuilder {
        this.rawQuery = rawQuery;
        return this;
    }

    /**
     * Set the user ID for the request.
     *
     * @param userId - User ID for the request
     */
    public withUserId(userId: string): IntentRequestBuilder {
        this.userId = userId;
        return this;
    }

    /**
     * Set the API access data for the request.
     *
     * @param apiAccess - API access data for the request.
     */
    public withAPIAccess(apiAccess: ApiAccessData): IntentRequestBuilder {
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
    public withIntentId(intentId: string): IntentRequestBuilder {
        this.intentId = intentId;
        return this;
    }

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    public withDeviceId(deviceId: string): IntentRequestBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Sets the intent request to be for a resume intent.
     */
    public resumeIntent(): IntentRequestBuilder {
        this.intentId = INTENT.RESUME_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a NextIntent
     */
    public nextIntent(): IntentRequestBuilder {
        this.intentId = INTENT.NEXT_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a PreviousIntent
     */
    public previousIntent(): IntentRequestBuilder {
        this.intentId = INTENT.PREVIOUS_INTENT;
        return this;
    }
    /**
     * Sets the intent request to be for a LatestIntent
     */
    public latestIntent(): IntentRequestBuilder {
        this.intentId = INTENT.LATEST_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a RepeatIntent
     */
    public repeatIntent(): IntentRequestBuilder {
        this.intentId = INTENT.REPEAT_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a CancelIntent
     */
    public cancel(): IntentRequestBuilder {
        this.intentId = INTENT.CANCEL_INTENT;
        return this;
    }

    /**
     * Sets the intent request to be for a HelpIntent
     */
    public help(): IntentRequestBuilder {
        this.intentId = INTENT.HELP_INTENT;
        return this;
    }

    /**
     * Add slots to the request.
     *
     * @param slots - Slots for the request.
     */
    public withSlots(slots: RequestSlotMap): IntentRequestBuilder {
        this.slots = slots;
        return this;
    }

    /**
     * Specify the locale for the request.
     *
     * @param locale - Locale for the intent request.
     */
    public withLocale(locale: LanguageTag): IntentRequestBuilder {
        this.locale = locale;
        return this;
    }

    /**
     * Build the intent request.
     */
    public build(): IntentRequest {
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
    private token = "token";
    private offsetInMilliseconds = 0;

    public withEvent(event: AudioPlayerEvent): AudioPlayerRequestBuilder {
        this.event = event;
        return this;
    }

    public playbackStarted(): AudioPlayerRequestBuilder {
        this.event = REQUEST.AUDIO_PLAYER_PLAYBACK_STARTED_EVENT;
        return this;
    }

    public playbackStopped(): AudioPlayerRequestBuilder {
        this.event = REQUEST.AUDIO_PLAYER_PLAYBACK_STOPPED_EVENT;
        return this;
    }

    public withOffset(offsetInMilliseconds: number): AudioPlayerRequestBuilder {
        this.offsetInMilliseconds = offsetInMilliseconds;
        return this;
    }

    public withToken(token: string): AudioPlayerRequestBuilder {
        this.token = token;
        return this;
    }

    public build(): AudioPlayerRequest {
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

    public withNextEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_NEXT_EVENT;
        return this;
    }

    public withPreviousEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_PREVIOUS_EVENT;
        return this;
    }

    public withPauseEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_PAUSE_EVENT;
        return this;
    }

    public withPlayEvent(): PlaybackControlRequestBuilder {
        this.event = REQUEST.PLAYBACK_CONTROL_PLAY_EVENT;
        return this;
    }

    public build(): PlaybackControlRequest {
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
    public build(): PermissionRequest {
        return {
            type: REQUEST.PERMISSION_REQUEST_TYPE,
            intentId: PERMISSION_GRANT_ID,
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
    public build(): SessionEndedRequest {
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
    private token = "optionToken";

    /**
     * Add a device ID to the request.
     *
     * @param deviceId - Device ID for the request
     */
    public withDeviceId(deviceId: string): OptionSelectBuilder {
        this.deviceId = deviceId;
        return this;
    }

    /**
     * Set the selected token to the request.  By default the value is "optionToken".
     *
     * @param token - Set the selected token for the request
     */
    public withSelectedToken(token: string): OptionSelectBuilder {
        this.token = token;
        return this;
    }

    public build(): OptionSelectRequest {
        return {
            type: REQUEST.OPTION_SELECT_REQUEST_TYPE,
            intentId: OPTION_SELECT_ID,
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

    public notGranted(): SignInRequestBuilder {
        this.granted = false;
        return this;
    }

    public build(): SignInRequest {
        const { granted } = this;
        return {
            type: REQUEST.SIGN_IN_REQUEST_TYPE,
            intentId: SIGN_IN_ID,
            sessionId: "sessionId",
            userId: "userId",
            isNewSession: false,
            granted
        };
    }
}
