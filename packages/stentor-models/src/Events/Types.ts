/*! Copyright (c) 2019, XAPPmedia */
export type LambdaFailureEventType = "LambdaErrorEvent";
export type LambdaSuccessEventType = "LambdaSuccessEvent";
export type MessageEventType = "MessageEvent";
export type RequestEventType = "REQUEST";
export type AnalyticsEvent = "AnalyticsEvent";
export type ErrorEventType = "ERROR";

export type EventType =
    | LambdaFailureEventType
    | LambdaSuccessEventType
    | MessageEventType
    | RequestEventType
    | AnalyticsEvent
    | ErrorEventType;
