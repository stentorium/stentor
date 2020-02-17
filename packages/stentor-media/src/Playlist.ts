/*! Copyright (c) 2019, XAPPmedia */
import { Playable, Scheduled } from "stentor-models";
import { findSchedulableMatch, isScheduled } from "@xapp/stentor-time";

import { isPlaylistProps } from "./Guards";

/**
 * Properties for a playlist when it contains a name property.
 *
 * @export
 * @interface PlaylistProps
 * @template P
 */
export interface PlaylistProps<P extends Playable = Playable> {
    name?: string;
    [index: number]: P;
}

/**
 * A list of playables
 *
 * The playlist also supports SchedulablePlayables.
 *
 * @export
 * @class Playlist
 * @extends {Array<P>}
 * @template P
 */
export class Playlist<P extends Playable = Playable> extends Array<P> {
    /**
     * Name of the playlist
     *
     * @type {string}
     * @memberof Playlist
     */
    public name?: string;

    public constructor(playlist?: P[] | PlaylistProps<P> | Playlist<P>) {
        super();
        // Set the prototype explicitly.
        // Recommendation from https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
        Object.setPrototypeOf(this, Playlist.prototype);

        if (Array.isArray(playlist)) {
            for (const item of playlist) {
                this.push(Object.assign({}, item));
            }
            // Furthermore, check to see if it is a Playlist
            if (playlist instanceof Playlist) {
                this.name = playlist.name;
            }
        } else if (isPlaylistProps(playlist)) {
            for (const key in playlist) {
                if (playlist.hasOwnProperty(key)) {
                    if (key === "name") {
                        this.name = playlist.name;
                    } else {
                        const DECIMAL_RADIX = 10;
                        const index = Number.parseInt(key, DECIMAL_RADIX);
                        if (index > -1) {
                            this[index] = Object.assign({}, playlist[key]);
                        }
                    }
                }
            }
        }
    }

    public toJSON(): PlaylistProps<P> | P[] {
        /**
         * Need to override toJSON() in order to include
         * the name property if it exists,
         * Otherwise it will look just like an array
         */
        const json: any = {};

        if (this.name) {
            json.name = this.name;
        }

        this.forEach((playable, index) => {
            json[index] = playable;
        });

        return json;
    }

    public concat(playlist: Playlist<P>): Playlist<P> {
        return new Playlist(super.concat(playlist));
    }

    /**
     * Get an item from the playlist either by index or string,
     * where string is either the token or ID of the item in the
     * playlist.
     * 
     * @param - token - Either a string or number to retrieve a playlist item by.  If string is 
     * pass it will look for the token on the item, if a number is passed it will return the index.
     */
    public get(token: string | number): P | undefined {
        let foundPlayable: P;

        if (typeof token === "number") {
            foundPlayable = this[token];
        } else {
            this.forEach((playable) => {
                if (token === playable.token) {
                    foundPlayable = playable;
                }
            });
            // Ok, couldn't find, look for ID
            if (!foundPlayable) {
                this.forEach((playable) => {
                    if (token === playable.id) {
                        foundPlayable = playable;
                    }
                });
            }
        }

        return foundPlayable;
    }

    /**
     * Returns the index of the provided playable or token, -1
     * if it doesn't exist in the playlist
     */
    public indexOf(playable: string | P): number {
        let index = -1;

        if (!playable) {
            return index;
        }

        for (let pointer = 0; pointer < this.length; pointer++) {
            let token: string;

            if (typeof playable === "string") {
                token = playable;
            } else {
                token = playable.token;
            }

            if (this[pointer].token === token) {
                index = pointer;
                break;
            }
        }

        return index;
    }

    /**
     * Get the next track in the playlist
     */
    public next(current?: P | string | undefined): P | undefined {
        let nextTrack: Playable;

        if (!current) {
            // if no previous song is provided, we need to figure out
            // what to play based on what is there.
            // Similar logic to how we determine the Response:
            // First, iterate to find a default
            let defaultPlayable: Playable;
            // And build up the list of schedulable playables
            const schedulables: Scheduled<Playable>[] = [];

            this.forEach((playable) => {
                if (isScheduled(playable)) {
                    schedulables.push(playable);
                } else {
                    defaultPlayable = playable;
                }
            });

            // If we have any schedulables,
            if (schedulables.length > 0) {
                // we try to find a match for the current time
                const schedulable = findSchedulableMatch(schedulables);
                // If one wasn't returned, set it to the default we
                // found earlier
                if (schedulable) {
                    nextTrack = schedulable;
                } else {
                    nextTrack = defaultPlayable;
                }
            }

            // If we don't have anything set up to this point:
            // For example a list full of schedulables but none matched
            // or a list full of non-schedulables
            // we just set it to the first
            if (!nextTrack) {
                nextTrack = this[0];
            }
        } else {
            // If previous is provided, figure out the index of it
            const currentTrackIndex = this.indexOf(current);

            // If we were able to find the index, increase it by one and see what happens.
            if (currentTrackIndex !== -1) {
                // If the previousSong index was -1, this then returns the first index
                const nextTrackIndex = currentTrackIndex + 1;
                // And make sure it isn't out of bounds
                if (nextTrackIndex < this.length) {
                    nextTrack = this[nextTrackIndex];
                }
            }
        }

        return nextTrack as P; // This has to be a type hack
    }

    /**
     * Get the previous track in the playlist
     */
    public previous(current?: P | string | undefined): P | undefined {
        let previousTrack: P;

        if (!current) {
            previousTrack = this[0];
        } else {
            const currentTrackIndex = this.indexOf(current);

            if (currentTrackIndex !== -1) {
                const previousTrackIndex = currentTrackIndex - 1;

                if (previousTrackIndex >= 0) {
                    previousTrack = this[previousTrackIndex];
                }
            }
        }

        return previousTrack;
    }

    /**
     * Get the latest track in the playlist
     */
    public latest(): P | undefined {
        const latestTrack: P = this[0];
        return latestTrack;
    }
}
