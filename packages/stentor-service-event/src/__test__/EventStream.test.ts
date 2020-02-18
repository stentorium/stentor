/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { AbstractEventStream } from "../AbstractEventStream";

Chai.use(SinonChai);
const expect = Chai.expect;

class TestEventStream extends AbstractEventStream {
    readonly flushEventsStub: Sinon.SinonStub;

    public constructor() {
        super();
        this.flushEvents = this.flushEventsStub = Sinon.stub().callsFake(this.fakeFlush);
        this.reset = this.reset.bind(this);
    }

    public flushEvents(): Promise<void> {
        // This gets overridden in the constructor, but typescript doesn't let us compile unless it exists.
        return Promise.resolve();
    }

    public reset() {
        this.flushEventsStub.reset();
        this.flushEventsStub.callsFake(this.fakeFlush);
    }

    public fakeFlush() {
        return Promise.resolve();
    }
}

describe("AbstractEventStream", () => {
    it("flushes the events", () => {
        const stream: TestEventStream = new TestEventStream();
        stream.addEvent({ type: "REQUEST", name: "TestName", payload: { message: "TestMessage" } });
        stream.flush();
        expect(stream.flushEvents).calledWithMatch([
            { type: "REQUEST", name: "TestName", payload: { message: "TestMessage" } }
        ]);
    });
});

