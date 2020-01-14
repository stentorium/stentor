/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

import { ActionsOnGoogle } from "@xapp/stentor-actions-on-google";
import { ConversationHandler } from "@xapp/stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { HandlerService, NLUService, RuntimeContext, Storage } from "stentor-models";
import { EventService } from "@xapp/stentor-service-event";
import { DynamoHandlerService } from "@xapp/stentor-service-handler";
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";
import { main } from "../main";


// eslint-disable-next-line @typescript-eslint/no-var-requires
const aogLaunchPayload = require("./assets/ExamplePayloads/aog-actions-intent-main-request.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aogIntentPayload = require("./assets/ExamplePayloads/aog-intent-request.json");

const appId = "appId";
const organizationId = "organizationId";
const intentId = "intentId";

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

const storage: Storage = {
    createdTimestamp: createdDate.getTime(),
    lastActiveTimestamp: createdDate.getTime()
};

describe("#main() with NLU", () => {
    let eventService: EventService;
    let appIntentGetStub: sinon.SinonStub;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;
    let storageGetUserStub: sinon.SinonStub;
    let storageUpdateStub: sinon.SinonStub;
    let userStorageService: DynamoUserStorageService;
    let nlu: NLUService;
    let query: sinon.SinonStub;

    beforeEach(() => {
        eventService = new EventService();
        eventService.addPrefix({ appId });

        callbackSpy = sinon.spy();
        fakeContext = { stentorContext: { platform: "test" } } as any;

        query = sinon.stub().returns(Promise.resolve({ type: "INTENT_REQUEST", intentId, slots: {} }));
        nlu = {
            query
        };

        handlerFactory = new HandlerFactory();

        const handler = new ConversationHandler({
            appId,
            organizationId,
            intentId,
            type: "ConversationHandler",
            data: {},
            content: {
                ["LaunchRequest"]: [
                    {
                        outputSpeech: {
                            ssml: "<speak>Good day!</speak>",
                            displayText: "Good day!"
                        }
                    }
                ],
                [intentId]: [
                    {
                        outputSpeech: {
                            ssml: "<speak>Hello!</speak>",
                            displayText: "Hello!"
                        }
                    }
                ]
            }
        });

        handlerService = new DynamoHandlerService({
            tableName: "app-intent-dev",
            appId: "testAppId"
        });
        appIntentGetStub = sinon.stub(handlerService, "get").returns(Promise.resolve(handler));

        userStorageService = new DynamoUserStorageService({
            tableName: "user-app-dev",
            appId: "testAppId"
        });
        storageGetUserStub = sinon.stub(userStorageService, "get").returns(Promise.resolve({ ...storage }));
        storageUpdateStub = sinon.stub(userStorageService, "update").returns(Promise.resolve({} as any));
    });
    afterEach(() => {
        appIntentGetStub.restore();
        storageGetUserStub.restore();
        storageUpdateStub.restore();
    });
    describe("for a launch request", () => {
        it("does not call the NLU", async () => {
            await main(aogLaunchPayload, fakeContext, callbackSpy, [ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(query).to.have.not.been.called;
        });
        it("returns the correct payload", async () => {
            await main(aogLaunchPayload, fakeContext, callbackSpy, [ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            /* tslint:disable:no-null-keyword */
            expect(callbackSpy).to.have.been.calledWith(null, {
                conversationToken: "",
                expectUserResponse: false,
                finalResponse: {
                    richResponse: {
                        items: [
                            {
                                simpleResponse: {
                                    ssml: "<speak>Good day!</speak>",
                                    displayText: "Good day!"
                                }
                            }
                        ],
                        suggestions: []
                    }
                },
                isInSandbox: true,
                userStorage: '{"userId":"stentor.monitor"}'
            });
        });
    });
    describe("for a intent request", () => {
        it("calls the NLU", async () => {
            await main(aogIntentPayload, fakeContext, callbackSpy, [ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(query).to.have.been.called;
        });
        it("returns the correct payload", async () => {
            await main(aogIntentPayload, fakeContext, callbackSpy, [ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            /* tslint:disable:no-null-keyword */
            expect(callbackSpy).to.have.been.calledWith(null, {
                conversationToken: "",
                expectUserResponse: false,
                finalResponse: {
                    richResponse: {
                        items: [
                            {
                                simpleResponse: {
                                    ssml: "<speak>Hello!</speak>",
                                    displayText: "Hello!"
                                }
                            }
                        ],
                        suggestions: []
                    }
                },
                isInSandbox: true,
                userStorage: '{"userId":"15625311561631308512156"}'
            });
        });
    });
});
