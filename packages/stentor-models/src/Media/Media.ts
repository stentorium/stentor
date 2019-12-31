/*! Copyright (c) 2019, XAPPmedia */
import { MediaType } from "./Types";

/**
 * Any type of media that exists at a URL.
 *
 * Can be image, audio, or video.
 */
export interface Media {
    /**
     * The type of media.
     */
    type: MediaType;
    /**
     * The location of the resource.
     */
    url: string;
}
