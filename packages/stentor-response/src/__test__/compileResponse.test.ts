/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ContextBuilder } from "stentor-context";
import { Context, Request, Response, SimpleResponse, Storage, ResponseOutput, RequestSlotMap } from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { isList, ResponseBuilder } from "stentor-response";
import { compileResponse } from "../compileResponse";

chai.use(sinonChai);
const expect = chai.expect;

interface TestStorage extends Storage {
    name: string;
    metBefore: boolean;
}

describe("#compileResponse()", () => {
    let request: Request;
    let response: ResponseBuilder<Response<ResponseOutput>>;
    let context: Context<TestStorage>;
    beforeEach(() => {
        const slots: RequestSlotMap = {
            ["NAME"]: {
                name: "NAME",
                value: "Jim"
            },
            ["DATE"]: {
                name: "DATE",
                value: {

                }
            }
        };
        request = new IntentRequestBuilder()
            .withIntentId("intentId")
            .withSlots(slots)
            .build();
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
                            ["flower_type"]: {
                                name: "flower_type",
                                value: "roses"
                            }
                        }
                    }
                }
            })
            .build() as Context<TestStorage>;
    });
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(compileResponse(undefined, request, context)).to.be.undefined;
        });
    });
    describe("when passed a full mixed templated responses", () => {
        const simpleResponse: SimpleResponse = {
            outputSpeech: "Your name is ${ $.request.slots.NAME.value }",
            reprompt: {
                ssml: "<speak> Hi ${$.context.storage.name} </speak>",
                displayText: "Hi ${$.context.storage.name}"
            },
            silencePrompt: "NO TEMPLATE"
        };
        it("compiles the outputSpeech", () => {
            const compiledResponse = compileResponse(simpleResponse, request, context);
            const outputSpeech = compiledResponse.outputSpeech;
            expect(outputSpeech).to.be.a("string");
            if (typeof outputSpeech === "string") {
                expect(outputSpeech).to.equal("Your name is Jim");
            }
        });
        it("compiles the reprompt", () => {
            const compiledResponse = compileResponse(simpleResponse, request, context);
            const reprompt = compiledResponse.reprompt;
            expect(reprompt).to.be.an("object");
            if (typeof reprompt === "object") {
                expect(reprompt.ssml).to.equal("<speak> Hi Bob </speak>");
                expect(reprompt.displayText).to.equal("Hi Bob");
            }
        });
    });
    describe("when passed a templated response without bad json path", () => {
        const simpleResponse: SimpleResponse = {
            outputSpeech: "Your last name is ${ $.request.slots.LAST_NAME.value }"
        };
        it("compiles with UNDEFINED", () => {
            const compiledResponse = compileResponse(simpleResponse, request, context);
            const outputSpeech = compiledResponse.outputSpeech;
            expect(outputSpeech).to.be.a("string");
            if (typeof outputSpeech === "string") {
                expect(outputSpeech).to.equal("Your last name is undefined");
            }
        });
    });
    describe("when passed a templated response with multiple templates", () => {
        const simpleResponse: SimpleResponse = {
            outputSpeech: "Your name is ${ $.request.slots.NAME.value }, my name is ${$.context.storage.name}"
        };
        it("compiles the outputSpeech", () => {
            const compiledResponse = compileResponse(simpleResponse, request, context);
            const outputSpeech = compiledResponse.outputSpeech;
            expect(outputSpeech).to.be.a("string");
            if (typeof outputSpeech === "string") {
                expect(outputSpeech).to.equal("Your name is Jim, my name is Bob");
            }
        });
    });
    describe("when passed a response with segments", () => {
        const simpleResponse: SimpleResponse = {
            outputSpeech:
                "${GREETING}, your name is ${ $.request.slots.NAME.value }, my name is ${$.context.storage.name}",
            segments: {
                ["GREETING"]: [{ segment: "Hello" }, { segment: "Howdy" }, { segment: "Greetings" }]
            }
        };
        it("compiles with the segments", () => {
            const compiledResponse = compileResponse(simpleResponse, request, context);
            const outputSpeech = compiledResponse.outputSpeech;
            expect(outputSpeech).to.be.a("string");
            if (typeof outputSpeech === "string") {
                expect(outputSpeech).to.match(/(Hello|Howdy|Greetings), your name is Jim, my name is Bob/);
            }
        });
        describe("with responses that have SSML & displayText", () => {
            const fullResponse: SimpleResponse = {
                outputSpeech: {
                    ssml: "${GREETING}, SSML",
                    displayText: "${GREETING}, displayText"
                },
                segments: {
                    ["GREETING"]: [
                        { segment: "Hello ${$.context.storage.name}" },
                        { segment: "Howdy" },
                        { segment: "Why hello" },
                        { segment: "${$.context.storage.name} hello" },
                        { segment: "Nice to see you" }
                    ]
                }
            };
            it("compiles the same for the SSML and displayText", () => {
                const compiledResponse = compileResponse(fullResponse, request, context);
                const outputSpeech = compiledResponse.outputSpeech;
                expect(outputSpeech).to.be.a("object");
                if (typeof outputSpeech === "object") {
                    const displayText = outputSpeech.displayText;
                    const ssml = outputSpeech.ssml;
                    expect(displayText).to.contain("displayText");
                    expect(ssml).to.contain("SSML");
                    // when we split them by commas, they should be the same
                    expect(displayText.split(",")[0]).to.equal(ssml.split(",")[0]);
                }
            });
            describe("and segments with SSML and displayText", () => {
                const fullResponse: SimpleResponse = {
                    outputSpeech: {
                        ssml: "${GREETING}, SSML",
                        displayText: "${GREETING}, displayText"
                    },
                    segments: {
                        ["GREETING"]: [
                            // Adding <a /> to all the ssml to simulate some XML
                            {
                                segment: {
                                    ssml: "<a/>,Hello ${$.context.storage.name}",
                                    displayText: "Hello ${$.context.storage.name}"
                                }
                            },
                            { segment: { ssml: "<a/>,Howdy", displayText: "Howdy" } },
                            { segment: { ssml: "<a/>,Why hello", displayText: "Why hello" } },
                            {
                                segment: {
                                    ssml: "<a/>,${$.context.storage.name} hello",
                                    displayText: "${$.context.storage.name} hello"
                                }
                            },
                            { segment: { ssml: "<a/>,Nice to see you", displayText: "Nice to see you" } }
                        ]
                    }
                };
                it("compiles the same for the SSML and displayText", () => {
                    const compiledResponse = compileResponse(fullResponse, request, context);
                    const outputSpeech = compiledResponse.outputSpeech;
                    expect(outputSpeech).to.be.a("object");
                    if (typeof outputSpeech === "object") {
                        const displayText = outputSpeech.displayText;
                        const ssml = outputSpeech.ssml;
                        expect(displayText).to.contain("displayText");
                        expect(ssml).to.contain("SSML");
                        expect(ssml).to.contain("<a/>");
                        // when we split them by commas, they should be the same
                        expect(displayText.split(",")[0]).to.equal(ssml.split(",")[1]);
                    }
                });
            });
        });
        describe("with segments with templates", () => {
            const simpleResponse: SimpleResponse = {
                outputSpeech:
                    "${GREETING}, your name is ${ $.request.slots.NAME.value }, my name is ${$.context.storage.name}",
                segments: {
                    ["GREETING"]: [{ segment: "Hello ${$.context.storage.name}" }]
                }
            };
            it("compiles with the segments", () => {
                const compiledResponse = compileResponse(simpleResponse, request, context);
                const outputSpeech = compiledResponse.outputSpeech;
                expect(outputSpeech).to.be.a("string");
                if (typeof outputSpeech === "string") {
                    expect(outputSpeech).to.match(/Hello Bob, your name is Jim, my name is Bob/);
                }
            });
        });
        describe("with storage dependent segments", () => {
            describe("with string segments", () => {
                const simpleResponse: SimpleResponse = {
                    outputSpeech:
                        "${GREETING}, your name is ${ $.request.slots.NAME.value }, my name is ${$.context.storage.name}",
                    segments: {
                        ["GREETING"]: [
                            { segment: "Hello" },
                            {
                                segment: "We have met before",
                                storageMatch: {
                                    name: "metBefore",
                                    value: true,
                                    operation: "=="
                                }
                            }
                        ]
                    }
                };
                it("compiles with the segments", () => {
                    const compiledResponse = compileResponse(simpleResponse, request, context);
                    const outputSpeech = compiledResponse.outputSpeech;
                    expect(outputSpeech).to.be.a("string");
                    if (typeof outputSpeech === "string") {
                        expect(outputSpeech).to.equal("We have met before, your name is Jim, my name is Bob");
                    }
                });
            });
            describe("with SSML and displayText segments", () => {
                // This is a real world example
                const simpleResponseWithSegments: SimpleResponse = {
                    name: "case knives",
                    reprompt: {
                        displayText: "Say your cell phone number and we’ll text you a link.",
                        ssml:
                            '<audio src="https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvooptin-alexassml.mp3" />',
                        suggestions: []
                    },
                    outputSpeech: {
                        displayText:
                            "Way to keep your brain sharp!  You're correct: Arkansas stones are typically used to sharpen knives. Alright! Let's see if your Hand IQ made the cut.  ${RESULT} Now that we've selected your knife, we'd like to get it in your hands.  Say your cell phone number and we’ll text you a link.  ",
                        ssml:
                            '<audio src="https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvoquestion5rightanswer-alexassml.mp3" /><audio src="https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvoendofquiz-alexassml.mp3" /> ${RESULT} <audio src="https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvooptin-alexassml.mp3" />',
                        suggestions: []
                    },
                    segments: {
                        RESULT: [
                            {
                                storageMatch: {
                                    name: "score",
                                    value: 0,
                                    operation: "=="
                                },
                                segment: {
                                    ssml:
                                        "<audio src='https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvo0correct-alexassml.mp3' />",
                                    displayText:
                                        "You got zero answers right. Alright, come on. You’re pulling our leg, right? We know you can do better than that."
                                }
                            },
                            {
                                storageMatch: {
                                    name: "score",
                                    value: 1,
                                    operation: "=="
                                },
                                segment: {
                                    ssml:
                                        "<audio src='https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvo1correct-alexassml.mp3' />",
                                    displayText:
                                        "You got one answer right. Hey, we all gotta start somewhere. Looks like your hands are hungry for some tasks they can sink their fingers into. And there’s no shame in teaching your hands something new. One of our Tribal Locks should make for a solid tutor."
                                }
                            },
                            {
                                storageMatch: {
                                    name: "score",
                                    value: 2,
                                    operation: "=="
                                },
                                segment: {
                                    ssml:
                                        "<audio src='https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvo2correct-alexassml.mp3' />",
                                    displayText:
                                        "You got two answers right. OK, OK, not bad. Try our Tear Drop knife and take your hands to the whetstone. They should be sharp in no time."
                                }
                            },
                            {
                                storageMatch: {
                                    name: "score",
                                    value: 3,
                                    operation: "=="
                                },
                                segment: {
                                    ssml:
                                        "<audio src='https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvo3correct-alexassml.mp3' />",
                                    displayText:
                                        "You got three answers right. Hey, not too shabby! Three correct answers mean you deserve the three handy blades in our Medium Stockman. You’re on your way to having some sharp hands, buddy."
                                }
                            },
                            {
                                storageMatch: {
                                    name: "score",
                                    value: 4,
                                    operation: "=="
                                },
                                segment: {
                                    ssml:
                                        "<audio src='https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvo4correct-alexassml.mp3' />",
                                    displayText:
                                        "Wow. Four out of five right. That’s darn impressive. Give yourself a pat on the back with that sharp hand of yours. And while you’re at it, give the Kickstart a try. No doubt you could assist a lot of folks with this assisted opener."
                                }
                            },
                            {
                                storageMatch: {
                                    name: "score",
                                    value: 5,
                                    operation: "=="
                                },
                                segment: {
                                    ssml:
                                        "<audio src='https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvo5correct-alexassml.mp3' />",
                                    displayText:
                                        "You got a perfect score! Hey everyone, let’s give them a hand for having sharp hands! Hands like yours should have no problem handling our most heavy-duty knife, the Case® Winkler Recurve Utility No. 6."
                                }
                            }
                        ]
                    }
                };
                it("compiles the segments", () => {
                    const compiledResponse = compileResponse(simpleResponseWithSegments, request, context);
                    const outputSpeech = compiledResponse.outputSpeech;
                    expect(outputSpeech).to.be.a("object");
                    if (typeof outputSpeech !== "string") {
                        expect(outputSpeech.ssml).to.equal(
                            `<audio src="https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvoquestion5rightanswer-alexassml.mp3" /><audio src="https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvoendofquiz-alexassml.mp3" /> <audio src=\'https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvo3correct-alexassml.mp3\' /> <audio src="https://assets.xapp.media/prod/Case-Knives/case-hand-iq-quiz/casetospecvooptin-alexassml.mp3" />`
                        );
                        expect(outputSpeech.displayText).to.equal(
                            `Way to keep your brain sharp!  You\'re correct: Arkansas stones are typically used to sharpen knives. Alright! Let\'s see if your Hand IQ made the cut.  You got three answers right. Hey, not too shabby! Three correct answers mean you deserve the three handy blades in our Medium Stockman. You’re on your way to having some sharp hands, buddy. Now that we\'ve selected your knife, we\'d like to get it in your hands.  Say your cell phone number and we’ll text you a link.  `
                        );
                    } else {
                        throw new Error("OutputSpeech was a string");
                    }
                });
            });
        });
    });
    describe("when passed a templated response accessing the previous response on storage", () => {
        beforeEach(() => {
            request = new IntentRequestBuilder().withIntentId("intentId").build();
            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);
            context = new ContextBuilder()
                .withResponse(response)
                .withStorage({
                    createdTimestamp: Date.now(),
                    lastActiveTimestamp: Date.now(),
                    previousResponse: {
                        outputSpeech: {
                            // Purposely adding speak tags to this test to make sure they botch things up
                            ssml: "<speak>This. is. awesome.  Ready to continue?</speak>",
                            displayText: "This is awesome.  Ready to continue?"
                        },
                        reprompt: {
                            // Leaving speak tags off
                            ssml: "Ready to continue?",
                            displayText: "Ready to continue?"
                        }
                    },
                    name: "Bob",
                    metBefore: true,
                    score: 3
                })
                .build() as Context<TestStorage>;
        });
        it("compiles with previous response", () => {
            const simpleResponse: SimpleResponse = {
                outputSpeech: {
                    ssml: "Here is some info you requested. ${$.context.storage.previousResponse.reprompt.ssml}",
                    displayText:
                        "Here is some info you requested... ${$.context.storage.previousResponse.reprompt.displayText}"
                }
            };
            const compiledResponse = compileResponse(simpleResponse, request, context);
            const outputSpeech = compiledResponse.outputSpeech;
            expect(outputSpeech).to.be.a("object");
            if (typeof outputSpeech === "object") {
                expect(outputSpeech.ssml).to.equal("Here is some info you requested. Ready to continue?");
                expect(outputSpeech.displayText).to.equal("Here is some info you requested... Ready to continue?");
            }
        });
    });
    describe("when passed a request in a non-default locale", () => {
        const spanishResponse: SimpleResponse = {
            outputSpeech: {
                ssml: "<speak> Your name is ${ $.request.slots.NAME.value } </speak>",
                displayText: "Your name is ${ $.request.slots.NAME.value }",
                locales: {
                    ["es-MX"]: {
                        ssml: "<speak> tu nombre es ${ $.request.slots.NAME.value } </speak>",
                        displayText: "tu nombre es ${ $.request.slots.NAME.value }"
                    }
                }
            },
            reprompt: {
                ssml: "<speak> Hi ${$.context.storage.name} </speak>",
                displayText: "Hi ${$.context.storage.name}",
                locales: {
                    ["es-MX"]: {
                        ssml: "<speak>Hola ${$.context.storage.name}. ${CTA}</speak>",
                        displayText: "Hola ${$.context.storage.name}. ${CTA}"
                    }
                }
            },
            silencePrompt: "NO TEMPLATE",
            segments: {
                CTA: [
                    {
                        segment: {
                            ssml: "<speak>How can I help?</speak>",
                            displayText: "How can I help?",
                            locales: {
                                ["es-MX"]: {
                                    ssml: "<speak>Cómo puedo ayudar?</speak>",
                                    displayText: "Cómo puedo ayudar"
                                }
                            }
                        }
                    }
                ]
            }
        };
        beforeEach(() => {
            const slots = {
                ["NAME"]: {
                    name: "NAME",
                    value: "Jim"
                }
            };
            request = new IntentRequestBuilder()
                .withLocale("es-MX")
                .withIntentId("intentId")
                .withSlots(slots)
                .build();

            // @ts-ignore The stubbed instance types can't see the private properties, which cause TS errors
            response = sinon.createStubInstance(ResponseBuilder);
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: Date.now(),
                    lastActiveTimestamp: Date.now(),
                    name: "Bob",
                    metBefore: true,
                    score: 3
                })
                .withResponse(response)
                .build() as Context<TestStorage>;
        });
        it("compiles the response for the language", () => {
            const response = compileResponse(spanishResponse, request, context);
            expect(response.outputSpeech).to.be.a("object");
            if (typeof response.outputSpeech === "object") {
                expect(response.outputSpeech.ssml).to.equal("<speak> tu nombre es Jim </speak>");
                expect(response.outputSpeech.displayText).to.equal("tu nombre es Jim");
            }
            expect(response.reprompt).to.be.a("object");
            if (typeof response.reprompt === "object") {
                expect(response.reprompt.ssml).to.equal("<speak>Hola Bob. Cómo puedo ayudar?</speak>");
            }
        });
    });
    describe("when passed a response with displays", () => {
        const displayResponse: SimpleResponse = {
            outputSpeech: "Your name is ${ $.request.slots.NAME.value }",
            reprompt: {
                ssml: "<speak> Hi ${$.context.storage.name} </speak>",
                displayText: "Hi ${$.context.storage.name}"
            },
            silencePrompt: "NO TEMPLATE",
            displays: [
                {
                    type: "LIST",
                    title: "Hello ${$.context.storage.name}",
                    items: [
                        {
                            title: "One",
                            description: "One ${$.request.slots.NAME.value }",
                            token: "one",
                            synonyms: ["1"]
                        },
                        {
                            title: "Two",
                            description: "Two ${$.request.slots.FOOBAR.value }",
                            token: "two",
                            synonyms: ["2"]
                        }
                    ]
                }
            ]
        };
        let compiledResponse: Response;
        beforeEach(() => {
            compiledResponse = compileResponse(displayResponse, request, context);
        });
        it("compiles the displays", () => {
            expect(compileResponse).to.exist;
            expect(compiledResponse.displays).to.have.length(1);
            const display = compiledResponse.displays[0];
            expect(isList(display)).to.be.true;
            if (isList(display)) {
                expect(display.title).to.equal("Hello Bob");
                const one = display.items[0];
                expect(one.title).to.equal("One");
                expect(one.description).to.equal("One Jim");
            }
        });
    });
    describe("when passed slot names in the template", () => {
        const displayResponse: SimpleResponse = {
            outputSpeech: {
                ssml: "<speak>When do you want your ${flower_type} delivered?</speak>",
                displayText: "When do you want your ${flower_type} delivered?"
            },
            reprompt: {
                ssml: "<speak>What's the delivery date for the ${ flower_type }?</speak>",
                displayText: "What's the delivery date for the ${ flower_type }?"
            },
            displays: [
                {
                    type: "LIST",
                    title: "Delivery date for the ${flower_type}?",
                    items: [
                        {
                            title: "Tuesday",
                            description: "Tuesday",
                            token: "one",
                            synonyms: ["1"]
                        },
                        {
                            title: "Wednesday",
                            description: "Wednesday",
                            token: "two",
                            synonyms: ["2"]
                        }
                    ]
                }
            ]
        };
        let compiledResponse: Response;
        beforeEach(() => {
            compiledResponse = compileResponse(displayResponse, request, context);
        });
        it("compiles correctly", () => {
            expect(compiledResponse).to.exist;
            expect(typeof compiledResponse.outputSpeech !== "string").to.be.true;
            expect(compiledResponse.outputSpeech).to.deep.equal({
                ssml: "<speak>When do you want your roses delivered?</speak>",
                displayText: "When do you want your roses delivered?"
            });
            expect(compiledResponse.reprompt).to.deep.equal({
                ssml: "<speak>What's the delivery date for the roses?</speak>",
                displayText: "What's the delivery date for the roses?"
            });

            // Find the display
            expect(compiledResponse.displays).to.have.length(1);
            const display = compiledResponse.displays[0];
            expect(isList(display)).to.be.true;
            if (isList(display)) {
                expect(display.title).to.equal('Delivery date for the roses?');
            }
        });
        describe("that pulls from both session store slots and request slots", () => {
            const displayResponse: SimpleResponse = {
                outputSpeech: {
                    ssml: "<speak>Ok confirming ${date} for the ${flower_type} delivery?</speak>",
                    displayText: "Ok confirming ${date} for the ${flower_type} delivery"
                },
                reprompt: {
                    ssml: "<speak>${ date } for the ${flower_type} right?</speak>",
                    displayText: "${ date } for the ${flower_type} right?"
                }
            };
            beforeEach(() => {
                request = new IntentRequestBuilder().withSlots({
                    date: {
                        name: "date",
                        value: "Tuesday"
                    }
                }).build();
                compiledResponse = compileResponse(displayResponse, request, context);
            });
            it("compiles correctly", () => {
                expect(compiledResponse).to.exist;
                expect(typeof compiledResponse.outputSpeech !== "string").to.be.true;
                expect(compiledResponse.outputSpeech).to.deep.equal({
                    ssml: "<speak>Ok confirming Tuesday for the roses delivery?</speak>",
                    displayText: "Ok confirming Tuesday for the roses delivery"
                });
                expect(compiledResponse.reprompt).to.deep.equal({
                    ssml: "<speak>Tuesday for the roses right?</speak>",
                    displayText: "Tuesday for the roses right?"
                });
            });
        });
    });
});
