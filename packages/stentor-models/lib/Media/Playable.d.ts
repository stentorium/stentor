/*! Copyright (c) 2019, XAPPmedia */
/**
 * An object that can be played.
 *
 * @export
 * @interface Playable
 */
export interface Playable {
    /**
     * The URL for the playable object.
     *
     * @type {string}
     * @memberof Playable
     */
    url: string;
    /**
     * An ID for the playable object.
     *
     * @type {string}
     * @memberof Playable
     */
    id?: string;
    /**
     * A token for the playable object that represents a unique playback of the track.
     *
     *
     *
     * @type {string}
     * @memberof Playable
     */
    token?: string;
    /**
     * The length of the playable object in milliseconds.
     *
     * A length of -1 denotes the playable has no end.
     *
     * @type {number}
     * @memberof Playable
     */
    length?: number;
    /**
     * Things to show on screens if the device is capable of showing.
     *
     * This is used primarily on Google for media cards.
     *
     * @type {Visuals}
     * @memberof Playable
     */
    visuals?: Visuals;
}
/**
 * An object that can be displayed.
 *
 * @export
 * @interface Visuals
 */
export interface Visuals {
    smallImageUrl?: string;
    largeImageUrl?: string;
}
