/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { ContextBuilder } from "stentor-context";
import {
    Context,
    Request,
    Response,
    SimpleResponse,
    Storage,
    ResponseOutput,
    RequestSlotMap,
    LinkOutSuggestion
} from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";
import { isCard, isList, ResponseBuilder } from "stentor-response";
import { compileResponse, jsonEscape } from "../compileResponse";

chai.use(sinonChai);
const expect = chai.expect;

interface TestStorage extends Storage {
    name: string;
    metBefore: boolean;
}

describe(`#${jsonEscape.name}()`, () => {
    it('escapes correctly', () => {
        const test0 = jsonEscape('{"hallo":"line1\r\nline2","a":[5.5,5.6,5.7]}');
        const json0 = JSON.parse(test0);
        expect(json0).to.exist;
        expect(test0).to.equal('{"hallo":"line1\\r\\nline2","a":[5.5,5.6,5.7]}');

        const test1 = jsonEscape('{"hallo":"line1\\r\\nline2","a":[5.5,5.6,5.7]}');
        const json1 = JSON.parse(test0);
        expect(json1).to.exist;
        expect(test1).to.equal('{"hallo":"line1\\r\\nline2","a":[5.5,5.6,5.7]}');
    });
});

describe(`#${compileResponse.name}()`, () => {
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
                        },
                        SUGGESTION: {
                            document: "This is the suggested document",
                            url: "https://documentation.xapp.ai",
                            title: "Suggested Doc"
                        },
                        SEARCH_RESULTS: [
                            {
                                title: "First Result",
                                document: "Foo foo foo foo foo foo",
                                source: "https://foo.com"
                            },
                            {
                                title: "Second Result",
                                document: "Bar bar bar bar",
                                source: "https://bar.com"
                            },
                            {
                                title: "Third Result",
                                document: "Baz baz baz baz",
                                source: "https://baz.com"
                            },
                            {
                                title: "Fourth Result",
                                document: "Four four four four",
                                source: "https://four.com"
                            }
                        ]
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
            outputSpeech: "Your name is ${ $.request.slots.NAME.value } (${NAME})",
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
                expect(outputSpeech).to.equal("Your name is Jim (Jim)");
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
                describe("with multiple segments", () => {
                    it("compiles the same for the SSML and displayText", () => {
                        const fullResponse: SimpleResponse = {
                            outputSpeech: {
                                ssml: "${GREETING}, ${QUESTION} SSML",
                                displayText: "${GREETING}, ${QUESTION} displayText"
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
                                ],
                                ["QUESTION"]: [
                                    { segment: { ssml: "<br/>,How are you?", displayText: "How *are* you?" } }
                                ]
                            }
                        };
                        const compiledResponse = compileResponse(fullResponse, request, context);
                        const outputSpeech = compiledResponse.outputSpeech;
                        expect(outputSpeech).to.be.a("object");
                        if (typeof outputSpeech === "object") {
                            const displayText = outputSpeech.displayText;
                            const ssml = outputSpeech.ssml;
                            expect(displayText).to.contain("displayText");
                            expect(displayText).to.contain("How *are* you?");
                            expect(ssml).to.contain("SSML");
                            expect(ssml).to.contain("<a/>");
                            expect(ssml).to.contain("<br/>");
                            // when we split them by commas, they should be the same
                            expect(displayText.split(",")[0]).to.equal(ssml.split(",")[1]);
                        }
                    });
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
    describe("when passed a response with suggestion chips", () => {
        const chippedResponse: SimpleResponse = {
            outputSpeech: {
                ssml: "Your name is ${ $.request.slots.NAME.value }",
                displayText: "Your name is ${ $.request.slots.NAME.value }",
                suggestions: [
                    {
                        title: "Read More",
                        url: "${SUGGESTION.url}"
                    },
                    {
                        title: "${flower_type}",
                        url: "${SUGGESTION.url}"
                    }
                ]
            },
            reprompt: {
                ssml: "<speak> Hi ${$.context.storage.name} </speak>",
                displayText: "Hi ${$.context.storage.name}"
            }
        }
        let compiledResponse: Response;
        beforeEach(() => {
            compiledResponse = compileResponse(chippedResponse, request, context);
        });
        it("compiles the chips", () => {
            expect(compileResponse).to.exist;

            const suggestions = typeof compiledResponse.outputSpeech !== "string" ? compiledResponse.outputSpeech.suggestions : undefined;
            expect(suggestions).to.have.length(2);

            const first = suggestions[0];
            const url = typeof first !== "string" ? (first as LinkOutSuggestion).url : undefined;
            expect(url).to.equal("https://documentation.xapp.ai");

            const second = suggestions[1];
            const title = typeof second !== "string" ? second.title : undefined;
            expect(title).to.equal("roses");
        });
        describe("when suggestion chip URL doesn't exist", () => {

            const unChippedResponse: SimpleResponse = {
                outputSpeech: {
                    ssml: "Your name is ${ $.request.slots.NAME.value }",
                    displayText: "Your name is ${ $.request.slots.NAME.value }",
                    suggestions: [
                        {
                            title: "Read More",
                            url: "${DNE}"
                        },
                        {
                            title: "${flower_type}",
                            url: "${SUGGESTION.url}"
                        }
                    ]
                },
                reprompt: {
                    ssml: "<speak> Hi ${$.context.storage.name} </speak>",
                    displayText: "Hi ${$.context.storage.name}"
                }
            }
            beforeEach(() => {
                compiledResponse = compileResponse(unChippedResponse, request, context);
            });
            it("doesn't include them", () => {
                expect(compileResponse).to.exist;

                const suggestions = typeof compiledResponse.outputSpeech !== "string" ? compiledResponse.outputSpeech.suggestions : undefined;
                expect(suggestions).to.have.length(1);

                const first = suggestions[0];
                const url = typeof first !== "string" ? (first as LinkOutSuggestion).url : undefined;
                const title = typeof first !== "string" ? (first as LinkOutSuggestion).title : undefined;
                expect(title).to.equal("roses");
                expect(url).to.equal("https://documentation.xapp.ai");
            });
        });
    });
    describe("when passed a response with displays", () => {

        let compiledResponse: Response;

        it("compiles the displays", () => {

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

            compiledResponse = compileResponse(displayResponse, request, context);

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
        describe("with additional context set", () => {
            it("compiles the displays", () => {

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
                        },
                        {
                            type: "CARD",
                            title: "${error.name}",
                            subTitle: "Error Message: ${$.error.message}"
                        }
                    ]
                };

                class CustomError extends Error {
                    public constructor(message: string) {
                        super(message);
                        this.name = "CustomError";
                    }
                }

                const error = new CustomError("Something went wrong");

                compiledResponse = compileResponse(displayResponse, request, context, { error });

                expect(compileResponse).to.exist;
                expect(compiledResponse.displays).to.have.length(2);
                const display = compiledResponse.displays[0];
                expect(isList(display)).to.be.true;
                if (isList(display)) {
                    expect(display.title).to.equal("Hello Bob");
                    const one = display.items[0];
                    expect(one.title).to.equal("One");
                    expect(one.description).to.equal("One Jim");
                }
                const card = compiledResponse.displays[1];
                expect(isCard(card)).to.be.true;
                if (isCard(card)) {
                    expect(card.title).to.equal("CustomError");
                    expect(card.subTitle).to.equal("Error Message: Something went wrong");
                }
            });
        });
        describe("leveraging the itemObject field", () => {
            it("compiles the displays", () => {

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
                            itemsName: "currentResult",
                            itemsObject: "${SEARCH_RESULTS}",
                            range: {
                                length: 3,
                                from: 0
                            },
                            title: "Hello ${$.context.storage.name}",
                            items: [
                                {
                                    title: "${currentResult.title}",
                                    description: "Snippet: ${currentResult.document}",
                                    token: "result-${index}",
                                    url: "${currentResult.source}",
                                    synonyms: []
                                }
                            ]
                        }
                    ]
                };

                compiledResponse = compileResponse(displayResponse, request, context);

                expect(compileResponse).to.exist;
                expect(compiledResponse.displays).to.have.length(1);
                const display = compiledResponse.displays[0];
                expect(isList(display)).to.be.true;
                if (isList(display)) {
                    expect(display.title).to.equal("Hello Bob");
                    expect(display.items).to.have.length(3);

                    const one = display.items[0];
                    expect(one.title).to.equal("First Result");
                    expect(one.description).to.equal("Snippet: Foo foo foo foo foo foo");

                    const three = display.items[2];
                    expect(three.title).to.equal("Third Result");
                    expect(three.description).to.equal("Snippet: Baz baz baz baz");
                }
            });
            describe("with new lines", () => {
                it("compiles the display", () => {

                    const newLineResponse: Response = {
                        outputSpeech: {
                            displayText: "Here is what I found...",
                            ssml: "<speak>Here is what I found...</speak>"
                        },
                        reprompt: {
                            displayText: "Any other questions?",
                            ssml: "<speak>Any other questions?</speak>"
                        },
                        displays: [
                            {
                                type: "LIST",
                                itemsName: "currentResult",
                                itemsObject: "${SEARCH_RESULTS}",
                                range: {
                                    length: 3,
                                    from: 0
                                },
                                title: "${$.request.rawQuery}",
                                items: [
                                    {
                                        title: "${currentResult.title}",
                                        description: "${currentResult.document}",
                                        token: "result-${index}",
                                        url: "${currentResult.source}",
                                        synonyms: []
                                    }
                                ]
                            }
                        ]
                    }

                    request = new IntentRequestBuilder()
                        .withIntentId("intentId")
                        .withRawQuery("hot dog")
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
                                    SEARCH_RESULTS: [
                                        {
                                            title: 'Moving from an Apartment to a House Checklist | Travelers Insurance',
                                            document: '...7 Tips for Moving With a Pet\n' +
                                                '\n' +
                                                'Get tips on how to ease moving stress and anxiety for dogs and cats.\n' +
                                                '\n' +
                                                'Learn more\n' +
                                                '\n' +
                                                'Related...',
                                            source: 'https://www.travelers.com/resources/home/moving/moving-from-an-apartment-to-a-house-checklist'
                                        },
                                        {
                                            title: 'Moving from an Apartment to a House Checklist | Travelers Insurance',
                                            document: '...7 Tips for Moving With a Pet\n' +
                                                '\n' +
                                                'Get tips on how to ease moving stress and anxiety for dogs and cats.\n' +
                                                '\n' +
                                                'Learn more\n' +
                                                '\n' +
                                                'Related...',
                                            source: 'https://www.travelers.com/tools-resources/home/moving/moving-from-an-apartment-to-a-house-checklist'
                                        },
                                        {
                                            title: 'Grilling Safety Tips | Travelers Insurance',
                                            document: '...was leaving or placing an object that could burn too close to the grill, according to the NFPA study.\n' +
                                                '\n' +
                                                '\tCharcoal grills can continue to remain hot for many hours after the flames extinguish. Avoid placing any burnable objects near the grill or moving the grill while the coals are hot. Keep...',
                                            source: 'https://www.travelers.com/resources/home/safety/grilling-safety-tips'
                                        },
                                        {
                                            title: 'Wood Stove Safety Tips | Travelers Insurance',
                                            document: '...Because a wood stove generates very hot combustion gases, its chimney must be either masonry (with flue tiles intact and in good condition) or manufactured specifically for burning wood...',
                                            source: 'https://www.travelers.com/resources/home/fire-safety/wood-stove-safety-tips'
                                        },
                                        {
                                            title: 'Cooking Fire Safety | Travelers Insurance',
                                            document: '...an extinguisher nearby is important, but you also need to have the correct type of extinguisher and know how to properly use it.\n' +
                                                '\tNever throw hot grease in the garbage as it can ignite combustible materials. Be sure to let grease cool and consider disposing it in an old can, such as a metal...',
                                            source: 'https://www.travelers.com/resources/home/fire-safety/cooking-fire-safety'
                                        },
                                        {
                                            title: 'Electrical Safety in the Home | Travelers Insurance',
                                            document: '...built before 1965 typically have ungrounded two-pronged outlets, while newer construction will usually have three-pronged outlets, which include a hot, neutral and ground wire. Homeowners may want to consider upgrading their wiring to accept three-pronged outlets, particularly if you are replacing...',
                                            source: 'https://www.travelers.com/resources/home/fire-safety/electrical-safety-in-the-home'
                                        },
                                        {
                                            title: '5 Tips for Childproofing Your Home | Travelers Insurance',
                                            document: '...covers on outlets.\n' +
                                                '\tChildproof window guards and safety nettings on windows to help prevent falls from windows.\n' +
                                                '\tProtective material on radiator, hot pipes and other burn hazards.\n' +
                                                '\tShields on light fixtures.\n' +
                                                '\n' +
                                                '2. Gear up...',
                                            source: 'https://www.travelers.com/resources/home/renovation/5-tips-for-childproofing-your-home'
                                        },
                                        {
                                            title: 'Generator Safety | Travelers Insurance',
                                            document: '...extension cords with the proper amperage rating for the intended use.\n' +
                                                '\tBe aware that portable generators become hot while running and remain hot for a significant amount of time after they are shut down, creating a potential fire hazard...',
                                            source: 'https://www.travelers.com/resources/home/safety/generator-safety'
                                        },
                                        {
                                            title: 'How to Make Your Home More Energy Efficient | Travelers Insurance',
                                            document: '...a detailed work proposal following the evaluation. The contractor may have other recommendations, such as installing solar panels or a solar hot water system. Homeowners can expect to save 20 percent or more on the annual utility bill, depending on the type of improvements. For more details...',
                                            source: 'https://www.travelers.com/resources/home/renovation/how-to-make-your-home-more-energy-efficient'
                                        },
                                        {
                                            title: '7 Tips for Moving With a Pet | Travelers Insurance',
                                            document: '...the idea of new trees to sniff and fire hydrants to investigate. Just as moving can be stressful for you, it can also create stress and anxiety for dogs and cats.\n' +
                                                '\n' +
                                                'For Spencer, a six-year-old Lhasa Apso, the clues had been there for weeks. The boxes, the packing, the unfamiliar visitors coming to...',
                                            source: 'https://www.travelers.com/tools-resources/home/moving/7-tips-for-moving-with-a-pet'
                                        }
                                    ]
                                }
                            }
                        })
                        .build() as Context<TestStorage>;

                    compiledResponse = compileResponse(newLineResponse, request, context);

                    expect(compiledResponse).to.exist;
                    const displays = compiledResponse.displays;
                    expect(displays).to.have.length(1);
                    const list = displays[0];
                    expect(isList(list)).to.be.true;
                    if (isList(list)) {
                        expect(list.title).to.equal("hot dog");
                        expect(list.items).to.have.length(3);
                        const item = list.items[0];
                        expect(item.token).to.equal("result-0");
                        expect(item.title).to.equal("Moving from an Apartment to a House Checklist | Travelers Insurance");
                    }
                });
            });
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
    describe("with macros", () => {
        let compiledResponse: Response;
        beforeEach(() => {

            const date: (input: string) => string = (input: string) => {
                return input.replace(/-/g, "/")
            }

            const macroResponse: SimpleResponse = {
                outputSpeech: {
                    ssml: "<speak>Delivery on the ${date('${date}')}, is that ok ${capitalize('bob')}?</speak>",
                    displayText: "Delivery on the ${date('${date}')}, is that ok ${capitalize('bob')}?"
                },
                reprompt: {
                    ssml: "<speak>${date('${date}')}, is that ok for delivery?</speak>",
                    displayText: "${date('${date}')}, is that ok for delivery?"
                }
            };

            request = new IntentRequestBuilder().withSlots({
                date: {
                    name: "date",
                    value: "2021-09-11"
                }
            }).build();
            compiledResponse = compileResponse(macroResponse, request, context, {}, { date });
        });
        it("leverages the macro", () => {
            expect(compiledResponse).to.exist;
            const outputSpeech = compiledResponse.outputSpeech;
            expect(outputSpeech).to.exist;
            expect(outputSpeech).to.deep.equal({
                ssml: "<speak>Delivery on the 2021/09/11, is that ok Bob?</speak>",
                displayText: "Delivery on the 2021/09/11, is that ok Bob?"
            });
            const reprompt = compiledResponse.reprompt;
            expect(reprompt).to.exist;
            expect(reprompt).to.deep.equal({
                ssml: '<speak>2021/09/11, is that ok for delivery?</speak>',
                displayText: '2021/09/11, is that ok for delivery?'
            });
        });
    });
});
