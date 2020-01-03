/*! Copyright (c) 2019, XAPPmedia */
import { Audio } from "./Audio";
import { AudioLiveStreamType, VideoLiveStreamType } from "./Types";
import { Video } from "./Video";

/**
 * Audio with an indefinite length that cannot be paused.
 */
export interface AudioLiveStream extends Audio {
    type: AudioLiveStreamType;
    /**
     * Length for livestreams is always negative one since it has no length.
     */
    length: -1;
    /**
     * Name of the stream.
     *
     * Use title instead.
     *
     * @deprecated in favor of title
     */
    name?: string;
}

export interface VideoLiveStream extends Video {
    type: VideoLiveStreamType;
    length: -1;
}
