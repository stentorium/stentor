/*! Copyright (c) 2019, XAPPmedia */
import { MediaSource } from "./MediaSource";

/**
 * Organized set of audio, video, and images.
 *
 * @export
 * @interface Multimedia
 */
export interface Multimedia {
    /**
     * Audio, used for audio only devices and a fallback if no video
     *
     * @type {MediaSource[]}
     * @memberof Multimedia
     */
    audio: MediaSource[];
    /**
     * Video, used for devices that have screens and video playback capability.
     *
     * @type {MediaSource[]}
     * @memberof Multimedia
     */
    video: MediaSource[];
}

/**
 * Playback capabilities of the device that will determine which media
 * can be played.
 *
 * @export
 * @interface PlaybackCapabilities
 */
export interface PlaybackCapabilities {
    canPlayAudio: boolean;
    canPlayVideo: boolean;
}
