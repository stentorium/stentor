/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { Alexa } from "@xapp/stentor-alexa";
import { HandlerFactory } from "stentor-handler-factory";
import { HandlerService, RuntimeContext, Storage } from "stentor-models";
import { DynamoHandlerService } from "@xapp/stentor-service-handler";
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";
import { main } from "../index";

const APP_ID_FROM_PAYLOAD = "appId";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const payload = require("./assets/ExamplePayloads/sessionendedrequest.json");

chai.use(sinonChai);
const expect = chai.expect;

/**
 * This is an end-to-end test that:
 *
 * 1. takes a request from Amazon for the `SessionEndedRequest`
 * 2. And returns an empty payload
 */
describe("SessionEndedRequest", () => {
    let appIntentGetStub: sinon.SinonStub;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;
    let storageGetUserStub: sinon.SinonStub;
    let storageUpdateStub: sinon.SinonStub;
    let userStorageService: DynamoUserStorageService;

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - 1);

    const storage: Storage = {
        createdTimestamp: createdDate.getTime(),
        lastActiveTimestamp: createdDate.getTime()
    };

    beforeEach(() => {
        callbackSpy = sinon.spy();
        fakeContext = { stentorContext: { platform: "test" } } as any;

        handlerFactory = new HandlerFactory();

        handlerService = new DynamoHandlerService({
            tableName: "app-intent-dev",
            appId: "testAppId"
        });
        appIntentGetStub = sinon.stub(handlerService, "get").returns(Promise.resolve({} as any));

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
    it("does not get the storage for the user", async () => {
        await main(payload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD)], {
            handlerFactory,
            handlerService,
            userStorageService
        });
        expect(storageGetUserStub).to.have.not.been.called;
    });
    it("does not get the intent information", async () => {
        await main(payload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD)], {
            handlerFactory,
            handlerService,
            userStorageService
        });
        expect(appIntentGetStub).to.have.not.been.called;
    });
    it("returns an empty payload with no error", async () => {
        await main(payload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD)], {
            handlerFactory,
            handlerService,
            userStorageService
        });
        expect(callbackSpy).to.have.been.calledOnce;
        const callBackArgs = callbackSpy.args[0];
        const error = callBackArgs[0];
        expect(error).to.not.exist;
        const response = callBackArgs[1];
        expect(response).to.exist;
        expect(response).to.deep.equal({});
    });
    it("does not call set storage", async () => {
        await main(payload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD)], {
            handlerFactory,
            handlerService,
            userStorageService
        });
        expect(storageUpdateStub).to.have.not.been.called;
    });
});
