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
  isHandlersKeyValue,
} from "stentor-handler-factory";
import { HTTP_200_OK, HTTP_500_INTERNAL_SERVICE_ERROR } from "stentor-constants";
import { log } from "stentor-logger";
import {
  AppRuntimeData,
  Channel,
  CrmService,
  EventStream,
  HandlerService,
  Hooks,
  KnowledgeBaseConfig,
  KnowledgeBaseDependency,
  KnowledgeBaseService,
  PIIService,
  RuntimeCallback,
  RuntimeContext,
  SMSService,
  UserStorageService,
} from "stentor-models";
import { main, translateEventAndContext } from "stentor-runtime";
import { EventPrefix, EventService } from "stentor-service-event";
import { StudioEventStream, StudioService } from "stentor-service-studio";
import { OVAIEventStream, OVAIService } from "stentor-service-ovai";
import { isLambdaError, safeEventLog } from "stentor-utils";

import * as AWSLambda from "aws-lambda";

import { setEnv } from "./services/Secrets";

/**
 * Omni-channel assistant application builder.
 *
 * @public
 */
export class Assistant {
  private channels: Channel[] = [];
  private eventService: EventService = new EventService();
  private factoryProps: HandlerFactoryProps = {};
  private handlerService: HandlerService | undefined = undefined;
  private hooks: Hooks = {};
  private knowledgeBaseServices: { [matchIntentId: string]: KnowledgeBaseDependency } = {};
  private piiService: PIIService | undefined = undefined;
  private crmService: CrmService | undefined = undefined;
  private smsService: SMSService | undefined = undefined;
  private runtimeData: AppRuntimeData = {};
  private userStorageService: UserStorageService | undefined = undefined;

