/*! Copyright (c) 2020, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

import { ConversationHandler } from "stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import {
    Content,
    Handler,
    HandlerService,
    Request,
    Storage,
    UserStorageService
} from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { EventService } from "stentor-service-event";

import { main } from "../main";
import { passThroughChannel, MockHandlerService, MockUserStorageService } from "./Mocks";

const appId = "appId";
const organizationId = "organizationId";
const intentId = "intentId";
const sessionId = "sessionId";

const content: Content = {
    [intentId]: [
        {
            name: "Name",
            outputSpeech: {
                ssml: "<speak>${name} ${date}</speak>",
                displayText: "${name} ${date}"
            }
        }
    ]
};

const handler: Handler = {
    organizationId,
    appId,
    intentId,
    name: "Order",
    type: "ConversationHandler",
    content,
    data: {}
};

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

describe(`#${main.name}() templated response`, () => {
    let request: Request;
    let context: any;
    let handlerFactory: HandlerFactory;
    let callbackSpy: sinon.SinonSpy;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;
    let eventService: EventService;
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
        eventService = new EventService();
        eventService.addPrefix({ appId });
        // Fake timers
        const date = new Date("2019-09-11T12:00:00-00:00");
        clock = sinon.useFakeTimers(date.getTime());
    });
    afterEach(() => {
        clock.restore();
    })
    describe('with slots on the session store', () => {
        beforeEach(() => {
            const storage: Storage = {
                createdTimestamp: createdDate.getTime(),
                lastActiveTimestamp: createdDate.getTime(),
                sessionStore: {
                    id: sessionId,
                    data: {
                        slots: {
                            name: {
                                name: "name",
                                value: "bob"
                            }
                        }
                    }
                }
            };

            request = new IntentRequestBuilder().withSlots({
                date: {
                    name: "date",
                    value: {
                        date: "2019-09-11"
                    }
                }
            }).build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handler
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
        });
        it('compiles the template from session slots and slots from the incoming request', async () => {
            await main(
                request,
                context,
                callbackSpy,
                [passThroughChannel()],
                {
                    eventService,
                    handlerFactory,
                    handlerService,
                    userStorageService
                }
            )
            expect(callbackSpy).to.have.been.calledOnce;
            expect(callbackSpy).to.have.been.calledWith(null, {
                name: "Name",
                outputSpeech: {
                    ssml: "<speak>bob <say-as interpret-as=\"date\" format=\"ymd\">2019-09-11</say-as></speak>",
                    displayText: "bob 9-11-2019"
                }
            });
            expect(userStorageService.update).to.have.been.calledOnce;
            expect(userStorageService.update).to.have.been.calledWithMatch("userId", {
                sessionStore: {
                    data: {
                        slots: {
                            name: {
                                name: "name",
                                value: "bob"
                            },
                            date: {
                                name: "date",
                                value: {
                                    date: "2019-09-11"
                                }
                            }
                        }
                    },
                    id: "sessionId"
                }
            });
        });
    });
});