/*! Copyright (c) 2022, XAPP AI */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import {
    Content,
    Handler,
    HandlerService,
    NLUService,
    NLUQueryResponse,
    Storage,
    UserStorageService
} from "stentor-models";
import { LaunchRequestBuilder } from "stentor-request";
import { EventService } from "stentor-service-event";

import { main } from "../main";
import { MockHandlerService, MockNLUService, MockUserStorageService, passThroughChannel } from "./Mocks";

const appId = "appId";
const intentId = "intentId";

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

const intentResponse: NLUQueryResponse = {
    type: "INTENT_REQUEST",
    intentId
}

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const storage: Storage = {
    createdTimestamp: createdDate.getTime(),
    lastActiveTimestamp: createdDate.getTime(),
    sessionStore: { id: "fakeSession", data: {} }
};

describe("#main() with channels", () => {
    let request: any;
    let context: any;
    let handlerFactory: HandlerFactory;
    let callbackSpy: sinon.SinonSpy;
    let preResponseTranslationSpy: sinon.SinonSpy;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;
    let eventService: EventService;
    let nlu: NLUService;
    beforeEach(() => {
        eventService = new EventService();
        eventService.addPrefix({ appId });
    });
    describe("that have hooks", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            preResponseTranslationSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
            nlu = sinon.createStubInstance(MockNLUService, {
                query: Promise.resolve(intentResponse),
                setContext: Promise.resolve()
            });
        });
        it("are called correct", async () => {

            await main(
                request,
                context,
                callbackSpy,
                [passThroughChannel({ hooks: { preResponseTranslation: preResponseTranslationSpy }, nlu })],
                {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                }
            );

            expect(callbackSpy).to.have.been.calledOnce;
            const arg = callbackSpy.getCall(0);
            expect(arg.args).to.have.length(2);
            expect(arg.args[0]).to.be.null;
            expect(arg.args[1]).to.deep.equal({
                "name": "Name",
                "outputSpeech": {
                    "displayText": "Hello World!",
                    "ssml": "<speak>Hello World!</speak>"
                }
            });

            expect(preResponseTranslationSpy).to.have.been.calledOnce;
        });
    })
});