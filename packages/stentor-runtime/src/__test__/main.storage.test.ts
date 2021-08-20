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
    name: "Order",
    type: "ConversationHandler",
    content: contentWithStorageAction,
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
});