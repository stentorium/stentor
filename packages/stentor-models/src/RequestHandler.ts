/*! Copyright (c) 2019, XAPPmedia */
import { Context } from "./Context";
import { Request } from "./Request";

export interface RequestHandler {
    // maybe
    // hasRedirectForRequest(request: Request, context: Context): boolean;

    /**
     * If it can handle the request.
     *
     * @param {Request} request
     * @returns {boolean}
     * @memberof RequestHandler
     */
    canHandleRequest(request: Request, context: Context): boolean;
    /**
     * Handle the give request with provided context.
     *
     * @param {Request} request
     * @param {Context} context
     * @returns {(Promise<void>)}
     * @memberof RequestHandler
     */
    handleRequest(request: Request, context: Context): Promise<void>;

    // maybe
    // hasForwardForRequest(request: Request, context: Context): boolean;
}
