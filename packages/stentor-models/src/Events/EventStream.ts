/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "./Event";

/**
 * An event stream is a collection of events that eventually get dispatched to a particular
 * endpoint.
 */
export interface EventStream {
    /**
     * Add an event to the stream.  This will not be sent until the event is flushed.
     *
     * @param event The event to send.
     */
    addEvent(event: Event<any>): void;
    /**
     * Send all the events to the end of the stream.
     */
    flush(): Promise<void>;
}
