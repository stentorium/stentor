/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { SurfaceChangeRequestType } from "./Types";
export interface SurfaceChangeRequest extends BaseRequest {
    type: SurfaceChangeRequestType;
    sessionId: string;
    granted: boolean;
}
