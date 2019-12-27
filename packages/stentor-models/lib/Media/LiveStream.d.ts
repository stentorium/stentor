/*! Copyright (c) 2019, XAPPmedia */
import { Audio } from "./Audio";
import { AudioLiveStreamType, VideoLiveStreamType } from "./Types";
import { Video } from "./Video";
/**
 * Audio with an indefinite length that cannot be paused.
 *
 * @export
 * @interface LiveStream
 * @extends {Audio}
 */
export interface AudioLiveStream extends Audio {
    type: AudioLiveStreamType;
    /**
     * Length for livestreams is always negative one since it has no length.
     *
     * @type {-1}
     * @memberof AudioLiveStream
     */
    length: -1;
    /**
     * Name of the stream.
     *
     * Use title instead.
     *
     * @deprecated in favor of title
     * @type {string}
     * @memberof AudioLiveStream
     */
    name?: string;
}
export interface VideoLiveStream extends Video {
    type: VideoLiveStreamType;
    length: -1;
}
