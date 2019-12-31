/*! Copyright (c) 2019, XAPPmedia */
import { Handler } from "../Handler";
import { History } from "../History";
import { Intent } from "../Intent";
import { Response } from "../Response";
import { KeyValueStore } from "./KeyValueStore";
import { SessionStoreData } from "./SessionStore";

export interface Storage extends KeyValueStore {
    /**
     * When the storage was created.  This can be used to keep track of when we first
     * met the user.
     *
     * Time is stored as number of milliseconds elapsed since the UNIX epoch.
     */
    createdTimestamp: number;
    /**
     * When the last time we updated the storage was.  This can be used to keep track of when we last
     * saw the user.
     *
     * Time is stored as number of milliseconds elapsed since the UNIX epoch.
     */
    lastActiveTimestamp?: number;
    /**
     * Limited history for the user, used to store media they are in the middle of listening to.
     *
     * Can be used to store other historical data in the future, such as previous responses they have heard.
     *
     * NOTE: We might want to make history required on storage.
     */
    history?: History;
    /**
     * The current handler of intents & events.
     */
    currentHandler?: Handler;
    /**
     * The previous handler before the current
     */
    previousHandler?: Handler;
    /**
     * The previous intent before the current
     */
    previousIntent?: Intent;
    /**
     * The previous response given to the user.
     */
    previousResponse?: Response;
    /**
     * Number of consecutive InputUnknown requests received from the user
     */
    unknownInputs?: number;
    /**
     * The current handler that is playing audio.
     */
    currentAudioHandler?: Handler;
    /**
     * Session raw data that is used to create the session store
     */
    sessionStore?: SessionStoreData;
    // TODO:
    // Create a similar store to sessionStore that holds
    // permanent data that can be manipulated by stentor builders.
    // permanentStore?: PermanentStoreData;
    /**
     * The PII information key (pii token)
     */
    piiToken?: string;
}
