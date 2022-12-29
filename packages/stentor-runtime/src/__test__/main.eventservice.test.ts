/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import {
    Channel,
    Content,
    Event,
    EventStream,
    Handler,
    HandlerService,
    Request,
    Storage,
    UserStorageService
} from "stentor-models";
import { LaunchRequestBuilder, IntentRequestBuilder } from "stentor-request";
import { EventService } from "stentor-service-event";
import { main } from "../main";
import { MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

const appId = "appId";
const intentId = "intentId";

const content: Content = {
    ["LaunchRequest"]: [
        {
            name: "Name",
            outputSpeech: "Hello World!"
        }
    ]
};

const handler: Handler = {
    organizationId: "organizationId",
    appId,
    intentId: "LaunchRequest",
    name: "Launch Request",
    type: "ConversationHandler",
    content,
    data: {}
};

const customHandler: Handler = {
    organizationId: "organizationId",
    appId,
    intentId: "LaunchRequest",
    name: "Launch Request",
    type: "ExplosionHandler",
    content,
    data: {}
};

const intentHandler: Handler = {
    organizationId: "organizationId",
    appId,
    intentId,
    name: "Launch Request",
    type: "ConversationHandler",
    content: {
        [intentId]: [
            {
                name: "Name",
                outputSpeech: "Intent Response"
            }
        ]
    },
    data: {}
};

class ExplosionHandler extends ConversationHandler {
    public async handleRequest() {
        throw new Error("💣🔥");
    }
}

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

describe("#main() with EventService", () => {
    let request: Request;
    let context: any;
    let handlerFactory: HandlerFactory;
    let callbackSpy: sinon.SinonSpy;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;
    let eventService: EventService;
    let eventStream: TestEventStream;
    beforeEach(() => {
        eventService = new EventService();
        eventService.addPrefix({ appId });
    });
    describe("during a normal transaction", () => {
        describe("with a handler on storage", () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().build();
                handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
                context = { ovai: { appId } };
                callbackSpy = sinon.spy();
                handlerService = sinon.createStubInstance(MockHandlerService, {
                    get: intentHandler
                });
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage, currentHandler: handler })
                });
                eventStream = new TestEventStream();
                eventService.addStream(eventStream);
            });
            it("reports the events", async () => {
                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWith(null, {
                    name: "Name",
                    outputSpeech: {
                        displayText: "Intent Response",
                        ssml: "<speak>Intent Response</speak>"
                    }
                });
                expect(eventStream.events).to.have.length(3);
                const requestEvent = eventStream.events[1];
                expect(requestEvent.platform).to.equal("MOCK");
                expect(requestEvent.type).to.equal("REQUEST");
                expect(requestEvent.name).to.equal("INTENT_REQUEST");
                expect(requestEvent.appId).to.equal(appId);
                expect(requestEvent.sessionId).to.equal("sessionId");
                expect(requestEvent.currentHandler).to.equal("LaunchRequest");
                expect(requestEvent.selectedHandler).to.equal("intentId");
                expect(requestEvent.rawQuery).to.be.undefined;
                expect(requestEvent.environment).to.be.undefined;
            });
        });
        describe("without existing handler", () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().withRawQuery("oh hi").build();
                handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
                context = { ovai: { appId } };
                callbackSpy = sinon.spy();
                handlerService = sinon.createStubInstance(MockHandlerService, {
                    get: intentHandler
                });
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage })
                });
                eventStream = new TestEventStream();
                eventService.addStream(eventStream);
            });
            it("reports the events", async () => {
                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWith(null, {
                    name: "Name",
                    outputSpeech: {
                        displayText: "Intent Response",
                        ssml: "<speak>Intent Response</speak>"
                    }
                });
                expect(eventStream.events).to.have.length(3);
                const requestEvent = eventStream.events[1];
                expect(requestEvent.platform).to.equal("MOCK");
                expect(requestEvent.type).to.equal("REQUEST");
                expect(requestEvent.name).to.equal("INTENT_REQUEST");
                expect(requestEvent.appId).to.equal(appId);
                expect(requestEvent.sessionId).to.equal("sessionId");
                expect(requestEvent.currentHandler).to.be.undefined;
                expect(requestEvent.selectedHandler).to.equal("intentId");
                expect(requestEvent.rawQuery).to.equal("oh hi");
            });
        });
        describe("with attributes on the request", () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().build();
                request.attributes = {
                    environment: "updated"
                };
                handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
                context = { ovai: { appId } };
                callbackSpy = sinon.spy();
                handlerService = sinon.createStubInstance(MockHandlerService, {
                    get: intentHandler
                });
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage, currentHandler: handler })
                });
                eventStream = new TestEventStream();
                eventService.addStream(eventStream);
            });
            it("reports the events", async () => {
                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWith(null, {
                    name: "Name",
                    outputSpeech: {
                        displayText: "Intent Response",
                        ssml: "<speak>Intent Response</speak>"
                    }
                });
                expect(eventStream.events).to.have.length(3);
                const requestEvent = eventStream.events[1];
                expect(requestEvent.platform).to.equal("MOCK");
                expect(requestEvent.type).to.equal("REQUEST");
                expect(requestEvent.name).to.equal("INTENT_REQUEST");
                expect(requestEvent.appId).to.equal(appId);
                expect(requestEvent.sessionId).to.equal("sessionId");
                expect(requestEvent.currentHandler).to.equal("LaunchRequest");
                expect(requestEvent.selectedHandler).to.equal("intentId");
                expect(requestEvent.rawQuery).to.be.undefined;
                // this is what we are testing here.
                expect(requestEvent.environment).to.equal("updated");
            });
        });
    });
    describe("when the channel selector crashes", () => {
        beforeEach(() => {
            // @ts-ignore Bad request to crash the channel selector
            request = { bogus: "request" };
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
        });
        it("reports the error", async () => {
            await main(request, context, callbackSpy, [passThroughChannel({
                test: (): boolean => {
                    return false;
                }
            })], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            const arg = callbackSpy.getCall(0);
            expect(arg.args).to.have.length(2);
            expect(arg.args[0] instanceof Error).to.be.true;
            expect(arg.args[1]).to.be.undefined;
            expect(eventStream.events).to.have.length(2);
            const errorEvent = eventStream.events[0];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            // too early to know the platform.
            expect(errorEvent.platform).to.equal("unknown");
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when there is an explosion at the context factory (everybody was ok though)", () => {
        let error: Error;
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
            error = new Error("💣💣💣💣💣💣🔥🔥🔥🔥🔥");
            // This is where we plant the bomb, it is rigged to explode.
            // @ts-ignore Trust us on this one.
            userStorageService = {
                get() {
                    throw error;
                }
            } as UserStorageService;
        });
        it("reports the error", async () => {
            await main(request, context, callbackSpy, [passThroughChannel()], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(error);
            expect(eventStream.events).to.have.length(3);
            const requestEvent = eventStream.events[0];
            expect(requestEvent.platform).to.equal("MOCK");
            expect(requestEvent.type).to.equal("REQUEST");
            expect(requestEvent.name).to.equal("LAUNCH_REQUEST");
            expect(requestEvent.appId).to.equal(appId);
            expect(requestEvent.sessionId).to.equal("sessionId");
            const errorEvent = eventStream.events[1];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("MOCK");
            expect(errorEvent.payload).to.deep.include({ message: "💣💣💣💣💣💣🔥🔥🔥🔥🔥" });
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when the handler manager can't take it anymore", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
            // To throw the error, we pass a customHandler that the handler factory
            // can't build.
            handlerFactory = new HandlerFactory();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: customHandler
            });
        });
        it("reports the error", async () => {
            await main(request, context, callbackSpy, [passThroughChannel()], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                name: "I'm having trouble with that request",
                outputSpeech: {
                    defaultLocale: "en",
                    ssml: "<speak>I'm sorry, I'm having trouble with that request.</speak>",
                    displayText: "I'm sorry, I'm having trouble with that request.",
                },
                tag: "TROUBLE_WITH_REQUEST"
            });

            expect(eventStream.events).to.have.length(3);
            const errorEvent = eventStream.events[0];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("MOCK");
            expect(errorEvent.payload).to.deep.include({
                message: "Required Global InputUnknown was not found."
            });
            const requestEvent = eventStream.events[1];
            expect(requestEvent.type).to.equal("REQUEST");
            expect(requestEvent.name).to.equal("LAUNCH_REQUEST");
            expect(requestEvent.userId).to.equal("userId");
            expect(requestEvent.appId).to.equal("appId");
            expect(requestEvent.sessionId).to.equal("sessionId");
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when the handler has an error", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
            // To throw the error, we pass a customHandler that the handler factory
            // can't has an explosion inside the handleRequest method.
            handlerFactory = new HandlerFactory({ handlers: [ExplosionHandler] });
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: customHandler
            });
        });
        it("reports the error", async () => {
            await main(request, context, callbackSpy, [passThroughChannel()], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                name: "I'm having trouble with that request",
                outputSpeech: {
                    defaultLocale: "en",
                    ssml: "<speak>I'm sorry, I'm having trouble with that request.</speak>",
                    displayText: "I'm sorry, I'm having trouble with that request.",
                },
                tag: "TROUBLE_WITH_REQUEST"
            });
            expect(eventStream.events).to.have.length(3);

            const errorEvent = eventStream.events[0];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.currentHandler).to.be.undefined;
            expect(errorEvent.selectedHandler).to.equal("LaunchRequest");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("MOCK");
            expect(errorEvent.payload).to.deep.include({
                message: "💣🔥"
            });
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when the user storage can't update", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
            // To throw the error, explode the update method
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
                /* update: () => {
                    throw new Error("💣");
                } */
            });
            // Couldn't get the above mock to work so trying it this way.
            userStorageService.update = () => {
                throw new Error("💣");
            };
        });
        it("reports the error", async () => {
            await main(request, context, callbackSpy, [passThroughChannel()], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                name: "Name",
                outputSpeech: {
                    ssml: "<speak>Hello World!</speak>",
                    displayText: "Hello World!"
                }
            });
            expect(eventStream.events).to.have.length(4);
            const errorEvent = eventStream.events[1];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("MOCK");
            expect(errorEvent.payload).to.deep.include({
                message: "💣"
            });
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when the response builder explodes", () => {
        let badAlexaChannel: Channel;
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
            // To throw the error, explode the update method
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            // To throw the error, we plant a bomb on the translate method
            badAlexaChannel = passThroughChannel();
            badAlexaChannel.response = {
                translate() {
                    throw new Error("💥💥💥");
                }
            };
        });
        it("reports the error", async () => {
            await main(request, context, callbackSpy, [badAlexaChannel], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {});
            expect(eventStream.events).to.have.length(4);

            const errorEvent = eventStream.events[1];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("MOCK");
            expect(errorEvent.payload).to.deep.include({
                message: "💥💥💥"
            });
            expect(eventStream.flushed).to.be.true;

            const requestResponseEvent = eventStream.events[0];
            expect(requestResponseEvent.type).to.equal("AnalyticsEvent");
            expect(requestResponseEvent.name).to.equal("REQUEST_RESPONSE");
        });
    });
});
