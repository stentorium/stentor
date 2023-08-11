/*! Copyright (c) 2019, XAPPmedia */
import { BASE_HANDLER_TYPE, CONVERSATION_HANDLER_TYPE, DELEGATING_HANDLER_TYPE } from "stentor-constants";
import { log } from "stentor-logger";
import {
    AbstractHandler,
    ConversationHandler
} from "stentor-handler";
import { DelegatingHandler, isDelegatingHandler } from "stentor-handler-delegating";
import { Context, Handler, HandlerDelegates, Request } from "stentor-models";
import { existsAndNotEmpty, keyFromRequest } from "stentor-utils";
import { NoHandlerClassError } from "./NoHandlerClassError";

// eslint-disable-next-line @typescript-eslint/array-type
export type HandlersArray = Array<new (props: Handler) => AbstractHandler>;

export interface HandlersKeyValue {
    [key: string]: new (props: Handler) => AbstractHandler;
}

export interface DelegatingHandlersMap {
    [delegateTo: string]: HandlerDelegates;
}

export interface HandlerFactoryProps {
    handlers?: HandlersArray;
    mappings?: HandlersKeyValue;
    delegates?: DelegatingHandlersMap;
}

export type HandlersMap = Map<string, new (props: Handler) => AbstractHandler>;

export class HandlerFactory {
    private handlers: HandlersMap;

    private delegates?: { [delegateTo: string]: HandlerDelegates };

    public constructor(props?: HandlerFactoryProps) {
        // Set the delegates
        this.delegates = typeof props === "object" ? props.delegates : undefined;
        // Create the map and add the conversation handler
        // Help from here: https://github.com/Microsoft/TypeScript/issues/9302
        this.handlers = new Map<string, new (props: Handler) => AbstractHandler>();
        // These are always available
        this.handlers.set(ConversationHandler.name, ConversationHandler);
        this.handlers.set(DelegatingHandler.name, DelegatingHandler);
        // This accounts to some v0 mappings
        this.handlers.set(CONVERSATION_HANDLER_TYPE, ConversationHandler);
        this.handlers.set(BASE_HANDLER_TYPE, ConversationHandler);
        this.handlers.set(DELEGATING_HANDLER_TYPE, DelegatingHandler);

        if (props && existsAndNotEmpty(props.handlers)) {
            props.handlers.forEach(handlerClass => {
                const name = handlerClass.name;
                if (name === "AbstractHandler" || name === "Function" || name.length === 1) {
                    throw new Error(
                        `Unexpected class name "${name}", most likely due to transpilation or uglification.  Use props.mappings instead.`
                    );
                }
                this.handlers.set(handlerClass.name, handlerClass);
            });
        }

        if (props && typeof props.mappings === "object") {
            Object.keys(props.mappings).forEach(key => {
                this.handlers.set(key, props.mappings[key]);
            });
        }

        // debug the types
        const keys = Object.keys(this.handlers).concat(",");
        log().debug(`HandlerFactory created with possible handler types: ${keys}`);
    }

    /**
     * Converts handler properties to the appropriate Handler.
     *
     * @static
     * @param {Handler} props
     * @returns {AbstractHandler}
     */
    public fromProps(props: Handler): AbstractHandler | undefined {
        if (typeof props !== "object") {
            throw new TypeError(`Invalid props for handler. Props were type:${typeof props}`);
        }

        const { type, intentId } = props;

        const HANDLER_CLASS = this.handlers.get(type);

        if (!HANDLER_CLASS) {
            throw new NoHandlerClassError(`Could not match handler type ${type} to a handler with id ${intentId}`);
        }

        const handler = new HANDLER_CLASS(props);
        // Check to see if delegating and if so set the delegates
        if (isDelegatingHandler(handler)) {
            handler.setHandlerDelegates(this.delegates);
        }

        return handler;
    }

    /**
     * Gets the correct handler from storage.
     *
     * Depending on if audio is playing or not, the correct
     * handler is picked off the storage if it is available
     * or not.
     *
     * @public
     */
    public from(request: Request, context: Context): AbstractHandler | undefined {
        let handler: AbstractHandler;

        // 1. See if we have a handler on the storage
        if (context.storage && context.storage.currentHandler) {
            const currentHandler = this.fromProps(context.storage.currentHandler);
            handler = currentHandler;
        }

        // If audio player is playing (determined by if the token exists) OR
        // we didn't have a currentHandler on storage
        // We select the audio handler if it can handle the request,
        // otherwise we pass out undefined.
        if (
            (context.device.mediaPlayerStatus &&
                context.device.mediaPlayerStatus.token &&
                context.storage &&
                context.storage.currentAudioHandler) ||
            (!handler && context.storage.currentAudioHandler)
        ) {
            // Go the legacy path
            const currentAudioHandler = this.fromProps(context.storage.currentAudioHandler);

            if (currentAudioHandler.canHandleRequest(request, context)) {
                log().debug(
                    `Selecting audio handler ${currentAudioHandler.intentId} to handle the request ${request.type
                    }-${keyFromRequest(request)}${handler ? ` over current handler ${handler.intentId}` : ""}`
                );
                handler = currentAudioHandler;
            }
        }

        // 3. Check if the request is for itself, if so we need to get the latest content
        // TODO: This determination should not be here anymore
        // since we now handle UnknownInput on the handler
        // level
        if (handler && handler.isOwnRequest(request)) {
            // It is the request for itself, clear it out
            // so it requests the latest content
            handler = undefined;
        }

        return handler;
    }
}
