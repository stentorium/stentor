/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { CONVERSATION_HANDLER_TYPE } from "stentor-constants";
import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { Channel, HandlerService, Request, RuntimeContext, Storage, UserStorageService } from "stentor-models";
import { main } from "../main";
import { MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";
import { LaunchRequestBuilder, IntentRequestBuilder } from "stentor-request";

chai.use(sinonChai);
const expect = chai.expect;

const DEFAULT_CHANNELS: Channel[] = [passThroughChannel()];

describe("ConversationHandler", () => {
    const organizationId = "organizationId";
    const appId = "appId";
    const intentId = "LaunchRequest";

    const handler: ConversationHandler = new ConversationHandler({
        organizationId,
        appId,
        intentId,
        type: CONVERSATION_HANDLER_TYPE,
        name: "Conversation Intent",
        data: {},
        content: {
            ["intentOne"]: [
                {
                    name: "Response One",
                    outputSpeech: "This is the first response"
                }
            ],
            ["LaunchRequest"]: [
                {
                    name: "Name",
                    outputSpeech: "Hello World!"
                }
            ]
        }
    });

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - 1);

    const storage: Storage = {
        createdTimestamp: createdDate.getTime(),
        lastActiveTimestamp: createdDate.getTime()
    };
    let request: Request;
    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;

    beforeEach(() => {
        callbackSpy = sinon.spy();
        fakeContext = { headers: {} };
        handlerFactory = new HandlerFactory();
        handlerService = sinon.createStubInstance(MockHandlerService);
        userStorageService = sinon.createStubInstance(MockUserStorageService);
    });
    describe("as LaunchRequest", () => {
        beforeEach(() => {
            const storageCopy = { ...storage };
            request = new LaunchRequestBuilder().build();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: Promise.resolve(handler)
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve(storageCopy),
                update: Promise.resolve(storageCopy)
            });
        });
        it("returns SSML", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            // lets pull the argument out and inspect it a little
            const callBackArgs = callbackSpy.args[0];
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.outputSpeech.ssml).to.equal("<speak>Hello World!</speak>");
        });
        it("gets the intent from the intent service", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(handlerService.get).to.have.been.calledOnce;
            expect(handlerService.get).to.have.been.calledWith("LaunchRequest");
        });
        it("gets the storage for the user", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(userStorageService.get).to.have.been.calledOnce;
            expect(userStorageService.get).to.have.been.calledWith(request.userId);
        });
        it("sets the proper items on the storage", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(userStorageService.update).to.have.been.calledOnce;
            const args = (userStorageService.update as sinon.SinonStub).getCall(0).args;
            const userId = args[0];
            expect(userId).to.equal(request.userId);
            const updatedStorage = args[1] as Storage;
            expect(updatedStorage.createdTimestamp).to.equal(createdDate.getTime());
            expect(updatedStorage.currentHandler).to.deep.equal(handler);
            expect(updatedStorage.currentAudioHandler).to.be.undefined;
        });
    });
    describe("for a subsequent intent request", () => {
        beforeEach(() => {
            // reset the spy
            callbackSpy = sinon.spy();

            request = new IntentRequestBuilder().withIntentId("intentOne").build(); //intentOne

            // Add our HandlerIntent as the currentIntent on the storage
            const updatedStorage = { ...storage, currentHandler: handler };

            handlerService = sinon.createStubInstance(MockHandlerService);
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve(updatedStorage),
                update: Promise.resolve(updatedStorage)
            });
        });
        it("gets the storage for the user", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(userStorageService.get).to.have.been.calledOnce;
            expect(userStorageService.get).to.have.been.calledWith(request.userId);
        });
        it("does not call the intent service", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(handlerService.get).to.have.not.been.called;
        });
        it("returns SSML", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(callbackSpy).to.have.been.calledOnce;
            // lets pull the argument out and inspect it a little
            const callBackArgs = callbackSpy.args[0];
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const payload = callBackArgs[1];
            expect(payload).to.exist;
            expect(payload.outputSpeech.ssml).to.equal("<speak>This is the first response</speak>");
        });
        it("sets the proper items on the storage", async () => {
            await main(request, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(userStorageService.update).to.have.been.calledOnce;
            const args = (userStorageService.update as sinon.SinonStub).getCall(0).args;
            const userId = args[0];
            expect(userId).to.equal(request.userId);
            const updatedStorage = args[1] as Storage;
            expect(updatedStorage.createdTimestamp).to.equal(createdDate.getTime());
            expect(updatedStorage.currentHandler).to.deep.equal(handler);
            expect(updatedStorage.currentAudioHandler).to.be.undefined;
        });
    });
});
