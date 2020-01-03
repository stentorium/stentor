/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { PlaybackControlRequestType } from "./Types";

export type PlaybackControlNextEvent = "PlaybackControlNextEvent";
export type PlaybackControlPreviousEvent = "PlaybackControlPreviousEvent";
export type PlaybackControlPauseEvent = "PlaybackControlPauseEvent";
export type PlaybackControlPlayEvent = "PlaybackControlPlayEvent";

export type PlaybackControlEvent =
    | PlaybackControlNextEvent
    | PlaybackControlPauseEvent
    | PlaybackControlPreviousEvent
    | PlaybackControlPlayEvent;

/**
 * Playback control requests come from either remote control buttons or
 * on screen buttons.  These are events like next, previous, resume & pause.
 *
 * @see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-playbackcontroller-interface-reference#requests
 */
export interface PlaybackControlRequest extends BaseRequest {
    type: PlaybackControlRequestType;
    event: PlaybackControlEvent;
}
