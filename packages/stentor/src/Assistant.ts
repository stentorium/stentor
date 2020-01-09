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
import { HTTP_200_OK, HTTP_500_INTERNAL_SERVICE_ERROR } from "stentor-constants";
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
import { OVAIEventStream, OVAIService } from "stentor-service-ovai";
import { isLambdaError } from "@xapp/stentor-utils";
import * as AWSLambda from "aws-lambda";

/**
 * Omni-channel assistant application builder.
 *
 * @public
 */
export class Assistant {
    private channels: Channel[] = [];
    private factoryProps: HandlerFactoryProps = {};
    private handlerService: HandlerService | undefined = undefined;
    private piiService: PIIService | undefined = undefined;
    private userStorageService: UserStorageService | undefined = undefined;
    private eventService: EventService = new EventService();
    private runtimeData: AppRuntimeData = {};
    private hooks: Hooks = {};

    /**
     * Data that can be leveraged at runtime for certain responses. 
     * 
     * @beta 
     * @param runtime 
     * @public
     */
    public withRuntimeData(runtime: AppRuntimeData): Assistant {
        this.runtimeData = runtime;
        return this;
    }

    /**
     * Supply the assistant with channels for use at runtime.
     * 
     * @param channels - An array of channels the assistant supports
     * @public
     */
    public withChannels(channels: Channel[]): Assistant {
        this.channels = channels;
        return this;
    }

    /**
     * Provide a set of custom handlers that are available to the assistant application.
     * 
     * @remarks
     * Providing custom handlers allows you to extend functionality beyond what the
     * basic dialog management provides.  
     * 
     * @param handlers - Custom handlers available at runtime
     * @public
     */
    public withHandlers(handlers: HandlersArray | HandlersKeyValue | DelegatingHandlersMap): Assistant {
        if (isDelegatingHandlersMap(handlers)) {
            this.factoryProps.delegates = handlers;
        } else if (isHandlersArray(handlers)) {
            this.factoryProps.handlers = handlers;
        } else if (isHandlersKeyValue(handlers)) {
            this.factoryProps.mappings = handlers;
        }
        return this;
    }

    /**
     * Provide the assistant a handler service to query content at runtime.
     * 
     * @param handlerService 
     * @public
     */
    public withHandlerService(handlerService: HandlerService): Assistant {
        this.handlerService = handlerService;
        return this;
    }

    /**
     * The PII service keeps all personally identifiable information separated from
     * user data that does not contain any PII.
     * 
     * @beta
     * @param piiService 
     * @public
     */
    public withPiiService(piiService: PIIService): Assistant {
        this.piiService = piiService;
        return this;
    }

    /**
     * Required service to store user data.
     * 
     * @param userStorage
     * @public
     */
    public withUserStorage(userStorage: UserStorageService): Assistant {
        this.userStorageService = userStorage;
        return this;
    }

    /**
     * 
     * 
     * 
     * @param hooks - Available runtime hooks
     */
    public withHooks(hooks: Hooks): Assistant {
        this.hooks = hooks;
        return this;
    }

    /**
     * 
     * 
     * @beta
     * @param stream 
     * @public
     */
    public withEventStream(stream: EventStream): Assistant {
        this.eventService.addStream(stream);
        return this;
    }

    /**
     * 
     * 
     * @beta
     * @param prefix - 
     * @public
     */
    public withEventPrefix(prefix: EventPrefix): Assistant {
        this.eventService.addPrefix(prefix);
        return this;
    }

    /**
     * Build the assistant application to run on AWS Lambda
     * 
     * @public
     */
    public lambda(): AWSLambda.Handler {
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
            let response: object | undefined;

            const myCallback: RuntimeCallback = (error: undefined | Error | null | string, result: any): void => {
                if (this.eventService) {
                    const analyticsEvent: AnalyticsServiceEvent = AnalyticsService.event(runtimeEvent, result);
                    this.eventService.event(ANALYTICS_EVENT_TYPE, ANALYTICS_EVENT_NAME, analyticsEvent);
                }
                let code = HTTP_200_OK;

                if (error) {
                    code = HTTP_500_INTERNAL_SERVICE_ERROR;
                    if (typeof error === "string") {
                        result = error;
                    } else {
                        result = `${error.name}: ${error.message}`;
                        if (isLambdaError(error)) {
                            code = typeof error.statusCode === "number" ? error.statusCode : HTTP_500_INTERNAL_SERVICE_ERROR;
                        }
                    }
                }

                if (runtimeContext.buildResponse) {
                    response = runtimeContext.buildResponse(code, result);
                }

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
            callback(null, response);
        };

        return handler;
    }
}
