/*! Copyright (c) 2019, XAPPmedia */
// tslint:disable:no-null-keyword
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

import { AlexaRequestBuilder, LAUNCH_REQUEST } from "@xapp/stentor-alexa";
import { DialogflowV2RequestBuilder } from "@xapp/stentor-dialogflow";
import { ConversationHandler } from "@xapp/stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import {
    AbstractResponseBuilder,
    Request as StentorRequest
} from "stentor-models";
import {
    Content,
    Handler,
    HandlerService,
    Request,
    RuntimeCallback,
    RuntimeContext,
    Storage,
    UserStorageService
} from "stentor-models";
import { isLaunchRequest } from "@xapp/stentor-request";
import { EventService } from "@xapp/stentor-service-event";
import { dessmlify, LambdaError } from "@xapp/stentor-utils";

import { main } from "../main";
import { ALEXA_APP_ID, DEFAULT_CHANNELS } from "./assets/Constants";
import { MockHandlerService, MockUserStorageService } from "./Mocks";

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
            request = new AlexaRequestBuilder()
                .withSkillId(ALEXA_APP_ID)
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
        });
        describe("that returns undefined", () => {
            beforeEach(() => {
                preExecution = async (event: object, context: RuntimeContext, callback: RuntimeCallback) => {
                    callback(undefined, { message: "Hi" });
                    return Promise.resolve(undefined);
                };
            });
            it("exists immediately after the return", async () => {
                await main(
                    request,
                    context,
                    callbackSpy,
                    DEFAULT_CHANNELS,
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
                    DEFAULT_CHANNELS,
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
                    DEFAULT_CHANNELS,
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
            it("returns the appropriate response", async () => {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const dialogflowNLURequest = require("./assets/ExamplePayloads/dialogflow-v2-nlu-request");
                await main(dialogflowNLURequest, context, callbackSpy, DEFAULT_CHANNELS, {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
                expect(callbackSpy).to.have.been.calledOnce;
                const arg = callbackSpy.getCall(0);
                expect(arg.args).to.have.length(2);
                expect(arg.args[0]).to.be.undefined;
                expect(arg.args[1]).to.deep.equal({});
            });
        });
    });
    describe("with postRequestTranslate hook", () => {
        let postRequestTranslation: (request: Request) => Promise<Request>;
        beforeEach(() => {
            request = new AlexaRequestBuilder()
                .withSkillId(ALEXA_APP_ID)
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
                DEFAULT_CHANNELS,
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
                response: {
                    outputSpeech: { ssml: "<speak>Hello World!</speak>", type: "SSML" },
                    shouldEndSession: true
                },
                sessionAttributes: {},
                version: "1.0"
            });
            // Validate the request was called by checking the ID is was called with
            expect(userStorageService.get).to.has.been.called;
            expect(userStorageService.get).to.has.been.calledWith("newID");
        });
    });

    describe("with preResponseTranslation hook (alexa)", () => {
        let preResponseTranslation: (request: StentorRequest, response: AbstractResponseBuilder, storage: Storage) => Promise<{ request: StentorRequest; response: AbstractResponseBuilder; storage: Storage }>;

        beforeEach(() => {
            request = new AlexaRequestBuilder()
                .withSkillId(ALEXA_APP_ID)
                .isALaunchRequest()
                .build();
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
            preResponseTranslation = async (request: StentorRequest, response: AbstractResponseBuilder, userStorage: Storage): Promise<{ request: StentorRequest; response: AbstractResponseBuilder; storage: Storage }> => {
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
                DEFAULT_CHANNELS,
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
            expect(transcript[0]).equals(LAUNCH_REQUEST);
            expect(transcript[1]).equals("Hello World!");
        });
    });

    describe("with preResponseTranslation hook (dialogflow)", () => {
        let preResponseTranslation: (request: StentorRequest, response: AbstractResponseBuilder, userStorage: Storage) => Promise<{ request: StentorRequest; response: AbstractResponseBuilder; storage: Storage }>;

        beforeEach(() => {
            request = new DialogflowV2RequestBuilder()
                .isALaunchRequest()
                .build();
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
            preResponseTranslation = async (request: StentorRequest, response: AbstractResponseBuilder, userStorage: Storage): Promise<{ request: StentorRequest; response: AbstractResponseBuilder; storage: Storage }> => {
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
                DEFAULT_CHANNELS,
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
            expect(transcript[0]).equals("talk to an action");
            expect(transcript[1]).equals("Hello World!");
        });
    });
});
