/*! Copyright (c) 2021, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import {
    Handler,
    HandlerService,
    KnowledgeBaseService,
    Request,
    RuntimeContext,
    Storage,
    UserStorageService
} from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";

import { main } from "../main";
import { MockKnowledgeBaseService, MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

const appId = "appId";
const intentId = "FooIntent";

const intentHandler: Handler = {
    organizationId: "organizationId",
    appId,
    intentId,
    name: "Intent Request",
    type: "ConversationHandler",
    content: {
        [intentId]: [
            {
                name: "Name",
                outputSpeech: "${$.request.knowledgeBaseResult.faqs[0].document}"
            }
        ]
    },
    data: {}
};

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const storage: Storage = {
    createdTimestamp: createdDate.getTime(),
    lastActiveTimestamp: createdDate.getTime()
};

describe("#main() with KnowledgeBase Service", () => {
    let request: Request;
    let context: RuntimeContext;
    let handlerFactory: HandlerFactory;
    let callbackSpy: sinon.SinonSpy;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;
    let knowledgeBaseService: KnowledgeBaseService;
    let querySpy: sinon.SinonSpy;

    describe("when knowledge base service matches the request", () => {
        beforeEach(() => {
            request = new IntentRequestBuilder().withRawQuery("what is your favorite scary movie").withIntentId(intentId).build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: intentHandler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            knowledgeBaseService = new MockKnowledgeBaseService();
            querySpy = sinon.spy(knowledgeBaseService, "query");
        });
        it("calls the knowledgebase service", async () => {
            await main(request, context, callbackSpy, [passThroughChannel()], {
                handlerFactory,
                handlerService,
                userStorageService,
                knowledgeBaseServices: {
                    ["Foo.*"]: { matchIntentId: "Foo.*", service: knowledgeBaseService }
                }
            });

            expect(querySpy).to.have.been.calledOnce;

            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                name: "Name",
                outputSpeech: {
                    // This is what the Mock returns in the first FAQ
                    displayText: "Scream 2",
                    ssml: "<speak>Scream 2</speak>"
                }
            });
        });
    });
    describe("when knowledge base service does not match the request", () => {
        beforeEach(() => {
            request = new IntentRequestBuilder().withIntentId(
                "InputUnknown"
            ).build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: intentHandler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            knowledgeBaseService = new MockKnowledgeBaseService();
            querySpy = sinon.spy(knowledgeBaseService, "query");
        });
        it("calls the knowledgebase service", async () => {
            await main(request, context, callbackSpy, [passThroughChannel()], {
                handlerFactory,
                handlerService,
                userStorageService,
                knowledgeBaseServices: {
                    ["Foo.*"]: {
                        matchIntentId: "Foo.*",
                        service: knowledgeBaseService
                    }
                }
            });

            expect(querySpy).to.have.not.been.called;

            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                outputSpeech: {
                    ssml: '<speak>Sorry, what was that?</speak>',
                    displayText: 'Sorry, what was that?'
                },
                reprompt: {
                    ssml: '<speak>Can you please say it again?</speak>',
                    displayText: 'Can you please say it again?'
                }
            });
        });
    });
});