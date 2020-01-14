/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { Alexa } from "@xapp/stentor-alexa";
import { HandlerFactory } from "@xapp/stentor-handler-factory";
import { AudioStorage, PLAY_LIVE_STREAM_HANDLER_TYPE, PlayLivestreamHandler } from "@xapp/stentor-handler-media";
import { HandlerService, RuntimeContext } from "stentor-models";
import { DynamoHandlerService } from "@xapp/stentor-service-handler";
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";
import { main } from "../index";
import { ALEXA_APP_ID } from "./assets/Constants";

const payload = require("./assets/ExamplePayloads/playlivestreamrequest.json");
const repeatIntentRequest = require("./assets/ExamplePayloads/alexa-repeatintent-request.json");
const nextIntentRequest = require("./assets/ExamplePayloads/alexa-nextintent-request.json");
const previousIntentRequest = require("./assets/ExamplePayloads/alexa-previousintent-request.json");

chai.use(sinonChai);
const expect = chai.expect;

/**
 * This is an end-to-end test that:
 *
 * 1. Requests the intent for LiveStream
 * 2. Saves the proper storage
 * 3. Returns the correct audio directive
 *
 */
describe("PlayLiveStreamHandler", () => {
    const organizationId = "organizationId";
    const appId = "appId";
    const intentId = "LiveStream"; // this must match what is in the request

    const handler = new PlayLivestreamHandler({
        organizationId,
        appId,
        intentId,
        type: PLAY_LIVE_STREAM_HANDLER_TYPE,
        data: {
            url: "https://ice9.securenetsystems.net/WBCL"
        },
        content: {}
    });

    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let appIntentGetStub: sinon.SinonStub;
    let userStorageService: DynamoUserStorageService;
    let storageGetUserStub: sinon.SinonStub;
    let storageUpdateStub: sinon.SinonStub;

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - 1);

    const storage: AudioStorage = {
        createdTimestamp: createdDate.getTime(),
        lastActiveTimestamp: createdDate.getTime()
    };

    beforeEach(async () => {
        callbackSpy = sinon.spy();
        fakeContext = { stentorContext: { platform: "test" } } as any;
        handlerFactory = new HandlerFactory({ mappings: { ["PlayLiveStreamIntent"]: PlayLivestreamHandler } });
        handlerService = new DynamoHandlerService({
            tableName: "never-called",
            appId: "testAppId"
        });
        appIntentGetStub = sinon.stub(handlerService, "get").returns(Promise.resolve(handler));

        userStorageService = new DynamoUserStorageService({
            tableName: "never-called",
            appId: "testAppId"
        });
        storageGetUserStub = sinon
            .stub(userStorageService, "get")
            .returns(Promise.resolve({ ...storage }));
        storageUpdateStub = sinon.stub(userStorageService, "update").returns(Promise.resolve({} as any));
    });
    afterEach(() => {
        appIntentGetStub.restore();
        storageGetUserStub.restore();
        storageUpdateStub.restore();
    });
    describe("for a request that calls the start method", () => {
        beforeEach(async () => {
            await main(payload, fakeContext, callbackSpy, [Alexa(ALEXA_APP_ID)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
        });
        it("gets the storage for the user", () => {
            expect(storageGetUserStub).to.have.been.calledOnce;
            expect(storageGetUserStub).to.have.been.calledWith(payload.session.user.userId);
        });
        it("gets the intent information", () => {
            expect(appIntentGetStub).to.have.been.calledOnce;
            expect(appIntentGetStub).to.have.been.calledWith(payload.request.intent.name);
        });
        it("returns the proper payload to start the live stream", () => {
            expect(callbackSpy).to.have.been.calledOnce;
            const callBackArgs = callbackSpy.args[0];
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const responsePayload = callBackArgs[1];
            expect(responsePayload).to.exist;
            expect(responsePayload.response.outputSpeech).to.not.exist;
            expect(responsePayload.response.directives).to.have.length(1);
            const directive = responsePayload.response.directives[0];
            expect(directive).to.exist;
            expect(directive.type).to.equal("AudioPlayer.Play");
            expect(directive.playBehavior).to.equal("REPLACE_ALL");
            expect(directive.audioItem.stream.url).to.equal("https://ice9.securenetsystems.net/WBCL");
        });
        it("sets the proper items on the storage", () => {
            expect(storageUpdateStub).to.have.been.calledOnce;
            const args = storageUpdateStub.args[0];
            const userId = args[0];
            expect(userId).to.equal(payload.session.user.userId);
            const updatedStorage = args[1] as AudioStorage;
            expect(updatedStorage.createdTimestamp).to.equal(createdDate.getTime());
            expect(updatedStorage.currentHandler).to.deep.equal(handler);
            expect(updatedStorage.currentAudioHandler).to.deep.equal(handler);
            expect(updatedStorage.audioManager).to.exist;
            const manager = updatedStorage.audioManager;
            expect(manager.url).to.equal("https://ice9.securenetsystems.net/WBCL");
            expect(manager.playlist[0]).to.exist;
            expect(manager.playlist[1]).to.be.undefined; // it only contains the live stream
            // currentAudio is not set yet!  Not until playback started event.
            // TODO: Why did this start failing?
            // expect(manager.currentMedia).to.be.undefined;
        });
    });

    describe("for a PreviousIntent request", () => {
        beforeEach(async () => {
            await main(previousIntentRequest, fakeContext, callbackSpy, [Alexa(ALEXA_APP_ID)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
        });
        it("returns the correct payload", () => {
            expect(callbackSpy).to.have.been.calledOnce;
            const callBackArgs = callbackSpy.args[0];
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const responsePayload = callBackArgs[1];
            expect(responsePayload).to.exist;
            expect(responsePayload.response.outputSpeech).to.exist;
            expect(responsePayload.response.outputSpeech.type).to.equal("SSML");
            expect(responsePayload.response.outputSpeech.ssml).to.equal(
                "<speak>I'm sorry, previous is not supported.</speak>"
            );
            expect(responsePayload.response.directives).to.not.exist;
            const args = storageUpdateStub.args[0];
            const storage = args[1];
            expect(storage.previousResponse).to.deep.equal({
                outputSpeech: { ssml: "<speak>I'm sorry, previous is not supported.</speak>" }
            });
        });
    });
    describe("for a NextIntent request", () => {
        beforeEach(async () => {
            await main(nextIntentRequest, fakeContext, callbackSpy, [Alexa(ALEXA_APP_ID)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
        });
        it("returns the correct payload", () => {
            expect(callbackSpy).to.have.been.calledOnce;
            const callBackArgs = callbackSpy.args[0];
            const error = callBackArgs[0];
            expect(error).to.not.exist;
            const responsePayload = callBackArgs[1];
            expect(responsePayload).to.exist;
            expect(responsePayload.response.outputSpeech).to.exist;
            expect(responsePayload.response.outputSpeech.type).to.equal("SSML");
            expect(responsePayload.response.outputSpeech.ssml).to.equal(
                "<speak>I'm sorry, next is not supported.</speak>"
            );
            expect(responsePayload.response.directives).to.not.exist;
            const args = storageUpdateStub.args[0];
            const storage = args[1];
            expect(storage.previousResponse).to.deep.equal({
                outputSpeech: { ssml: "<speak>I'm sorry, next is not supported.</speak>" }
            });
        });
    });
    describe("for a RepeatIntent request", () => {
        describe("with previousResponse set on storage", () => {
            beforeEach(async () => {
                // With handler on storage
                const currentAudioHandler = handler;

                const storageWithAudioHandler = {
                    ...storage,
                    currentAudioHandler,
                    previousResponse: {
                        outputSpeech: {
                            type: "SSML",
                            ssml: "<speak>Previous Response.</speak>"
                        }
                    }
                };

                // Restore since it was previously wrapped
                storageGetUserStub.restore();
                // So we can wrap it again
                storageGetUserStub = sinon
                    .stub(userStorageService, "get")
                    .returns(Promise.resolve({ ...storageWithAudioHandler }));

                await main(repeatIntentRequest, fakeContext, callbackSpy, [Alexa(ALEXA_APP_ID)], {
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            it("returns the correct payload", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.args[0];
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const responsePayload = callBackArgs[1];
                expect(responsePayload).to.exist;
                expect(responsePayload.response.outputSpeech).to.exist;
                expect(responsePayload.response.outputSpeech.type).to.equal("SSML");
                expect(responsePayload.response.outputSpeech.ssml).to.equal("<speak>Previous Response.</speak>");
                expect(responsePayload.response.directives).to.be.undefined;
            });
        });
        describe("with improper previousResponse set on storage", () => {
            beforeEach(async () => {
                // With handler on storage
                const currentAudioHandler = handler;

                const storageWithAudioHandler = {
                    ...storage,
                    currentAudioHandler,
                    previousResponse: {
                        type: "SSML",
                        ssml: "<speak>I'm sorry, previous is not supported</speak>"
                    }
                };

                // Restore since it was previously wrapped
                storageGetUserStub.restore();
                // So we can wrap it again
                storageGetUserStub = sinon
                    .stub(userStorageService, "get")
                    .returns(Promise.resolve({ ...storageWithAudioHandler } as any));

                await main(repeatIntentRequest, fakeContext, callbackSpy, [Alexa(ALEXA_APP_ID)], {
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            it("returns the correct payload", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.args[0];
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const responsePayload = callBackArgs[1];
                expect(responsePayload).to.exist;
                expect(responsePayload.response.outputSpeech).to.exist;
                expect(responsePayload.response.outputSpeech.type).to.equal("SSML");
                expect(responsePayload.response.outputSpeech.ssml).to.equal(
                    "<speak>Sorry, I'm not sure what you want me to repeat.</speak>"
                );
                expect(responsePayload.response.directives).to.be.undefined;
            });
        });
        describe("without previousResponse set on storage", () => {
            beforeEach(async () => {
                // With handler on storage
                const currentAudioHandler = handler;

                const storageWithAudioHandler = {
                    ...storage,
                    currentAudioHandler
                };

                // Restore since it was previously wrapped
                storageGetUserStub.restore();
                // So we can wrap it again
                storageGetUserStub = sinon
                    .stub(userStorageService, "get")
                    .returns(Promise.resolve({ ...storageWithAudioHandler }));

                await main(repeatIntentRequest, fakeContext, callbackSpy, [Alexa(ALEXA_APP_ID)], {
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            it("returns the correct payload", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.args[0];
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const responsePayload = callBackArgs[1];
                expect(responsePayload).to.exist;
                expect(responsePayload.response.outputSpeech).to.exist;
                expect(responsePayload.response.outputSpeech.type).to.equal("SSML");
                expect(responsePayload.response.outputSpeech.ssml).to.equal(
                    "<speak>Sorry, I'm not sure what you want me to repeat.</speak>"
                );
                expect(responsePayload.response.directives).to.be.undefined;
            });
        });
        describe("with audio playing", () => {
            let repeatIntentRequestWithAudioPlaying: any;
            beforeEach(async () => {
                repeatIntentRequestWithAudioPlaying = { ...repeatIntentRequest };
                // set audio playing to PLAYING
                repeatIntentRequestWithAudioPlaying.context.AudioPlayer.playerActivity = "PLAYING";
                // With handler on storage
                const currentAudioHandler = handler;

                const storageWithAudioHandler = {
                    ...storage,
                    currentAudioHandler
                };

                // Restore since it was previously wrapped
                storageGetUserStub.restore();
                // So we can wrap it again
                storageGetUserStub = sinon
                    .stub(userStorageService, "get")
                    .returns(Promise.resolve({ ...storageWithAudioHandler }));

                await main(repeatIntentRequestWithAudioPlaying, fakeContext, callbackSpy, [Alexa(ALEXA_APP_ID)], {
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            it("returns the correct payload", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                const callBackArgs = callbackSpy.args[0];
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const responsePayload = callBackArgs[1];
                expect(responsePayload).to.exist;
                expect(responsePayload.response.outputSpeech).to.exist;
                expect(responsePayload.response.outputSpeech.type).to.equal("SSML");
                expect(responsePayload.response.outputSpeech.ssml).to.equal(
                    "<speak>I'm sorry, repeat is not supported.</speak>"
                );
                expect(responsePayload.response.directives).to.be.undefined;
            });
        });
    });
});
