/*! Copyright (c) 2019, XAPPmedia */
import { Device } from "./Device";
import { Pii } from "./Pii";
import { AbstractResponseBuilder } from "./Response";
import { SessionStore, Storage } from "./Storage";
import { UserDataType } from "./UserData";
import { UserProfile } from "./UserProfile";
import { CrmService, ErrorService, SMSService } from "./Services";

export enum UserDataRequestStatus {
    DEFERRED,
    AVAILABLE,
    NOT_AVAILABLE,
    ERROR
}

export interface UserDataValue {
    userProfile?: UserProfile;
    requestStatus: UserDataRequestStatus;
}

export type UserData = (userDataType: UserDataType) => Promise<UserDataRequestStatus>;


/**
 * These we want to make available for custom handlers
 */
export interface ContextServices {
    /**
     * Service for sending information to a CRM
     */
    crmService?: CrmService;
    /**
     * Service for sending text messages
     */
    smsService?: SMSService;
    /**
     * Access to the event service for reporting runtime errors.
     */
    eventService?: ErrorService;
}

/**
 * Context object that is passed around while formulating the response.
 * 
 * It contains contextual information relevant to the user.
 */
export interface Context<S extends Storage = Storage> {
    /**
     * Information about the current device the user is on within the channel.
     * 
     * @deprecated - Will be removed in next major release.  You can find the same information on the request.  The information will continue to be in both places until removal.
     */
    device: Device;
    /**
     * Long term storage for the user.
     */
    storage: S;
    /**
     * The PII record
     */
    pii?: Pii;
    /**
     * The response builder.
     */
    response: AbstractResponseBuilder;
    /**
     * A method that serves user profile data (email, location, phone number, etc)
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
    /**
     * Services available for the handlers
     */
    services: ContextServices;
}
