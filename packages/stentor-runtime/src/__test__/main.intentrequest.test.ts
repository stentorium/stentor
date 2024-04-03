/*! Copyright (c) 2021, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Content, Handler, HandlerService, Request, Storage, UserStorageService } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { main } from "../main";
import { MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

const content: Content = {
    ["IntentId"]: [
        {
            name: "Hello",
            outputSpeech: "Hello ${f_name}",
            conditions: `slotExists("f_name") && slotDoesNotExist("l_name")`
        },
        {
            name: "Bye",
            outputSpeech: "Bye ${f_name}"
        },
        {
            name: "Hello F & L Name",
            outputSpeech: "Hello ${f_name} ${l_name}",
            conditions: `slotExists("f_name") && slotExists("l_name")`
        },
    ]
};

const handler: Handler = {
    organizationId: "organizationId",
    appId: "AppId",
    intentId: "IntentId",
    name: "Intent Request",
    type: "ConversationHandler",
    content,
    data: {}
};

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const storage: Storage = {
    createdTimestamp: createdDate.getTime(),
    lastActiveTimestamp: createdDate.getTime()
};

let request: Request;
let context: any;
let handlerFactory: HandlerFactory;
let callbackSpy: sinon.SinonSpy;
let handlerService: HandlerService;
let userStorageService: UserStorageService;

describe("#main() for an IntentRequest", () => {
    beforeEach(() => {
        handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
        context = {};
        callbackSpy = sinon.spy();
        handlerService = sinon.createStubInstance(MockHandlerService, {
            get: handler
        });
        userStorageService = sinon.createStubInstance(MockUserStorageService, {
            get: Promise.resolve(storage)
        });
    });
    afterEach(() => {
        callbackSpy.resetHistory();
    });
    describe("with clean session storage", () => {
        beforeEach(async () => {
            request = new IntentRequestBuilder()
                .withIntentId("IntentId").withSlots({
                    ["f_name"]: { name: "f_name", value: "foo", rawValue: "fu" }
                }).build();

            await main(request, context, callbackSpy, [passThroughChannel()], {
                handlerFactory,
                handlerService,
                userStorageService
            });
        });
        after(() => {
            callbackSpy.resetHistory();
        });
        it("gets the storage for the user", async () => {
            expect(userStorageService.get).to.have.been.calledOnce;
            expect(userStorageService.get).to.have.been.calledWith(request.userId);
        });
        it("sets the proper items on storage", () => {
            expect(userStorageService.update).to.have.been.calledOnce;
            const args = (userStorageService.update as sinon.SinonStub).getCall(0).args;
            const userId = args[0];
            expect(userId).to.equal(request.userId);
            const updatedStorage = args[1] as Storage;
            expect(updatedStorage.createdTimestamp).to.equal(createdDate.getTime());
            expect(updatedStorage.currentHandler).contains(handler);
            expect(updatedStorage.currentAudioHandler).to.be.undefined;
            const sessionStorage = updatedStorage.sessionStore;
            expect(sessionStorage).to.exist;
            expect(sessionStorage.id).to.equal("sessionId");
            expect(sessionStorage.data).to.deep.equal({
                knowledge_base_result: undefined,
                current_handler: "IntentId",
                previous_handler: "IntentId",
                slots: { f_name: { name: 'f_name', value: 'foo', rawValue: 'fu' } },
                unknownInputs: 0
            });
        });
        it("returns the proper response", () => {
            expect(callbackSpy).to.have.been.calledOnce;
            // lets pull the argument out and inspect it a little
            const callBackArgs = callbackSpy.getCall(0).args;
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.outputSpeech.ssml).to.equal("<speak>Hello foo</speak>");
        });
    });
    describe("with existing session storage items", () => {
        beforeEach(async () => {
            request = new IntentRequestBuilder()
                .withIntentId("IntentId").withSlots({
                    ["f_name"]: { name: "f_name", value: "foo", rawValue: "fu" }
                }).build();

            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({
                    ...storage,
                    sessionStore: {
                        id: "sessionId",
                        data: {
                            slots: {
                                ["l_name"]: {
                                    name: "l_name",
                                    value: "bar",
                                    rawValue: "bar"
                                }
                            }
                        }
                    }
                })
            });

            await main(request, context, callbackSpy, [passThroughChannel()], {
                handlerFactory,
                handlerService,
                userStorageService
            });
        });
        it("gets the storage for the user", async () => {
            expect(userStorageService.get).to.have.been.calledOnce;
            expect(userStorageService.get).to.have.been.calledWith(request.userId);
        });
        it("sets the proper items on storage", () => {
            expect(userStorageService.update).to.have.been.calledOnce;
            const args = (userStorageService.update as sinon.SinonStub).getCall(0).args;
            const userId = args[0];
            expect(userId).to.equal(request.userId);
            const updatedStorage = args[1] as Storage;
            expect(updatedStorage.createdTimestamp).to.equal(createdDate.getTime());
            expect(updatedStorage.currentHandler).contains(handler);
            expect(updatedStorage.currentAudioHandler).to.be.undefined;
            const sessionStorage = updatedStorage.sessionStore;
            expect(sessionStorage).to.exist;
            expect(sessionStorage.id).to.equal("sessionId");
            expect(sessionStorage.data).to.deep.equal({
                knowledge_base_result: undefined,
                current_handler: "IntentId",
                previous_handler: "IntentId",
                slots: {
                    f_name: { name: 'f_name', value: 'foo', rawValue: 'fu' },
                    l_name: { name: 'l_name', value: 'bar', rawValue: 'bar' }
                },
                unknownInputs: 0
            });
        });
        it("returns the proper response", () => {
            expect(callbackSpy).to.have.been.calledOnce;
            // lets pull the argument out and inspect it a little
            const callBackArgs = callbackSpy.getCall(0).args;
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.outputSpeech.ssml).to.equal("<speak>Hello foo bar</speak>");
        });
        describe("with knowledge base result already on the session", () => {
            describe("with a request without result coming in", () => {
                beforeEach(async () => {
                    request = new IntentRequestBuilder()
                        .withIntentId("IntentId").withSlots({
                            ["f_name"]: { name: "f_name", value: "foo", rawValue: "fu" }
                        }).build();

                    userStorageService = sinon.createStubInstance(MockUserStorageService, {
                        get: Promise.resolve({
                            ...storage,
                            sessionStore: {
                                id: "sessionId",
                                data: {
                                    knowledge_base_result: {
                                        faqs: [
                                            {
                                                question: "What is your favorite scary movie?",
                                                document: "Scream 2"
                                            }
                                        ]
                                    }
                                }
                            }
                        })
                    });

                    await main(request, context, callbackSpy, [passThroughChannel()], {
                        handlerFactory,
                        handlerService,
                        userStorageService
                    });
                });
                it("keeps the original on the session", () => {
                    const args = (userStorageService.update as sinon.SinonStub).getCall(0).args;
                    const userId = args[0];
                    expect(userId).to.equal(request.userId);
                    const updatedStorage = args[1] as Storage;
                    const result = updatedStorage.sessionStore.data.knowledge_base_result;
                    expect(result).to.deep.equal({
                        faqs: [
                            {
                                question: "What is your favorite scary movie?",
                                document: "Scream 2"
                            }
                        ]
                    });
                });
            });
            describe("with a request with new result coming in", () => {
                beforeEach(async () => {
                    request = new IntentRequestBuilder()
                        .withIntentId("IntentId").withSlots({
                            ["f_name"]: { name: "f_name", value: "foo", rawValue: "fu" }
                        })
                        .withKnowledgeBaseResult({
                            documents: [{
                                title: "Answer",
                                document: "This is the answer"
                            }]
                        })
                        .build();

                    userStorageService = sinon.createStubInstance(MockUserStorageService, {
                        get: Promise.resolve({
                            ...storage,
                            sessionStore: {
                                id: "sessionId",
                                data: {
                                    knowledge_base_result: {
                                        faqs: [
                                            {
                                                question: "What is your favorite scary movie?",
                                                document: "Scream 2"
                                            }
                                        ]
                                    }
                                }
                            }
                        })
                    });

                    await main(request, context, callbackSpy, [passThroughChannel()], {
                        handlerFactory,
                        handlerService,
                        userStorageService
                    });
                });
                it("replaces the existing with the new one", () => {
                    const args = (userStorageService.update as sinon.SinonStub).getCall(0).args;
                    const userId = args[0];
                    expect(userId).to.equal(request.userId);
                    const updatedStorage = args[1] as Storage;
                    const result = updatedStorage.sessionStore.data.knowledge_base_result;
                    expect(result).to.deep.equal({
                        documents: [{
                            title: "Answer",
                            document: "This is the answer"
                        }]
                    });
                });
            });
        });
    });
});