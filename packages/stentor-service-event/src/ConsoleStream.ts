/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable no-console */
import { Event } from "stentor-models";
import { AbstractEventStream } from "./AbstractEventStream";

/**
 * A stream that prints the current records to the console.
 */
export class ConsoleStream extends AbstractEventStream {
    public constructor() {
        super();
    }

    public async flushEvents(events: Event<any>[]): Promise<void> {
        console.log(
            `Captured ${events.length} events:\n ${events.reduce((current, event) => {
                return (current += ` ${event.type}:${event.name}`);
            }, "")}`
        );
        return;
    }
}
