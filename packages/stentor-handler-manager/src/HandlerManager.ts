/*! Copyright (c) 2019, XAPPmedia */
import { isActionable, isHandler } from "stentor-guards";
import { AbstractHandler } from "stentor-handler";
import { HandlerFactory, NoHandlerClassError } from "stentor-handler-factory";
import { log } from "stentor-logger";
import { Context, HandlerService, Request } from "stentor-models";
import { isIntentRequest, isLaunchRequest, isInputUnknownRequest } from "stentor-guards";
import { manipulateStorage } from "stentor-storage";
import { keyFromRequest } from "stentor-utils";
import { requestForPath } from "./requestForPath";

export class HandlerManager {
    private readonly service: HandlerService;

    private readonly factory: HandlerFactory;

    public constructor(props: { service: HandlerService; factory: HandlerFactory }) {
        if (typeof props !== "object") {
            throw new TypeError("Invalid props passed to HandlerManager");
        }

        if (!(props.factory instanceof HandlerFactory)) {
            throw new TypeError("HandlerFactory passed to HandlerManager was incorrect instance");
        }

        if (typeof props.service.get !== "function") {
            throw new TypeError("typeof get() on HandlerService passed to HandlerManager was not a function");
        }

        this.service = props.service;
        this.factory = props.factory;
    }

