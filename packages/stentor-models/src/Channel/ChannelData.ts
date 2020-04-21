/*! Copyright (c) 2019, XAPPmedia */

import { FullAppStatus } from "../App/App";

/**
 * Channel data, all channel data extends from this object.
 */
export interface ChannelData {
    /**
     * Unique ID of the channel.
     */
    id: string;
    /**
     * The channel type
     */
    type: string;
    /**
     * ID of the NLU to use within app.nlu[].
     *
     * If it exists, the channel will use the provided NLU at runtime to convert
     * the raw text to an Intent.
     *
     * If the value is "*", then it will pick the first available NLU within app.nlu[]
     */
    useNLU?: string;
    /**
     * URI where the channel can be accessed.
     */
    endPoint?: string;
    /**
     * URL for the directory listing
     */
    directoryListing?: string;
    /**
     * The status of the app with respect to this current channel.
     *
     * An example may be that an app is currently live on Alexa but being
     * built on Google Home.
     */
    status?: FullAppStatus;
}
