/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import * as sinon from "sinon";

import { ContextBuilder } from "stentor-context";
import { Context, JSONDependent, Request, RequestDependent, SystemDependent, Conditioned, Channeled } from "stentor-models";
import { LaunchRequestBuilder, IntentRequestBuilder } from "stentor-request";
import { determine } from "../determine";

const simple: object = {
    foo: true
};

const requestDependent0: RequestDependent = {
    requestMatch: {
        name: "isNewSession",
        value: true
    }
};

const requestDependent1: RequestDependent = {
    requestMatch: {
        name: "isNewSession",
        value: false
    }
};

const jsonDependent0: JSONDependent = {
    JSONPathMatch: {
        name: "$.context.storage.foo",
        value: "bar"
    }
};

const jsonDependent1: JSONDependent = {
    JSONPathMatch: {
        name: "$.context.storage.foo",
        value: "baz"
    }
};

const systemDependent0: SystemDependent = {
    systemCondition: "ACCOUNT_LINKED"
};

const CONDITIONAL_0: Conditioned = {
    conditions: '"${$.context.storage.foo}" === "bar"'
}

const CONDITIONAL_1: Conditioned = {
    conditions: {
        must: [jsonDependent0],
        should: []
    }
};

const CONDITIONAL_2: Conditioned = {
    conditions: '"${$.context.storage.foo}" === "${slot_foo}"'
}

const CONDITIONAL_SCHEDULE_SLOTS: Conditioned = {
    conditions: 'fitsSchedule("2019-09-11T00:00", "YYYY-MM-DDTmm:ss", 5, "days") && (slotEquals("foo", "bar") || slotEquals("foo", "baz"))'
};

const CONDITIONAL_SESSION_STORE: Conditioned = {
    conditions: 'session("baz").startsWith("t")'
}

const CONDITIONAL_STORAGE: Conditioned = {
    conditions: 'storage("foo").startsWith("ba")'
}

const CONDITIONAL_SLOT_CONTAINS: Conditioned = {
    conditions: 'slot("foo").includes("b")'
}

const CONDITIONAL_SLOT_COMPARE: Conditioned = {
    conditions: 'slot("foo") === "${$.context.storage.foo}"'
}

const channeled1: Channeled & Conditioned = {
    conditions: "true",
    channel: {
        name: "channel-1"
    }
}

const channeled2: Channeled & Conditioned = {
    conditions: "true",
    channel: {
        name: "channel-2"
    }
}

const channeled3: Channeled & Conditioned = {
    conditions: "false",
    channel: {
        name: "channel-1"
    }
}

