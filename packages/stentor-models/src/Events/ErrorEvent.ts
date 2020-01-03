/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "./Event";
import { ErrorEventType } from "./Types";

/**
 * The individual stack trace line.
 *
 * We leverage stacktrace-parser to accomplish this, these types
 * are from https://github.com/errwischt/stacktrace-parser/blob/c91463fd96b4acf962857551235755212dc33e2e/src/index.d.ts#L3
 */
export interface ErrorPayloadStack {
    file: string;
    methodName: string;
    arguments: string[];
    lineNumber: number;
    column: number;
}

export interface ErrorPayload {
    message: string;
    stack: ErrorPayloadStack[];
}

export interface ErrorEvent extends Event<ErrorPayload> {
    type: ErrorEventType;
}
