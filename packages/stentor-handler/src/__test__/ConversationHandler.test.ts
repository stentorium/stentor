/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

import { ContextBuilder } from "stentor-context";
import { Context, Device, Handler, Storage } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { ResponseBuilder } from "stentor-response";
import { CONVERSATION_HANDLER_TYPE, ConversationHandler } from "../ConversationHandler";

describe("ConversationHandler", () => {
    const appId = "appId";
    const organizationId = "organizationId";
    const intentId = "intentId";

    const props: Handler = {
        intentId,
        appId,
        organizationId,
        name: "Conversation Props",
        type: CONVERSATION_HANDLER_TYPE,
        data: {},
        content: {
            [intentId]: [
                {
                    outputSpeech: {
                        ssml: "<speak>Hello world!</speak>",
                        displayText: "Hello world!"
                    }
                }
            ]
        }
    };

    const device: Device = {
        channel: "test",
        audioSupported: true,
        canPlayAudio: true,
        videoSupported: true,
        canPlayVideo: true,
        canSpeak: true,
        canThrowCard: true,
        hasScreen: false,
        canTransferCall: false
    };

    let context: Context;
    let handler: ConversationHandler;
    let response: ResponseBuilder;
    let storage: Storage;

    describe("constructor", () => {
        it("returns an instance of ConversationHandler", () => {
            handler = new ConversationHandler(props);
            expect(handler).to.exist;
            expect(handler).to.be.instanceof(ConversationHandler);
        });
    });
    describe("#handleRequest()", () => {
        beforeEach(() => {
            storage = {
                createdTimestamp: Date.now(),
                lastActiveTimestamp: Date.now()
            };
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);

            context = new ContextBuilder()
                .withDevice(device)
                .withResponse(response)
                .withStorage(storage)
                .build();
        });
        it("returns the correct response for the request", async () => {
            handler = new ConversationHandler(props);
            const request = new IntentRequestBuilder().withIntentId(intentId).build();
            await handler.handleRequest(request, context);
            expect(response.respond).to.have.been.calledOnce;
            expect(response.respond).to.to.have.been.calledWith({
                outputSpeech: {
                    ssml: "<speak>Hello world!</speak>",
                    displayText: "Hello world!"
                }
            });
        });
    });
});
