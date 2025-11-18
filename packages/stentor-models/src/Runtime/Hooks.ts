/*! Copyright (c) 2019, XAPPmedia */
import { Context } from "../Context";
import { Request } from "../Request";
import { AbstractResponseBuilder } from "../Response";
import { Storage } from "../Storage";
import { RuntimeCallback } from "./RuntimeCallback";
import { RuntimeContext } from "./RuntimeContext";

/**
 * Hooks are used to provide the opportunity to modify or log runtime data at different points in the lifecycle.
 */
export interface Hooks {
    /**
     * Once the channel is selected and before the request is translated, the preExecution hook is called.
     *
     * This can be used for pre-execution modifications or checks.  If an error is thrown, it will be caught and
     * returned.  If you return undefined, all execution will halt without throwing an error (feel free to call the callback yourself).
     *
     * @param event -
     * @param context - 
     * @param callback -
     * @returns Promise that either returns undefined to halt execution or the parameters back.
     */
    preExecution?(
        event: object,
        context: RuntimeContext,
        callback: RuntimeCallback
    ): Promise<{ event: object; context: RuntimeContext; callback: RuntimeCallback } | undefined>;
    /**
     * This hook is called directly after the request is translated for the channel.
     *
     * This can be an opportunity to modify the request but the request must be returned to
     * continue operation.
     *
     * @param request - The request after it has been translated
     * @returns Promise that passes back the request
     */
    postRequestTranslation?(request: Request): Promise<Request>;
    /**
     * This hook, if provided is called after the request is translated then immediately after the context is created.  This happens immediately before the handler is deteremined.
     * 
     * @param request 
     * @param context 
     */
    postContextCreation?(request: Request, context: Context): Promise<{ request: Request, context: Context }>;
    /**
     * This hook is called before the response is translated for the channel.
     *
     * Last chance to tweak the platform independent response or collect some data from the request/response (transcript).
     *
     * @param request - 
     * @param response - 
     * @returns 
     */
    preResponseTranslation?(request: Request, response: AbstractResponseBuilder, storage: Storage):
        Promise<{ request: Request; response: AbstractResponseBuilder; storage: Storage }>;
}
