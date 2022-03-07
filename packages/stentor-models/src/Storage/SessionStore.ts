/*! Copyright (c) 2019, XAPPmedia */

import { ResponseOutput } from "../Response";

import { UserProfile } from "../UserProfile";


export interface Message {
    /**
     * The time the message was created
     */
    createdTime: string;
    /**
     * Who the message is from
     */
    from?: UserProfile;
    /**
     * Who the message is two, it can be to multiple recipients.
     */
    to?: UserProfile[];
    /**
     * A simple version of the message.  It will not include displays or SSML if the original message includes it.
     */
    message: string;
    /**
     * Optional, more detailed information about the message
     */
    response?: ResponseOutput;
}

/**
 * Lets make it simple and versatile
 */
export interface SessionStoreData {
    /**
     * ID for the session storage
     */
    id: string;
    /**
     * Optional transcript of the session that can be used for reporting purposes. 
     */
    transcript?: Message[];
    data: { [key: string]: any };
}

export interface SessionStore {
    /**
     * Get a session value
     *
     * @param key - Key for value to be retrieved
     * @returns Value for the supplied key
     */
    get(key: string): any;
    /**
     * Set a value with a key
     * 
     * @param key - Key for value to be set
     * @param value - Value to be set on the store
     */
    set(key: string, value: any): void;
    /**
     * This will return the whole store
     *
     * @returns The session storage 
     */
    getStore(): any;
    /**
     * Returns the transcript of the session.
     * 
     * Specifically, this is a wrapper around the function get("transcript")
     */
    transcript?(): Message[];
}
