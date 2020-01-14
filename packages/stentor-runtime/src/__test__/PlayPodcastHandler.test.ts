/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ActionsOnGoogle } from "@xapp/stentor-actions-on-google";
import { Alexa } from "@xapp/stentor-alexa";
import { HandlerFactory } from "@xapp/stentor-handler-factory";
import { AudioStorage, PLAY_PODCAST_HANDLER_TYPE, PlayPodcastHandler } from "@xapp/stentor-handler-media";
import { HandlerService, NLUQueryResponse, NLUService, RuntimeContext } from "stentor-models";
import { EventService } from "@xapp/stentor-service-event";
import { DynamoHandlerService } from "@xapp/stentor-service-handler";
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";
import { main } from "../index";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchMock = require("fetch-mock/es5/server");

const APP_ID_FROM_PAYLOAD = "appId";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const alexaPayload = require("./assets/ExamplePayloads/playpodcastonlyrequest.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aogPayload = require("./assets/ExamplePayloads/aog-actions-intent-main-request.json");
// Read in the sample XML file
const xml: string = fs.readFileSync(path.resolve(__dirname, "./assets/XML/RSS-basic-sample.xml"), "utf8");

chai.use(sinonChai);
const expect = chai.expect;

describe("PlayPodcastHandler", () => {
    let appIntentGetStub: sinon.SinonStub;
    let eventService: EventService;
    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;
    let eventServiceRequestStub: sinon.SinonStub;
    let storageGetUserStub: sinon.SinonStub;
    let storageUpdateStub: sinon.SinonStub;
    let userStorageService: DynamoUserStorageService;

    /**
     * This is an end-to-end test that:
     *
     * 1. takes a request from Amazon for the `PlayPodcastOnlyIntent`
     * 2. Parses out the slot value and matches it to a RSS feed URL
     * 3. Reads and parse the XML
     * 4. Builds up a playlist to store
     * 5. And returns the first item in the playlist
     */
    describe("for Alexa", () => {
        const organizationId = "organizationId";
        const appId = "appId";
        const intentId = "PlayPodcastOnlyIntent"; // this must match what is in the sample request payload

        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - 1);

        const storage: AudioStorage = {
            createdTimestamp: createdDate.getTime(),
            lastActiveTimestamp: createdDate.getTime()
        };

        const handler = new PlayPodcastHandler({
            appId,
            organizationId,
            intentId,
            type: PLAY_PODCAST_HANDLER_TYPE,
            data: {},
            content: {},
            slotTypes: {
                LIST_OF_PODCASTS: {
                    name: "LIST_OF_PODCASTS",
                    values: [
                        {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                            // @ts-ignore
                            data: "https://www.wbcl.org/archives/category/evenings/backstage-pass/feed/",
                            name: "back stage pass"
                        },
                        {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                            // @ts-ignore
                            data: "https://xapp.media",
                            name: "no match"
                        }
                    ]
                }
            },
            slots: [
                {
                    name: "Podcast",
                    type: "LIST_OF_PODCASTS"
                }
            ]
        });

        // For the Google channel
        const nlu: NLUService = {
            async query(): Promise<NLUQueryResponse> {
                return {
                    type: "INTENT_REQUEST",
                    intentId: "PlayPodcastOnly",
                    slots: {}
                };
            }
        };

        beforeEach(() => {
            callbackSpy = sinon.spy();
            fakeContext = { stentorContext: { platform: "test" } } as any;

            eventService = new EventService();
            eventServiceRequestStub = sinon.stub(eventService, "request");

            handlerFactory = new HandlerFactory({
                mappings: {
                    [PLAY_PODCAST_HANDLER_TYPE]: PlayPodcastHandler
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
            storageGetUserStub = sinon
                .stub(userStorageService, "get")
                .returns(Promise.resolve({ ...storage }));
            storageUpdateStub = sinon.stub(userStorageService, "update").returns(Promise.resolve({} as any));

            fetchMock.get("https://www.wbcl.org/archives/category/evenings/backstage-pass/feed/", xml);
        });
        afterEach(() => {
            appIntentGetStub.restore();
            eventServiceRequestStub.reset();
            fetchMock.restore();
            storageGetUserStub.restore();
            storageUpdateStub.restore();
        });
        it("gets the storage for the user", async () => {
            await main(alexaPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(storageGetUserStub).to.have.been.calledOnce;
            expect(storageGetUserStub).to.have.been.calledWith(alexaPayload.context.System.user.userId);
        });
        it("gets the intent information", async () => {
            await main(alexaPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(appIntentGetStub).to.have.been.calledOnce;
            expect(appIntentGetStub).to.have.been.calledWith(alexaPayload.request.intent.name);
        });
        it("returns the proper payload to start the podcast", async () => {
            await main(alexaPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
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
            expect(response.response.outputSpeech.ssml).to.equal(
                "<speak>Playing Episode 140 from Example Alexa Podcast</speak>"
            );
            const directive = response.response.directives[0];
            expect(directive).to.exist;
            expect(directive.type).to.equal("AudioPlayer.Play");
            expect(directive.playBehavior).to.equal("REPLACE_ALL");
            expect(directive.audioItem.stream.url).to.equal(
                "https://s3.amazonaws.com/xapp-alexa/JPKUnitTest-JPKUnitTest-1645-TAKEMETOWALMART-TRAILING.mp3"
            );
        });
        it("sets the proper items on the storage", async () => {
            await main(alexaPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(storageUpdateStub).to.have.been.calledOnce;
            const args = storageUpdateStub.args[0];
            const userId = args[0];
            expect(userId).to.equal(alexaPayload.context.System.user.userId);
            const updatedStorage = args[1] as AudioStorage;
            expect(updatedStorage.createdTimestamp).to.equal(createdDate.getTime());
            expect(updatedStorage.currentHandler).to.deep.equal(handler);
            expect(updatedStorage.currentAudioHandler).to.deep.equal(handler);
            expect(updatedStorage.audioManager).to.exist;
            const manager = updatedStorage.audioManager;
            expect(manager.url).to.equal("https://www.wbcl.org/archives/category/evenings/backstage-pass/feed/");

            // The playlist is now JSON
            const playlist = manager.playlist;
            expect(typeof playlist === "object").to.be.true;
            expect(playlist[0]).to.exist;
            expect((playlist as any).type).to.equal("RSSFeed");
            // currentAudio is now set at the time it tells the platform to play it
            // we no longer wait for the playback started event.
            expect(manager.currentMedia).to.exist;
            expect(manager.currentMedia.url).to.equal(
                "https://s3.amazonaws.com/xapp-alexa/JPKUnitTest-JPKUnitTest-1645-TAKEMETOWALMART-TRAILING.mp3"
            );
        });
        it("sends the correct events", async () => {
            await main(alexaPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                eventService,
                userStorageService
            });
            expect(eventServiceRequestStub).to.have.been.calledOnce;
            expect(eventServiceRequestStub).to.have.been.calledWithMatch({
                intentId: "PlayPodcastOnlyIntent",
                slots: { Podcast: { name: "Podcast", original: "back stage pass", value: "back stage pass" } }
            });
        });
    });
    describe("for Actions on Google", () => {
        const organizationId = "organizationId";
        const appId = "appId";
        const intentId = "LaunchRequest"; // this must match what is in the sample request payload

        const handler = new PlayPodcastHandler({
            appId,
            organizationId,
            intentId,
            type: PLAY_PODCAST_HANDLER_TYPE,
            data: {
                url: "https://www.wbcl.org/archives/category/evenings/backstage-pass/feed/"
            },
            content: {},
            slotTypes: {},
            slots: []
        });

        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - 1);

        const storage: AudioStorage = {
            createdTimestamp: createdDate.getTime(),
            lastActiveTimestamp: createdDate.getTime()
        };

        let nlu: NLUService;
        let nluQuery: sinon.SinonStub;

        beforeEach(() => {
            nluQuery = sinon.stub();
            nlu = {
                query: nluQuery
            };

            callbackSpy = sinon.spy();
            fakeContext = { stentorContext: { platform: "test" } } as any;

            handlerFactory = new HandlerFactory({
                mappings: {
                    [PLAY_PODCAST_HANDLER_TYPE]: PlayPodcastHandler
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
            storageGetUserStub = sinon
                .stub(userStorageService, "get")
                .returns(Promise.resolve({ ...storage }));
            storageUpdateStub = sinon.stub(userStorageService, "update").returns(Promise.resolve({} as any));

            fetchMock.get("https://www.wbcl.org/archives/category/evenings/backstage-pass/feed/", xml);
        });

        afterEach(() => {
            appIntentGetStub.restore();
            storageGetUserStub.restore();
            storageUpdateStub.restore();
            fetchMock.restore();
        });
        it("does not call the NLU", async () => {
            await main(aogPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(nluQuery).to.not.have.been.called;
        });
        it("gets the storage for the user", async () => {
            await main(aogPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(storageGetUserStub).to.have.been.calledOnce;
            expect(storageGetUserStub).to.have.been.calledWith(aogPayload.user.userId);
        });
        it("gets the intent information", async () => {
            await main(aogPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(appIntentGetStub).to.have.been.calledOnce;
            expect(appIntentGetStub).to.have.been.calledWith("LaunchRequest");
        });
        it("returns the proper payload to start the podcast", async () => {
            await main(aogPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
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
            const expectedInputs = response.expectedInputs;
            const firstInput = expectedInputs[0];
            expect(firstInput.inputPrompt.richInitialPrompt.items).to.exist;
            const firstItem = firstInput.inputPrompt.richInitialPrompt.items[0];
            expect(firstItem.simpleResponse.ssml).to.equal(
                "<speak>Playing Episode 140 from Example Alexa Podcast</speak>"
            );
            expect(firstItem.simpleResponse.displayText).to.equal("Playing Episode 140 from Example Alexa Podcast");
            const secondItem = firstInput.inputPrompt.richInitialPrompt.items[1];
            expect(secondItem.mediaResponse.mediaType).to.equal("AUDIO");
            expect(secondItem.mediaResponse.mediaObjects[0].contentUrl).to.equal(
                "https://s3.amazonaws.com/xapp-alexa/JPKUnitTest-JPKUnitTest-1645-TAKEMETOWALMART-TRAILING.mp3"
            );
            expect(secondItem.mediaResponse.mediaObjects[0].name).to.equal("Episode 140");
            expect(secondItem.mediaResponse.mediaObjects[0].description).to.equal(
                "Welcome the first show on Alexa Streaming"
            );
            expect(secondItem.mediaResponse.mediaObjects[0].largeImage).to.deep.equal({
                url: "http://www.podcast411.com/img/411_itunes.jpg"
            });
        });
        it("sets the proper items on the storage", async () => {
            await main(aogPayload, fakeContext, callbackSpy, [Alexa(APP_ID_FROM_PAYLOAD), ActionsOnGoogle(nlu)], {
                handlerFactory,
                handlerService,
                userStorageService
            });
            expect(storageUpdateStub).to.have.been.calledOnce;
            const args = storageUpdateStub.args[0];
            const userId = args[0];
            expect(userId).to.equal(aogPayload.user.userId);
            const updatedStorage = args[1] as AudioStorage;
            expect(updatedStorage.createdTimestamp).to.equal(createdDate.getTime());
            expect(updatedStorage.currentHandler).to.deep.equal(handler);
            expect(updatedStorage.currentAudioHandler).to.deep.equal(handler);
            expect(updatedStorage.audioManager).to.exist;
            const manager = updatedStorage.audioManager;
            expect(manager.url).to.equal("https://www.wbcl.org/archives/category/evenings/backstage-pass/feed/");

            // The playlist is now JSON
            const playlist = manager.playlist;
            expect(typeof playlist === "object").to.be.true;
            expect(playlist[0]).to.exist;
            expect((playlist as any).type).to.equal("RSSFeed");
            // currentAudio is now set at the time it tells the platform to play it
            // we no longer wait for the playbackstarted event.
            expect(manager.currentMedia).to.exist;
            expect(manager.currentMedia.url).to.equal(
                "https://s3.amazonaws.com/xapp-alexa/JPKUnitTest-JPKUnitTest-1645-TAKEMETOWALMART-TRAILING.mp3"
            );
        });
    });
});
