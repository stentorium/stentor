/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ContextBuilder } from "stentor-context";
import { Content, Context, Request, Response } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { ResponseBuilder } from "stentor-response";
import { getResponse } from "../getResponse";

chai.use(sinonChai);
const expect = chai.expect;

let responses: Response[];
let content: Content;
let request: Request;
let response: ResponseBuilder;
let context: Context;

describe("#getResponse()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getResponse(undefined, undefined, undefined)).to.be.undefined;
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
                    }
                ]
            };
            request = new IntentRequestBuilder().help().build();
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
    });
});
