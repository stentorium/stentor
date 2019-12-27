/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { AudioPlayerRequestType } from "./Types";

export type AudioPlayerPlaybackStartedEvent = "AudioPlayerPlaybackStarted";
export type AudioPlayerPlaybackFinishedEvent = "AudioPlayerPlaybackFinished";
export type AudioPlayerPlaybackStoppedEvent = "AudioPlayerPlaybackStopped";
export type AudioPlayerPlaybackNearlyFinishedEvent = "AudioPlayerPlaybackNearlyFinished";
export type AudioPlayerPlaybackFailedEvent = "AudioPlayerPlaybackFailed";
export type AudioPlayerSystemExceptionEvent = "AudioPlayerSystemException";

export type AudioPlayerEvent =
    | AudioPlayerPlaybackStartedEvent
    | AudioPlayerPlaybackFinishedEvent
    | AudioPlayerPlaybackStoppedEvent
    | AudioPlayerPlaybackNearlyFinishedEvent
    | AudioPlayerPlaybackFailedEvent
    | AudioPlayerSystemExceptionEvent;

/**
 * AudioPlayer requests handle audio life-cycle events such as playback started, playback stopped,
 * playback failed, etc.
 *
 *
 * @see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-audioplayer-interface-reference#requests
 *
 * @export
 * @interface AudioPlayerRequest
 * @extends {BaseRequest}
 */
export interface AudioPlayerRequest extends BaseRequest {
    type: AudioPlayerRequestType;
    event: AudioPlayerEvent;
    token: string;
    offsetInMilliseconds: number;
    /**
     * Only available when an AudioPlayerPlaybackFailedEvent
     */
    errorType?: string;
    /**
     * Only available when an AudioPlayerPlaybackFailedEvent
     */
    errorMessage?: string;
}
