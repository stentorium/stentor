/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ContextBuilder } from "stentor-context";
import { HELP_INTENT, STOP_INTENT } from "stentor-interaction-model";
import {
    Content,
    Context,
    Device,
    Forward,
    Handler,
    InputUnknownRequest,
    IntentRequest,
    Request,
    SessionStore,
    Storage
} from "stentor-models";
import {
    InputUnknownRequestBuilder,
    INTENT_REQUEST_TYPE,
    IntentRequestBuilder,
    OPTION_SELECT_ID,
    OptionSelectBuilder
} from "stentor-request";
import { ResponseBuilder } from "stentor-response";
import { createSessionStore } from "stentor-storage";
import { BASE_HANDLER_TYPE } from "../Constants";
import { AbstractHandler } from "../Handler";

chai.use(sinonChai);
const expect = chai.expect;

// Create a thin subclass of Handler since it is abstract
class TestHandler extends AbstractHandler { }

describe("AbstractHandler", () => {
    const appId = "appId";
    const organizationId = "organizationId";
    const intentId = "intentId";

    const props: Handler = {
        appId,
        organizationId,
        intentId,
        type: "TEST",
        content: {}
    };

    let request: Request;
    let content: Content;
    let forward: Forward;
    let response: ResponseBuilder;
    let context: Context;

    const anotherIntentId = "anotherIntendId";
    const intentRequest: IntentRequest = {
        type: INTENT_REQUEST_TYPE,
        intentId,
        sessionId: "sessionId",
        isNewSession: true,
        userId: "userId"
    };
    const storageProps: Storage = {
        createdTimestamp: Date.now(),
        lastActiveTimestamp: Date.now(),
        history: {},
        sessionStore: {
            id: "foo",
            data: {}
        }
    };
    const device: Device = {
        channel: "test",
        audioSupported: true,
        canPlayAudio: true,
        videoSupported: true,
        canPlayVideo: true,
        canSpeak: true,
        canThrowCard: true,
        hasScreen: false,
        canTransferCall: false
    };
    const intentIdContent = {
        name: "default",
        outputSpeech: "prompt",
        reprompt: "reprompt"
    };

    const optionSelectContent = {
        name: "tokenBlack",
        outputSpeech: "optionPrompt",
        reprompt: "optionReprompt"
    };

    beforeEach(() => {
        content = {
            [intentId]: [intentIdContent],
            [OPTION_SELECT_ID]: [optionSelectContent],
            intentOne: [
                {
                    name: "Response One",
                    outputSpeech: "This is the first response"
                }
            ],
            intentTwo: [
                {
                    name: "Response Two",
                    outputSpeech: "This is the second response"
                }
            ],
            HelpIntent: [
                {
                    name: "help",
                    outputSpeech: "You can say X or Y"
                }
            ],
            CancelIntent: []
        };
        forward = {
            intentThree: [
                {
                    intentId: "externalOne"
                }
            ]
        };

        response = sinon.createStubInstance(ResponseBuilder);
        (response.say as any).restore();
        sinon.stub(response, "say").returns(response);

        context = new ContextBuilder()
            .withDevice(device)
            .withResponse(response)
            .withStorage({
                ...storageProps
            })
            .build();
    });
    describe("#constructor()", () => {
        describe("when called with valid props", () => {
            let handler: AbstractHandler;
            beforeEach(() => {
                handler = new TestHandler(props);
            });
            it("sets the type", () => {
                expect(handler.type).to.equal("TEST");
            });
            it("sets the appId", () => {
                expect(handler.appId).to.equal(appId);
            });
            it("sets the organizationId", () => {
                expect(handler.organizationId).to.equal(organizationId);
            });
            it("sets the intentId", () => {
                expect(handler.intentId).to.equal(intentId);
            });
        });
        describe("when called with undefined props", () => {
            it("throws an error", () => {
                const constructor = () => {
                    new TestHandler(undefined);
                };
                expect(constructor).to.throw;
                expect(constructor).to.throw(TypeError, "Invalid props");
            });
        });
        describe("when called with a string as props", () => {
            it("throws an error", () => {
                const constructor = () => {
                    new TestHandler("foo" as any);
                };
                expect(constructor).to.throw;
                expect(constructor).to.throw(TypeError, "Invalid props");
            });
        });
        describe("when called with a number as props", () => {
            it("throws an error", () => {
                const constructor = () => {
                    new TestHandler(1 as any);
                };
                expect(constructor).to.throw;
                expect(constructor).to.throw(TypeError, "Invalid props");
            });
        });
    });
    describe("#start()", () => {
        let handler: TestHandler;
        let request: IntentRequest;

        beforeEach(async () => {
            handler = new TestHandler({
                appId,
                organizationId,
                intentId,
                type: BASE_HANDLER_TYPE,
                content,
                data: {}
            });

            context = new ContextBuilder()
                .withDevice(device)
                .withResponse(response)
                .withStorage({
                    ...storageProps,
                    history: {
                        handler: [
                            {
                                sessionId: "sessionId",
                                intentId: "LaunchRequest",
                                timestamp: 123123
                            }
                        ]
                    }
                })
                .build();
            request = new IntentRequestBuilder().withIntentId(intentId).build();
            await handler.start(request, context);
        });
        it("it returns the response", async () => {
            expect(response.respond).to.have.been.called;
            expect(response.respond).to.have.been.calledWith(intentIdContent);
        });
    });
    describe("#repeat()", () => {
        let handler: TestHandler;
        let request: IntentRequest;
        let newContext: Context;
        describe("without previousResponse set", () => {
            beforeEach(() => {
                handler = new TestHandler({
                    appId,
                    organizationId,
                    intentId,
                    type: BASE_HANDLER_TYPE,
                    content,
                    data: {}
                });
                request = new IntentRequestBuilder().repeatIntent().build();
            });
            it("returns the don't know what to repeat message", async () => {
                await handler.handleRequest(request, context);
                expect(response.say).to.have.been.called;
                expect(response.say).to.have.been.calledWith("Sorry, I'm not sure what you want me to repeat.");
                expect(response.reprompt).to.have.been.not.called;
            });
        });
        describe("with previousResponse set", () => {
            beforeEach(() => {
                const newStorage = { ...storageProps };
                newStorage.previousResponse = {
                    outputSpeech: "previous",
                    reprompt: "previous?"
                };

                newContext = { ...context, storage: newStorage };

                handler = new TestHandler({
                    appId,
                    organizationId,
                    intentId,
                    type: BASE_HANDLER_TYPE,
                    content,
                    data: {}
                });
                request = new IntentRequestBuilder().repeatIntent().build();
            });
            it("returns the previousResponse", async () => {
                await handler.handleRequest(request, newContext);
                expect(response.say).to.have.been.called;
                expect(response.say).to.have.been.calledWith("previous");
                expect(response.reprompt).to.have.been.called;
                expect(response.reprompt).to.have.been.calledWith("previous?");
            });
        });
    });
    describe("#inputUnknown()", () => {
        let handler: TestHandler;
        let request: InputUnknownRequest;
        let newContext: Context;
        let session: SessionStore;
        describe("using the default strategy (GOOGLE)", () => {
            describe("on the first unknown input", () => {
                beforeEach(() => {
                    newContext = new ContextBuilder().withResponse(response).build();
                    handler = new TestHandler({
                        appId,
                        organizationId,
                        intentId,
                        type: BASE_HANDLER_TYPE,
                        content,
                        data: {}
                    });
                    request = new InputUnknownRequestBuilder().build();
                });
                it("returns the first time response", async () => {
                    await handler.handleRequest(request, newContext);
                    expect(response.say).to.have.been.called;
                    expect(response.say).to.have.been.calledWith("Sorry, what was that?");
                });
                it("returns the first time reprompt", async () => {
                    await handler.handleRequest(request, newContext);
                    expect(response.reprompt).to.have.been.called;
                    expect(response.reprompt).to.have.been.calledWith("Can you please say it again?");
                });
                describe("with help content", () => {
                    // no need to do any extra setup here
                    it("sets the help content as helper text on the session storage", async () => {
                        await handler.handleRequest(request, newContext);
                        expect(newContext.session.get("helper")).to.equal("You can say X or Y");
                    });
                });
                describe("with a previous response on the storage", () => {
                    beforeEach(() => {
                        newContext = new ContextBuilder()
                            .withStorage({
                                ...storageProps,
                                previousResponse: {
                                    outputSpeech: {
                                        ssml: "Previous response!"
                                    },
                                    reprompt: {
                                        ssml: "Previous reprompt!"
                                    }
                                }
                            })
                            .withResponse(response)
                            .build();

                        handler = new TestHandler({
                            appId,
                            organizationId,
                            intentId,
                            type: BASE_HANDLER_TYPE,
                            content,
                            data: {}
                        });
                        request = new InputUnknownRequestBuilder().build();
                    });
                    it("sets the reprompt as helper text on the session storage", async () => {
                        await handler.handleRequest(request, newContext);
                        expect(newContext.session.get("helper")).to.equal("Previous reprompt!");
                    });
                });
                describe("without previous response or help content", () => {
                    beforeEach(() => {
                        newContext = new ContextBuilder().withResponse(response).build();

                        handler = new TestHandler({
                            appId,
                            organizationId,
                            intentId,
                            type: BASE_HANDLER_TYPE,
                            content: {},
                            data: {}
                        });
                        request = new InputUnknownRequestBuilder().build();
                    });
                    it("sets the default helper text on the session storage", async () => {
                        await handler.handleRequest(request, newContext);
                        expect(newContext.session.get("helper")).to.equal("What was that?");
                    });
                });
            });
            describe("on the second unknown input", () => {
                describe("with helper text set on storage", () => {
                    beforeEach(() => {
                        const newStorage = { ...storageProps };

                        session = createSessionStore(newStorage);
                        session.set("unknownInputs", 1);
                        session.set("helper", "Helper text");

                        newContext = { ...context, storage: newStorage, session };

                        handler = new TestHandler({
                            appId,
                            organizationId,
                            intentId,
                            type: BASE_HANDLER_TYPE,
                            content,
                            data: {}
                        });
                        request = new InputUnknownRequestBuilder().build();
                    });
                    it("returns the second time response with help", async () => {
                        await handler.handleRequest(request, newContext);
                        expect(response.say).to.have.been.called;
                        expect(response.say).to.have.been.calledWith("Sorry, I still didn't catch that.  Helper text");
                    });
                    it("returns the second time reprompt with help", async () => {
                        await handler.handleRequest(request, newContext);
                        expect(response.reprompt).to.have.been.called;
                        expect(response.reprompt).to.have.been.calledWith("Helper text");
                    });
                });
            });
            describe("on the third unknown input", () => {
                beforeEach(() => {
                    const newStorage = { ...storageProps };

                    session = createSessionStore(newStorage);
                    session.set("unknownInputs", 2);

                    newContext = { ...context, storage: newStorage, session };

                    handler = new TestHandler({
                        appId,
                        organizationId,
                        intentId,
                        type: BASE_HANDLER_TYPE,
                        content,
                        data: {}
                    });
                    request = new InputUnknownRequestBuilder().build();
                });
                it("returns the third time response", async () => {
                    await handler.handleRequest(request, newContext);
                    expect(response.say).to.have.been.called;
                    expect(response.say).to.have.been.calledOnce;
                    expect(response.say).to.have.been.calledWith("Sorry, I wasn't able to help.");
                });
                it("does not call the reprompt", async () => {
                    await handler.handleRequest(request, newContext);
                    expect(response.reprompt).to.have.not.been.called;
                });
            });
        });
        describe("using the REPROMPT strategy", () => {
            const previousResponse = {
                outputSpeech: "In order to proceed, I need your age.  What is your age?",
                reprompt: "What is your age?"
            };
            beforeEach(() => {
                const newStorage = {
                    ...storageProps,
                    previousResponse
                };
                session = createSessionStore(newStorage);

                newContext = { ...context, storage: newStorage, session };

                handler = new TestHandler({
                    appId,
                    organizationId,
                    intentId,
                    type: BASE_HANDLER_TYPE,
                    content,
                    data: {
                        inputUnknownStrategy: "REPROMPT"
                    }
                });
                request = new InputUnknownRequestBuilder().build();
            });
            it("returns the reprompt", async () => {
                await handler.handleRequest(request, newContext);
                expect(response.say).to.have.been.called;
                expect(response.say).to.have.been.calledWith(previousResponse.reprompt);
                expect(response.reprompt).to.have.been.called;
                expect(response.reprompt).to.have.been.calledWith(previousResponse.reprompt);
            });
        });
    });
    describe("#handleRequest()", () => {
        let handler: TestHandler;
        beforeEach(() => {
            handler = new TestHandler({
                appId,
                organizationId,
                intentId,
                type: BASE_HANDLER_TYPE,
                content,
                data: {}
            });
        });
        describe("for option select requests", () => {
            it("returns the initial response", async () => {
                const optionRequest: Request = new OptionSelectBuilder().withSelectedToken("tokenBlack").build();
                await handler.handleRequest(optionRequest, context);
                expect(response.respond).to.have.been.called;
                expect(response.respond).to.have.been.calledWith(optionSelectContent);
            });
        });
        describe("for intent requests", () => {
            it("returns the initial response", async () => {
                await handler.handleRequest(intentRequest, context);
                expect(response.respond).to.have.been.called;
                expect(response.respond).to.have.been.calledWith(intentIdContent);
            });
            it("returns one of its handled intents", async () => {
                request = new IntentRequestBuilder().withIntentId("intentOne").build();
                await handler.handleRequest(request, context);
                expect(response.respond).to.have.been.called;
                expect(response.respond).to.have.been.calledWithMatch({ outputSpeech: "This is the first response" });
            });
            describe("for a HelpIntent", () => {
                it("returns the help for a help intent", async () => {
                    request = new IntentRequestBuilder().help().build();
                    await handler.handleRequest(request, context);
                    expect(response.respond).to.have.been.called;
                    expect(response.respond).to.have.been.calledWith({
                        name: "help",
                        outputSpeech: "You can say X or Y"
                    });
                    expect(response.reprompt).to.have.not.been.called;
                });
            });
            describe("for CancelIntent", () => {
                beforeEach(() => {
                    request = new IntentRequestBuilder().cancel().build();
                });
                describe("with custom content", () => {
                    beforeEach(() => {
                        const contentWithCancel: Content = { ...content };
                        contentWithCancel.CancelIntent.push({
                            outputSpeech: {
                                ssml: "Cancelling",
                                displayText: "Cancelling..."
                            }
                        });

                        handler = new TestHandler({
                            appId,
                            organizationId,
                            intentId,
                            type: BASE_HANDLER_TYPE,
                            content: contentWithCancel,
                            data: {}
                        });
                    });
                    it("returns the correct response", async () => {
                        await handler.handleRequest(request, context);
                        expect(response.respond).to.have.been.called;
                        expect(response.respond).to.have.been.calledWithMatch({
                            outputSpeech: {
                                ssml: "Cancelling",
                                displayText: "Cancelling..."
                            }
                        });
                    });
                });
            });
        });
    });
    describe("#isOwnRequest()", () => {
        let handler: TestHandler;
        beforeEach(() => {
            handler = new TestHandler({
                appId,
                organizationId,
                intentId,
                type: BASE_HANDLER_TYPE,
                content,
                data: {}
            });
        });
        it("returns true for a request for itself", () => {
            const request = new IntentRequestBuilder().withIntentId(intentId).build();
            expect(handler.isOwnRequest(request)).to.be.true;
        });
        it("returns false for a request for another handler", () => {
            const request = new IntentRequestBuilder().withIntentId(anotherIntentId).build();
            expect(handler.isOwnRequest(request)).to.be.false;
        });
    });
    describe("#canHandleRequest()", () => {
        let handler: TestHandler;
        describe("with forward paths", () => {
            beforeEach(() => {
                handler = new TestHandler({
                    appId,
                    organizationId,
                    intentId,
                    type: BASE_HANDLER_TYPE,
                    content: {},
                    forward,
                    data: {}
                });
            });
            describe("with the an intent request", () => {
                it("returns the correct value", () => {
                    const requestTwo = new IntentRequestBuilder().withIntentId("intentTwo").build();
                    expect(handler.canHandleRequest(requestTwo, context)).to.be.false;
                    const requestThree = new IntentRequestBuilder().withIntentId("intentThree").build();
                    expect(handler.canHandleRequest(requestThree, context)).to.be.true;
                });
            });
        });
        describe("with content", () => {
            beforeEach(() => {
                handler = new TestHandler({
                    appId,
                    organizationId,
                    intentId,
                    type: BASE_HANDLER_TYPE,
                    content,
                    forward: {},
                    data: {}
                });
            });
            describe("with the an intent request", () => {
                it("returns the correct value", () => {
                    const requestTwo = new IntentRequestBuilder().withIntentId("intentTwo").build();
                    expect(handler.canHandleRequest(requestTwo, context)).to.be.true;
                    const requestThree = new IntentRequestBuilder().withIntentId("intentThree").build();
                    expect(handler.canHandleRequest(requestThree, context)).to.be.false;
                });
            });
        });
        describe("with fallback regex in content", () => {
            beforeEach(() => {
                handler.content["^((?!(StopIntent|HelpIntent|CancelIntent)).)*$"] = [
                    { name: "fallback", outputSpeech: "This is fallback content" }
                ];
                context = new ContextBuilder().build();
                delete handler.content.HelpIntent;
            });
            it("cannot handle a HelpIntent", () => {
                const request = {
                    ...intentRequest,
                    intentId: HELP_INTENT
                };
                expect(handler.canHandleRequest(request, context)).to.be.false;
            });
            it("can handle a random intent", () => {
                const request = {
                    ...intentRequest,
                    intentId: "someRandomIntent"
                };
                expect(handler.canHandleRequest(request, context)).to.be.true;
            });
        });
    });
    describe("#forwardingPathForRequest()", () => {
        let handler: TestHandler;
        beforeEach(() => {
            handler = new TestHandler({
                appId,
                organizationId,
                intentId,
                type: BASE_HANDLER_TYPE,
                content,
                data: {}
            });
        });
        describe("without forward set", () => {
            it("returns undefined", () => {
                const request = {
                    ...intentRequest,
                    intentId: "someRandomIntent"
                };
                const context = new ContextBuilder()
                    .withDevice(device)
                    .withResponse(response)
                    .withStorage({
                        ...storageProps
                    })
                    .build();
                expect(handler.forwardingPathForRequest(request, context)).to.be.undefined;
            });
        });
        describe("with forwards", () => {
            let handler: TestHandler;
            beforeEach(() => {
                handler = new TestHandler({
                    appId,
                    organizationId,
                    intentId,
                    type: BASE_HANDLER_TYPE,
                    content,
                    data: {},
                    forward: {
                        ["^((?!(StopIntent|HelpIntent|CancelIntent)).)*$"]: [{ intentId: "Fallback" }],
                        StopIntent: [{ intentId: "ForwardedStop" }]
                    }
                });
            });
            it("matches to the correct one on an exact match", () => {
                const request = {
                    ...intentRequest,
                    intentId: STOP_INTENT
                };
                const context = new ContextBuilder()
                    .withDevice(device)
                    .withResponse(response)
                    .withStorage({
                        ...storageProps
                    })
                    .build();
                expect(handler.forwardingPathForRequest(request, context)).to.exist;
                expect(handler.forwardingPathForRequest(request, context).intentId).to.equal("ForwardedStop");
            });
            it("matches to the fallback regex", () => {
                const request = {
                    ...intentRequest,
                    intentId: "random"
                };
                const context = new ContextBuilder()
                    .withDevice(device)
                    .withResponse(response)
                    .withStorage({
                        ...storageProps
                    })
                    .build();
                expect(handler.forwardingPathForRequest(request, context)).to.exist;
                expect(handler.forwardingPathForRequest(request, context).intentId).to.equal("Fallback");
            });
            it("returns undefined for unmatched", () => {
                const request = {
                    ...intentRequest,
                    intentId: HELP_INTENT
                };
                const context = new ContextBuilder()
                    .withDevice(device)
                    .withResponse(response)
                    .withStorage({
                        ...storageProps
                    })
                    .build();
                expect(handler.forwardingPathForRequest(request, context)).to.be.undefined;
            });
        });
    });
    describe("#canHandleInputUnknown", () => {
        let handler: TestHandler;
        beforeEach(() => {
            handler = new TestHandler({
                appId,
                organizationId,
                intentId,
                type: BASE_HANDLER_TYPE,
                content: {},
                forward,
                data: {}
            });
        });
        describe("without an input unknown strategy", () => {
            it("returns false", () => {
                request = new IntentRequestBuilder().withIntentId("foo").build();
                context = new ContextBuilder().build();
                expect(handler.canHandleInputUnknown(request, context)).to.be.false;
            });
        });
        describe("with an input unknown strategy", () => {
            describe("with a previous response", () => {
                let newContext: Context;
                beforeEach(() => {
                    const newStorage = { ...storageProps };
                    newStorage.previousResponse = {
                        outputSpeech: "previous?",
                        reprompt: "previous reprompt?"
                    };

                    newContext = { ...context, storage: newStorage };

                    handler = new TestHandler({
                        appId,
                        organizationId,
                        intentId,
                        type: BASE_HANDLER_TYPE,
                        content,
                        data: {
                            inputUnknownStrategy: "REPROMPT"
                        }
                    });
                    request = new IntentRequestBuilder().repeatIntent().build();
                });
                it("returns true", () => {
                    expect(handler.canHandleInputUnknown(request, newContext)).to.be.true;
                });
            });
            describe("without a previous response", () => {
                let newContext: Context;
                beforeEach(() => {
                    const newStorage = { ...storageProps };
                    newStorage.previousResponse = {
                        outputSpeech: "previous?"
                    };

                    newContext = { ...context, storage: newStorage };

                    handler = new TestHandler({
                        appId,
                        organizationId,
                        intentId,
                        type: BASE_HANDLER_TYPE,
                        content,
                        data: {
                            inputUnknownStrategy: "REPROMPT"
                        }
                    });
                    request = new IntentRequestBuilder().repeatIntent().build();
                });
                it("returns false", () => {
                    expect(handler.canHandleInputUnknown(request, newContext)).to.be.false;
                });
            });
        });
    });
});
