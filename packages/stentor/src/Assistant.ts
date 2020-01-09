/*! Copyright (c) 2019, XAPPmedia */
require("dotenv").config();

import {
    DelegatingHandlersMap,
    HandlerFactory,
    HandlerFactoryProps,
    HandlersArray,
    HandlersKeyValue,
    isDelegatingHandlersMap,
    isHandlersArray,
    isHandlersKeyValue
} from "@xapp/stentor-handler-factory";
import {
    AppRuntimeData,
    Channel,
    EventStream,
    HandlerService,
    Hooks,
    PIIService,
    RuntimeCallback,
    UserStorageService
} from "stentor-models";
import { main, translateEventAndContext } from "@xapp/stentor-runtime";
import {
    ANALYTICS_EVENT_NAME,
    ANALYTICS_EVENT_TYPE,
    AnalyticsService,
    AnalyticsServiceEvent
} from "@xapp/stentor-service-analytics";
import { EventPrefix, EventService } from "@xapp/stentor-service-event";
import { OVAIEventStream, OVAIService } from "@xapp/stentor-service-ovai";
import { isLambdaError } from "@xapp/stentor-utils";
import * as AWSLambda from "aws-lambda";

export class Assistant {
    private channels: Channel[] = [];
    private factoryProps: HandlerFactoryProps = {};
    private handlerService: HandlerService;
    private piiService: PIIService;
    private userStorageService: UserStorageService;
    private eventService: EventService = new EventService();
    private runtimeData: AppRuntimeData;
    private hooks: Hooks;

    withRuntimeData(runtime: AppRuntimeData) {
        this.runtimeData = runtime;
        return this;
    }

    withChannels(channels: Channel[]) {
        this.channels = channels;
        return this;
    }

    withHandlers(handlers: HandlersArray | HandlersKeyValue | DelegatingHandlersMap) {
        if (isDelegatingHandlersMap(handlers)) {
            this.factoryProps.delegates = handlers;
        } else if (isHandlersArray(handlers)) {
            this.factoryProps.handlers = handlers;
        } else if (isHandlersKeyValue(handlers)) {
            this.factoryProps.mappings = handlers;
        }
        return this;
    }

    withHandlerService(handlerService: HandlerService) {
        this.handlerService = handlerService;
        return this;
    }

    withPiiService(piiService: PIIService) {
        this.piiService = piiService;
        return this;
    }

    withUserStorage(userStorage: UserStorageService) {
        this.userStorageService = userStorage;
        return this;
    }

    withHooks(hooks: Hooks) {
        this.hooks = hooks;
        return this;
    }

    withEventStream(stream: EventStream) {
        this.eventService.addStream(stream);
        return this;
    }

    withEventPrefix(prefix: EventPrefix) {
        this.eventService.addPrefix(prefix);
        return this;
    }

    lambda(): AWSLambda.Handler {
        // Setup the handler service if we don't have one and have the token
        if (!this.handlerService) {
            if (process.env.OVAI_TOKEN) {
                // Create the API based handler service
                const service = new OVAIService({
                    token: process.env.OVAI_TOKEN,
                    appId: process.env.OVAI_APP_ID
                });
                this.handlerService = service;
                this.eventService.addStream(new OVAIEventStream({ service }));
            } else {
                throw new Error("HandlerService or OVAI_TOKEN was not provided.");
            }
        }

        if (process.env.OVAI_APP_ID) {
            this.eventService.addPrefix({
                appId: process.env.OVAI_APP_ID
            });
        }

        if (process.env.NODE_ENV) {
            this.eventService.addPrefix({
                environment: process.env.NODE_ENV
            });
        }

        const factory = new HandlerFactory(this.factoryProps);

        const handler: AWSLambda.Handler = async (event, context, callback) => {
            const translated = translateEventAndContext(event, context);
            const runtimeEvent = translated.event;
            const runtimeContext = translated.context;
            if (this.runtimeData) {
                runtimeContext.appData = this.runtimeData;
            }

            // Wrap the response according to the lambda call flavor (BST or API GW proxy)
            let response: object;

            const myCallback: RuntimeCallback = (error: Error | null | string, result: any): void => {
                if (this.eventService) {
                    const analyticsEvent: AnalyticsServiceEvent = AnalyticsService.event(runtimeEvent, result);
                    this.eventService.event(ANALYTICS_EVENT_TYPE, ANALYTICS_EVENT_NAME, analyticsEvent);
                }
                /* tslint:disable:no-magic-numbers */
                let code = 200;

                if (error) {
                    code = 500;
                    if (typeof error === "string") {
                        result = error;
                    } else {
                        result = `${error.name}: ${error.message}`;
                        if (isLambdaError(error)) {
                            code = error.statusCode;
                        }
                    }
                }

                response = runtimeContext.buildResponse(code, result);
                /* tslint:disable:no-magic-numbers */
            };

            await main(
                runtimeEvent,
                runtimeContext,
                myCallback,
                this.channels,
                {
                    userStorageService: this.userStorageService,
                    handlerFactory: factory,
                    handlerService: this.handlerService,
                    eventService: this.eventService,
                    piiService: this.piiService
                },
                this.hooks
            );
            // Send the response.
            /*tslint:disable:no-null-keyword */
            callback(null, response);
            /*tslint:enable:no-null-keyword */
        };

        return handler;
    }
}
