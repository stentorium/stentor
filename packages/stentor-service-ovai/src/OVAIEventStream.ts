/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { AbstractEventStream } from "@xapp/stentor-service-event";
import { OVAIService } from "./OVAIService";

export class OVAIEventStream extends AbstractEventStream {
    private service: OVAIService;
    public constructor(props: { service: OVAIService }) {
        super();

        if (!props) {
            throw new TypeError("Invalid props passed to OVAIEventStream.");
        }

        this.service = props.service;

        if (!this.service) {
            throw new TypeError("OVAIService is required for the OVAIEventStream.");
        }
    }

    public flushEvents(events: Event<any>[]): Promise<void> {
        return this.service.putEvents(events);
    }
}
