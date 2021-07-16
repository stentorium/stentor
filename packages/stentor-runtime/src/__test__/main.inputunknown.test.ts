/*! Copyright (c) 2021, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Content, Handler, HandlerService, Request, Storage, UserStorageService } from "stentor-models";
import { InputUnknownRequestBuilder } from "stentor-request";
import { main } from "../main";
import { MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

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
    appId: "AppId",
    intentId: "LaunchRequest",
    name: "Launch Request",
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

describe.only(`#main() with InputUnknown`, () => {
    beforeEach(() => {
        handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
        context = {};
        callbackSpy = sinon.spy();
        handlerService = sinon.createStubInstance(MockHandlerService, {
            get: handler
        });
        userStorageService = sinon.createStubInstance(MockUserStorageService, {
            get: Promise.resolve({ ...storage })
        });
    });

    describe("on the first input unknown", () => {
        beforeEach(async () => {
            request = new InputUnknownRequestBuilder().build();

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
        it("increases the count", () => {
            expect(userStorageService.update).to.have.been.calledOnce;
            const args = (userStorageService.update as sinon.SinonStub).getCall(0).args;
            const userId = args[0];
            expect(userId).to.equal(request.userId);
            const updatedStorage = args[1] as Storage;
            console.log(updatedStorage);
            expect(updatedStorage.sessionStore.data.unknownInputs).to.equal(1);
        });
    });
    describe("with one earlier input unknown requests", () => {
        beforeEach(async () => {
            request = new InputUnknownRequestBuilder().build();

            await main(request, context, callbackSpy, [passThroughChannel()], {
                handlerFactory,
                handlerService,
                userStorageService
            });
        });
        it("increases the count on another input unknown", () => {

        });
        describe("")
        it("resets the count on handled request", () => {

        });
    });
});
