/*! Copyright (c) 2019, XAPPmedia */
import { Translator } from "@xapp/patterns";
import { Device } from "../Device";
import { NLUService } from "../NLU";
import { Request } from "../Request";
import { AbstractResponseBuilder, Response } from "../Response";
import { Hooks, RuntimeContext } from "../Runtime";
import { UserStorageService } from "../Services";

export type Callback<TResult = any> = (error?: Error | string | null, result?: TResult) => void

export interface RequestResponse {
    request: Request;
    response: Response;
}

export type ChannelHooks = Pick<Hooks, "preExecution" | "postRequestTranslation" | "preResponseTranslation">;

export interface Channel {
    /**
     * The name of the channel.
     *
     * This must be alphanumeric characters only, dashes instead of spaces.
     *
     * For example: "actions-on-google" or "alexa"
     *
     * This is used in analytics and in some cases platform selection if the platform is provided in the
     * URL as a query or path parameter.
     */
    name: string;
    /**
     * Optional function that tests the incoming request to see if it is a request for the channel.
     *
     * It returns true if the request is for the channel.
     *
     * If one isn't provided, it will rely on the name to determine the channel.
     *
     * @param body - 
     */
    test?(body: object): boolean;
    /**
     * Request translator (an instantiated class)
     */
    request: Translator<object, Request>;
    /**
     * Response translator (an instantiated class)
     */
    response: Translator<RequestResponse, object>;
    /**
     * Response builder, this is now deprecated in favor of providing a response translator.
     *
     * @deprecated Provide a response translator instead of a customer builder.  This will be removed in the next major release.
     */
    builder?: new (props: object) => AbstractResponseBuilder;
    /**
     * Determine the capabilities and contextual information
     * related to the device the user is accessing the channel on.
     * 
     * @privateRemarks We have continued to add more information to {@link Device}
     * so that it now includes contextual information.  The function name `capabilities()`
     * could be better.
     */
    capabilities(body: object): Device;
    /**
     * The NLU for the channel
     */
    nlu?: NLUService;
    /**
     * Runtime hooks used by the channel to make any necessary checks or modifications
     */
    hooks?: ChannelHooks;
    /**
     * Lambda event interceptor (right after the event)
     *
     * @param handler Stentor handler function
     * @param services
     * @param event raw lambda event
     * @param context lambda context
     * @param callback lambda callback
     */
    handlerHook?(handler: (event: any, context: RuntimeContext, callback: Callback) => Promise<void>,
        event: any, context: RuntimeContext, callback: Callback,
        services: { userStorageService?: UserStorageService; appService?: any }): Promise<void>;
}
