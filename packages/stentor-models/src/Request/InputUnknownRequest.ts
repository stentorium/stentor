/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { InputUnknownID, InputUnknownRequestType } from "./Types";
/**
 * Request when a user requests something not in the interaction model.
 */
export interface InputUnknownRequest extends BaseRequest {
    type: InputUnknownRequestType;
    /**
     * Input Unknowns have a constant intentId.
     */
    intentId: InputUnknownID;
    /**
     * The session ID.
     */
    sessionId: string;
}
