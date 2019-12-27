/*! Copyright (c) 2019, XAPPmedia */

import { FullAppStatus } from "../App/App";

/**
 * Channel data, all channel data extends from this object.
 *
 * @export
 * @interface BaseData
 */
export interface ChannelData {
    /**
     * Unique ID of the channel.
     *
     * @type {string}
     * @memberof ChannelData
     */
    id?: string;
    /**
     * The channel type
     *
     * @type {string}
     * @memberof ChannelData
     */
    type: string;
    /**
     * ID of the NLU to use within app.nlu[].
     *
     * If it exists, the channel will use the provided NLU at runtime to convert
     * the raw text to an Intent.
     *
     * If the value is "*", then it will pick the first available NLU within app.nlu[]
     *
     * @type {boolean}
     * @memberof ChannelData
     */
    useNLU?: string;
    /**
     * URI where the channel can be accessed.
     *
     * @type {string}
     * @memberof ChannelData
     */
    endPoint?: string;
    /**
     * URL for the directory listing
     *
     * @type {string}
     * @memberof BaseData
     */
    directoryListing?: string;
    /**
     * The status of the app with respect to this current channel.
     *
     * An example may be that an app is currently live on Alexa but being
     * built on Google Home.
     *
     * @type {FullAppStatus}
     * @memberof ActionsOnGoogleChannelData
     */
    status?: FullAppStatus;
}
