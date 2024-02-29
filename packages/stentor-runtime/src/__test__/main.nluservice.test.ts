/*! Copyright (c) 2022, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Handler, Storage, HandlerService, UserStorageService, NLUService, NLUQueryResponse, IntentRequest } from "stentor-models";
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
            expect(nlu.query).to.have.been.calledWith("the query", { userId: request.userId, sessionId: request.sessionId, locale: request.locale, channel: "stentor", platform: "MOCK" })
        });
    });
});