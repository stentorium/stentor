/*! Copyright (c) 2022, XAPP AI */

// import { Device } from "../Device";

/**
 * Interface to use on objects to help filter by channels.
 */
export interface Channeled {
    /**
     * Description of the channel that will be
     */
    channel: {
        /**
         * String to match with the name of the channel that will match.  It can either be the exact name of the
         * channel or a regex string to match multiple.   
         */
        name?: string;
        /**
         * A description of the channel description to match against.  For example, if you want to match to all channels that
         * have `canSpeak: true`, you can leverage this field.  This may be useful to splitting content for channels that have 
         * audio output or web browsers available.
         */
        // device?: Partial<Device>;
    }
}

export type Channelable<T> = T & Channeled;

