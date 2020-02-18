/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { Event } from "stentor-models";
import {
    AudioPlayerRequestBuilder,
    InputUnknownRequestBuilder,
    IntentRequestBuilder,
    LaunchRequestBuilder,
    PlaybackControlRequestBuilder
} from "stentor-request";
import { AbstractEventStream } from "../AbstractEventStream";
import { MESSAGE_EVENT_TYPE } from "../Constants";
import * as EventService from "../EventService";

import TestStream from "./TestStream";

Chai.use(SinonChai);
const expect = Chai.expect;

/**
 * Mocks the flush events so they do not get sent to the service
 *
 * @class MockEventStream
 * @extends {EventStream}
 */
class MockEventStream extends AbstractEventStream {
    public async flushEvents(): Promise<void> {
        // dev null
    }
}

function newService(): EventService.EventService {
    return new EventService.EventService(new TestStream());
}

const testEvent: Event = {
    name: "Test Event",
    type: MESSAGE_EVENT_TYPE,
    payload: undefined
};

describe("#wrapCallback()", () => {
    it("Tests that the callback calls the flush.", () => {
        const callback = Sinon.stub();
        const stream = new MockEventStream();
        const flushSpy = Sinon.spy(stream, "flushEvents");
        const wrappedCallback = EventService.wrapCallback(new EventService.EventService(stream), callback);
        wrappedCallback(undefined, { param: "result" });
        expect(flushSpy).to.have.been.called;
    });
    it("Tests that the original callback is called in the flush.", () => {
        const callback = Sinon.stub();
        const stream = new MockEventStream();
        const wrappedCallback = EventService.wrapCallback(new EventService.EventService(stream), callback);
        const err = new Error("Error per requirement of the test.");
        const result = { param: "result" };
        wrappedCallback(err, result);
        expect(callback).to.have.been.calledWith(err, result);
    });
});

