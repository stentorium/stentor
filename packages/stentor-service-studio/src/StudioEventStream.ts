/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { AbstractEventStream } from "stentor-service-event";
import { StudioService } from "./StudioService";

export class StudioEventStream extends AbstractEventStream {
    private service: StudioService;
    public constructor(props: { service: StudioService }) {
        super();

        if (!props) {
            throw new TypeError("Invalid props passed to StudioEventStream.");
        }

        this.service = props.service;

        if (!this.service) {
            throw new TypeError("StudioService is required for the StudioEventStream.");
        }
    }

    public flushEvents(events: Event<any>[]): Promise<void> {
        return this.service.putEvents(events);
    }
}