    /**
     * Build the request handler, either from what is on storage or
     * requests the appropriate handler from the request handler service.
     *
     * TODO: This method is huge, it could use some refactoring.  One odd thing we
     * will want to address is the fact it modifies the request & context that is
     * passed in instead of making new ones and passing them out as well.
     *
     * @param request - Current request
     * @param context - Current context
     */
    public async from(request: Request, context: Context): Promise<AbstractHandler> {
        /* tslint:disable:cyclomatic-complexity This needs some major refactoring*/
        // Look for some failure conditions
        if (!request) {
            throw new TypeError("Request was undefined");
        }

        if (!context) {
            throw new TypeError("Context was undefined");
        }

        log().info(`Attempting to resolve correct handler for request ${request.type}`);

        // We need to gather two piece of information in this logic
        // 1. a request handler if one is already available
        let handler: AbstractHandler;
        // 2. the ID of the request handler we need to get from the DB
        let id: string;
        // STEP #0 Try to get one from storage, either currentHandler or currentMediaHandler
        const handlerFromStorage: AbstractHandler = this.factory.from(request, context);
        if (isHandler(handlerFromStorage) && handlerFromStorage.canHandleRequest(request, context)) {
            log().info(
                `Using handler from storage with id: ${handlerFromStorage.intentId} which can handle the request ${request.type
                }-${keyFromRequest(request)}`
            );
            handler = handlerFromStorage;
        }
        // STEP #0.1 Another check, see if it is an InputUnknown request and it can handle it
        if (isHandler(handlerFromStorage) && isInputUnknownRequest(request) && handlerFromStorage.canHandleInputUnknown(request, context)) {
            log().info(
                `Using handler from storage with id: ${handlerFromStorage.intentId} which can handle the request ${request.type
                }-${keyFromRequest(request)}`
            );
            handler = handlerFromStorage;
        }

        // STEP #1 - Forwarding Path Check
        // If we got a request handler from STEP #0,
        // see if we have a forwarding path for the request
        // and use that to then make the new request
        // NOTE: if a path is found, it sets requestHandler = undefined;
        if (handler) {
            if (isHandler(handler)) {
                const path = await handler.forwardingPathForRequest(request, context);
                // if we do have a path
                if (path) {
                    // make a new
                    id = path.intentId;
                    log().info(`Forward path (${path.type}) present, changing request to ${id}`);
                    // clear out the current handler
                    handler = undefined;
                    // Update the request
                    request = requestForPath(request, path);
                    // TODO: Can we do this isActionable stuff better?  In a more centralized place
                    // Finally, see if it has actions
                    if (isActionable(path)) {
                        context.storage = manipulateStorage(context.storage, path.actions);
                    }
                }
            }
        }

        // STEP #2 - Request new Handler (from request or forward path)
        // If we didn't find a request handler from STEP #0 that could handle the request
        // or in STEP #1 if we found a forward path and we want to force a new
        // request
        if (!handler) {
            // we need to request one....
            // if we didn't set the ID from the forwarding path
            if (!id) {
                id = keyFromRequest(request);
            }
            // Error condition here, we don't have a handler and don't have an ID to request
            if (!id) {
                throw new Error(`Could not determine intentId from request ${request ? request.type : "UNKNOWN"}`);
            }
            // #2.5 Make the request for the handler.
            try {
                const props = await this.service.get(id);
                handler = this.factory.fromProps(props);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                log().warn(`Unable to get valid handler for ${id}: ${errorMessage}`);
                if (error instanceof NoHandlerClassError) {
                    console.error(error.message);
                } else {
                    console.error(errorMessage);
                }
            }
        }

        // STEP #3 - InputUnknown on Current Handler
        // We now have a situation where we have a request but
        // 1. the current handler couldn't handle,
        // 2. there isn't a high level handler that can handle it.
        // So we move on to plan b, which is to see if the previous handler can
        // handle an input unknown.  If it can we will use that
        if (!handler && handlerFromStorage) {
            if (isHandler(handlerFromStorage)) {
                if (handlerFromStorage.canHandleInputUnknown(request, context)) {
                    log().info("Handler from storage can handle input unknown, going to use it");
                    handler = handlerFromStorage;
                }
            }
        }

        // STEP #4 - Global InputUnknown
        // Step #3 didn't work, which is a surprise but we can now
        // try to use the global input unknown from the database
        if (!handler) {
            log().info("Still could not determine a handler for the request, requesting InputUnknown from the DB");
            id = "InputUnknown";
            try {
                const props = await this.service.get(id);
                handler = this.factory.fromProps(props);
            } catch (error) {
                // log and move on
                const errorMessage = error instanceof Error ? error.message : String(error);
                log().warn(`Unable to get InputUnknown handler: ${errorMessage}`);
            }

            // If we got one from the DB, transform the request
            if (handler) {
                log().info(`Found global InputUnknown, updating overrideKey to be InputUnknown`);
                request.overrideKey = id;
            } else {
                // This is an error we need to address ASAP in the dev life-cycle.
                throw new Error(`Required Global InputUnknown was not found.`);
            }
        }

        // #4. Final error condition, we have no idea what is going on, throw an error
        if (!handler) {
            let helpfulErrorMessage: string;

            if (isLaunchRequest(request)) {
                helpfulErrorMessage = `Request was a LaunchRequest with id:${id}`;
            } else if (isIntentRequest(request)) {
                helpfulErrorMessage = `Intent request for ${request.intentId} with id: ${id}.`;
            } else {
                helpfulErrorMessage = `Request type ${request.type} with id: ${id}.`;
            }

            throw new Error("Could not determine request handler for request. " + helpfulErrorMessage);
        }

        // See if we have a redirecting path for the request
        if (handler) {
            if (isHandler(handler)) {
                const path = await handler.redirectingPathForRequest(request, context);
                // if we do have a path
                if (path) {
                    // make a new
                    id = path.intentId;
                    log().info(`Redirect path (${path.type}) present, changing request to ${id}`);

                    // Sanity check. Did the redirect have an intent?
                    if (!id) {
                        throw new Error(`Could not determine intentId for redirect.`);
                    }

                    handler = undefined;

                    // Update the request
                    request = requestForPath(request, path);

                    // See if it has actions
                    if (isActionable(path)) {
                        context.storage = manipulateStorage(context.storage, path.actions);
                    }

                    // request the handler
                    try {
                        log().info(`Requesting ${id} for redirect.`);
                        const props = await this.service.get(id);
                        handler = this.factory.fromProps(props);
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : String(error);
                        log().warn(`Unable to get valid handler for ${id}.  Error: ${errorMessage}`);
                    }

                    if (!handler) {
                        throw new Error("Could not determine redirect handler.");
                    }
                }
            }
        }
        return handler;
        /*tslint:enable:cyclomatic-complexity */
    }
}
