/*! Copyright (c) 2019, XAPPmedia */
import { findSchedulableMatch, findWithoutSchedule } from "stentor-time";
import { MediaSource } from "./MediaSource";
import { Multimedia, PlaybackCapabilities } from "./Multimedia";

/**
 * From an array of multimedia and current device capabilities, determine the best playable media.
 *
 * @param {Multimedia[]} potentialMultimedia
 * @param {PlaybackCapabilities} capabilities
 * @returns {MediaSource}
 */
export function determineMediaSource(
    potentialMultimedia: Multimedia[],
    capabilities: PlaybackCapabilities
): MediaSource {
    if (!potentialMultimedia || potentialMultimedia.length === 0) {
        return undefined;
    }

    const multimedia: Multimedia = findSchedulableMatch(potentialMultimedia) || potentialMultimedia[0];

    // if we didn't match a multimedia, bail
    if (!multimedia) {
        return undefined;
    }

    let mediaSource: MediaSource;

    // Ok, if we can play video and it exists lets do it
    if (capabilities.canPlayVideo && multimedia.video.length > 0) {
        mediaSource =
            findSchedulableMatch(multimedia.video) || findWithoutSchedule(multimedia.video) || multimedia.video[0];
    }

    if (!mediaSource) {
        // Otherwise fallback to audio which is supported by all.
        mediaSource =
            findSchedulableMatch(multimedia.audio) || findWithoutSchedule(multimedia.audio) || multimedia.audio[0];
    }

    return mediaSource;
}
