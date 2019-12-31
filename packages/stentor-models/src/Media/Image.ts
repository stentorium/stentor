/*! Copyright (c) 2019, XAPPmedia */
import { Media } from "./Media";
import { ImageType } from "./Types";

/**
 * Image media
 */
export interface Image extends Media {
    type: ImageType;
}
