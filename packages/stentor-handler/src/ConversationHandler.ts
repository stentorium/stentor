/*! Copyright (c) 2019, XAPPmedia */
import { Context, Request } from "stentor-models";
import { AbstractHandler } from "./AbstractHandler";

export type ConversationHandlerType = "InSessionIntent";

export const CONVERSATION_HANDLER_TYPE: ConversationHandlerType = "InSessionIntent";

/**
 * The most basic implementation of an abstract handler.
 *
 * @export
 * @class ConversationHandler
 * @extends {Handler}
 */
export class ConversationHandler extends AbstractHandler {
    async handleRequest(request: Request, context: Context) {
        await super.handleRequest(request, context);
    }
}
