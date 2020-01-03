/*! Copyright (c) 2019, XAPPmedia */
import { EventType } from "./Types";

/**
 * The base structure for an Event. An event must be serializable to a string so
 * it can be reconstructed on the other side.
 */
export interface Event<P extends string | boolean | object | number | undefined = undefined> {
    /**
     * The name of this event.
     */
    name: string;
    /**
     * The type of event which is being sent.
     */
    type: EventType;
    /**
     * The current handler the user was in at the time of the request.
     */
    currentHandler?: string;
    /**
     * The handler that was selected based on the request and the current handler.
     */
    selectedHandler?: string;
    /**
     * Is the event from a health check
     */
    isHealthCheck?: boolean;
    /**
     * Is the event the start of a session.
     */
    isNewSession?: boolean;
    /**
     * A serializable payload to associate with the event.
     */
    payload?: P;
    /**
     * Any additional keys with which this event contains.
     */
    [key: string]: any;
}
