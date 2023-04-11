/*! Copyright (c) 2019, XAPPmedia */
import { isActionable, isAudioPlayerRequest } from "stentor-guards";
import { log } from "stentor-logger";
import { GOODBYE, TROUBLE_WITH_REQUEST, SESSION_STORAGE_NEW_USER, SESSION_STORAGE_SLOTS_KEY, SESSION_STORAGE_KNOWLEDGE_BASE_RESULT } from "stentor-constants";
import {
    hasSessionId,
    isInputUnknownRequest,
    isIntentRequest,
    isLaunchRequest,
    isOptionSelectRequest,
    isPermissionRequest,
    isSessionEndedRequest,
    isChannelActionRequest
} from "stentor-guards";
import { ContextFactory } from "stentor-context";
import { AbstractHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { HandlerManager } from "stentor-handler-manager";
import { trimHistory } from "stentor-history";
import { CANCEL_INTENT, STOP_INTENT } from "stentor-interaction-model";
import {
    Channel,
    Context,
    CrmService,
    HandlerService,
    Hooks,
    KnowledgeBaseDependency,
    KnowledgeBaseService,
    PIIService,
    Request,
    Response,
    ResponseOutput,
    RuntimeCallback,
    RuntimeContext,
    SMSService,
    UserStorageService
} from "stentor-models";
import { canFulfillAll, canFulfillNothing, getResponse } from "stentor-response";
import { EventService, wrapCallback as eventServiceCallbackWrapper } from "stentor-service-event";
import { manipulateStorage } from "stentor-storage";
import { combineRequestSlots, requestToMessage, responseToMessage, existsAndNotEmpty, findValueForKey, keyFromRequest } from "stentor-utils";

import { ChannelSelector } from "./ChannelSelector";
import { combineKnowledgeBaseResults, mergeInKnowledgeBaseResults } from "./combineKnowledgeBaseResults";

export const DEFAULT_MAX_HISTORY = 20;

/**
 * Runtime dependencies
 */
export interface Dependencies {
    eventService?: EventService;
    crmService?: CrmService;
    smsService?: SMSService;
    handlerFactory: HandlerFactory;
    handlerService: HandlerService;
    piiService?: PIIService;
    userStorageService: UserStorageService;
    knowledgeBaseServices?: { [matchIntentId: string]: KnowledgeBaseDependency };
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

    // Define some variables that will be used throughout

    const APP_ID: string = process.env["STUDIO_APP_ID"];
    const HISTORY_SIZE: number = Number(process.env["STUDIO_MAX_HISTORY"]) || DEFAULT_MAX_HISTORY;

    const {
        eventService,
        userStorageService,
        handlerService,
        piiService,
        crmService,
        smsService,
        handlerFactory,
        knowledgeBaseServices
    } = dependencies;

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

        // If we had an error, we need to wrap the callback real quick before calling it.
        if (eventService) {
            // Wrap the callback so it flushes when we're done.
            callback = eventServiceCallbackWrapper(eventService, callback);
        }
        console.error(JSON.stringify(requestBody, undefined, 2));
        console.error(error.stack);
        callback(error);
        return;
    }

    // Wrap the callback
    //  if the eventService exists
    if (eventService) {
        // Wrap the callback so it flushes when we're done.
        callback = eventServiceCallbackWrapper(eventService, callback);
    }

    let request: Request;
    try {
        request = {
            platform: channel.name,
            ...channel.request.translate(requestBody)
        };
        // Second hook opportunity, post request translation
        if (channel.hooks && typeof channel.hooks.postRequestTranslation === "function") {
            request = await channel.hooks.postRequestTranslation(request);
        }
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
        // Look for overrides in the attributes field
        // Do this first
        if (request.attributes && typeof request.attributes === "object" && Object.keys(request.attributes).length > 0) {
            if (request.attributes.environment && typeof request.attributes.environment === "string") {
                eventService.addPrefix({ environment: request.attributes.environment })
            }
        }

        // Now that we have a request, lets add some things to the event service.
        eventService.addPrefix({
            userId: request.userId,
            isHealthCheck: request.isHealthCheck,
            platform: request.platform,
            isNewSession: request.isNewSession,
            channel: request.channel,
            rawQuery: request.rawQuery
        });

        // And sessionId if possible
        if (hasSessionId(request)) {
            eventService.addPrefix({ sessionId: request.sessionId });
        }
        // And canFulfill...
        if (isIntentRequest(request) && request.canFulfill) {
            eventService.addPrefix({ canFulfill: `${request.canFulfill}` });
        }

        // If an audio player request event Failed, we want to log the error
        if (isAudioPlayerRequest(request) && request.event === "AudioPlayerPlaybackFailed") {
            const audioError = new Error(request.errorMessage)
            audioError.name = request.errorType;
            eventService.error(audioError);
        }
    }

    // Do some logging for debugging if needed
    log().info(
        `platform:${request.platform}|channel:${request.channel}|request-type:${request.type}|request-key:${keyFromRequest(request)}|userId:${request.userId
        }${request.isHealthCheck ? "|HEALTH_CHECK" : ""}`
    );

    // #0.5 End the request if requested
    if (isSessionEndedRequest(request)) {
        // A session ended request.
        // For Alexa, you cannot respond to a session ended request, end it
        // see: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-standard-request-types-reference#valid-response-types-2
        // Right now null is for BST.
        callback(null, {}, request);
        return;
    }

    // #.75 Use the NLU service if required by the channel
    if (channel.nlu) {
        // We don't call if it is a LaunchRequest, option, or permission grant
        if (!isLaunchRequest(request) 
            && !isOptionSelectRequest(request) 
            && !isPermissionRequest(request)
            && !isChannelActionRequest(request)) {

            const userId: string = request.userId;
            const sessionId: string = hasSessionId(request) ? request.sessionId : undefined;
            const locale = request.locale;

            const nluResponse = await channel.nlu.query(request.rawQuery, { userId, sessionId, locale });
            // @ts-ignore TypeScript be cool
            request = {
                ...request,
                ...nluResponse
            };
        }
    }

    // Some updates after NLU is called
    if (eventService) {
        if (isIntentRequest(request) && typeof request.matchConfidence === "number") {
            eventService.addPrefix({ confidence: request.matchConfidence });
        }
    }

    // Check to see if we call the KB service
    if (knowledgeBaseServices && Object.keys(knowledgeBaseServices).length > 0) {

        let kbConfig: KnowledgeBaseDependency;
        let kbService: KnowledgeBaseService;

        const intentId = keyFromRequest(request);
        const requestMatch = findValueForKey(intentId, knowledgeBaseServices);

        if (requestMatch && requestMatch.matchIntentId) {
            kbConfig = requestMatch;
            kbService = requestMatch.service;
        }

        // Channel takes precedence over a request one.
        const channel = request.channel;

        // Try to find a channel match
        const channelMatch = findValueForKey(channel, knowledgeBaseServices);

        // Make sure it exists and is a channel match
        if (channelMatch && channelMatch.matchChannel) {
            kbConfig = channelMatch;
            kbService = channelMatch.service;
        }

        if (kbService && request.rawQuery) {
            const kbResult = await kbService.query(request.rawQuery);
            request = mergeInKnowledgeBaseResults(request, kbResult, kbConfig);
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
                piiService,
                crmService,
                eventService,
                smsService
            },
            channel,
            mainContext.appData
        );

        // Adjust the inputUnknown count if the next request is not 
        // for input unknown
        if (!isInputUnknownRequest(request)) {
            context.session.set("unknownInputs", 0);
        }

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

    //
    // Context Modifications!
    //

    // See if it doesn't have a lastActiveTimestamp
    if (typeof context.storage.lastActiveTimestamp !== "number") {
        // We want to set a session variable so we can keep track of if they are a new user for the entire session
        context.session.set(SESSION_STORAGE_NEW_USER, true);
    }

    // If we get a message from the request, add it to the transcript
    const requestMessage = requestToMessage(request, APP_ID)
    if (requestMessage) {
        if (!Array.isArray(context.storage.sessionStore.transcript)) {
            context.storage.sessionStore.transcript = [];
        }
        context.storage.sessionStore.transcript.push(requestMessage);
    }

    // Update with the currentHandler
    if (eventService && context.storage && context.storage.currentHandler && context.storage.currentHandler.intentId) {
        const currentHandler = context.storage.currentHandler.intentId;
        log().info(`appId:${context.storage.currentHandler.appId}|currentHandler:${currentHandler}`);
        eventService.addPrefix({ currentHandler });
    }

    // Before we start determining things like handler or responses, we
    // want to update the slots on the session storage
    // so they can be used for slot filling logic
    if (isIntentRequest(request)) {
        // Update the slots on the user's session storage
        // This is helpful when slot filling.
        context.session.set(SESSION_STORAGE_SLOTS_KEY, combineRequestSlots(context.session.get(SESSION_STORAGE_SLOTS_KEY), request.slots));
        // We also keep track of the most recent KB result if it exists.
        context.session.set(SESSION_STORAGE_KNOWLEDGE_BASE_RESULT, combineKnowledgeBaseResults(context.session.get(SESSION_STORAGE_KNOWLEDGE_BASE_RESULT), request.knowledgeBaseResult));
    }

    try {
        if (hooks && typeof hooks.postContextCreation === "function") {
            const updated = await hooks.postContextCreation(request, context);
            if (updated) {
                request = updated.request;
                context = updated.context;
            }
        }
    } catch (error) {
        log().warn(`Error caught in the postContextCreation hook: ${error}`);
        // Keep moving, record the error
        if (eventService) {
            eventService.error(error);
        }
    }

    //
    // End Context Modifications!
    //

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

        callback(null, translatedTrouble, request, response);
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
        // NOTE: TypeScript is giving an error here saying it will never happen
        //       which I mostly agree with.  Going to keep it here for now as a just
        //       in case and backwards compat.  -- Michael
        if (isInputUnknownRequest(request)) {
            // @ts-ignore Keeping this for backwards compat
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
    // Majority of the logic will occur in the handleRequest method!
    // It will take the request and objects on the context
    // to determine a response.
    // The response is built using the response builder on the
    // context.
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
    context.storage.history = trimHistory(context.storage.history, { historySize: HISTORY_SIZE });

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

    // preResponseTranslation hook - only real content (leave the errors alone)
    if (!!channel.hooks && typeof channel.hooks.preResponseTranslation === "function") {
        const returns = await channel.hooks.preResponseTranslation(request, context.response, context.storage);
        if (returns) {
            request = returns.request;
            context.response = returns.response;
            context.storage = returns.storage;
        }
    }
    if (!!hooks && typeof hooks === "object" && typeof hooks.preResponseTranslation === "function") {
        const returns = await hooks.preResponseTranslation(request, context.response, context.storage);
        if (returns) {
            request = returns.request;
            context.response = returns.response;
            context.storage = returns.storage;
        }
    }

    // #4.2 Build and translate the response
    let response: Response<ResponseOutput>;
    let finalResponse: object;
    try {

        response = context.response.build();

        if (eventService) {
            eventService.requestResponse(request, response);
        }

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

    const responseMessage = responseToMessage(response, request, APP_ID);
    if (responseMessage) {
        context.storage.sessionStore.transcript.push(responseMessage);
    }

    // Trim transcript before saving to keep it somewhat managable
    if (Array.isArray(context.storage.sessionStore?.transcript)) {
        const transcriptLength = context.storage.sessionStore.transcript.length;
        const trimmed = context.storage.sessionStore.transcript.slice(Math.max(transcriptLength - HISTORY_SIZE, 0))
        context.storage.sessionStore.transcript = trimmed;
    }

    if (isActionable(response)) {
        manipulateStorage(context.storage, response.actions);
    }

    // #4.3 Save the user storage
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

    // #5 Finish it off by calling the callback
    callback(null, finalResponse, request, response);
};
