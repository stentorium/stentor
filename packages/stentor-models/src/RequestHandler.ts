/*! Copyright (c) 2019, XAPPmedia */
import { Context } from "./Context";
import { Request } from "./Request";

export interface RequestHandler {
    /**
     * If it can handle the request.
     *
     * @param request - Potential request for the handler
     * @param context - Context for the request
     * @returns If the handler can handle the provided request with given context
     */
    canHandleRequest(request: Request, context: Context): boolean;
    /**
     * Handle the give request with provided context.
     *
     * @param request - Request to be handled
     * @param context - Context the request is handled within
     * @returns Promise that returns void when the execution is complete
     */
    handleRequest(request: Request, context: Context): Promise<void>;
}
