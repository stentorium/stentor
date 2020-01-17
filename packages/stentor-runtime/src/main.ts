/*! Copyright (c) 2019, XAPPmedia */
// tslint:disable:cyclomatic-complexity <-- TODO: We want to remove the need for this.
import { log } from "@xapp/logger";
import { GOODBYE, TROUBLE_WITH_REQUEST } from "stentor-constants";
import { ContextFactory } from "stentor-context";
import { AbstractHandler, getResponse } from "@xapp/stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { HandlerManager } from "stentor-handler-manager";
import { trimHistory } from "@xapp/stentor-history";
import { CANCEL_INTENT, STOP_INTENT } from "@xapp/stentor-interaction-model";
import {
    Channel,
    Context,
    HandlerService,
    Hooks,
    PIIService,
    Request,
    Response, ResponseOutput,
    RuntimeCallback,
    RuntimeContext,
    UserStorageService
} from "stentor-models";
import {
    hasSessionId,
    isInputUnknownRequest,
    isIntentRequest,
    isLaunchRequest,
    isSessionEndedRequest,
    keyFromRequest
} from "stentor-request";
import { canFulfillAll, canFulfillNothing } from "stentor-response";
import { EventService, wrapCallback as eventServiceCallbackWrapper } from "@xapp/stentor-service-event";
import { existsAndNotEmpty } from "@xapp/stentor-utils";
import { ChannelSelector } from "./ChannelSelector";

/**
 * Runtime dependencies
 *
 * @export
 * @interface Dependencies
 */
export interface Dependencies {
    eventService?: EventService;
    handlerFactory: HandlerFactory;
    handlerService: HandlerService;
    piiService?: PIIService;
    userStorageService: UserStorageService;
}

/**
 * The main runtime loop for the assistant application.
 *
 * @param requestBody
 * @param mainContext
 * @param callback
 * @param channels
 * @param dependencies
 * @param hooks
 */
