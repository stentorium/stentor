/*! Copyright (c) 2019, XAPPmedia */
import {
    ErrorEventType,
    LambdaFailureEventType,
    LambdaSuccessEventType,
    MessageEventType,
    RequestEventType
} from "stentor-models";

export const ERROR_EVENT_TYPE: ErrorEventType = "ERROR";
export const LAMBDA_FAILURE_EVENT_TYPE: LambdaFailureEventType = "LambdaErrorEvent";
export const LAMBDA_SUCCESS_EVENT_TYPE: LambdaSuccessEventType = "LambdaSuccessEvent";
export const MESSAGE_EVENT_TYPE: MessageEventType = "MessageEvent";
export const REQUEST_EVENT_TYPE: RequestEventType = "REQUEST";
