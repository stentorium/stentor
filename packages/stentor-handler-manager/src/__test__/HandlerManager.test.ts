/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { CONVERSATION_HANDLER_TYPE } from "stentor-constants";
import { isHandler, isIntentRequest } from "stentor-guards";
import { HandlerFactory } from "stentor-handler-factory";
import { Context, Device, Handler, HandlerService, Request, Storage, InputUnknownRequest } from "stentor-models";
import { IntentRequestBuilder, InputUnknownRequestBuilder } from "stentor-request";
import { ResponseBuilder } from "stentor-response";
import { HandlerManager } from "../HandlerManager";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

class MockHandlerService implements HandlerService {
    public get(): Promise<Handler> {
        // This is getting stubbed anyways, doesn't matter
        return {} as any;
    }
}

const anotherIntentId = "anotherIntentId";
const appId = "appId";
const intentId = "intentId";
const organizationId = "organizationId";
const yetAnotherIntentId = "yetAnotherIntentId";
const forwardedIntentIdPass = "forwardedIntentIdPass";
const forwardedIntentIdStart = "forwardedIntentIdStart";

const device: Device = {
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

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const handlerProps: Handler = {
    appId,
    organizationId,
    intentId,
    name: "Handler",
    type: CONVERSATION_HANDLER_TYPE,
    content: {
        [intentId]: [
            {
                outputSpeech: "Hello World!"
            }
        ],
        [yetAnotherIntentId]: [
            {
                outputSpeech: "Why hello there!"
            }
        ]
    },
    forward: {
        [forwardedIntentIdPass]: [
            {
                intentId
            }
        ],
        [forwardedIntentIdStart]: [
            {
                type: "START",
                intentId: yetAnotherIntentId
            }
        ]
    },
    data: {}
};

const anotherHandlerProps: Handler = {
    appId,
    organizationId,
    intentId: anotherIntentId,
    name: "Handler",
    type: CONVERSATION_HANDLER_TYPE,
    content: {
        [intentId]: [
            {
                outputSpeech: "Hello Another World!"
            }
        ]
    },
    data: {}
};

const inputUnknownHandler: Handler = {
    appId,
    organizationId,
    intentId: "InputUnknown",
    name: "Input Unknown Handler",
    type: CONVERSATION_HANDLER_TYPE,
    content: {
        ["InputUnknown"]: [
            {
                outputSpeech: "Input Unknown"
            }
        ]
    },
    data: {}
};

let baseContext: Context;
let service: HandlerService;
let factory: HandlerFactory;
let handlerGetStub: sinon.SinonStub;
let storage: Storage;

describe("HandlerManager", () => {
    let manager: HandlerManager;

    beforeEach(() => {
        service = new MockHandlerService();

        handlerGetStub = sinon.stub(service, "get").resolves(anotherHandlerProps);

        factory = new HandlerFactory();

        manager = new HandlerManager({ service, factory });

        storage = {
            createdTimestamp: createdDate.getTime(),
            lastActiveTimestamp: createdDate.getTime()
        };
    });
    afterEach(() => {
        handlerGetStub.restore();
    });
    describe(`#${HandlerManager.prototype.from.name}()`, () => {
        beforeEach(() => {
            baseContext = {
                device,
                storage,
                response: new ResponseBuilder({ device }),
                services: {}
            };
        });
        describe("when passed bad parameters", () => {
            it("throws error when passed undefined request", async () => {
                expect(manager.from(undefined, undefined)).to.be.rejectedWith("Request was undefined");
            });
            it("throws an error when passed undefined context", async () => {
                expect(
                    manager.from(new IntentRequestBuilder().withIntentId(yetAnotherIntentId).build(), undefined)
                ).to.be.rejectedWith("Context was undefined");
            });
        });
        describe("with current handler on storage", () => {
            describe("that can handle the request", () => {
                let request: Request;
                let newContext: Context;
                describe("with content", () => {
                    beforeEach(() => {
                        // create a request with the same intentId
                        request = new IntentRequestBuilder().withIntentId(yetAnotherIntentId).build();
                        newContext = { ...baseContext };
                        newContext.storage.currentHandler = handlerProps;
                    });
                    it("doesn't call the request handler service", async () => {
                        await manager.from(request, newContext);
                        expect(handlerGetStub).to.have.not.been.called;
                    });
                    it("passes out the handler", async () => {
                        const requestHandler = await manager.from(request, newContext);
                        expect(isHandler(requestHandler)).to.be.true;
                        expect(requestHandler).to.include(handlerProps);
                    });
                });
                describe("with a forwarding path", () => {
                    describe("that is a pass through type", () => {
                        beforeEach(() => {
                            request = new IntentRequestBuilder().withIntentId(forwardedIntentIdPass).build();
                            newContext = { ...baseContext };
                            newContext.storage.currentHandler = handlerProps;
                        });
                        it("calls the request handler service", async () => {
                            await manager.from(request, newContext);
                            expect(handlerGetStub).to.have.been.called;
                            expect(handlerGetStub).to.have.been.calledWith(intentId);
                        });
                        it("does not alter the request", async () => {
                            await manager.from(request, newContext);
                            expect(isIntentRequest(request)).to.be.true;
                            if (isIntentRequest(request)) {
                                expect(request.intentId).to.equal(forwardedIntentIdPass);
                            }
                        });
                    });
                    describe("that is a start type", () => {
                        beforeEach(() => {
                            // The path for forwardedIntentIdStart is intentId: yetAnotherIntentId and type: START
                            // This should:
                            //  1. make a request for yetAnotherIntentId
                            // 2. change the intentId on the request from forwardedIntentIdStart to yetAnotherIntentId so it then calls the start method
                            request = new IntentRequestBuilder().withIntentId(forwardedIntentIdStart).build();
                            newContext = { ...baseContext };
                            newContext.storage.currentHandler = handlerProps;
                        });
                        it("calls the request handler service", async () => {
                            await manager.from(request, newContext);
                            expect(handlerGetStub).to.have.been.called;
                            expect(handlerGetStub).to.have.been.calledWith(yetAnotherIntentId);
                        });
                        it("does alters the request to be for the new intentId", async () => {
                            await manager.from(request, newContext);
                            expect(isIntentRequest(request)).to.be.true;
                            if (isIntentRequest(request)) {
                                expect(request.overrideKey).to.equal(yetAnotherIntentId);
                            }
                        });
                    });
                });
            });
            describe("that cannot handle the request", () => {
                let request: Request;
                let newContext: Context;
                beforeEach(() => {
                    request = new IntentRequestBuilder().withIntentId(anotherIntentId).build();
                    newContext = { ...baseContext };
                    newContext.storage.currentHandler = handlerProps;
                });
                it("requests a new handler", async () => {
                    await manager.from(request, newContext);
                    expect(handlerGetStub).to.have.been.called;
                });
                it("returns the new handler from the service", async () => {
                    const requestHandler = await manager.from(request, newContext);
                    expect(requestHandler).to.include(anotherHandlerProps);
                });
                describe("with a request that does not have a handler in the DB", () => {
                    let request: Request;
                    let newContext: Context;
                    let propsWithInputUnknown: Handler;
                    let inputUnknownFromDB: Handler;
                    beforeEach(() => {
                        request = new IntentRequestBuilder().withIntentId(anotherIntentId).build();
                        newContext = { ...baseContext };
                        propsWithInputUnknown = {
                            ...handlerProps,
                            content: {
                                ["InputUnknown"]: [
                                    {
                                        outputSpeech: "This is the input unknown"
                                    }
                                ]
                            }
                        };
                        newContext.storage.currentHandler = propsWithInputUnknown;
                        // Restore it
                        handlerGetStub.restore();
                        // So we can return undefined
                        handlerGetStub = sinon.stub(service, "get");
                        handlerGetStub.withArgs(anotherIntentId).resolves(undefined);
                        inputUnknownFromDB = {
                            ...handlerProps,
                            content: {
                                ["InputUnknown"]: [
                                    {
                                        outputSpeech: "This is the input unknown from the DB"
                                    }
                                ]
                            }
                        };
                        handlerGetStub.withArgs("InputUnknown").resolves(inputUnknownFromDB);
                    });
                    it("requests the first intentId from the DB", async () => {
                        await manager.from(request, newContext);
                        expect(handlerGetStub).to.have.been.called;
                        expect(handlerGetStub).to.have.been.calledWith(anotherIntentId);
                    });
                    it("returns the handler from DB", async () => {
                        const handler = await manager.from(request, newContext);
                        expect(handler).to.exist;
                        expect(handler).to.include(inputUnknownFromDB);
                    });
                    describe("and current handler does not handle input unknown", () => {
                        let request: Request;
                        let newContext: Context;
                        beforeEach(() => {
                            request = new IntentRequestBuilder().withIntentId(anotherIntentId).build();
                            newContext = { ...baseContext };
                            newContext.storage.currentHandler = handlerProps;
                            // Restore it
                            handlerGetStub.restore();
                            // So we can return undefined
                            handlerGetStub = sinon.stub(service, "get");
                            handlerGetStub.withArgs(anotherIntentId).resolves(undefined);
                            handlerGetStub.withArgs("InputUnknown").resolves(inputUnknownHandler);
                        });
                        it("requests a new handler", async () => {
                            await manager.from(request, newContext);
                            expect(handlerGetStub).to.have.been.calledTwice;
                            expect(handlerGetStub).to.have.been.calledWith(anotherIntentId);
                            expect(handlerGetStub).to.have.been.calledWith("InputUnknown");
                        });
                        it("returns the global input unknown", async () => {
                            const handler = await manager.from(request, newContext);
                            expect(handler).to.exist;
                            expect(handler).to.include(inputUnknownHandler);
                        });
                    });
                });
            });
            describe("for an input unknown request", () => {
                let request: InputUnknownRequest;
                let newContext: Context;
                let handlerWithInputUnknownStrategy: Handler;
                describe("with current handler on storage that can handle it", () => {
                    beforeEach(() => {
                        // create a request with the same intentId
                        request = new InputUnknownRequestBuilder().build();
                        newContext = { ...baseContext };
                        // We will use a REPROMPT inputUnknownStrategy
                        handlerWithInputUnknownStrategy = { ...handlerProps };
                        handlerWithInputUnknownStrategy.data = { inputUnknownStrategy: "REPROMPT" };
                        newContext.storage.currentHandler = handlerWithInputUnknownStrategy;
                        // In order for a REPROMPT strategy to work, there
                        // needs to be a previousResponse
                        newContext.storage.previousResponse = {
                            outputSpeech: "output",
                            reprompt: "reprompt"
                        };
                    });
                    it("doesn't call the request handler service", async () => {
                        await manager.from(request, newContext);
                        expect(handlerGetStub).to.have.not.been.called;
                    });
                    it("returns the handler", async () => {
                        const requestHandler = await manager.from(request, newContext);
                        expect(isHandler(requestHandler)).to.be.true;
                        expect(requestHandler).to.include(handlerWithInputUnknownStrategy);
                        // Go ahead and execute to confirm the output
                        await requestHandler.handleRequest(request, newContext);
                        const response = newContext.response.build();
                        expect(response).to.exist;
                        expect(response).to.deep.equal({
                            outputSpeech: { ssml: '<speak>reprompt</speak>', displayText: 'reprompt' },
                            reprompt: { ssml: '<speak>reprompt</speak>', displayText: 'reprompt' }
                        });
                    });
                });
            });
        });
        describe("when service.get() throws an error", () => {
            let request: Request;
            let newContext: Context;
            beforeEach(() => {
                request = new IntentRequestBuilder().withIntentId(anotherIntentId).build();
                newContext = { ...baseContext };
                newContext.storage.currentHandler = handlerProps;
            });
            describe("with a 404 error", () => {
                beforeEach(() => {
                    handlerGetStub.restore();
                    handlerGetStub = sinon.stub(service, "get");
                    handlerGetStub.withArgs(anotherIntentId).rejects(
                        new Error(`Handler with intentId "${anotherIntentId}" not found. Please verify the intentId exists in your application.`)
                    );
                    handlerGetStub.withArgs("InputUnknown").resolves(inputUnknownHandler);
                });
                it("falls back to InputUnknown handler", async () => {
                    const handler = await manager.from(request, newContext);
                    expect(handler).to.exist;
                    expect(handler).to.include(inputUnknownHandler);
                });
            });
            describe("with an unauthorized error", () => {
                beforeEach(() => {
                    handlerGetStub.restore();
                    handlerGetStub = sinon.stub(service, "get");
                    handlerGetStub.withArgs(anotherIntentId).rejects(
                        new Error("Token provided to OVAIService is unauthorized to perform current action.")
                    );
                    handlerGetStub.withArgs("InputUnknown").resolves(inputUnknownHandler);
                });
                it("falls back to InputUnknown handler", async () => {
                    const handler = await manager.from(request, newContext);
                    expect(handler).to.exist;
                    expect(handler).to.include(inputUnknownHandler);
                });
            });
            describe("with a generic error", () => {
                beforeEach(() => {
                    handlerGetStub.restore();
                    handlerGetStub = sinon.stub(service, "get");
                    handlerGetStub.withArgs(anotherIntentId).rejects(
                        new Error(`OVAIService.get() returned 500 Internal Server Error for intentId "${anotherIntentId}": {"message":"Server error"}`)
                    );
                    handlerGetStub.withArgs("InputUnknown").resolves(inputUnknownHandler);
                });
                it("falls back to InputUnknown handler", async () => {
                    const handler = await manager.from(request, newContext);
                    expect(handler).to.exist;
                    expect(handler).to.include(inputUnknownHandler);
                });
            });
        });
        describe("when InputUnknown handler also fails", () => {
            let request: Request;
            let newContext: Context;
            beforeEach(() => {
                request = new IntentRequestBuilder().withIntentId(anotherIntentId).build();
                newContext = { ...baseContext };
                newContext.storage.currentHandler = handlerProps;
                handlerGetStub.restore();
                handlerGetStub = sinon.stub(service, "get");
                handlerGetStub.withArgs(anotherIntentId).rejects(
                    new Error(`Handler with intentId "${anotherIntentId}" not found. Please verify the intentId exists in your application.`)
                );
                handlerGetStub.withArgs("InputUnknown").rejects(
                    new Error(`Handler with intentId "InputUnknown" not found. Please verify the intentId exists in your application.`)
                );
            });
            it("throws an error about missing InputUnknown", async () => {
                try {
                    await manager.from(request, newContext);
                    expect.fail("Should have thrown an error");
                } catch (error) {
                    expect(error.message).to.include("Required Global InputUnknown was not found");
                }
            });
        });
    });
});
