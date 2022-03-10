/*! Copyright (c) 2022, XAPPmedia */

import { ResponseOutput } from "./Response";
import { UserProfile } from "./UserProfile";


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