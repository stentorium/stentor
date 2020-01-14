/*! Copyright (c) 2019, XAPPmedia */
// tslint:disable:no-null-keyword
// tslint:disable:no-magic-numbers
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { Alexa, AlexaRequestBuilder } from "@xapp/stentor-alexa";
import { Dialogflow, DialogflowV2RequestBuilder } from "@xapp/stentor-dialogflow";
import { ConversationHandler } from "@xapp/stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import {
    Channel,
    Content,
    Event,
    EventStream,
    Handler,
    HandlerService,
    Storage,
    UserStorageService
} from "stentor-models";
import { EventService } from "@xapp/stentor-service-event";
import { main } from "../main";
import { MockHandlerService, MockUserStorageService } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

const appId: string = "appId";
const intentId: string = "intentId";

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
    async handleRequest() {
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
    public flushed: boolean = false;

    addEvent(event: Event) {
        this.events.push(event);
    }

    async flush() {
        this.flushed = true;
    }
}

describe("#main() with EventService", () => {
    let request: any;
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
                request = new DialogflowV2RequestBuilder().build();
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
                await main(request, context, callbackSpy, [Dialogflow()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWithMatch(null, {
                    payload: {
                        google: {
                            expectUserResponse: false,
                            richResponse: {
                                items: [
                                    {
                                        simpleResponse: {
                                            displayText: "Intent Response",
                                            ssml: "<speak>Intent Response</speak>"
                                        }
                                    }
                                ]
                            }
                            // Can't match this, it changes with every test because the
                            // userId is dynamically generated
                            // userStorage: '{"userId": "9263411b-e595-64a5-87c6-090c75b35035"}'
                        }
                    }
                });
                expect(eventStream.events).to.have.length(2);
                const requestEvent = eventStream.events[0];
                expect(requestEvent.platform).to.equal("dialogflow");
                expect(requestEvent.type).to.equal("REQUEST");
                expect(requestEvent.name).to.equal("INTENT_REQUEST");
                expect(requestEvent.appId).to.equal(appId);
                expect(requestEvent.sessionId).to.equal("sessionId");
                expect(requestEvent.currentHandler).to.equal("LaunchRequest");
                expect(requestEvent.selectedHandler).to.equal("intentId");
            });
        });
    });
    describe("when the channel selector crashes", () => {
        beforeEach(() => {
            request = new AlexaRequestBuilder()
                .withSkillId(appId)
                .isALaunchRequest()
                .build();
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
            await main(request, context, callbackSpy, [Dialogflow(true)], {
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
            request = new AlexaRequestBuilder()
                .withSkillId(appId)
                .isALaunchRequest()
                .build();
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
            await main(request, context, callbackSpy, [Alexa(appId), Dialogflow(true)], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(error);
            expect(eventStream.events).to.have.length(3);
            const requestEvent = eventStream.events[0];
            expect(requestEvent.platform).to.equal("alexa");
            expect(requestEvent.type).to.equal("REQUEST");
            expect(requestEvent.name).to.equal("LAUNCH_REQUEST");
            expect(requestEvent.appId).to.equal(appId);
            expect(requestEvent.sessionId).to.equal("sessionId");
            const errorEvent = eventStream.events[1];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("alexa");
            expect(errorEvent.payload).to.deep.include({ message: "💣💣💣💣💣💣🔥🔥🔥🔥🔥" });
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when the handler manager can't take it anymore", () => {
        beforeEach(() => {
            request = new AlexaRequestBuilder()
                .withSkillId(appId)
                .isALaunchRequest()
                .build();
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
            await main(request, context, callbackSpy, [Alexa(appId), Dialogflow(true)], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                response: {
                    outputSpeech: {
                        ssml: "<speak>I'm sorry, I'm having trouble with that request.</speak>",
                        type: "SSML"
                    },
                    shouldEndSession: true
                },
                sessionAttributes: {},
                version: "1.0"
            });
            // console.log(eventStream.events);
            expect(eventStream.events).to.have.length(3);
            const errorEvent = eventStream.events[0];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("alexa");
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
            request = new AlexaRequestBuilder()
                .withSkillId(appId)
                .isALaunchRequest()
                .build();
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
            await main(request, context, callbackSpy, [Alexa(appId), Dialogflow(true)], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                response: {
                    outputSpeech: {
                        ssml: "<speak>I'm sorry, I'm having trouble with that request.</speak>",
                        type: "SSML"
                    },
                    shouldEndSession: true
                },
                sessionAttributes: {},
                version: "1.0"
            });
            expect(eventStream.events).to.have.length(3);

            const errorEvent = eventStream.events[0];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.currentHandler).to.be.undefined;
            expect(errorEvent.selectedHandler).to.equal("LaunchRequest");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("alexa");
            expect(errorEvent.payload).to.deep.include({
                message: "💣🔥"
            });
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when the user storage can't update", () => {
        beforeEach(() => {
            request = new AlexaRequestBuilder()
                .withSkillId(appId)
                .isALaunchRequest()
                .build();
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
            await main(request, context, callbackSpy, [Alexa(appId), Dialogflow(true)], {
                eventService,
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                response: {
                    outputSpeech: {
                        ssml: "<speak>Hello World!</speak>",
                        type: "SSML"
                    },
                    shouldEndSession: true
                },
                sessionAttributes: {},
                version: "1.0"
            });
            expect(eventStream.events).to.have.length(3);
            const errorEvent = eventStream.events[0];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("alexa");
            expect(errorEvent.payload).to.deep.include({
                message: "💣"
            });
            expect(eventStream.flushed).to.be.true;
        });
    });
    describe("when the response builder explodes", () => {
        let badAlexaChannel: Channel;
        beforeEach(() => {
            request = new AlexaRequestBuilder()
                .withSkillId(appId)
                .isALaunchRequest()
                .build();
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
            badAlexaChannel = Alexa(appId);
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
            expect(eventStream.events).to.have.length(3);
            const errorEvent = eventStream.events[0];
            expect(errorEvent.type).to.equal("ERROR");
            expect(errorEvent.appId).to.equal(appId);
            expect(errorEvent.platform).to.equal("alexa");
            expect(errorEvent.payload).to.deep.include({
                message: "💥💥💥"
            });
            expect(eventStream.flushed).to.be.true;
        });
    });
});
