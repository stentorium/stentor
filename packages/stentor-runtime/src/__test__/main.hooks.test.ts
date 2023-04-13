/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { isLaunchRequest } from "stentor-guards";
import {
    AbstractResponseBuilder,
    Channel,
    Content,
    Context,
    Handler,
    HandlerService,
    Request,
    RuntimeCallback,
    RuntimeContext,
    Storage,
    UserStorageService
} from "stentor-models";
import { LaunchRequestBuilder } from "stentor-request";
import { EventService } from "stentor-service-event";
import { dessmlify, LambdaError } from "stentor-utils";

import { main } from "../main";
import { MOCK_CHANNEL, MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";
import { CustomContext, CustomContextHandler } from "./models/CustomContextHandler";

const appId = "appId";

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
    type: "CustomContextHandler",
    content,
    data: {}
}

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const storage: Storage = {
    createdTimestamp: createdDate.getTime(),
    lastActiveTimestamp: createdDate.getTime(),
    sessionStore: { id: "fakeSession", data: {} }
};

describe("#main() with hooks", () => {
    let request: any;
    let context: any;
    let handlerFactory: HandlerFactory;
    let callbackSpy: sinon.SinonSpy;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;
    let eventService: EventService;
    beforeEach(() => {
        eventService = new EventService();
        eventService.addPrefix({ appId });
    });
    describe("with preExecution hook", () => {
        let preExecution: (
            event: object,
            context: RuntimeContext,
            callback: RuntimeCallback
        ) => Promise<{ event: object; context: RuntimeContext; callback: RuntimeCallback } | undefined>;
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
        });
        describe("that returns undefined", () => {
            beforeEach(() => {
                preExecution = async (event: object, context: RuntimeContext, callback: RuntimeCallback) => {
                    callback(undefined, { message: "Hi" });
                    return Promise.resolve(undefined);
                };
            });
            it("exits immediately after the return", async () => {
                await main(
                    request,
                    context,
                    callbackSpy,
                    [passThroughChannel()],
                    {
                        eventService,
                        handlerFactory,
                        handlerService,
                        userStorageService
                    },
                    {
                        preExecution
                    }
                );
                expect(callbackSpy).to.have.been.calledOnce;
                const arg = callbackSpy.getCall(0);
                expect(arg.args).to.have.length(2);
                expect(arg.args[0]).to.be.undefined;
                expect(arg.args[1]).to.deep.equal({
                    message: "Hi"
                });
            });
        });
        describe("that modifies the context", () => {
            beforeEach(() => {
                preExecution = async (event: object, context: RuntimeContext, callback: RuntimeCallback) => {
                    // This should mess things up and cause an error to be thrown later in main()
                    event = {};
                    return { event, context, callback };
                };
            });
            it("surfaces the error in the callback", async () => {
                await main(
                    request,
                    context,
                    callbackSpy,
                    [passThroughChannel()],
                    {
                        eventService,
                        handlerFactory,
                        handlerService,
                        userStorageService
                    },
                    {
                        preExecution
                    }
                );
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWith(null, {
                    name: 'I\'m having trouble with that request',
                    tag: 'TROUBLE_WITH_REQUEST',
                    outputSpeech:
                    {
                        ssml:
                            '<speak>I\'m sorry, I\'m having trouble with that request.</speak>',
                        displayText: 'I\'m sorry, I\'m having trouble with that request.',
                        defaultLocale: 'en'
                    }
                });
            });
        });
        describe("that throws an error", () => {
            beforeEach(() => {
                preExecution = async (event: object, context: RuntimeContext, callback: RuntimeCallback) => {
                    const BAD_REQUEST = 400;
                    throw new LambdaError("We have problems.", BAD_REQUEST);
                    return { event, context, callback };
                };
            });
            it("surfaces the error in the callback", async () => {
                await main(
                    request,
                    context,
                    callbackSpy,
                    [passThroughChannel()],
                    {
                        eventService,
                        handlerFactory,
                        handlerService,
                        userStorageService
                    },
                    {
                        preExecution
                    }
                );
                expect(callbackSpy).to.have.been.calledOnce;
                const arg = callbackSpy.getCall(0);
                expect(arg.args).to.have.length(2);
                expect(arg.args[0] instanceof Error).to.be.true;
                expect(arg.args[1]).to.be.undefined;
            });
        });
        describe("on the channel", () => {
            describe("with a postRequestTranslation hook", () => {
                let postRequestTranslationHookSpy: sinon.SinonSpy;
                beforeEach(() => {
                    postRequestTranslationHookSpy = sinon.spy((incoming: object) => { return incoming; });
                });
                it("is called", async () => {

                    const channelWithHooks: Channel = { ...MOCK_CHANNEL };
                    channelWithHooks.hooks = {
                        postRequestTranslation: postRequestTranslationHookSpy
                    }

                    await main({ "text": "hello!" }, context, callbackSpy, [channelWithHooks], {
                        eventService,
                        handlerFactory,
                        handlerService,
                        userStorageService
                    });
                    // Make sure it was called
                    expect(postRequestTranslationHookSpy).to.have.been.calledOnce;
                    // And make sure the callback is called and execution completes
                    expect(callbackSpy).to.have.been.calledOnce;
                    const arg = callbackSpy.getCall(0);
                    expect(arg.args).to.have.length(2);
                    expect(arg.args[0]).to.not.exist;
                    expect(arg.args[1]).to.contain({ mock: true });
                });
            });
        });
    });
    describe("with postRequestTranslate hook", () => {
        let postRequestTranslation: (request: Request) => Promise<Request>;
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            // The hook
            postRequestTranslation = async (request: Request): Promise<Request> => {
                request.userId = "newID";
                return request;
            };
        });
        it("reports the error", async () => {
            await main(
                request,
                context,
                callbackSpy,
                [passThroughChannel()],
                {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                },
                {
                    postRequestTranslation
                }
            );
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                name: "Name",
                outputSpeech: {
                    ssml: "<speak>Hello World!</speak>",
                    displayText: "Hello World!"
                },
            });
            // Validate the request was called by checking the ID is was called with
            expect(userStorageService.get).to.has.been.called;
            expect(userStorageService.get).to.has.been.calledWith("newID");
        });
    });
    describe("with postContextCreation hook", () => {
        let postContextCreation: (request: Request, context: Context) => Promise<{ request: Request, context: Context }>;

        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler, CustomContextHandler], mappings: { ["CustomContextHandler"]: CustomContextHandler } });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: customHandler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            // The hook to test!
            postContextCreation = async (request: Request, context: CustomContext): Promise<{ request: Request, context: Context }> => {
                request.userId = "newID";
                context.foo = 1
                return { request, context };
            };
        });
        it("updates the request and context", async () => {
            await main(
                request,
                context,
                callbackSpy,
                [passThroughChannel()],
                {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                },
                {
                    postContextCreation
                }
            );
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                outputSpeech: {
                    displayText: "newID 1",
                    ssml: "<speak>newID 1</speak>"
                },
            });
        });
    });
    describe("with preResponseTranslation hook (alexa)", () => {
        let preResponseTranslation: (request: Request, response: AbstractResponseBuilder, storage: Storage) => Promise<{ request: Request; response: AbstractResponseBuilder; storage: Storage }>;

        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            storage.sessionStore.data.transcript = undefined;
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ storage })
            });

            // The hook
            preResponseTranslation = async (request: Request, response: AbstractResponseBuilder, userStorage: Storage): Promise<{ request: Request; response: AbstractResponseBuilder; storage: Storage }> => {
                const transcript = [];

                if (isLaunchRequest(request)) {
                    transcript.push(request.rawQuery || request.intentId);
                }
                transcript.push(dessmlify(response.response.outputSpeech.ssml));

                userStorage.sessionStore.data.transcript = transcript;

                return { request, response, storage: userStorage };
            };
        });
        it("save input/output", async () => {
            await main(
                request,
                context,
                callbackSpy,
                [passThroughChannel()],
                {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                },
                {
                    preResponseTranslation
                }
            );

            const userStore = await userStorageService.get("fakeUserId");
            const transcript = userStore?.sessionStore?.data.transcript;

            expect(transcript).exist;
            expect(transcript.length).equals(2);
            expect(transcript[0]).equals("LaunchRequest");
            expect(transcript[1]).equals("Hello World!");
        });
    });

    describe("with preResponseTranslation hook (dialogflow)", () => {
        let preResponseTranslation: (request: Request, response: AbstractResponseBuilder, userStorage: Storage) => Promise<{ request: Request; response: AbstractResponseBuilder; storage: Storage }>;

        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            storage.sessionStore.data.transcript = undefined;
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ storage })
            });

            // The hook
            preResponseTranslation = async (request: Request, response: AbstractResponseBuilder, userStorage: Storage): Promise<{ request: Request; response: AbstractResponseBuilder; storage: Storage }> => {
                const transcript = [];

                if (isLaunchRequest(request)) {
                    transcript.push(request.rawQuery || request.intentId);
                }
                transcript.push(dessmlify(response.response.outputSpeech.ssml));

                userStorage.sessionStore.data.transcript = transcript;

                return { request, response, storage: userStorage };
            };
        });
        it("save input/output", async () => {
            await main(
                request,
                context,
                callbackSpy,
                [passThroughChannel()],
                {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                },
                {
                    preResponseTranslation
                }
            );

            const userStore = await userStorageService.get("fakeUserId");
            const transcript = userStore.sessionStore.data.transcript;

            expect(transcript).exist;
            expect(transcript.length).equals(2);
            expect(transcript[0]).equals("LaunchRequest");
            expect(transcript[1]).equals("Hello World!");
        });
    });
});
