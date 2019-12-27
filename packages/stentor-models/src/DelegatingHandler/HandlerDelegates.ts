/*! Copyright (c) 2019, XAPPmedia */
import { DelegatedHandlerMethod } from "./DelegatedHandlerMethod";
import { DelegatedRequestMethod } from "./DelegatedRequestMethod";

export interface HandlerDelegates {
    start?: DelegatedHandlerMethod;
    handleRequest: DelegatedHandlerMethod;
    canHandleRequest?: DelegatedRequestMethod;
}
