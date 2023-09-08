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
    UserStorageService,
} from "stentor-models";
import { InputUnknownRequestBuilder, IntentRequestBuilder } from "stentor-request";
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
            outputSpeech: "Hello World!"
        }
    ]
};

const contentWithStorageAction: Content = {
    [intentId]: [
        {
            name: "Name",
            outputSpeech: "Hello World!",
            actions: [
                {
                    type: "SET",
                    store: "SESSION",
                    key: "NEEDS_AGENT",
                    value: true
                }
            ]
        }
    ]
};

const contentForQuote: Content = {
    [intentId]: [
        {
            name: "Name",
            outputSpeech: {
                displayText: "What can we quote for you?",
                ssml: "<speak>What can we quote for you today?</speak>"
            },
            reprompt: {
                displayText: "What can we quote for you?",
                ssml: "<speak>Hi, what can we quote today for you?</speak>"
            }
        }
    ]
}

const handler: Handler = {
    organizationId,
    appId,
    intentId,
    name: "Order",
    type: "ConversationHandler",
    content,
    data: {}
};

const handlerWithStorageAction: Handler = {
    organizationId,
    appId,
    intentId,
    name: "Free Quote",
    type: "ConversationHandler",
    content: contentWithStorageAction,
    data: {}
};

const handlerWithContent: Handler = {
    organizationId,
    appId,
    intentId,
    name: "Order",
    type: "ConversationHandler",
    content: contentForQuote,
    data: {}
};

const createdDate = new Date();
createdDate.setDate(createdDate.getDate() - 1);

