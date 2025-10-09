/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { HandlerFactory } from "stentor-handler-factory";
import { Event, EventRequest, EventStream, HandlerService, Storage, UserStorageService } from "stentor-models";
import { EventService } from "stentor-service-event";

import { main } from "../main";
import { MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

const appId = "appId";

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const storage: Storage = {
    createdTimestamp: createdDate.getTime(),
    lastActiveTimestamp: createdDate.getTime()
};

/**
 * Simple implementation of EventStream instrumented for testing.
 */
class TestEventStream implements EventStream {
    public events: Event[] = [];
    public flushed = false;

    public addEvent(event: Event) {
        this.events.push(event);
    }

    public async flush() {
        this.flushed = true;
    }
}

let request: EventRequest;
let context: any;
let handlerFactory: HandlerFactory;
let callbackSpy: sinon.SinonSpy;
let handlerService: HandlerService;
let userStorageService: UserStorageService;

let eventService: EventService;
let eventStream: TestEventStream;

describe("#main()", () => {
    describe("for an EventRequest", () => {
        beforeEach(() => {
            handlerFactory = new HandlerFactory({ handlers: [] });
            context = {};
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService);
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve(storage)
            });

            eventService = new EventService();
            eventService.addPrefix({ appId });

            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
        });
        afterEach(() => {
            callbackSpy.resetHistory();
        });

        describe("with single event", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    events: [
                        {
                            name: "user_action",
                            type: "AnalyticsEvent",
                            payload: {
                                action: "button_click",
                                button_id: "submit_form",
                                timestamp: Date.now()
                            } as any
                        }
                    ],
                    userId: "user123",
                    platform: "stentor-platform",
                    channel: "widget"
                };

                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            after(() => {
                callbackSpy.resetHistory();
            });

            it("does not call the user storage service", () => {
                expect(userStorageService.get).to.not.have.been.called;
            });

            it("does not call the handler service", () => {
                expect(handlerService.get).to.not.have.been.called;
            });

            it("sends the event to the event service", () => {
                expect(eventStream.events).to.have.length.greaterThan(0);
                const analyticsEvent = eventStream.events.find(e => e.type === "AnalyticsEvent");
                expect(analyticsEvent).to.exist;
                expect(analyticsEvent?.name).to.equal("user_action");
                expect(analyticsEvent?.payload).to.deep.equal({
                    action: "button_click",
                    button_id: "submit_form",
                    timestamp: (request.events[0].payload as any).timestamp
                });
            });

            it("returns an acknowledgment response", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.getCall(0).args;
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const payload = callBackArgs[1];
                expect(payload).to.exist;
                expect(payload).to.deep.equal({ status: "acknowledged" });
            });
        });

        describe("with event without payload", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    events: [
                        {
                            name: "page_view",
                            type: "AnalyticsEvent"
                        }
                    ],
                    userId: "user456",
                    platform: "stentor-platform",
                    channel: "widget"
                };

                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            after(() => {
                callbackSpy.resetHistory();
            });

            it("sends the event to the event service with undefined payload", () => {
                expect(eventStream.events).to.have.length.greaterThan(0);
                const analyticsEvent = eventStream.events.find(e => e.type === "AnalyticsEvent");
                expect(analyticsEvent).to.exist;
                expect(analyticsEvent.name).to.equal("page_view");
                expect(analyticsEvent.payload).to.be.undefined;
            });

            it("returns an acknowledgment response", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.getCall(0).args;
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const payload = callBackArgs[1];
                expect(payload).to.exist;
                expect(payload).to.deep.equal({ status: "acknowledged" });
            });
        });

        describe("without event service", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    events: [
                        {
                            name: "tracking_event",
                            type: "AnalyticsEvent",
                            payload: {
                                page: "/home"
                            } as any
                        }
                    ],
                    userId: "user789",
                    platform: "stentor-platform",
                    channel: "widget"
                };

                await main(request, context, callbackSpy, [passThroughChannel()], {
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            after(() => {
                callbackSpy.resetHistory();
            });

            it("does not throw an error", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.getCall(0).args;
                const error = callBackArgs[0];
                expect(error).to.not.exist;
            });

            it("returns an acknowledgment response", () => {
                const callBackArgs = callbackSpy.getCall(0).args;
                const payload = callBackArgs[1];
                expect(payload).to.exist;
                expect(payload).to.deep.equal({ status: "acknowledged" });
            });
        });

        describe("with complex payload", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    events: [
                        {
                            name: "purchase_completed",
                            type: "AnalyticsEvent",
                            payload: {
                                orderId: "order-12345",
                                items: [
                                    { sku: "ABC123", quantity: 2, price: 29.99 },
                                    { sku: "XYZ789", quantity: 1, price: 49.99 }
                                ],
                                total: 109.97,
                                currency: "USD",
                                paymentMethod: "credit_card"
                            } as any
                        }
                    ],
                    userId: "user999",
                    platform: "stentor-platform",
                    channel: "widget"
                };

                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            after(() => {
                callbackSpy.resetHistory();
            });

            it("sends the complex payload to the event service", () => {
                expect(eventStream.events).to.have.length.greaterThan(0);
                const analyticsEvent = eventStream.events.find(e => e.type === "AnalyticsEvent");
                expect(analyticsEvent).to.exist;
                expect(analyticsEvent.name).to.equal("purchase_completed");
                expect(analyticsEvent.payload).to.deep.equal(request.events[0].payload);
            });

            it("returns an acknowledgment response", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.getCall(0).args;
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const payload = callBackArgs[1];
                expect(payload).to.deep.equal({ status: "acknowledged" });
            });
        });

        describe("with multiple events", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    events: [
                        {
                            name: "page_view",
                            type: "AnalyticsEvent",
                            payload: { page: "/home" } as any
                        },
                        {
                            name: "user_action",
                            type: "AnalyticsEvent",
                            payload: { action: "click", target: "button" } as any
                        },
                        {
                            name: "custom_event",
                            type: "AnalyticsEvent",
                            payload: { data: "test" } as any
                        }
                    ],
                    userId: "user888",
                    platform: "stentor-platform",
                    channel: "widget"
                };

                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            after(() => {
                callbackSpy.resetHistory();
            });

            it("sends all events to the event service", () => {
                expect(eventStream.events).to.have.length.greaterThanOrEqual(3);
                const analyticsEvents = eventStream.events.filter(e => e.type === "AnalyticsEvent");
                expect(analyticsEvents).to.have.length.greaterThanOrEqual(3);

                const pageViewEvent = analyticsEvents.find(e => e.name === "page_view");
                expect(pageViewEvent).to.exist;
                expect(pageViewEvent.payload).to.deep.equal({ page: "/home" });

                const userActionEvent = analyticsEvents.find(e => e.name === "user_action");
                expect(userActionEvent).to.exist;
                expect(userActionEvent.payload).to.deep.equal({ action: "click", target: "button" });

                const customEvent = analyticsEvents.find(e => e.name === "custom_event");
                expect(customEvent).to.exist;
                expect(customEvent.payload).to.deep.equal({ data: "test" });
            });

            it("returns an acknowledgment response", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.getCall(0).args;
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const payload = callBackArgs[1];
                expect(payload).to.deep.equal({ status: "acknowledged" });
            });
        });
    });
});
