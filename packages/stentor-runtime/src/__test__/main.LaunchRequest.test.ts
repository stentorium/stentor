/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Content, Handler, HandlerService, Request, Storage, UserStorageService } from "stentor-models";
import { LaunchRequestBuilder } from "stentor-request";
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

describe("#main() with LaunchRequest", () => {
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
    describe("LaunchRequest", () => {
        beforeEach(async () => {
            request = new LaunchRequestBuilder().build();

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
        });
        it("returns the proper response", () => {
            expect(callbackSpy).to.have.been.calledOnce;
            // lets pull the argument out and inspect it a little
            const callBackArgs = callbackSpy.getCall(0).args;
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.outputSpeech.ssml).to.equal("<speak>Hello World!</speak>");
        });
    });
});
