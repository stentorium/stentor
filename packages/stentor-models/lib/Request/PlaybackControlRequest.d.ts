/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { PlaybackControlRequestType } from "./Types";
export declare type PlaybackControlNextEvent = "PlaybackControlNextEvent";
export declare type PlaybackControlPreviousEvent = "PlaybackControlPreviousEvent";
export declare type PlaybackControlPauseEvent = "PlaybackControlPauseEvent";
export declare type PlaybackControlPlayEvent = "PlaybackControlPlayEvent";
export declare type PlaybackControlEvent = PlaybackControlNextEvent | PlaybackControlPauseEvent | PlaybackControlPreviousEvent | PlaybackControlPlayEvent;
/**
 * Playback control requests come from either remote control buttons or
 * on screen buttons.  These are events like next, previous, resume & pause.
 *
 * @see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-playbackcontroller-interface-reference#requests
 *
 * @export
 * @interface PlaybackControlRequest
 * @extends {BaseRequest}
 */
export interface PlaybackControlRequest extends BaseRequest {
    type: PlaybackControlRequestType;
    event: PlaybackControlEvent;
}