  /**
   * Data that can be leveraged at runtime for certain responses.
   *
   * @beta
   * @param runtime - Runtime data
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
   * Add a Knowledge Base Service that is called on particular requests and the results are appended to the request.
   *
   * @param service - Service that impelements KnowledgeBaseService
   * @param config - Configuration for when to call the service and how the results should be used.
   * @returns
   */
  public withKnowledgeBaseService(service: KnowledgeBaseService, config: KnowledgeBaseConfig): Assistant {
    if (service && config) {
      // Channel take precedence over matchIntentId
      let key = config.matchChannel || config.matchIntentId;

      // If they do not provide one, default is to be called on every request.
      if (!key) {
        key = "^.*$";
        config.matchIntentId = key;
      }
      this.knowledgeBaseServices[key] = { service, ...config };
    }
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
   * The CRM service send the collected sales leads to a CRM server.
   *
   * @beta
   * @param crmService
   * @public
   */
  public withCrmService(crmService: CrmService): Assistant {
    this.crmService = crmService;
    return this;
  }

  /**
   * The SMS service sends text messages
   *
   * @beta
   * @param smsService
   * @public
   */
  public withSmsService(smsService: SMSService): Assistant {
    this.smsService = smsService;
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
   * Set runtime hooks on the Assistant.
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
   * Add an prefix to your events.  This is a key value pair that is prefixed
   * to all of your events.
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
   * Returns the handler service
   *
   * Checks environment variables to put together the correct configuration.
   *
   * @private
   */
  private getHandlerService(): HandlerService {
    let handlerService: HandlerService;
    if (!this.handlerService) {
      if (process.env.STUDIO_TOKEN) {
        const service = new StudioService({
          token: process.env.STUDIO_TOKEN,
          appId: process.env.STUDIO_APP_ID,
        });
        handlerService = service;
        this.eventService.addStream(new StudioEventStream({ service }));
      } else if (process.env.OVAI_TOKEN) {
        console.warn(`OVAI_TOKEN & OVAIService has been deprecated, please migrate to STUDIO_TOKEN.`);
        // Create the API based handler service
        const service = new OVAIService({
          token: process.env.OVAI_TOKEN,
          appId: process.env.OVAI_APP_ID,
        });
        handlerService = service;
        this.eventService.addStream(new OVAIEventStream({ service }));
      } else {
        throw new Error("HandlerService or STUDIO_TOKEN was not provided, unable to create the Assistant.");
      }

      // And set the handler service so we skip this next time
      this.handlerService = handlerService;
    } else {
      handlerService = this.handlerService;
    }

    return handlerService;
  }

  private getUserStorageService(): UserStorageService {
    // User Storage Service is required
    let userStorageService: UserStorageService;
    if (this.userStorageService) {
      userStorageService = this.userStorageService;
    } else {
      throw new TypeError("A user storage service is required.");
    }

    return userStorageService;
  }
  /**
   * Adds prefixes to the event service depending on it's environment
   */
  private setupEventService(): void {
    if (process.env.OVAI_APP_ID) {
      // This is the deprecated variable
      this.eventService.addPrefix({
        appId: process.env.OVAI_APP_ID,
      });
    }

    if (process.env.STUDIO_APP_ID) {
      this.eventService.addPrefix({
        appId: process.env.STUDIO_APP_ID,
      });
    }

    if (process.env.NODE_ENV) {
      this.eventService.addPrefix({
        environment: process.env.NODE_ENV,
      });
    } else {
      // Environment is required
      this.eventService.addPrefix({
        environment: "development",
      });
    }
  }

  /**
   * Build the assistant application to run on AWS Lambda
   *
   * @public
   */
  public lambda(): AWSLambda.Handler {
    const handler = async (
      runtimeEvent: any,
      runtimeContext: RuntimeContext,
      callback: AWSLambda.Callback
    ): Promise<void> => {
      // Wrap the response according to the lambda call flavor (BST or API GW proxy)
      let response: object | undefined;

      // This is a callback wrapper to help with error handling.
      const myCallback: RuntimeCallback = (error: undefined | Error | null | string, result: any): void => {
        if (this.eventService) {
          try {
            // Create a analytics event which is used to send data to 3rd party analytics providers
            this.eventService.event("AnalyticsEvent", "SKILL_DATA", { request: runtimeEvent, response: result });
          } catch (e) {
            // Fallback to safe logging if event service fails with large payloads
            safeEventLog("Analytics Event (fallback):", {
              eventType: "AnalyticsEvent",
              eventName: "SKILL_DATA",
              error: e.message,
              hasRequest: !!runtimeEvent,
              hasResponse: !!result
            }, "warn");
          }
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

      let handlerService: HandlerService;
      let userStorageService: UserStorageService;
      let factory: HandlerFactory;

      try {
        handlerService = this.getHandlerService();
        userStorageService = this.getUserStorageService();
        factory = new HandlerFactory(this.factoryProps);
        this.setupEventService();
      } catch (e: any) {
        myCallback(e);
        callback(null, response);
        return;
      }

      try {
        await main(
          runtimeEvent,
          runtimeContext,
          myCallback,
          this.channels,
          {
            userStorageService,
            handlerFactory: factory,
            handlerService,
            eventService: this.eventService,
            piiService: this.piiService,
            crmService: this.crmService,
            smsService: this.smsService,
            knowledgeBaseServices: this.knowledgeBaseServices,
          },
          this.hooks
        );

        // Send the response.
        callback(null, response);
      } catch (e: any) {
        myCallback(e, response);
        callback(null, response);
      }
    };

    const lambdaHandler: AWSLambda.Handler = async (event, context, callback) => {
      // Setup your environment
      await setEnv()
        .then()
        .catch((error: Error) => log().warn("Environment failed to load", error));

      const translated = translateEventAndContext(event, context);
      const runtimeEvent = translated.event;
      const runtimeContext = translated.context;
      if (this.runtimeData) {
        runtimeContext.appData = this.runtimeData;
      }

      // Check if the matching channel has a hook (like Facebook)
      for (const channel of this.channels) {
        if (channel.handlerHook && channel.test?.(runtimeEvent)) {
          return channel.handlerHook(handler, runtimeEvent, runtimeContext, callback, {
            userStorageService: this.userStorageService,
          });
        }
      }

      return handler(runtimeEvent, runtimeContext, callback);
    };

    return lambdaHandler;
  }

  /**
   * Returns an express.js application.
   *
   * You must start the server that is passed out with:
   * ```
   * app.listen(SERVER_PORT);
   * ```
   * @beta
   * @param app
   */
  // Inside your class
  public express(app?: import("express").Application, path = "/"): import("express").Application {
    let expressPkg: typeof import("express");
    let bodyParserPkg: typeof import("body-parser");

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expressPkg = require("express");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      bodyParserPkg = require("body-parser");
    } catch {
      throw new Error("Optional Express support not installed. Run `npm i express body-parser` if needed.");
    }

    if (!app) {
      app = expressPkg();
    }

    app.use(bodyParserPkg.json());

    app.post(path, async (request, response) => {
      const handler = this.lambda();
      await handler(request.body, { request } as any, (_: unknown, stentorResponse: string) => {
        response.send(stentorResponse);
      });
    });

    return app;
  }
}
