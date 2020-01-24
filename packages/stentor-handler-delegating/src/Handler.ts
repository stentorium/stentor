/*! Copyright (c) 2019, XAPPmedia */
import { AbstractHandler } from "stentor-handler";
import {
    Content,
    Context,
    DelegatedHandlerMethod,
    DelegatedRequestMethod,
    HandlerDelegates,
    Request
} from "stentor-models";
import { keyFromRequest } from "stentor-request";

import { DelegatingData } from "./Data";
import { DelegatingHandlerType } from "./Types";

/**
 * This handler can call registered methods outside Stentor.
 *
 * @export
 * @class DelegatingHandler
 * @extends {AbstractHandler<Content, DelegatingData>}
 */
export class DelegatingHandler extends AbstractHandler<Content, DelegatingData> {
    type: DelegatingHandlerType;

    private handlerDelegates: HandlerDelegates;

    /**
     * Pick out the method this handler should delegate to. The default is the intentId of the handler.
     *
     * @param {{ [delegateTo: string]: HandlerDelegates }} handlerDelegates
     * @memberof DelegatingHandler
     */
    setHandlerDelegates(handlerDelegates: { [delegateTo: string]: HandlerDelegates }) {
        const delegateTo = (this.data && this.data.delegateTo) || this.intentId;

        this.handlerDelegates = handlerDelegates[delegateTo];

        if (!this.handlerDelegates) {
            throw new Error(`Could not find handler delegates for id ${delegateTo}`);
        }
    }

    /**
     * Call start if we have an override
     *
     * @param {Request} request
     * @param {Context} context
     * @returns {Promise<void>}
     */
    async start(request: Request, context: Context) {
        const method: DelegatedHandlerMethod = this.handlerDelegates.start;

        if (method) {
            return await method(request, context, this.content, this.data);
        } else {
            return await super.start(request, context);
        }
    }

    /**
     * Call the handler method if we have an override
     *
     * We need to be tricky. Basic services, like cancel/stop, repeat and InputUnknow we still want to use,
     * but some skills want those two.
     *
     * @param {Request} request
     * @param {Context} context
     * @returns {Promise<void>}
     */
    async handleRequest(request: Request, context: Context) {
        const event = keyFromRequest(request);

        // Own intent - try start
        if (event === this.intentId) {
            return await this.start(request, context);
        }

        // Does the delegate want it and has a method to handle it?
        const method: DelegatedHandlerMethod = this.handlerDelegates.handleRequest;
        if (this.canDelegatedHandleRequest(request) && method) {
            return await method(request, context, this.content, this.data);
        } else {
            return await super.handleRequest(request, context);
        }
    }

    /**
     * Ask the super AND the delegate. One of them should be interested.
     *
     * @param {Request} request
     * @returns {boolean}
     */
    public canHandleRequest(request: Request, context: Context): boolean {
        return super.canHandleRequest(request, context) || this.canDelegatedHandleRequest(request);
    }

    /**
     * Call the delegate method if we have an override
     *
     * @param {Request} request
     * @returns {boolean}
     */
    private canDelegatedHandleRequest(request: Request): boolean {
        const method: DelegatedRequestMethod = this.handlerDelegates.canHandleRequest;

        if (method) {
            return method(request);
        } else {
            return false;
        }
    }
}
