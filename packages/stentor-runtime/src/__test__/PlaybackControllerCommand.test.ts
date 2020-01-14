/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { HandlerFactory } from "@xapp/stentor-handler-factory";
import { PlayLivestreamHandler } from "@xapp/stentor-handler-media";
import { HandlerService, RuntimeContext, Storage, UserStorageService } from "stentor-models";
import { convertToStorage, LegacyStorage } from "@xapp/stentor-service-user-storage/lib/LegacyStorage";
import { main } from "../index";
import { DEFAULT_CHANNELS } from "./assets/Constants";
import { MockHandlerService, MockUserStorageService } from "./Mocks";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const payload = require("./assets/ExamplePayloads/playbackcontrollerplaycommandissuedrequest.json");
const legacyStorageProps = require("./assets/ExampleStorage/legacystorageCurrentIntentLiveStream.json") as LegacyStorage;
const storageProps = convertToStorage(legacyStorageProps);

chai.use(sinonChai);
const expect = chai.expect;

/**
 * This integration test handles a PlaybackController request from Alexa.
 * The scenario is audio was previously paused and we now get a Play command
 * to resume the audio.
 *
 * This test has legacy storage, meaning the older data models that need to be
 * converted to the new ones when loaded.
 */
describe("#main()", () => {
    describe("for a Alexa PlaybackController.PlayCommandIssued", () => {
        describe("on a live stream current intent", () => {
            let callbackSpy: sinon.SinonSpy;
            let fakeContext: RuntimeContext;
            let handlerFactory: HandlerFactory;
            let handlerService: HandlerService;
            let userStorageService: UserStorageService;

            const storage: Storage = { ...storageProps };

            beforeEach(() => {
                callbackSpy = sinon.spy();
                fakeContext = { stentorContext: { platform: "test" } } as any;
                handlerFactory = new HandlerFactory({
                    mappings: {
                        ["PlayLiveStreamIntent"]: PlayLivestreamHandler
                    }
                });
                handlerService = sinon.createStubInstance(MockHandlerService);
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: storage,
                    update: storage
                });
            });
            it("sets the AudioPlayer.Play directive", async () => {
                await main(payload, fakeContext, callbackSpy, DEFAULT_CHANNELS, {
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
                expect(response.response).to.exist;
                expect(response.response.outputSpeech).to.not.exist;
                const directive = response.response.directives[0];
                expect(directive).to.exist;
                expect(directive.type).to.equal("AudioPlayer.Play");
                expect(directive.playBehavior).to.equal("REPLACE_ALL");
                expect(directive.audioItem.stream.url).to.equal("https://ice23.securenetsystems.net/WFKL");
            });
        });
    });
});
