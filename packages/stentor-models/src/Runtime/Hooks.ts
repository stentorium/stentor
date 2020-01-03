/*! Copyright (c) 2019, XAPPmedia */
import { Request } from "../Request";
import { AbstractResponseBuilder } from "../Response";
import { Storage } from "../Storage";
import { RuntimeCallback } from "./RuntimeCallback";
import { RuntimeContext } from "./RuntimeContext";

export interface Hooks {
    /**
     * Once the channel is selected and before the request is translated, the preExecution hook is called.
     *
     * This can be used for pre-execution modifications or checks.  If an error is thrown, it will be caught and
     * returned.  If you return undefined, all execution will halt without throwing an error (feel free to call the callback yourself).
     *
     * @param {object} event
     * @param {RuntimeContext} context
     * @param {RuntimeCallback} callback
     * @returns {Promise<{ event: object; context: RuntimeContext; callback: RuntimeCallback }| undefined>}
     * @memberof Hooks
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
     * @param {Request} request
     * @returns {Promise<Request>}
     * @memberof Hooks
     */
    postRequestTranslation?(request: Request): Promise<Request>;

    /**
     * This hook is called before the response is translated for the channel.
     *
     * Last chance to tweak the platform independent response or collect some data from the request/response (transcript).
     *
     * @param {Request} request
     * @param {AbstractResponseBuilder} response
     * @returns {Promise<{ request: Request; response: AbstractResponseBuilder }}
     * @memberof Hooks
     */

    preResponseTranslation?(request: Request, response: AbstractResponseBuilder, storage: Storage):
        Promise<{ request: Request; response: AbstractResponseBuilder; storage: Storage }>;
}