describe(`#${main.name}() storage`, () => {
    let request: Request;
    let context: any;
    let handlerFactory: HandlerFactory;
    let callbackSpy: sinon.SinonSpy;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;
    let eventService: EventService;
    beforeEach(() => {
        eventService = new EventService();
        eventService.addPrefix({ appId });
    });
    describe('for a new user', () => {
        beforeEach(() => {
            const storage: Storage = {
                createdTimestamp: createdDate.getTime(),
                sessionStore: {
                    id: sessionId,
                    data: {
                    }
                }
            };

            request = new IntentRequestBuilder().withSlots({
                foo: {
                    name: "foo",
                    value: "phew"
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
        it("sets the new user on the session storage", async () => {
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
            expect(userStorageService.update).to.have.been.calledOnce;
            expect(userStorageService.update).to.have.been.calledWithMatch("userId", {
                sessionStore: {
                    data: {
                        new_user: true
                    },
                    id: "sessionId"
                }
            });
        });
    });
    describe('with slots on the session store', () => {
        beforeEach(() => {

            const storage: Storage = {
                createdTimestamp: createdDate.getTime(),
                lastActiveTimestamp: createdDate.getTime(),
                sessionStore: {
                    id: sessionId,
                    data: {
                        slots: {
                            bar: {
                                name: "bar",
                                value: "barre"
                            },
                            foo: {
                                name: "foo",
                                value: "fu"
                            }
                        }
                    }
                }
            };

            request = new IntentRequestBuilder().withSlots({
                foo: {
                    name: "foo",
                    value: "phew"
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
        it('combines the slots', async () => {
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
            expect(userStorageService.update).to.have.been.calledOnce;
            expect(userStorageService.update).to.have.been.calledWithMatch("userId", {
                sessionStore: {
                    data: {
                        slots: {
                            bar: {
                                name: "bar",
                                value: "barre"
                            },
                            foo: {
                                name: "foo",
                                value: "phew"
                            }
                        }
                    },
                    id: "sessionId"
                }
            });
        });
        describe("with new session", () => {
            beforeEach(() => {
                const storage: Storage = {
                    createdTimestamp: createdDate.getTime(),
                    lastActiveTimestamp: createdDate.getTime(),
                    sessionStore: {
                        id: "old",
                        data: {
                            slots: {
                                bar: {
                                    name: "bar",
                                    value: "barre"
                                },
                                foo: {
                                    name: "foo",
                                    value: "fu"
                                }
                            }
                        }
                    }
                };

                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage })
                });
            });
            it("overwrites the slots", async () => {
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
                expect(userStorageService.update).to.have.been.calledOnce;
                expect(userStorageService.update).to.have.been.calledWithMatch("userId", {
                    sessionStore: {
                        data: {
                            slots: {
                                foo: {
                                    name: "foo",
                                    value: "phew"
                                }
                            }
                        },
                        id: "sessionId"
                    }
                });
            });
        });
    });
    describe('with a storage action', () => {
        beforeEach(() => {

            const storage: Storage = {
                createdTimestamp: createdDate.getTime(),
                lastActiveTimestamp: createdDate.getTime(),
                sessionStore: {
                    id: sessionId,
                    data: {
                        slots: {
                            bar: {
                                name: "bar",
                                value: "barre"
                            },
                            foo: {
                                name: "foo",
                                value: "fu"
                            }
                        }
                    }
                }
            };

            request = new IntentRequestBuilder().withSlots({
                foo: {
                    name: "foo",
                    value: "phew"
                }
            }).build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { ovai: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handlerWithStorageAction
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
        });
        it("adds the action", async () => {
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
            expect(userStorageService.update).to.have.been.calledOnce;
            expect(userStorageService.update).to.have.been.calledWithMatch("userId", {
                sessionStore: {
                    data: {
                        slots: {
                            foo: {
                                name: "foo",
                                value: "phew"
                            }
                        },
                        NEEDS_AGENT: true
                    },
                    id: "sessionId"
                }
            });
        });
    });
    describe('with a request', () => {
        let previousAppId: string | undefined;
        let previousMaxHistory: string;
        beforeEach(() => {

            previousAppId = process.env.STUDIO_APP_ID;

            process.env.STUDIO_APP_ID = "bot-id";

            const storage: Storage = {
                createdTimestamp: createdDate.getTime(),
                lastActiveTimestamp: createdDate.getTime(),
                sessionStore: {
                    id: sessionId,
                    data: {}
                }
            };

            request = new IntentRequestBuilder().withRawQuery("i need a free quote").withUserId("real-person").build();
            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { studio: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handlerWithContent
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
        });
        after(() => {
            // reset it
            process.env.STUDIO_APP_ID = previousAppId;
        });
        it('appends to the transcript', async () => {
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
            expect(userStorageService.update).to.have.been.calledOnce;

            const argOne = (userStorageService.update as any).getCall(0).args[0];
            expect(argOne).to.exist;
            expect(argOne).to.equal('real-person');

            const argTwo = (userStorageService.update as any).getCall(0).args[1];

            const transcripts = argTwo.sessionStore.transcript;
            expect(transcripts).to.have.length(2);

            const first = transcripts[0];
            expect(first.message).to.equal("i need a free quote");
            expect(first.createdTime).to.exist;
            expect(first.from).to.deep.equal({ id: "real-person" })
            expect(first.to).to.have.length(1);
            expect(first.to).to.deep.equal([{ id: "bot-id" }])

            const second = transcripts[1];
            expect(second.message).to.equal("What can we quote for you?");
            expect(second.createdTime).to.exist;
            expect(second.from).to.deep.equal({ id: "bot-id" })
            expect(second.to).to.have.length(1);
            expect(second.to).to.deep.equal([{ id: "real-person" }])
            expect(second.response).to.exist;
            expect(second.response).to.deep.equal({
                displayText: "What can we quote for you?",
                ssml: "<speak>What can we quote for you today?</speak>"
            });
        });
        describe("when the transcript is long", () => {
            beforeEach(() => {

                previousAppId = process.env.STUDIO_APP_ID;
                previousMaxHistory = process.env.STUDIO_MAX_HISTORY;

                process.env.STUDIO_APP_ID = "bot-id";
                process.env.STUDIO_MAX_HISTORY = "4";

                const storage: Storage = {
                    createdTimestamp: createdDate.getTime(),
                    lastActiveTimestamp: createdDate.getTime(),
                    sessionStore: {
                        id: sessionId,
                        data: {},
                        transcript: [
                            {
                                to: [{ id: "bot-id" }],
                                from: { id: "real-person" },
                                createdTime: "2022-03-11T22:44:16.979Z",
                                message: "hi"
                            },
                            {
                                to: [{ id: "real-person" }],
                                from: { id: "bot" },
                                createdTime: "2022-03-11T22:44:33.636Z",
                                message: "hi, how are you"
                            },
                            {
                                to: [{ id: "bot-id" }],
                                from: { id: "real-person" },
                                createdTime: "2022-03-11T22:44:49.995Z",
                                message: "fine thanks, you?"
                            },
                            {
                                to: [{ id: "real-person" }],
                                from: { id: "bot-id" },
                                createdTime: "2022-03-11T22:45:03.387Z",
                                message: "i'm well, how can i help"
                            }
                        ]
                    }
                };

                request = new IntentRequestBuilder().withRawQuery("i need a free quote").withUserId("real-person").build();
                handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
                context = { studio: { appId } };
                callbackSpy = sinon.spy();
                handlerService = sinon.createStubInstance(MockHandlerService, {
                    get: handlerWithContent
                });
                userStorageService = sinon.createStubInstance(MockUserStorageService, {
                    get: Promise.resolve({ ...storage })
                });
            });
            after(() => {
                // reset it
                process.env.STUDIO_APP_ID = previousAppId;
                process.env.STUDIO_MAX_HISTORY = previousMaxHistory;
            });
            it('keeps the length to 4', async () => {
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
                );

                expect(callbackSpy).to.have.been.calledOnce;
                expect(userStorageService.update).to.have.been.calledOnce;

                const argOne = (userStorageService.update as any).getCall(0).args[0];
                expect(argOne).to.exist;
                expect(argOne).to.equal('real-person');

                const argTwo = (userStorageService.update as any).getCall(0).args[1];

                const transcripts = argTwo.sessionStore.transcript;

                expect(transcripts).to.have.length(4);

                const first = transcripts[0];
                expect(first.message).to.equal("fine thanks, you?");
                expect(first.createdTime).to.exist;
                expect(first.from).to.deep.equal({ id: "real-person" })
                expect(first.to).to.have.length(1);
                expect(first.to).to.deep.equal([{ id: "bot-id" }])

                const second = transcripts[1];
                expect(second.message).to.equal("i'm well, how can i help");
                expect(second.createdTime).to.exist;
                expect(second.from).to.deep.equal({ id: "bot-id" })
                expect(second.to).to.have.length(1);
                expect(second.to).to.deep.equal([{ id: "real-person" }])
                expect(second.response).to.be.undefined;

                const third = transcripts[2];
                expect(third.message).to.equal("i need a free quote");
                expect(third.createdTime).to.exist;
                expect(third.from).to.deep.equal({ id: "real-person" })
                expect(third.to).to.have.length(1);
                expect(third.to).to.deep.equal([{ id: "bot-id" }])

                const fourth = transcripts[3];
                expect(fourth.message).to.equal("What can we quote for you?");
                expect(fourth.createdTime).to.exist;
                expect(fourth.from).to.deep.equal({ id: "bot-id" })
                expect(fourth.to).to.have.length(1);
                expect(fourth.to).to.deep.equal([{ id: "real-person" }])
                expect(fourth.response).to.exist;
                expect(fourth.response).to.deep.equal({
                    displayText: "What can we quote for you?",
                    ssml: "<speak>What can we quote for you today?</speak>"
                });
            });
        });
    });
    describe('with input unknown request', () => {
        before(() => {
            const storage: Storage = {
                createdTimestamp: createdDate.getTime(),
                lastActiveTimestamp: createdDate.getTime(),
                sessionStore: {
                    id: sessionId,
                    data: {}
                }
            };

            request = new InputUnknownRequestBuilder().build();

            handlerFactory = new HandlerFactory({ handlers: [ConversationHandler] });
            context = { studio: { appId } };
            callbackSpy = sinon.spy();
            handlerService = sinon.createStubInstance(MockHandlerService, {
                get: handlerWithContent
            });
            userStorageService = sinon.createStubInstance(MockUserStorageService, {
                get: Promise.resolve({ ...storage })
            });
        })
        it("updates the count on storage", async () => {

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
            expect(userStorageService.update).to.have.been.calledOnce;

            const argOne = (userStorageService.update as any).getCall(0).args[0];
            expect(argOne).to.exist;
            expect(argOne).to.equal('userId');

            const argTwo = (userStorageService.update as any).getCall(0).args[1];

            expect(argTwo.sessionStore.data.unknownInputs).to.equal(1);
        });
    });
});