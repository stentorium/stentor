/*! Copyright (c) 2019, XAPPmedia */
import { PlayableMedia } from "./PlayableMedia";
import { VideoType } from "./Types";

/**
 * Video media
 */
export interface Video extends PlayableMedia {
    type: VideoType;
}
