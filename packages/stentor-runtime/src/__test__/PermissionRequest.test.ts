/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { DialogflowRequestBuilder, Request as DialogflowRequest } from "@xapp/stentor-dialogflow/lib/v1";
import { CONVERSATION_HANDLER_TYPE, ConversationHandler } from "@xapp/stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Context, Handler, HandlerService, Pii, Request, RuntimeContext, Storage, UserDataRequestStatus } from "stentor-models";
import { isIntentRequest, isPermissionRequest } from "@xapp/stentor-request";
import { DynamoHandlerService } from "@xapp/stentor-service-handler";
import { DynamoPIIService } from "@xapp/stentor-service-pii";
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";
import { main } from "../index";
import { DEFAULT_CHANNELS } from "./assets/Constants";

chai.use(sinonChai);
const expect = chai.expect;

class PermissionTestHandler extends ConversationHandler {
    public canHandleRequest(request: Request, context: Context): boolean {
        if (isPermissionRequest(request)) {
            return true;
        }

        return super.canHandleRequest(request, context);
    }

    public async handleRequest(request: Request, context: Context): Promise<void> {
        if (isPermissionRequest(request)) {
            context.response.say("Hey " + context.pii.name + "!");
        } else if (isIntentRequest(request)) {
            switch (request.intentId) {
                case "TestIntent":
                    const userDataStatus: UserDataRequestStatus = await context.requestUserData("NAME");
                    if (userDataStatus !== UserDataRequestStatus.DEFERRED) {
                        throw new Error("Status is not deferred!");
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

describe("PermissionRequest", () => {
    const organizationId = "organizationId";
    const appId = "appId";
    const intentId = "intentId";

    const handlerProps: Handler = {
        organizationId,
        appId,
        intentId,
        name: "Test Intent",
        type: CONVERSATION_HANDLER_TYPE,
        utterancePatterns: [],
        content: {
            [intentId]: [
                {
                    name: "Test",
                    outputSpeech: "Test"
                }
            ]
        },
        data: {}
    };

    const handler = new PermissionTestHandler(handlerProps);

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - 1);

    const storage: Storage = {
        createdTimestamp: createdDate.getTime(),
        lastActiveTimestamp: createdDate.getTime(),
        currentHandler: handlerProps,
        name: ""
    };

    let requestBody: DialogflowRequest;
    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;
    let piiService: DynamoPIIService;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let userStorageService: DynamoUserStorageService;
    let appIntentGetStub: sinon.SinonStub;
    let storageGetUserStub: sinon.SinonStub;
    let storageUpdateStub: sinon.SinonStub;
    let piiUpdateStub: sinon.SinonStub;
    let handlerFactoryStub: sinon.SinonStub;

    beforeEach(() => {
        callbackSpy = sinon.spy();
        fakeContext = {
            stentorContext: {
                platform: "google"
            }
        } as any;
        handlerFactory = new HandlerFactory();
        handlerService = new DynamoHandlerService({
            tableName: "app-intent-dev",
            appId: "testAppId"
        });
        userStorageService = new DynamoUserStorageService({
            tableName: "user-app-dev",
            appId: "testAppId"
        });

        piiService = new DynamoPIIService({
            tableName: "stentor-pii-dev",
            appId: "testAppId"
        });
        sinon.stub(piiService, "loadPii").callsFake(() => {
            return Promise.resolve({
                token: "test-token",
                appId: "testAppId"
            });
        });
        piiUpdateStub = sinon.stub(piiService, "updatePii").callsFake(() => {
            return Promise.resolve();
        });

        appIntentGetStub = sinon.stub(handlerService, "get").resolves(handler);
        storageGetUserStub = sinon.stub(userStorageService, "get").resolves(storage);
        storageUpdateStub = sinon.stub(userStorageService, "update").resolves(storage);
        // Since PermissionTestHandler is not an officially support handler type,
        // we need to also stub HandlerFactory.fromProps
        handlerFactory = new HandlerFactory();
        handlerFactoryStub = sinon.stub(handlerFactory, "fromProps").returns(handler);
    });

    afterEach(() => {
        appIntentGetStub.reset();
        storageGetUserStub.reset();
        storageUpdateStub.reset();
        handlerFactoryStub.restore();
    });

    after(() => {
        appIntentGetStub.restore();
    });

    it("returns permission request to google", async () => {
        requestBody = DialogflowRequestBuilder.buildSimpleTestRequest();

        await main(requestBody, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
            handlerFactory,
            handlerService,
            userStorageService,
            piiService
        });
        expect(callbackSpy).to.have.been.calledOnce;

        // Dig in
        const callBackArgs = callbackSpy.args[0];
        const error = callBackArgs[0];
        expect(error).to.not.exist;
        const payload = callBackArgs[1];
        expect(payload).to.exist;

        // Pick a few attributes to check
        expect(payload.speech).to.equal("PLACEHOLDER_FOR_PERMISSION");
        expect(payload.contextOut[1].name).to.equal("requesting_permission");
        expect(payload.data.google.systemIntent.data.permissions[0]).to.equal("NAME");
    });

    it("receives permission grant request from google", async () => {
        requestBody = DialogflowRequestBuilder.buildPermissionGrantRequest();

        await main(requestBody, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
            handlerFactory,
            handlerService,
            userStorageService,
            piiService
        });
        expect(callbackSpy).to.have.been.calledOnce;

        // Dig in
        const callBackArgs = callbackSpy.args[0];
        const error = callBackArgs[0];
        expect(error).to.not.exist;
        const payload = callBackArgs[1];
        expect(payload).to.exist;

        // Pick a few attributes to check
        expect(payload.data.google.richResponse.items[0].simpleResponse.ssml).to.equal("<speak>Hey Robin!</speak>");
    });

    it("sets user name on the pii record", async () => {
        requestBody = DialogflowRequestBuilder.buildPermissionGrantRequest();

        await main(requestBody, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
            handlerFactory,
            handlerService,
            userStorageService,
            piiService
        });
        expect(piiUpdateStub).to.have.been.calledOnce;
        const args = piiUpdateStub.args[0];
        const updatedPii = args[0] as Pii;

        expect(updatedPii.name).to.equal("Robin");
    });
});
