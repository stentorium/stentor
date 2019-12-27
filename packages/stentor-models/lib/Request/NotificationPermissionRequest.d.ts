/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { NotificationPermissionRequestType } from "./Types";
export interface NotificationPermissionRequest extends BaseRequest {
    type: NotificationPermissionRequestType;
    sessionId: string;
    granted: boolean;
    notificationUserId?: string;
}