describe("EventService", () => {
    describe("#constructor()", () => {
        it("Tests that the event stream is included.", async () => {
            const stream = new MockEventStream();
            const flushSpy = Sinon.spy(stream, "flushEvents");
            const eventService = new EventService.EventService(stream);
            const madeEvent = eventService.event(testEvent);
            await eventService.flush();
            expect(flushSpy).to.have.been.calledOnce;
            expect(flushSpy).to.have.been.calledWith([madeEvent]);
        });

        it("Tests that the event stream is included as an array.", async () => {
            const stream1 = new MockEventStream();
            const stream2 = new MockEventStream();
            const flushSpy1 = Sinon.spy(stream1, "flushEvents");
            const flushSpy2 = Sinon.spy(stream2, "flushEvents");
            const eventService = new EventService.EventService([stream1, stream2]);
            const madeEvent = eventService.event(testEvent);
            await eventService.flush();
            expect(flushSpy1).to.have.been.calledOnce;
            expect(flushSpy1).to.have.been.calledWith([madeEvent]);
            expect(flushSpy2).to.have.been.calledOnce;
            expect(flushSpy2).to.have.been.calledWith([madeEvent]);
        });

        it("Tests that the event stream is included if passed in the props.", async () => {
            const stream = new MockEventStream();
            const flushSpy = Sinon.spy(stream, "flushEvents");
            const eventService = new EventService.EventService({ streams: stream });
            const madeEvent = eventService.event(testEvent);
            await eventService.flush();
            expect(flushSpy).to.have.been.calledOnce;
            expect(flushSpy).to.have.been.calledWith([madeEvent]);
        });

        it("Tests that the event stream is included as an array in the props.", async () => {
            const stream1 = new MockEventStream();
            const stream2 = new MockEventStream();
            const flushSpy1 = Sinon.spy(stream1, "flushEvents");
            const flushSpy2 = Sinon.spy(stream2, "flushEvents");
            const eventService = new EventService.EventService([stream1, stream2]);
            const madeEvent = eventService.event(testEvent);
            await eventService.flush();
            expect(flushSpy1).to.have.been.calledOnce;
            expect(flushSpy1).to.have.been.calledWith([madeEvent]);
            expect(flushSpy2).to.have.been.calledOnce;
            expect(flushSpy2).to.have.been.calledWith([madeEvent]);
        });

        it("Tests that the prefixes are added.", async () => {
            const stream = new MockEventStream();
            const eventService = new EventService.EventService(stream, { prefix1: "Value1" });
            const madeEvent = eventService.event(testEvent);
            await eventService.flush();
            expect(madeEvent).to.have.property("prefix1", "Value1");
        });

        it("Tests that the prefixes are added if included in props.", async () => {
            const stream = new MockEventStream();
            const eventService = new EventService.EventService({ streams: stream, prefix: { prefix1: "Value1" } });
            const madeEvent = eventService.event(testEvent);
            await eventService.flush();
            expect(madeEvent).to.have.property("prefix1", "Value1");
        });
    });
    describe("#addPrefix()", () => {
        const testPrefix: EventService.EventPrefix = {
            param1: "Value1",
            param2: {
                param3: "Value2"
            },
            param4: false
        };

        it("Tests that the prefix is added to every event.", () => {
            const eventService = newService();
            eventService.addPrefix(testPrefix);
            const max = 10;
            for (let i = 0; i < max; ++i) {
                const event = eventService.event(testEvent);
                expect(event).to.contain(testEvent);
                expect(event).to.contain({ param1: "Value1" });
                expect(event).to.deep.include({ param2: { param3: "Value2" } });
                expect(event).to.contain({ param4: false });
            }
        });

        it("Tests that the prefix is added if it's a function.", () => {
            const max = 10;
            let count = 0;
            const funcPrefix: EventService.EventPrefix = {
                stringParam: () => {
                    return count + "";
                },
                objParam: () => {
                    return { param: count + "" };
                }
            };
            const eventService = newService();
            eventService.addPrefix(funcPrefix);
            for (count = 0; count < max; ++count) {
                const event = eventService.event(testEvent);
                expect(event).to.contain(testEvent);
                expect(event).to.contain({ stringParam: count + "" });
                expect(event).to.deep.include({ objParam: { param: count + "" } });
            }
        });

        it("Tests that prefixes are merged.", () => {
            const eventService = newService();
            eventService.addPrefix({
                mergePrefix1: "Value1"
            });
            eventService.addPrefix({
                mergePrefix2: "Value2"
            });

            const max = 10;
            for (let i = 0; i < max; ++i) {
                const event = eventService.event(testEvent);
                expect(event).to.contain(testEvent);
                expect(event).to.contain({ mergePrefix1: "Value1" });
                expect(event).to.deep.include({ mergePrefix2: "Value2" });
            }
        });
    });
    describe("#message()", () => {
        it("Tests that a message event is returned when just a message parameter.", () => {
            const eventService = newService();
            const event = eventService.message("Test Message");
            expect(event).to.deep.include({
                name: "INFO",
                type: "MessageEvent",
                payload: "Test Message"
            });
        });

        it("Tests that a message event is returned when the message contains a name inside the message.", () => {
            const eventService = newService();
            const event = eventService.message("Test: Message");
            expect(event).to.deep.include({
                name: "Test",
                type: "MessageEvent",
                payload: "Message"
            });
        });

        it("Tests that a message event is returned to the message contains a name and message parameter.", () => {
            const eventService = newService();
            const event = eventService.message("Test", "Message");
            expect(event).to.deep.include({
                name: "Test",
                type: "MessageEvent",
                payload: "Message"
            });
        });
    });
    describe("#request()", () => {
        let eventService: EventService.EventService;
        beforeEach(() => {
            eventService = newService();
        });
        describe("for an AudioPlayerRequest", () => {
            it("sets the name", () => {
                const request = new AudioPlayerRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.name).to.equal(request.type);
            });
            it("sets the type", () => {
                const request = new AudioPlayerRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.type).to.equal("REQUEST");
            });
            it("sets the payload", () => {
                const request = new AudioPlayerRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.payload).to.deep.equal({ event: request.event, token: request.token });
            });
        });
        describe("for a IntentRequest", () => {
            it("sets the name", () => {
                const request = new IntentRequestBuilder().withIntentId("HelloIntent").build();
                const event = eventService.request(request);
                expect(event.name).to.equal(request.type);
            });
            it("sets the type", () => {
                const request = new IntentRequestBuilder().withIntentId("HelloIntent").build();
                const event = eventService.request(request);
                expect(event.type).to.equal("REQUEST");
            });
            it("sets the payload", () => {
                const request = new IntentRequestBuilder().withIntentId("HelloIntent").build();
                const event = eventService.request(request);
                expect(event.payload).to.deep.equal({ intent: request.intentId });
            });
            it("sets the rawQuery", () => {
                const request = new IntentRequestBuilder()
                    .withIntentId("HelloIntent")
                    .withRawQuery("hiya")
                    .build();
                const event = eventService.request(request);
                expect(event.payload).to.deep.equal({ intent: request.intentId, rawQuery: "hiya" });
            });
            describe("with slots", () => {
                it("adds the slots", () => {
                    const request = new IntentRequestBuilder()
                        .withSlots({
                            ["foo"]: {
                                name: "foo",
                                value: 1
                            }
                        })
                        .withIntentId("HelloIntent")
                        .build();
                    const event = eventService.request(request);
                    expect(event.payload).to.deep.equal({
                        intent: request.intentId,
                        slots: {
                            ["foo"]: {
                                name: "foo",
                                value: 1
                            }
                        }
                    });
                });
            });
        });
        describe("for a LaunchRequest", () => {
            it("sets the name", () => {
                const request = new LaunchRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.name).to.equal(request.type);
            });
            it("sets the type", () => {
                const request = new LaunchRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.type).to.equal("REQUEST");
            });
            it("sets the payload", () => {
                const request = new LaunchRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.payload).to.be.undefined;
            });
        });
        describe("for an InputUnknown request", () => {
            it("sets the name", () => {
                const request = new InputUnknownRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.name).to.equal(request.type);
            });
            it("sets the type", () => {
                const request = new InputUnknownRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.type).to.equal("REQUEST");
            });
            it("sets the payload", () => {
                const request = new InputUnknownRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.payload).to.deep.equal({
                    intent: "InputUnknown"
                });
            });
            it("sets the rawQuery", () => {
                const request = new InputUnknownRequestBuilder().withRawQuery("query").build();
                const event: Event<any> = eventService.request(request);
                expect(event.payload).to.exist;
                expect(event.payload.rawQuery).to.equal("query");
            });
        });
        describe("for a PlaybackControlRequest", () => {
            it("sets the name", () => {
                const request = new PlaybackControlRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.name).to.equal(request.type);
            });
            it("sets the type", () => {
                const request = new PlaybackControlRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.type).to.equal("REQUEST");
            });
            it("sets the payload", () => {
                const request = new PlaybackControlRequestBuilder().build();
                const event = eventService.request(request);
                expect(event.payload).to.deep.equal({ event: request.event });
            });
        });
    });
    describe("#error()", () => {
        let eventService: EventService.EventService;
        beforeEach(() => {
            eventService = new EventService.EventService();
        });
        describe("for an error", () => {
            it("translates to an event", () => {
                const error = new Error("Standard error");
                const event = eventService.error(error);
                expect(event).to.exist;
                expect(event.type).to.equal("ERROR");
                expect(event.name).to.equal("Error");
                expect(event.payload).to.be.an("object");
                expect(event.payload.message).to.equal("Standard error");
                expect(event.payload.stack).to.exist;
                const EXPECTED_STACK_LENGTH = 13;
                expect(event.payload.stack).to.have.length(EXPECTED_STACK_LENGTH);
            });
        });
        describe("for a type error", () => {
            it("translates to an event", () => {
                const error = new TypeError("Standard error");
                const event = eventService.error(error);
                expect(event).to.exist;
                expect(event.type).to.equal("ERROR");
                expect(event.name).to.equal("TypeError");
                expect(event.payload).to.be.an("object");
                expect(event.payload.message).to.equal("Standard error");
                expect(event.payload.stack).to.exist;
                const EXPECTED_STACK_LENGTH = 13;
                expect(event.payload.stack).to.have.length(EXPECTED_STACK_LENGTH);
            });
        });
    });
});

