/*! Copyright (c) 2019, XAPPmedia */
import { MediaPlaylistType, PlayableMedia } from "stentor-models";
import { GENERIC_MEDIA_PLAYLIST } from "./Constants";
import { Playlist, PlaylistProps } from "./Playlist";

export interface MediaPlaylistProps<T extends PlayableMedia = PlayableMedia> extends PlaylistProps<T> {
    type?: MediaPlaylistType;
}

export class MediaPlaylist<T extends PlayableMedia = PlayableMedia> extends Playlist<T> {
    readonly type: MediaPlaylistType = GENERIC_MEDIA_PLAYLIST;

    constructor(playlist?: T[] | MediaPlaylist<T> | MediaPlaylistProps<T> | PlaylistProps<T> | Playlist<T>) {
        super(playlist);

        // Set the prototype explicitly.
        // Recommendation from https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
        Object.setPrototypeOf(this, MediaPlaylist.prototype);
    }
}
