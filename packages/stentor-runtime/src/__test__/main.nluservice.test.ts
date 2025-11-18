/*! Copyright (c) 2022, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Handler, Storage, HandlerService, UserStorageService, NLUService, NLUQueryResponse, IntentRequest, RawQueryRequest } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";

import { main } from "../main";
import { MockHandlerService, MockNLUService, MockUserStorageService, passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

const appId = "appId";
const intentId = "intentId";
const organizationId = "organizationId";

const handler: Handler = {
    organizationId,
    appId,
    intentId: "LaunchRequest",
    name: "Launch Request",
    type: "ConversationHandler",
    content: {
        ["LaunchRequest"]: [
            {
                name: "Name",
                outputSpeech: "Hello World!"
            }
        ],
    },
    data: {}
};

const intentHandler: Handler = {
    organizationId,
    appId,
    intentId,
    name: "Custom Handler",
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

const intentResponse: NLUQueryResponse = {
    type: "INTENT_REQUEST",
    intentId
}

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const storage: Storage = {
    createdTimestamp: createdDate.getTime(),
    lastActiveTimestamp: createdDate.getTime()
};

describe(`#${main.name}()`, () => {
    let request: IntentRequest;
    let context: any;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;
    let nlu: NLUService;

    let callbackSpy: sinon.SinonSpy;

    describe("with NLU Service", () => {
        describe("for a intent request with intentId NLU_RESULT_PLACEHOLDER", () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().withIntentId("NLU_RESULT_PLACEHOLDER").withRawQuery("the query").build();
                handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
                context = { ovai: { appId } };
                callbackSpy = sinon.spy();
                handlerService = sinon.createStubInstance(MockHandlerService, {
                    get: intentHandler
                });
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage, currentHandler: handler })
                });

                nlu = sinon.createStubInstance(MockNLUService, {
                    query: Promise.resolve(intentResponse)
                });
            });
            it("calls the service", async () => {
                await main(request, context, callbackSpy, [passThroughChannel({ nlu })], {
                    handlerFactory,
                    handlerService,
                    userStorageService,

                });
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWith(null, {
                    name: "Name",
                    outputSpeech: {
                        displayText: "Intent Response",
                        ssml: "<speak>Intent Response</speak>"
                    }
                });

                expect(nlu.query).to.have.been.calledOnce;
                expect(nlu.query).to.have.been.calledWithMatch("the query", {
                    userId: request.userId,
                    sessionId: request.sessionId,
                    locale: request.locale,
                    channel: "stentor",
                    platform: "MOCK",
                });

                // get the first call and make sure session is on the second parameter
                const args = (nlu.query as sinon.SinonStub).getCall(0).args;
                const props = args[1];
                expect(props).to.exist;
                expect(props.session).to.exist;
            });
        });
        describe("for a raw query request", () => {
            beforeEach(() => {
                // request = new IntentRequestBuilder().withIntentId("NLU_RESULT_PLACEHOLDER").withRawQuery("the query").build();
                handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
                context = { ovai: { appId } };
                callbackSpy = sinon.spy();
                handlerService = sinon.createStubInstance(MockHandlerService, {
                    get: intentHandler
                });
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage, currentHandler: handler })
                });

                nlu = sinon.createStubInstance(MockNLUService, {
                    query: Promise.resolve(intentResponse)
                });
            });
            it("calls the service", async () => {
                const rawQueryRequest: RawQueryRequest = {
                    type: "RAW_QUERY_REQUEST",
                    rawQuery: "the query",
                    userId: "userId",
                    sessionId: "sessionId",
                    locale: "en-US",
                    channel: "stentor",
                    platform: "MOCK",
                }
                await main(rawQueryRequest, context, callbackSpy, [passThroughChannel({ nlu })], {
                    handlerFactory,
                    handlerService,
                    userStorageService,

                });
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWith(null, {
                    name: "Name",
                    outputSpeech: {
                        displayText: "Intent Response",
                        ssml: "<speak>Intent Response</speak>"
                    }
                });

                expect(nlu.query).to.have.been.calledOnce;
                expect(nlu.query).to.have.been.calledWithMatch("the query", {
                    userId: rawQueryRequest.userId,
                    sessionId: rawQueryRequest.sessionId,
                    locale: rawQueryRequest.locale,
                    channel: "stentor",
                    platform: "MOCK",
                });

                // get the first call and make sure session is on the second parameter
                const args = (nlu.query as sinon.SinonStub).getCall(0).args;
                const props = args[1];
                expect(props).to.exist;
                expect(props.session).to.exist;
            });
        });
        describe("with resolved intentId", () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().withIntentId(intentId).withRawQuery("the query").build();
                handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
                context = { ovai: { appId } };
                callbackSpy = sinon.spy();
                handlerService = sinon.createStubInstance(MockHandlerService, {
                    get: intentHandler
                });
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage, currentHandler: handler })
                });

                nlu = sinon.createStubInstance(MockNLUService, {
                    query: Promise.resolve(intentResponse)
                });
            });
            it("does not call the service", async () => {
                await main(request, context, callbackSpy, [passThroughChannel({ nlu })], {
                    handlerFactory,
                    handlerService,
                    userStorageService,

                });
                expect(callbackSpy).to.have.been.calledOnce;
                expect(callbackSpy).to.have.been.calledWith(null, {
                    name: "Name",
                    outputSpeech: {
                        displayText: "Intent Response",
                        ssml: "<speak>Intent Response</speak>"
                    }
                });

                expect(nlu.query).to.have.not.been.called;
            });
        });
    });
});