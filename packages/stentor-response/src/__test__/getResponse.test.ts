/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ContextBuilder } from "stentor-context";
import { Content, Context, Request, Response, Handler } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { ResponseBuilder } from "stentor-response";
import { getResponse } from "../getResponse";

chai.use(sinonChai);
const expect = chai.expect;

let content: Content;
let context: Context;
let handler: Handler;
let request: Request;
let response: ResponseBuilder;
let responses: Response[];

describe("#getResponse()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getResponse(undefined, undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed a handler", () => {
        beforeEach(() => {
            handler = {
                appId: "app",
                organizationId: "org",
                type: "InSessionIntent",
                intentId: "Fill",
                content: {
                    ["Fill"]: [{
                        outputSpeech: "Confirming ${ foo } and ${baz}."
                    }],
                    ["FillFoo"]: [{
                        outputSpeech: "What kind of foo?",
                        reprompt: "What kind of foo was that?"
                    }],
                    ["FillBaz"]: [{ outputSpeech: "What kind of baz for the ${ foo }?" }],
                    ["Filled"]: [{ outputSpeech: "Great, we will get on that." }],
                    ["CancelIntent"]: [{ outputSpeech: "Ok, we will cancel your order." }]
                },
                utterancePatterns: [
                    "i want something",
                    "i want ${foo} and ${bar}",
                    "i want ${foo}"
                ],
                slots: [
                    {
                        type: "FOO",
                        name: "foo",
                        slotElicitationContentKey: "FillFoo"
                    },
                    {
                        type: "BAZ",
                        name: "baz",
                        slotElicitationContentKey: "FillBaz"
                    },
                    {
                        type: "BAR",
                        name: "bar",
                    }
                ]
            }

            request = new IntentRequestBuilder().withIntentId("Fill").withSlots({
                bar: {
                    name: "bar",
                    value: "Moe's"
                },
                baz: {
                    name: "baz",
                    value: "baz a roo"
                }
            }).build();
            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);
            context = new ContextBuilder()
                .withResponse(response)
                .withStorage({
                    createdTimestamp: Date.now(),
                    lastActiveTimestamp: Date.now(),
                    name: "Bob",
                    metBefore: true,
                    score: 3
                })
                .build();
        });
        describe("with slot filling", () => {
            it("returns the correct response", () => {
                const response = getResponse(handler, request, context);
                expect(response).to.exist;
                expect(response).to.be.a("object");
                expect(response.outputSpeech).to.equal("What kind of foo?");
                expect(response.reprompt).to.equal("What kind of foo was that?");
            });
            describe("with some slots already filled and on the session storage", () => {
                beforeEach(() => {
                    request = new IntentRequestBuilder().withIntentId("Fill").withSlots({
                        bar: {
                            name: "bar",
                            value: "Moe's"
                        },
                        baz: {
                            name: "baz",
                            value: ""
                        }
                    }).build();
                    // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
                    response = sinon.createStubInstance(ResponseBuilder);
                    context = new ContextBuilder()
                        .withResponse(response)
                        .withStorage({
                            createdTimestamp: Date.now(),
                            lastActiveTimestamp: Date.now(),
                            name: "Bob",
                            metBefore: true,
                            score: 3,
                            sessionStore: {
                                id: "sessionId",
                                data: {
                                    slots: {
                                        foo: {
                                            name: "foo",
                                            value: "F000D"
                                        }
                                    }
                                }
                            }
                        })
                        .build();
                });
                it("returns the correct response", () => {
                    const response = getResponse(handler, request, context);
                    expect(response).to.exist;
                    expect(response).to.be.a("object");
                    expect(response.outputSpeech).to.equal("What kind of baz for the F000D?");
                });
                describe("when passed a cancel request", () => {
                    beforeEach(() => {
                        request = new IntentRequestBuilder().cancel().build();
                    });
                    it("returns the cancel response", () => {
                        const response = getResponse(handler, request, context);
                        expect(response).to.exist;
                        expect(response).to.be.a("object");
                        expect(response.outputSpeech).to.equal("Ok, we will cancel your order.");
                    });
                });
            });
            describe("with two required, only one able to be filled", () => {
                beforeEach(() => {
                    handler = {
                        appId: "app",
                        organizationId: "org",
                        type: "InSessionIntent",
                        intentId: "Fill",
                        content: {
                            ["FillFoo"]: [{
                                outputSpeech: "What kind of foo?",
                                reprompt: "What kind of foo was that?"
                            }],
                            ["FillBaz"]: [{ outputSpeech: "What kind of baz for the ${ foo }?", conditions: "slotExists(\"foo\")" }],
                            ["Filled"]: [{ outputSpeech: "Great, we will get on that." }],
                        },
                        slots: [
                            {
                                type: "FOO",
                                name: "foo",
                                slotElicitationContentKey: "FillFoo"
                            },
                            {
                                type: "BAZ",
                                name: "baz",
                                slotElicitationContentKey: "FillBaz"
                            },
                            {
                                type: "BAR",
                                name: "bar",
                            }
                        ]
                    }

                    request = new IntentRequestBuilder().withIntentId("intentId").withSlots({
                        bar: {
                            name: "bar",
                            value: "Moe's"
                        },
                        foo: {
                            name: "foo",
                            value: ""
                        },
                        baz: {
                            name: "baz",
                            value: ""
                        }
                    }).build();
                    // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
                    response = sinon.createStubInstance(ResponseBuilder);
                    context = new ContextBuilder()
                        .withResponse(response)
                        .withStorage({
                            createdTimestamp: Date.now(),
                            lastActiveTimestamp: Date.now(),
                            name: "Bob",
                            metBefore: true,
                            score: 3
                        })
                        .build();
                });
                it("returns the correct response", () => {
                    const response = getResponse(handler, request, context);
                    expect(response).to.exist;
                    expect(response).to.be.a("object");
                    expect(response.outputSpeech).to.equal("What kind of foo?");
                });
            });
            describe("when the incoming request has the last slot to be filled", () => {
                beforeEach(() => {
                    request = new IntentRequestBuilder().withIntentId("BazOnly").withSlots({
                        baz: {
                            name: "baz",
                            value: "BASH"
                        }
                    }).build();
                    // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
                    response = sinon.createStubInstance(ResponseBuilder);
                    context = new ContextBuilder()
                        .withResponse(response)
                        .withStorage({
                            createdTimestamp: Date.now(),
                            lastActiveTimestamp: Date.now(),
                            name: "Bob",
                            metBefore: true,
                            score: 3,
                            sessionStore: {
                                id: "sessionId",
                                data: {
                                    slots: {
                                        foo: {
                                            name: "foo",
                                            value: "F000D"
                                        }
                                    }
                                }
                            }
                        })
                        .build();
                });
                it("returns the content for itself", () => {
                    const response = getResponse(handler, request, context);
                    expect(response).to.exist;
                    expect(response).to.be.a("object");
                    expect(response.outputSpeech).to.equal("Confirming F000D and BASH.");
                });
            });
        });
    });
    describe("when passed an array of responses", () => {
        beforeEach(() => {
            responses = [
                {
                    outputSpeech: {
                        ssml: "<speak>${GREETING} <break /> how can I help?</speak>",
                        displayText: "${GREETING}, how can I help?"
                    },
                    segments: {
                        ["GREETING"]: [
                            {
                                segment: {
                                    ssml: "<p>Howdy</p>",
                                    displayText: "Howdy"
                                }
                            }
                        ]
                    }
                }
            ];
            request = new IntentRequestBuilder().withIntentId("intentId").build();
            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);
            context = new ContextBuilder()
                .withResponse(response)
                .withStorage({
                    createdTimestamp: Date.now(),
                    lastActiveTimestamp: Date.now(),
                    name: "Bob",
                    metBefore: true,
                    score: 3
                })
                .build();
        });
        it("determines and compiles the response", () => {
            const response = getResponse(responses, request, context);
            expect(response).to.exist;
            expect(response).to.be.a("object");
            expect(response.reprompt).to.be.undefined;
            if (typeof response.outputSpeech === "object") {
                expect(response.outputSpeech.ssml).to.equal("<speak><p>Howdy</p> <break /> how can I help?</speak>");
                expect(response.outputSpeech.displayText).to.equal("Howdy, how can I help?");
            }
        });
    });
    describe("when passed content", () => {
        beforeEach(() => {
            content = {
                ["intentId"]: [
                    {
                        outputSpeech: {
                            ssml: "<speak>${GREETING} <break /> how can I help?</speak>",
                            displayText: "${GREETING}, how can I help?"
                        },
                        segments: {
                            ["GREETING"]: [
                                {
                                    segment: {
                                        ssml: "<p>Howdy</p>",
                                        displayText: "Howdy"
                                    }
                                }
                            ]
                        }
                    }
                ]
            };
            request = new IntentRequestBuilder().withIntentId("intentId").build();
            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);
            context = new ContextBuilder()
                .withResponse(response)
                .withStorage({
                    createdTimestamp: Date.now(),
                    lastActiveTimestamp: Date.now(),
                    name: "Bob",
                    metBefore: true,
                    score: 3
                })
                .build();
        });
        it("determines and compiles the response", () => {
            const response = getResponse(content, request, context);
            expect(response).to.exist;
            expect(response).to.be.a("object");
            expect(response.reprompt).to.be.undefined;
            if (typeof response.outputSpeech === "object") {
                expect(response.outputSpeech.ssml).to.equal("<speak><p>Howdy</p> <break /> how can I help?</speak>");
                expect(response.outputSpeech.displayText).to.equal("Howdy, how can I help?");
            }
        });
    });
    describe("when passed additionalContext", () => {
        beforeEach(() => {
            content = {
                ["HelpIntent"]: [
                    {
                        outputSpeech: {
                            ssml: "<speak>${HELP} <break /> ${PROMPT}</speak>",
                            displayText: "${HELP}, ${PROMPT}"
                        },
                        reprompt: {
                            ssml: "<speak>${PROMPT}</speak>",
                            displayText: "${PROMPT}"
                        },
                        segments: {
                            ["HELP"]: [
                                {
                                    segment: {
                                        ssml: "Here <break /> is the help content.",
                                        displayText: "Here is the help content"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        outputSpeech: {
                            ssml: "<speak>${CONDITION}</speak>",
                            displayText: "${CONDITION}"
                        },
                        conditions: "!!`${CONDITION}`"
                    }
                ]
            };
            request = new IntentRequestBuilder().help().build();
            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);
            context = new ContextBuilder()
                .withResponse(response)
                .withStorage({
                    createdTimestamp: Date.now(),
                    lastActiveTimestamp: Date.now(),
                    name: "Bob",
                    metBefore: true,
                    score: 3
                })
                .build();
        });
        it("determines and compiles the response", () => {
            const response = getResponse(content, request, context, {
                PROMPT: "Which would you like?"
            });
            expect(response).to.exist;
            expect(response).to.be.a("object");
            expect(response.outputSpeech).to.be.a("object");
            if (typeof response.outputSpeech === "object") {
                expect(response.outputSpeech.ssml).to.equal(
                    "<speak>Here <break /> is the help content. <break /> Which would you like?</speak>"
                );
                expect(response.outputSpeech.displayText).to.equal("Here is the help content, Which would you like?");
            }
            expect(response.reprompt).to.be.a("object");
            if (typeof response.reprompt === "object") {
                expect(response.reprompt.ssml).to.equal("<speak>Which would you like?</speak>");
                expect(response.reprompt.displayText).to.equal("Which would you like?");
            }
        });
        it("it selects based on of condition from additionalContext", () => {
            const response = getResponse(content, request, context, {
                PROMPT: "Which would you like?",
                CONDITION: "Correct"
            });
            expect(response).to.exist;
            expect(response).to.be.a("object");
            expect(response.outputSpeech).to.be.a("object");
            if (typeof response.outputSpeech === "object") {
                expect(response.outputSpeech.ssml).to.equal(
                    "<speak>Correct</speak>"
                );
                expect(response.outputSpeech.displayText).to.equal("Correct");
            }
        });
    });
    describe("when passed macros", () => {
        beforeEach(() => {
            handler = {
                appId: "app",
                organizationId: "org",
                type: "InSessionIntent",
                intentId: "intentId",
                content: {
                    ["intentId"]: [
                        {
                            outputSpeech: {
                                ssml: "<speak>${answer} ${PROMPT} ${number()}</speak>",
                                displayText: "${answer} ${PROMPT}"
                            },
                            reprompt: {
                                ssml: "<speak>${PROMPT}</speak>",
                                displayText: "${PROMPT}"
                            },
                            segments: {
                                ["PROMPT"]: [
                                    {
                                        segment: {
                                            ssml: "Which would you like?",
                                            displayText: "Which would you like?"
                                        }
                                    }]
                            },
                            conditions: "pick()"
                        },
                        {
                            outputSpeech: {
                                ssml: "<speak>WRONG</speak>",
                                displayText: "WRONG"
                            },
                            conditions: "dontPick()"
                        }
                    ]
                },

            };
            request = new IntentRequestBuilder().withIntentId("intentId").build();
            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);
            context = new ContextBuilder()
                .withResponse(response)
                .withStorage({
                    createdTimestamp: Date.now(),
                    lastActiveTimestamp: Date.now(),
                    name: "Bob",
                    metBefore: true,
                    score: 3,
                    sessionStore: {
                        id: "sessionId",
                        data: {
                            slots: {
                                foo: {
                                    name: "foo",
                                    value: "F000D"
                                }
                            }
                        }
                    }
                })
                .build();
        });
        it("determines and compiles the response", () => {

            function pick() {
                return true;
            }

            const response = getResponse(handler, request, context, {
                answer: {
                    ssml: "Here <break /> is the help content. <break />",
                    displayText: "Here __is the help content.__"
                }
            }, {
                number: () => {
                    return `1`
                },
                dontPick: () => {
                    return false;
                },
                pick: pick
            });
            expect(response).to.exist;
            expect(response).to.be.a("object");
            expect(response.outputSpeech).to.be.a("object");
            if (typeof response.outputSpeech === "object") {
                expect(response.outputSpeech.ssml).to.equal(
                    "<speak>Here <break /> is the help content. <break /> Which would you like? 1</speak>"
                );
                expect(response.outputSpeech.displayText).to.equal("Here __is the help content.__ Which would you like?");
            }
            expect(response.reprompt).to.be.a("object");
            if (typeof response.reprompt === "object") {
                expect(response.reprompt.ssml).to.equal("<speak>Which would you like?</speak>");
                expect(response.reprompt.displayText).to.equal("Which would you like?");
            }
        });

    });
});
