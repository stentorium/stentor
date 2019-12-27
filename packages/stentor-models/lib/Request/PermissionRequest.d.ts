/*! Copyright (c) 2019, XAPPmedia */
import { UserProfile } from "../UserProfile";
import { BaseRequest } from "./Request";
import { PermissionGrantID, PermissionRequestType } from "./Types";
export interface PermissionRequest extends BaseRequest {
    type: PermissionRequestType;
    intentId: PermissionGrantID;
    sessionId: string;
    granted: boolean;
    userProfile: UserProfile;
}
