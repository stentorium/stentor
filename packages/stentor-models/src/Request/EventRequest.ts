/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "../Events";
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
     * Array of events to be sent to the event service
     */
    events: Event[];
}
