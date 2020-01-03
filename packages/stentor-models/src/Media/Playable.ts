/*! Copyright (c) 2019, XAPPmedia */
/**
 * An object that can be played.
 */
export interface Playable {
    /**
     * The URL for the playable object.
     */
    url: string;
    /**
     * An ID for the playable object.
     */
    id?: string;
    /**
     * A token for the playable object that represents a unique playback of the track.
     */
    token?: string;
    /**
     * The length of the playable object in milliseconds.
     *
     * A length of -1 denotes the playable has no end.
     */
    length?: number;
    /**
     * Things to show on screens if the device is capable of showing.
     *
     * This is used primarily on Google for media cards.
     */
    visuals?: Visuals;
}

/**
 * An object that can be displayed.
 */
export interface Visuals {
    smallImageUrl?: string;
    largeImageUrl?: string;
}
