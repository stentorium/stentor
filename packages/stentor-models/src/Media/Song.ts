/*! Copyright (c) 2019, XAPPmedia */
import { Audio } from "./Audio";
import { SongType } from "./Types";

/**
 * An individual song.
 */
export interface Song extends Audio {
    type: SongType;
    title: string;
    artist?: string;
    album?: string;
}
