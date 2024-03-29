/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ContextBuilder } from "stentor-context";
import { CONVERSATION_HANDLER_TYPE } from "stentor-constants";
import { AbstractHandler, ConversationHandler } from "stentor-handler";
import { DelegatingHandler } from "stentor-handler-delegating";
import * as INTENT from "stentor-interaction-model/lib/Intent/Constants";
import {
    AudioPlayerRequest,
    Content,
    Context,
    Device,
    Handler,
    IntentRequest,
    LaunchRequest,
    Request,
    Storage
} from "stentor-models";
import { AudioPlayerRequestBuilder, IntentRequestBuilder, LaunchRequestBuilder } from "stentor-request";
import { ResponseBuilder } from "stentor-response";
import { HandlerFactory } from "../HandlerFactory";

import { TestHandler, TestAudioHandler, TestAudioData } from "./TestHandler";

chai.use(sinonChai);
const expect = chai.expect;

const appId = "appId";
const organizationId = "organizationId";
const intentId = "intentId";
const content = {};

class t extends AbstractHandler { }

describe("HandlerFactory", () => {
    describe("#constructor()", () => {
        describe("when passed a custom handler", () => {
            it("maps it for use by class name", () => {
                const factory = new HandlerFactory({ handlers: [TestHandler] });
                const handler = factory.fromProps({ appId, organizationId, intentId, content, type: "TestHandler" });
                expect(handler).to.be.instanceOf(TestHandler);
            });
        });
        describe("when passed an unexpected class name (due to uglification)", () => {
            it("throws an error", () => {
                const construct = () => {
                    new HandlerFactory({ handlers: [t] });
                };
                expect(construct).to.throw("Unexpected class name");
            });
        });
    });
    describe("#fromProps()", () => {
        const conversationHandlerProps: Handler = {
            appId,
            organizationId,
            intentId,
            content,
            type: "ConversationHandler"
        };
        const playLiveStreamIntentProps: Handler = {
            appId,
            organizationId,
            intentId,
            content,
            type: "PlayLiveStreamIntent"
        };
        describe("when passed valid props", () => {
            it("returns the correct handler", () => {
                const factory = new HandlerFactory();
                const handler = factory.fromProps(conversationHandlerProps);
                expect(handler).to.exist;
                expect(handler).to.be.instanceOf(ConversationHandler);
            });
        });
        describe("when passed invalid props", () => {
            it("throws a TypeError", () => {
                const factory = new HandlerFactory();
                expect(factory.fromProps.bind(factory, undefined)).to.throw(TypeError);
                expect(factory.fromProps.bind(factory, 1)).to.throw(TypeError);
                expect(factory.fromProps.bind(factory, "foo")).to.throw(TypeError);
            });
        });
        describe("when passed props without a match", () => {
            it("throws an Error", () => {
                const factory = new HandlerFactory();
                expect(factory.fromProps.bind(factory, playLiveStreamIntentProps)).to.throw(Error, "Could not match");
            });
        });
        describe("with mappings", () => {
            describe("when passed valid props", () => {
                it("returns the correct handler", () => {
                    const factory = new HandlerFactory({
                        handlers: [],
                        mappings: { ["PlayLiveStreamIntent"]: TestAudioHandler }
                    });
                    const handler = factory.fromProps(playLiveStreamIntentProps);
                    expect(handler).to.exist;
                    expect(handler).to.be.instanceOf(TestAudioHandler);
                });
            });
        });
        describe("with handler delegates", () => {
            it("returns the correct handler", () => {
                const handleRequest = sinon.spy();
                const factory = new HandlerFactory({
                    mappings: { ["PlayLiveStreamIntent"]: DelegatingHandler },
                    delegates: {
                        [intentId]: {
                            canHandleRequest() {
                                return true;
                            },
                            handleRequest
                        }
                    }
                });
                const handler = factory.fromProps(playLiveStreamIntentProps);
                expect(handler).to.exist;
                expect(handler).to.be.instanceOf(DelegatingHandler);
                handler.handleRequest({} as any, {} as any);
                expect(handleRequest).to.have.been.calledOnce;
            });
        });
    });
    describe("#from()", () => {
        const anotherIntent = "anotherIntentId";
        const unhandledIntentId = "unhandled";

        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - 1);

        const anotherIntentRequest: IntentRequest = new IntentRequestBuilder().withIntentId(anotherIntent).build();
        const intentRequest: IntentRequest = new IntentRequestBuilder().withIntentId(intentId).build();
        const helpRequest: IntentRequest = new IntentRequestBuilder().help().build();
        const launchRequest: LaunchRequest = new LaunchRequestBuilder().build();
        const unhandledRequest: IntentRequest = new IntentRequestBuilder().withIntentId(unhandledIntentId).build();
        const audioPlayerRequest: AudioPlayerRequest = new AudioPlayerRequestBuilder().playbackStarted().build();

        const storage: Storage = {
            createdTimestamp: createdDate.getTime(),
            lastActiveTimestamp: createdDate.getTime()
        };

        const handlerProps: Handler = {
            appId,
            organizationId,
            intentId,
            type: CONVERSATION_HANDLER_TYPE,
            data: {},
            content: {
                [intentId]: [
                    {
                        outputSpeech: "Hello!"
                    }
                ],
                [anotherIntent]: [
                    {
                        outputSpeech: " Hello to you too!"
                    }
                ],
                [INTENT.HELP_INTENT]: [
                    {
                        outputSpeech: "Here is your help!"
                    }
                ]
            }
        };

        const audioHandlerProps: Handler<Content, TestAudioData> = {
            appId,
            organizationId,
            intentId,
            type: "PlayLiveStreamIntent",
            data: {
                url: "https://some.url"
            },
            content: {}
        };

        let baseContext: Context;
        let device: Device;
        let factory: HandlerFactory;

        beforeEach(() => {
            device = {
                channel: "test",
                audioSupported: true,
                canPlayAudio: true,
                videoSupported: true,
                canPlayVideo: true,
                canSpeak: true,
                canThrowCard: true,
                hasScreen: false,
                canTransferCall: false,
                hasWebBrowser: false
            };

            baseContext = new ContextBuilder()
                .withDevice(device)
                .withStorage(storage)
                .withResponse(new ResponseBuilder({ device }))
                .build();
        });
        describe("with only a current handler on storage", () => {
            describe("that can handle the event", () => {
                let context: Context;
                beforeEach(() => {
                    context = { ...baseContext };
                    context.storage.currentHandler = handlerProps;
                    factory = new HandlerFactory({ handlers: [TestAudioHandler] });
                });
                it("passes out the handler", async () => {
                    const handler = await factory.from(anotherIntentRequest, context);
                    expect(handler).to.be.instanceOf(ConversationHandler);
                    expect(handler).to.include(handlerProps);
                });
            });
            describe("that cannot handle the event", () => {
                let context: Context;
                beforeEach(() => {
                    const newContext = { ...baseContext };
                    newContext.storage.currentHandler = handlerProps;
                    context = { ...newContext };
                    factory = new HandlerFactory();
                });
                it("returns the handler", async () => {
                    const handler = await factory.from(unhandledRequest, context);
                    expect(handler).to.include(handlerProps);
                });
            });
            describe("that receives a request for itself", () => {
                let context: Context;
                beforeEach(() => {
                    const newContext = { ...baseContext };
                    newContext.storage.currentHandler = handlerProps;
                    context = { ...newContext };
                    factory = new HandlerFactory();
                });
                it("returns undefined", async () => {
                    const handler = await factory.from(intentRequest, context);
                    expect(handler).to.be.undefined;
                });
            });
        });
        describe("with only a audio player handler on storage", () => {
            beforeEach(() => {
                factory = new HandlerFactory({
                    handlers: [],
                    mappings: { ["PlayLiveStreamIntent"]: TestAudioHandler }
                });
            });
            describe("that can handle the event", () => {
                let context: Context;
                beforeEach(() => {
                    const newContext = { ...baseContext };
                    newContext.storage.currentAudioHandler = audioHandlerProps;
                    // make sure it doesn't exist
                    delete newContext.storage.currentHandler;
                    context = { ...newContext };
                });
                it("passes out the current handler", async () => {
                    const handler = await factory.from(audioPlayerRequest, context);
                    expect(handler).to.be.instanceOf(TestAudioHandler);
                    expect(handler).to.include(audioHandlerProps);
                });
            });
            describe("that cannot handle the event", () => {
                let context: Context;
                beforeEach(() => {
                    const newContext = { ...baseContext };
                    newContext.storage.currentAudioHandler = audioHandlerProps;
                    // make sure it doesn't exist
                    delete newContext.storage.currentHandler;
                    context = { ...newContext };
                });
                it("returns undefined", async () => {
                    const handler = await factory.from(unhandledRequest, context);
                    expect(handler).to.be.undefined;
                });
            });
        });
        describe("with current handler and audio player handler on storage", () => {
            beforeEach(() => {
                factory = new HandlerFactory({
                    handlers: [],
                    mappings: { ["PlayLiveStreamIntent"]: TestAudioHandler }
                });
            });
            describe("that receives an audio player event", () => {
                let context: Context;
                let request: Request;
                beforeEach(() => {
                    context = new ContextBuilder()
                        .withDevice(device)
                        .playingAudio()
                        .withStorage({
                            ...storage,
                            currentAudioHandler: audioHandlerProps,
                            currentHandler: handlerProps
                        })
                        .withResponse(new ResponseBuilder({ device }))
                        .build();
                    request = new AudioPlayerRequestBuilder().playbackStarted().build();
                });
                it("returns the audio player handler", async () => {
                    const handler = factory.from(request, context);
                    expect(handler).to.include(audioHandlerProps);
                });
            });
            describe("that receives an event the handler can handle", () => {
                let context: Context;
                beforeEach(() => {
                    const newContext = { ...baseContext };
                    newContext.storage.currentHandler = handlerProps;
                    newContext.storage.currentAudioHandler = audioHandlerProps;
                    context = { ...newContext };
                });
                it("returns the normal current handler", async () => {
                    const handler = factory.from(helpRequest, context);
                    expect(handler).to.include(handlerProps);
                });
            });
            describe("that receives an event neither can handle", () => {
                let context: Context;
                beforeEach(() => {
                    const newContext = { ...baseContext };
                    newContext.storage.currentHandler = handlerProps;
                    newContext.storage.currentAudioHandler = audioHandlerProps;
                    context = { ...newContext };
                });
                it("returns the handler", async () => {
                    const handler = factory.from(launchRequest, context);
                    expect(handler).to.include(handlerProps);
                });
            });
        });
    });
});
