/*! Copyright (c) 2019, XAPPmedia */
import { Device } from "./Device";
import { Pii } from "./Pii";
import { AbstractResponseBuilder } from "./Response";
import { SessionStore, Storage } from "./Storage";
import { UserDataType } from "./UserData";
import { UserProfile } from "./UserProfile";
export declare enum UserDataRequestStatus {
    DEFERRED = 0,
    AVAILABLE = 1,
    NOT_AVAILABLE = 2,
    ERROR = 3
}
export interface UserDataValue {
    userProfile?: UserProfile;
    requestStatus: UserDataRequestStatus;
}
export declare type UserData = (userDataType: UserDataType) => Promise<UserDataRequestStatus>;
export interface AudioPlayer {
    token?: string;
    offsetInMilliseconds?: number;
    status: "IDLE" | "PAUSED" | "PLAYING" | "STOPPED" | "FINISHED" | "BUFFER_UNDERRUN";
}
/**
 * Context object that is passed around while formulating the response
 *
 * NOTE: This is really HandlerContext
 *
 * @export
 * @interface Context
 * @template S
 * @template Storage
 */
export interface Context<S extends Storage = Storage> {
    /**
     * Device Capabilities
     *
     * @type {Device}
     * @memberof Context
     */
    device: Device;
    /**
     * Long term storage for the user.
     *
     * @type {S}
     * @memberof Context
     */
    storage: S;
    /**
     * The PII record
     *
     * @type {Pii}
     * @memberof Context
     */
    pii?: Pii;
    /**
     * The response builder.
     *
     * @type {ResponseBuilder}
     * @memberof Context
     */
    response: AbstractResponseBuilder;
    /**
     * Status of the Audio Player
     *
     * Only exists if the app is playing audio
     *
     * @type {AudioPlayer}
     * @memberof Context
     */
    audioPlayer?: AudioPlayer;
    /**
     * A method that servers user profile data (email, location, phone number, etc)
     */
    requestUserData?: UserData;
    /**
     * Session data. Gets deleted when session (id) changes)
     */
    session?: SessionStore;
    /**
     * Milliseconds left from the execution (NOTE: infinity if not executing in a lambda)
     */
    timeLeftInMillis?(): number;
}