export const main = async (
    requestBody: object,
    mainContext: RuntimeContext,
    callback: RuntimeCallback,
    channels: Channel[],
    dependencies: Dependencies,
    hooks?: Hooks
): Promise<void> => {
    if (typeof requestBody !== "object") {
        throw new TypeError("Request passed to main() was either undefined or not an object.");
    }

    if (typeof mainContext !== "object") {
        throw new TypeError("Context passed to main() was either undefined or not an object.");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback passed to main() was either undefined or not a function.");
    }

    if (!existsAndNotEmpty(channels)) {
        throw new TypeError("Channels passed to main() was either undefined or empty.");
    }

    const { eventService, userStorageService, handlerService, piiService, handlerFactory } = dependencies;

    // Wrap the callback
    //  if the eventService exists
    if (eventService) {
        // Wrap the callback so it flushes when we're done.
        callback = eventServiceCallbackWrapper(eventService, callback);
    }

    // Step #0
    // Get the Channel
    let channel: Channel;
    try {
        const selectChannel = new ChannelSelector();
        channel = selectChannel.from(channels, requestBody, mainContext);
        // Hook #0
        // With the channel determined, we can run the pre-execution hooks
        if (typeof hooks === "object" && typeof hooks.preExecution === "function") {
            const returns = await hooks.preExecution(requestBody, mainContext, callback);
            if (returns) {
                requestBody = returns.event;
                mainContext = returns.context;
                callback = returns.callback;
            } else {
                // falsey, bail on execution
                return;
            }
        }
        if (typeof channel.hooks === "object" && typeof channel.hooks.preExecution === "function") {
            const returns = await channel.hooks.preExecution(requestBody, mainContext, callback);
            if (returns) {
                requestBody = returns.event;
                mainContext = returns.context;
                callback = returns.callback;
            } else {
                // falsey, bail on execution
                return;
            }
        }
    } catch (error) {
        console.error(JSON.stringify(requestBody, undefined, 2));
        console.error(error.stack);
        callback(error);
        return;
    }

    let request: Request;
    try {
        request = {
            platform: channel.name,
            ...channel.request.translate(requestBody)
        };
        // First hook opportunity, post request translation
        if (hooks && typeof hooks.postRequestTranslation === "function") {
            request = await hooks.postRequestTranslation(request);
        }
    } catch (error) {
        console.error(JSON.stringify(requestBody, undefined, 2));
        console.error(error.stack);
        callback(error);
        return;
    }

    if (eventService) {
        // Now that we have a request, lets add some things to the event service.
        eventService.addPrefix({
            userId: request.userId,
            isHealthCheck: request.isHealthCheck,
            platform: request.platform,
            isNewSession: request.isNewSession
        });
        // And sessionId if possible
        if (hasSessionId(request)) {
            eventService.addPrefix({ sessionId: request.sessionId });
        }
        // And canFulfill...
        if (isIntentRequest(request) && request.canFulfill) {
            eventService.addPrefix({ canFulfill: `${request.canFulfill}` });
        }
    }

    // Do some logging for debugging if needed
    log().info(
        `platform:${request.platform}|request-type:${request.type}|request-key:${keyFromRequest(request)}|userId:${
        request.userId
        }${request.isHealthCheck ? "|HEALTH_CHECK" : ""}`
    );

    // #0.5 End the request if requested
    if (isSessionEndedRequest(request)) {
        // A session ended request.
        // For Alexa, you cannot respond to a session ended request, end it
        // see: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-standard-request-types-reference#valid-response-types-2
        // tslint:disable:no-null-keyword
        // Right now null is for BST.
        callback(null, {}, request);
        // tslint:enable:no-null-keyword
        return;
    }

    // #.75 Use the NLU service if required by the channel
    if (channel.nlu) {
        // We don't call if it is a LaunchRequest
        if (!isLaunchRequest(request)) {
            const nluResponse = await channel.nlu.query(request.rawQuery);
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore TypeScript be cool
            request = {
                ...request,
                ...nluResponse
            };
        }
    }

    // #1 Build the context from the request
    // - Context consists of device information
    let context: Context;
    try {
        context = await ContextFactory.fromRequest(
            request,
            requestBody,
            {
                userStorageService,
                piiService
            },
            channel,
            mainContext.appData
        );
        // How much time we left
        if (mainContext.getRemainingTimeInMillis) {
            context.timeLeftInMillis = mainContext.getRemainingTimeInMillis;
        } else {
            // TODO: This will never happen, we then need to require it on the mainContext.
            // When we revisit this, we might want to update the ContextFactory to also take
            // in the mainContext and then context can be readonly.
            context.timeLeftInMillis = (): number => {
                const SIX_SECONDS = 6000;
                return SIX_SECONDS;
            };
        }
    } catch (error) {
        console.error(error.stack);
        callback(error, undefined, request);
        return;
    }

    // Update with the currentHandler
    if (eventService && context.storage && context.storage.currentHandler && context.storage.currentHandler.intentId) {
        const currentHandler = context.storage.currentHandler.intentId;
        log().info(`appId:${context.storage.currentHandler.appId}|currentHandler:${currentHandler}`);
        eventService.addPrefix({ currentHandler });
    }

    // #2 Get the request handler
    let handler: AbstractHandler;
    try {
        const manager = new HandlerManager({ service: handlerService, factory: handlerFactory });
        handler = await manager.from(request, context);
    } catch (error) {
        // Add the error to the event service
        // We will not pass it out to the callback but we want to know about it.
        if (eventService) {
            eventService.error(error);
        }
        // Need to check if the request was for Stop/Cancel
        // and the current handler could take it and we
        // don't have a global Stop/Cancel setup
        if (isIntentRequest(request)) {
            // TODO: Test this and make sure the spanish Goodbye is returned
            // for spanish requests
            if (request.intentId === STOP_INTENT || request.intentId === CANCEL_INTENT) {

                const goodbye = context.response.respond(getResponse(GOODBYE, request, context)).build();
                const translatedGoodbye = channel.response.translate(goodbye);
                // Right now null is for BST.
                callback(null, translatedGoodbye, request, goodbye);
                return;
            }
            // not either of these just fall through
        }
        // report the error
        console.error(error.stack);
        // & apologize to the user

        const response = context.response.respond(getResponse(TROUBLE_WITH_REQUEST, request, context)).build();
        const translatedTrouble = channel.response.translate({ request, response });
        // tslint:disable:no-null-keyword
        // Right now null is for BST.
        callback(null, translatedTrouble, request, response);
        // tslint:enable:no-null-keyword
        return;
    }

    // #2.5 Pre handle request storage items
    // If it is it's own request, meaning we just pulled in a
    // handler for the request that came in we add it to the storage history.
    if (handler.intentId === keyFromRequest(request)) {
        context.storage.history.handler.unshift({
            intentId: handler.intentId,
            sessionId: hasSessionId(request) ? request.sessionId : undefined,
            timestamp: Date.now()
        });

        // Ok, if it is an intent request with data attached
        // TODO: we want to make DATA readonly again
        // it seems a little dirty to be honest
        if (isIntentRequest(request) && request.data) {
            // Zip up our data with the data on the request
            handler.data = Object.assign(handler.data, request.data);
        }
    }

    if (eventService) {
        eventService.addPrefix({ selectedHandler: handler.intentId });
    }

    // Swap out handlers on storage, this is very important
    context.storage.previousHandler = context.storage.currentHandler;
    context.storage.currentHandler = handler;

    // More logging
    log().info(`appId:${handler.appId}|selectedHandler:${handler.intentId}`);

    // #3 Kick off the request - check for canFulfill first
    if (isIntentRequest(request) && request.canFulfill) {
        // Only if the key is a real intent (not unknown input) and the handler is canFulfill "aware" - fulfill all
        if (isInputUnknownRequest(request)) {
            context.response.withCanFulfill(canFulfillNothing(request.slots));
        } else {
            if (handler.data && handler.data.accessibleThroughDiscovery) {
                context.response.withCanFulfill(canFulfillAll(request.slots));
            } else {
                context.response.withCanFulfill(canFulfillNothing(request.slots));
            }
        }

        const response = context.response.build();
        callback(null, response, request, response);
        return;
    }

    try {
        await handler.handleRequest(request, context);
    } catch (error) {
        // report the error
        console.error(error.stack);
        // & apologize to the user
        const response = context.response.respond(getResponse(TROUBLE_WITH_REQUEST, request, context)).build();
        const translatedTrouble = channel.response.translate({ request, response });
        // Add the error to the event service
        if (eventService) {
            eventService.error(error);
        }
        callback(null, translatedTrouble, request, response);
        return;
    }

    log().debug("Handler");
    log().debug(handler);

    // #3.5 Post handleRequest storage Updates
    // Save the response we are about to output as the previous response
    context.storage.previousResponse = context.response.response;
    // Trim history
    context.storage.history = trimHistory(context.storage.history);

    // #4.1 Save the PII storage
    if (piiService) {
        try {
            await piiService.savePii(context.pii);
            // Save the pointer - this could be undefined if it wasn't saved (no need for new PII)
            context.storage.piiToken = context.pii.token;
        } catch (error) {
            // report the error
            console.error(error.stack);
            // Add the error to the event service
            if (eventService) {
                eventService.error(error);
            }
        }
    }

    // Pre-translation hook - only real content (leave the errors alone)
    if (typeof hooks === "object" && typeof hooks.preResponseTranslation === "function") {
        const returns = await hooks.preResponseTranslation(request, context.response, context.storage);
        if (returns) {
            request = returns.request;
            context.response = returns.response;
            context.storage = returns.storage;
        }
    }

    // #4.2 Save the user storage
    try {
        await userStorageService.update(request.userId, context.storage);
    } catch (error) {
        // report the error
        console.error(error.stack);
        // Add the error to the event service
        if (eventService) {
            eventService.error(error);
        }
    }

    let response: Response<ResponseOutput>;
    let finalResponse: object;
    try {
        // #4.3 Build and translate the response
        response = context.response.build();

        log().debug("Response");
        log().debug(response);
        finalResponse = channel.response.translate({ request, response });
        log().debug("Final Response");
        log().debug(finalResponse);
    } catch (error) {
        // report the error
        console.error(error.stack);
        // Add the error to the event service
        if (eventService) {
            eventService.error(error);
        }
        finalResponse = {};
    }
    // #5 Finish it off by calling the callback
    // tslint:disable:no-null-keyword
    // Right now null is for BST.
    callback(null, finalResponse, request, response);
    // tslint:enable:no-null-keyword
};
// tslint:enable:cyclomatic-complexity
