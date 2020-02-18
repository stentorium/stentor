/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable no-console */
import { Event } from "stentor-models";
import { AbstractEventStream } from "../AbstractEventStream";

export class TestStream extends AbstractEventStream {
    public flushEvents(events: Event<any>[]): Promise<void> {
        console.log(events);
        return Promise.resolve();
    }
}

export default TestStream;
