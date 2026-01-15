/*! Copyright (c) 2019, XAPPmedia */
import { Media } from "./Media";
import { ImageType } from "./Types";

/**
 * Image media
 */
export interface ImageMedia extends Media {
    type: ImageType;
}