describe(`#${determine.name}()`, () => {
    let request: Request;
    let context: Context;
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(determine(undefined, undefined, undefined)).to.be.undefined;
            expect(determine([], undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed an array with a match", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 1234,
                    foo: "bar"
                })
                .build();
        });
        it("returns the match", () => {
            expect(determine([requestDependent0, simple, jsonDependent1], request, context)).to.equal(
                requestDependent0
            );
            expect(determine([jsonDependent0, simple], request, context)).to.equal(jsonDependent0);
        });
    });
    describe("when passed an array without matches but a simple object", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder().build();
        });
        it("returns the simple object", () => {
            expect(determine([simple, requestDependent1], request, context)).to.equal(simple);
        });
    });
    describe("when passed an array without a match", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder().build();
        });
        it("returns undefined", () => {
            expect(determine([requestDependent1], request, context)).to.be.undefined;
            expect(determine([systemDependent0], request, context)).to.be.undefined;
        });
    });
    describe("when passed more than one match", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 1234,
                    foo: "bar"
                })
                .build();
        });
        it("returns the match", () => {
            expect(determine([requestDependent0, jsonDependent0, simple], request, context)).to.equal(
                requestDependent0
            );
        });
    });
    describe("when passed conditionals", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().build();
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 1234,
                    foo: "bar"
                })
                .build();
        });
        it('returns the correct match', () => {
            // This one uses a string
            expect(determine([CONDITIONAL_0], request, context)).to.exist;
            expect(determine([CONDITIONAL_0], request, context)).to.deep.equal(CONDITIONAL_0);
            // This one uses an object
            expect(determine([CONDITIONAL_1], request, context)).to.exist;
            expect(determine([CONDITIONAL_1], request, context)).to.deep.equal(CONDITIONAL_1);
        });
        describe('that uses a schedule and slot match string', () => {
            let clock: sinon.SinonFakeTimers;
            beforeEach(() => {
                request = new IntentRequestBuilder().withSlots({
                    foo: {
                        name: "foo",
                        value: "bar"
                    }
                }).build();
                context = new ContextBuilder()
                    .withStorage({
                        lastActiveTimestamp: 1234,
                        createdTimestamp: 1234,
                        foo: "bar",
                        sessionStore: {
                            id: "sessionId",
                            data: {
                                slots: {
                                    ["slot_foo"]: {
                                        name: "slot_foo",
                                        value: "bar"
                                    }
                                }
                            }
                        }
                    })
                    .build();
            });
            beforeEach(() => {
                const date = new Date("2019-09-11T18:40:00-05:00");
                clock = sinon.useFakeTimers(date.getTime());
            });
            afterEach(() => {
                clock.restore();
            });
            it('returns the correct match', () => {
                expect(determine([CONDITIONAL_SCHEDULE_SLOTS], request, context)).to.exist;
                expect(determine([CONDITIONAL_SCHEDULE_SLOTS], request, context)).to.deep.equal(CONDITIONAL_SCHEDULE_SLOTS);

                expect(determine([CONDITIONAL_SCHEDULE_SLOTS, systemDependent0], request, context)).to.exist;
                expect(determine([CONDITIONAL_SCHEDULE_SLOTS, systemDependent0], request, context)).to.deep.equal(CONDITIONAL_SCHEDULE_SLOTS);

            });
            describe("with slot name short hand in the conditional", () => {
                it('returns the correct match', () => {
                    expect(determine([CONDITIONAL_2], request, context)).to.exist;
                    expect(determine([CONDITIONAL_2], request, context)).to.deep.equal(CONDITIONAL_2);

                    expect(determine([CONDITIONAL_2, {}], request, context)).to.exist;
                    expect(determine([CONDITIONAL_2, {}], request, context)).to.deep.equal(CONDITIONAL_2);
                });
            });
        });
        describe('with JS dependent on the returned macro result', () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().withSlots({
                    foo: {
                        name: "foo",
                        value: "bar"
                    }
                }).build();

                context = new ContextBuilder()
                    .withStorage({
                        lastActiveTimestamp: 1234,
                        createdTimestamp: 1234,
                        foo: "bar"
                    })
                    .withSessionData({
                        id: "sessionId",
                        data: {
                            slots: {
                                ["slot_foo"]: {
                                    name: "slot_foo",
                                    value: "bar"
                                }
                            },
                            baz: true
                        }
                    })
                    .build();
            });
            it("returns the correct result", () => {
                expect(determine([CONDITIONAL_SLOT_CONTAINS], request, context)).to.exist;
                expect(determine([CONDITIONAL_SLOT_CONTAINS], request, context)).to.deep.equal(CONDITIONAL_SLOT_CONTAINS);

                expect(determine([CONDITIONAL_STORAGE], request, context)).to.exist;
                expect(determine([CONDITIONAL_STORAGE], request, context)).to.deep.equal(CONDITIONAL_STORAGE);

                expect(determine([CONDITIONAL_SESSION_STORE], request, context)).to.exist;
                expect(determine([CONDITIONAL_SESSION_STORE], request, context)).to.deep.equal(CONDITIONAL_SESSION_STORE);
            });
        });
        describe('with a mix of templating and marcos', () => {
            beforeEach(() => {
                request = new IntentRequestBuilder().withSlots({
                    foo: {
                        name: "foo",
                        value: "bar"
                    }
                }).build();
            });
            it("returns the correct result", () => {
                expect(determine([CONDITIONAL_SLOT_COMPARE], request, context)).to.exist;
                expect(determine([CONDITIONAL_SLOT_COMPARE], request, context)).to.deep.equal(CONDITIONAL_SLOT_COMPARE);
            });
        });
    });
    describe("with slots on the session data", () => {
        beforeEach(() => {
            request = new IntentRequestBuilder()
                .withSlots({
                    ["f_name"]: { name: "f_name", value: "foo", rawValue: "fu" }
                })
                .build();
            context = new ContextBuilder()
                .withSessionData({
                    id: "sessionId",
                    data: {
                        slots: {
                            ["l_name"]: {
                                name: "l_name",
                                value: "bar",
                                rawValue: "bar"
                            }
                        }
                    }
                }).build()
        });
        it("returns the correct match", () => {
            const responses = [
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
            ];

            expect(determine(responses, request, context)).to.deep.equal(responses[2]);
        });
    });
    describe("with channels specified", () => {
        beforeEach(() => {
            request = new LaunchRequestBuilder().onChannel("channel-1").build();
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 1234,
                    foo: "bar"
                })
                .build();
        });
        it("returns the expected", () => {
            expect(determine([channeled1, channeled2], request, context)).to.exist;
            expect(determine([channeled1, channeled2], request, context)).to.deep.equal(channeled1);
            expect(determine([channeled1, channeled2], new LaunchRequestBuilder().onChannel("channel-3").build(), context)).to.not.exist;
            expect(determine([channeled2, channeled3], request, context)).to.not.exist;
        });
    });
    describe("when passed conditions with undefined JSON paths", () => {
        // error|09:50:31|VM2|Error evaluating conditions "activeWithin(1, "day") && !${$.context.storage.customer}": SyntaxError: Unexpected token '{'
        // error|09:50:31|VM2|Error evaluating conditions ""widget" !== "AGENT_ASSISTANT" && !!${$.context.storage.customer}": SyntaxError: Unexpected token '{'
        // error|09:50:31|VM2|Error evaluating conditions ""widget" === "AGENT_ASSISTANT" && !!${$.context.storage.customer} ": SyntaxError: Unexpected token '{'
        // error|09:50:31|VM2|Error evaluating conditions ""widget" === "AGENT_ASSISTANT" && !${$.context.storage.customer} ": SyntaxError: Unexpected token '{'
        // The above errors occur when we attempt to do some JSON path replacement but they don't exist

        beforeEach(() => {
            request = new LaunchRequestBuilder().onChannel("channel-1").build();
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 1234,
                    foo: "bar"
                })
                .build();
        });
        it("returns the expected", () => {
            const notValid: Conditioned = {
                conditions: '"${$.request.channel}" !== "AGENT_ASSISTANT" && !!${$.context.storage.customer}'
            }
            expect(determine([notValid, channeled3], request, context)).to.not.exist;
        });
    });
});
