/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "./Event";
import { MessageEventType } from "./Types";

/**
 * A simple payload meant for message events.
 */
export interface MessagePayload {
    message: string;
}

export interface MessageEvent extends Event<MessagePayload> {
    type: MessageEventType;
}
