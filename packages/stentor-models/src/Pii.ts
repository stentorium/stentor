/*! Copyright (c) 2019, XAPPmedia */
import { EmailDescription } from "./Email";
import { SmsDescription } from "./SMS";

export type OptStatus = "OPTIN" | "OPTOUT" | "PENDING";

export interface Pii {
    token?: string;

    appId?: string;

    phoneNumber?: string;
    phoneNumberStatus?: OptStatus;

    emailAddress?: string;
    emailAddressStatus?: OptStatus;

    customData?: any[];
    customDataStatus?: OptStatus;

    name?: string;
    preciseLocation?: {
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    coarseLocation?: string;

    pendingSmsJobs?: SmsDescription[];
    pendingEmailJobs?: EmailDescription[];
}

export type CommFieldType = "phoneNumber" | "emailAddress";
