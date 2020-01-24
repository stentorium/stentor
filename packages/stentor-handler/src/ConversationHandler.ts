/*! Copyright (c) 2019, XAPPmedia */
import { Context, Request } from "stentor-models";
import { AbstractHandler } from "./AbstractHandler";

export type ConversationHandlerType = "InSessionIntent";

export const CONVERSATION_HANDLER_TYPE: ConversationHandlerType = "InSessionIntent";

/**
 * The most basic implementation of an abstract handler, the conversation handler
 * facilitates basic back and forth, request & response, with users.
 *
 * @public
 */
export class ConversationHandler extends AbstractHandler {
    public async handleRequest(request: Request, context: Context): Promise<void> {
        await super.handleRequest(request, context);
    }
}
