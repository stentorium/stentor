/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "./Event";
import { LambdaFailureEventType, LambdaSuccessEventType } from "./Types";

export interface LambdaFinishEvent extends Event<string> {
    type: LambdaSuccessEventType | LambdaFailureEventType;
}
