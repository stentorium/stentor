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

        describe("with eventName and metadata", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    eventName: "user_action",
                    metadata: {
                        action: "button_click",
                        button_id: "submit_form",
                        timestamp: Date.now()
                    },
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
                expect(analyticsEvent.name).to.equal("user_action");
                expect(analyticsEvent.payload).to.deep.equal({
                    action: "button_click",
                    button_id: "submit_form",
                    timestamp: request.metadata.timestamp
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

        describe("with eventName and no metadata", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    eventName: "page_view",
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

            it("sends the event to the event service with undefined metadata", () => {
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
                    eventName: "tracking_event",
                    metadata: {
                        page: "/home"
                    },
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

        describe("with complex metadata", () => {
            beforeEach(async () => {
                request = {
                    type: "EVENT_REQUEST",
                    eventName: "purchase_completed",
                    metadata: {
                        orderId: "order-12345",
                        items: [
                            { sku: "ABC123", quantity: 2, price: 29.99 },
                            { sku: "XYZ789", quantity: 1, price: 49.99 }
                        ],
                        total: 109.97,
                        currency: "USD",
                        paymentMethod: "credit_card"
                    },
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

            it("sends the complex metadata to the event service", () => {
                expect(eventStream.events).to.have.length.greaterThan(0);
                const analyticsEvent = eventStream.events.find(e => e.type === "AnalyticsEvent");
                expect(analyticsEvent).to.exist;
                expect(analyticsEvent.name).to.equal("purchase_completed");
                expect(analyticsEvent.payload).to.deep.equal(request.metadata);
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
