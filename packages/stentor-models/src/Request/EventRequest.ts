/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { EventRequestType } from "./Types";

/**
 * Event Request for sending simple events that require only acknowledgment.
 *
 * Events can be sent without expecting a response from the server except
 * acknowledgment that the event was received.
 */
export interface EventRequest extends BaseRequest {
    /**
     * The type of an event request is always "EVENT_REQUEST"
     */
    type: EventRequestType;
    /**
     * The name of the event being sent
     */
    eventName: string;
    /**
     * Optional metadata associated with the event
     */
    metadata?: Record<string, unknown>;
}
