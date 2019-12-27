/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { SignInID, SignInRequestType } from "./Types";

export interface SignInRequest extends BaseRequest {
    type: SignInRequestType;
    /**
     * SignIn request has a constant ID.
     */
    intentId: SignInID;
    sessionId: string;
    /**
     * If the sign in request was successful.
     */
    granted: boolean;
}
