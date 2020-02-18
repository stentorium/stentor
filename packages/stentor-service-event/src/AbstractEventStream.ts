/*! Copyright (c) 2019, XAPPmedia */
import { Event, EventStream } from "stentor-models";

export abstract class AbstractEventStream implements EventStream {
    private events: Event<any>[];

    public constructor() {
        this.events = [];
    }

    public addEvent(event: Event<any>): void {
        this.events.push(event);
    }

    public flush(): Promise<void> {
        return this.flushEvents(this.events).then(() => {
            this.events = [];
        });
    }

    protected abstract flushEvents(event: Event<any>[]): Promise<void>;
}

export default EventStream;
