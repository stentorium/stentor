/*! Copyright (c) 2021, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { ChannelActionRequest, Content, Event, EventStream, Handler, HandlerService, Storage, UserStorageService } from "stentor-models";
import { EventService } from "stentor-service-event";

import { main } from "../main";
import { MockHandlerService, MockUserStorageService, passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

const appId = "appId";

const content: Content = {
    ["IntentId"]: [
        {
            name: "Hello",
            outputSpeech: "Hello ${f_name}",
            conditions: `slotExists("f_name") && slotDoesNotExist("l_name")`
        },
        {
            name: "Bye",
            outputSpeech: "Bye ${f_name}"
        },
        {
            name: "Hello F & L Name",
            outputSpeech: "Hello ${f_name} ${l_name}",
            conditions: `slotExists("f_name") && slotExists("l_name")`
        },
    ]
};

const handler: Handler = {
    organizationId: "organizationId",
    appId,
    intentId: "IntentId",
    name: "Intent Request",
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

/**
 * Simple implementation of EventStream instrumented for testing.
 */
class TestEventStream implements EventStream {
    public events: Event[] = [];
    public flushed = false;

    public addEvent(event: Event) {
        this.events.push(event);
    }

    public async flush() {
        this.flushed = true;
    }
}

let request: ChannelActionRequest;
let context: any;
let handlerFactory: HandlerFactory;
let callbackSpy: sinon.SinonSpy;
let handlerService: HandlerService;
let userStorageService: UserStorageService;

let eventService: EventService;
let eventStream: TestEventStream;

describe("#main()", () => {
    describe("for a ChannelActionRequest", () => {
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

            eventService = new EventService();
            eventService.addPrefix({ appId });

            eventStream = new TestEventStream();
            eventService.addStream(eventStream);
        });
        afterEach(() => {
            callbackSpy.resetHistory();
        });
        describe("for a handler that will not handle the event", () => {
            beforeEach(async () => {

                request = {
                    type: "CHANNEL_ACTION_REQUEST",
                    action: "OPEN_URL",
                    uri: "https://xapp.ai/five-things-to-consider-before-building-an-intelligent-virtual-assistant",
                    userId: "123",
                    sessionId: "gbm-session-123",
                    locale: "en-US",
                    platform: "stentor-platform",
                    channel: "widget"
                };

                await main(request, context, callbackSpy, [passThroughChannel()], {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                });
            });
            after(() => {
                callbackSpy.resetHistory();
            });
            it("gets the storage for the user", async () => {
                expect(userStorageService.get).to.have.been.calledOnce;
                expect(userStorageService.get).to.have.been.calledWith(request.userId);
            });
            it("sets the proper events", () => {

                expect(eventStream.events).to.have.length(2);
                const requestEvent = eventStream.events[0];
                expect(requestEvent.name).to.equal("CHANNEL_ACTION_REQUEST");
                expect(requestEvent.platform).to.equal("stentor-platform");
            });
            it("returns the proper response", () => {
                expect(callbackSpy).to.have.been.calledOnce;
                // lets pull the argument out and inspect it a little
                const callBackArgs = callbackSpy.getCall(0).args;
                const error = callBackArgs[0];
                expect(error).to.not.exist;
                const payload = callBackArgs[1];
                expect(payload).to.exist;
                expect(payload).to.deep.equal({ "status": "complete" });
            });
        });
    });
});
