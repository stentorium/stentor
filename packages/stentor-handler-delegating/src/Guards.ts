/*! Copyright (c) 2019, XAPPmedia */
import { AbstractHandler } from "stentor-handler";
import { Handler } from "stentor-models";
import { DelegatingHandler } from "./Handler";

export function isDelegatingHandler(handler: AbstractHandler | Handler): handler is DelegatingHandler {
    return !!handler && (handler.type === "DelegatingHandlerType" || handler instanceof DelegatingHandler);
}
