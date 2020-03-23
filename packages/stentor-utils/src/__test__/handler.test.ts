/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Content, Handler, Intent } from "stentor-models";
import {
    containsInvalidResponse,
    determineIntentIdToPath,
    filterOutIntents,
    forwardsTo,
    HandledIn,
    handles,
    hasContent,
    hasForwards,
    hasReprompt,
    hasUtterances,
    responsesContain,
    toMap
} from "../handler";

// Define some useful constants
const organizationId = "organizationId";
const appId = "appId";
const intentId = "intentId";

const handler: Handler = {
    organizationId,
    appId,
    intentId,
    type: "HandlerType",
    name: "Handler",
    content: {},
    data: {}
};

const anotherHandler: Handler = {
    organizationId,
    appId,
    intentId: "anotherHandler",
    type: "HandlerType",
    name: "Another Handler",
    content: {},
    data: {}
};

const globalHandler: Handler = {
    organizationId,
    appId,
    intentId: "globalHandler",
    type: "HandlerType",
    name: "Global Handler",
    utterancePatterns: ["global access"],
    content: {
        ["globalHandler"]: [{ outputSpeech: "Hi", reprompt: "Hello?" }]
    },
    forward: {
        ["launchRequest"]: [
            {
                type: "START",
                intentId: "intentId"
            }
        ]
    },
    data: {}
};

const launchRequest: Handler = {
    organizationId,
    appId,
    intentId: "LaunchRequest",
    type: "HandlerType",
    name: "Launch Request",
    content: {
        ["LaunchRequest"]: [{ outputSpeech: "Hi", reprompt: "Hello?" }]
    }
};

const help: Handler = {
    content: {
        HelpIntent: [
            {
                outputSpeech: "<speak>During playback, you can either pause or resume.</speak>",
                reprompt: "<speak>During playback, you can either pause or resume.</speak>"
            }
        ]
    },
    organizationId: "Westwood-One",
    data: {},
    createdAt: "2018-05-10T14:11:53.351Z",
    intentId: "HelpIntent",
    appId: "opie-radio-DDOFO",
    type: "HandlerIntent"
};

const intent: Intent = {
    appId: "appId",
    organizationId: "orgId",
    intentId: "intentId",
    utterancePatterns: ["hello world"]
};

const handlerWithContent: Handler<Content, any> = {
    content: {
        HelpIntent: [
            {
                outputSpeech: "<speak>During playback, you can either pause or resume.</speak>",
                reprompt: "<speak>During playback, you can either pause or resume.</speak>"
            }
        ],
        CancelIntent: [
            {
                outputSpeech: "<speak>Goodbye</speak>"
            }
        ]
    },
    data: {
        offerToPlayLatest: false,
        alwaysPlayLatest: true,
        nextIsOlder: true,
        url:
            "https://www.omnycontent.com/d/playlist/a7b0bd27-d748-4fbe-ab3b-a6fa0049bcf6/69c59658-9115-46dd-9df5-a8c700f6b103/6dc7ab56-1b43-41a6-9cf9-a8c700f72571/podcast.rss"
    },
    organizationId: "Westwood-One",
    intentId: "LaunchRequest",
    appId: "opie-radio-DDOFO",
    name: "Play Podcast",
    type: "PlayPodcastIntent",
    utterancePatterns: [
        "{play|open|listen to|begin|start|give me|do you have|can you play|} {the|} {opie|o. p.|OP} {podcast|show|radio|} {please|thanks|}"
    ]
};

describe("#toMap()", () => {
    describe("when passed undefined", () => {
        it("returns an empty map", () => {
            expect(Object.keys(toMap(undefined))).to.have.length(0);
        });
    });
    describe("when passed handlers", () => {
        it("translates them to a map", () => {
            const handlers = [handler, anotherHandler, globalHandler];
            const map = toMap(handlers);
            expect(Object.keys(map)).to.have.length(handlers.length);
            expect(map[handler.intentId]).to.equal(handler);
            expect(map[anotherHandler.intentId]).to.equal(anotherHandler);
            expect(map[globalHandler.intentId]).to.equal(globalHandler);
        });
    });
});

describe("#responseContain()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(responsesContain(undefined, "")).to.be.false;
        });
    });
    describe("when passed a handler with content", () => {
        it("returns the correct response based on the provided character", () => {
            expect(responsesContain(globalHandler, "H")).to.be.true;
            expect(responsesContain(globalHandler, "Z")).to.be.false;
        });
    });
    describe("when passed a handler without content", () => {
        it("returns false", () => {
            expect(responsesContain(anotherHandler, "H")).to.be.false;
        });
    });
    describe("when passed a handler undefined content", () => {
        it("returns false", () => {
            expect(
                responsesContain(
                    {
                        organizationId,
                        appId,
                        intentId: "anotherHandler",
                        type: "HandlerType",
                        name: "Another Handler"
                    },
                    "Z"
                )
            ).to.be.false;
        });
    });
});

describe("#forwardsTo()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(forwardsTo(undefined, "")).to.be.false;
        });
    });
    describe("when passed a handler without forwards", () => {
        it("returns false", () => {
            expect(forwardsTo(handler, "intentId")).to.be.false;
        });
    });
    describe("when passed a handler with forwards", () => {
        it("returns the correct if it has the forward or not", () => {
            expect(forwardsTo(globalHandler, "intentId")).to.be.true;
            expect(forwardsTo(globalHandler, "nope")).to.be.false;
        });
    });
});

describe("#hasForwards()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(hasForwards(undefined)).to.be.false;
        });
    });
    describe("when passed a handler without forwards", () => {
        it("returns false", () => {
            expect(hasForwards(handler)).to.be.false;
        });
    });
    describe("when passed a handler with forward", () => {
        expect(hasForwards(globalHandler)).to.be.true;
    });
});

describe("#hasReprompt()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(hasReprompt(undefined)).to.be.false;
        });
    });
    describe("when passed a handler with reprompt", () => {
        it("returns true", () => {
            expect(hasReprompt(globalHandler)).to.be.true;
        });
    });
    describe("when passed a handler without content", () => {
        it("returns false", () => {
            expect(hasReprompt(handler)).to.be.false;
        });
    });
    describe("when passed a handler with undefined content", () => {
        it("returns false", () => {
            expect(
                hasReprompt({
                    organizationId,
                    appId,
                    intentId: "anotherHandler",
                    type: "HandlerType",
                    name: "Another Handler"
                })
            ).to.be.false;
        });
    });
    describe("when passed a handler without a reprompt", () => {
        it("returns false", () => {
            expect(hasReprompt(handler)).to.be.false;
        });
    });
});

describe("#hasContent()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(hasContent(undefined)).to.be.false;
        });
    });
    describe("when passed a handler without content", () => {
        it("returns false", () => {
            expect(hasContent(handler)).to.be.false;
        });
    });
    describe("when passed a handler undefined content", () => {
        it("returns false", () => {
            expect(
                hasContent({
                    organizationId,
                    appId,
                    intentId: "anotherHandler",
                    type: "HandlerType",
                    name: "Another Handler"
                })
            ).to.be.false;
        });
    });
    describe("when passed a handler with content", () => {
        it("returns true", () => {
            expect(hasContent(globalHandler)).to.be.true;
        });
    });
});

describe("#hasUtterances()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(hasUtterances(undefined)).to.be.false;
        });
    });
    describe("when passed a handler with utterances", () => {
        it("returns true", () => {
            expect(hasUtterances(globalHandler)).to.be.true;
        });
    });
    describe("when passed a handler without utterances", () => {
        it("returns false", () => {
            expect(hasUtterances(launchRequest)).to.be.false;
        });
    });
});

describe("#containsInvalidResponse()", () => {
    describe("when passed invalid response", () => {
        it("returns an error", () => {
            const handlerWithBadResponse = { ...handler };
            handlerWithBadResponse.content = {
                intentId: [
                    {
                        outputSpeech: {
                            ssml:
                                "<speak> <audio src='<audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/BP/Audio+2018/V2/Intro_Message.mp3'/> <audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/BP/Audio+2018/V2/Safety_On_The_Road.mp3'/> <audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/BP/Audio+2018/V2/Outro_Message.mp3'/></speak>"
                        }
                    }
                ]
            };
            const result = containsInvalidResponse(handlerWithBadResponse);
            expect(result.error).to.be.true;
            expect(result.response).to.exist;
            expect(result.response).to.equal(
                "<speak><audio src='<audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/BP/Audio+2018/V2/Intro_Message.mp3'/> <audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/BP/Audio+2018/V2/Safety_On_The_Road.mp3'/> <audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/BP/Audio+2018/V2/Outro_Message.mp3'/></speak>"
            );
        });
        describe("with invalid reprompt", () => {
            it("returns an error", () => {
                const handlerWithBadReprompt = { ...handler };
                handlerWithBadReprompt.content = {
                    intentId: [
                        {
                            outputSpeech: {
                                ssml: "Good"
                            },
                            reprompt: {
                                ssml: "<audio"
                            }
                        }
                    ]
                };
                const repromptResult = containsInvalidResponse(handlerWithBadReprompt);
                expect(repromptResult.error).to.be.true;
                expect(repromptResult.response).to.exist;
                expect(repromptResult.response).to.equal("<speak><audio</speak>");
            });
        });
    });
    describe("when passed a valid response", () => {
        it("does not return an error", () => {
            const handlerWithValidResponse = { ...handler };
            handlerWithValidResponse.content = {
                intentId: [
                    {
                        outputSpeech: {
                            ssml:
                                '<audio src="https://s3.amazonaws.com/xapp-files/Voice+Apps/BP/Audio+2018/V2/Outro_Message.mp3"/>'
                        }
                    }
                ]
            };
            const result = containsInvalidResponse(handlerWithValidResponse);
            expect(result.error).to.be.false;
            expect(result.response).to.be.undefined;
        });
    });
    describe("when passed a handler without content", () => {
        it("returns false", () => {
            const result = containsInvalidResponse(handler);
            expect(result.error).to.be.false;
            expect(result.response).to.be.undefined;
        });
    });
    describe("when passed a handler undefined content", () => {
        it("returns false", () => {
            const result = containsInvalidResponse({
                organizationId,
                appId,
                intentId: "anotherHandler",
                type: "HandlerType",
                name: "Another Handler"
            });
            expect(result.error).to.be.false;
            expect(result.response).to.be.undefined;
        });
    });
});
describe("#filterOutIntents()", () => {
    describe("when passed undefined", () => {
        it("returns an empty array", () => {
            const handlers = filterOutIntents(undefined);
            expect(Array.isArray(handlers)).to.be.true;
            expect(handlers).to.have.length(0);
        });
    });
    describe("when passed just an array of intents and handlers", () => {
        it("filters out the intents", () => {
            const handlers = filterOutIntents([help, handlerWithContent, intent]);
            expect(handlers).to.have.length(2);
        });
    });
});

describe("#determineIntentIdToPath()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(determineIntentIdToPath(undefined, undefined)).to.be.undefined;
            expect(determineIntentIdToPath(handlerWithContent, undefined)).to.be.undefined;
            expect(determineIntentIdToPath(globalHandler, undefined)).to.be.undefined;
        });
    });
    describe("when passed a handler without forwards", () => {
        it("returns undefined", () => {
            expect(determineIntentIdToPath(handlerWithContent, "intentId")).to.be.undefined;
        });
    });
    describe("when passed a handler with forwards", () => {
        it("returns the correct intentId", () => {
            expect(determineIntentIdToPath(globalHandler, "intentId")).to.equal("launchRequest");
            expect(determineIntentIdToPath(globalHandler, "noMatch")).to.equal(undefined);
        });
    });
});

describe("#handles()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(handles(undefined, "intentId")).to.be.false;
        });
    });
    describe("when pass an intent", () => {
        it("returns false", () => {
            expect(handles(intent, "intentId")).to.be.false;
        });
    });
    describe("when passed a handler", () => {
        describe("with content and forwards", () => {
            // globalHandler, launchRequest
            it("returns the correct boolean", () => {
                expect(handles(globalHandler, "launchRequest")).to.be.true;
                expect(handles(globalHandler, "launchRequest", HandledIn.Redirect)).to.be.false;
                expect(handles(globalHandler, "launchRequest", HandledIn.Forward)).to.be.true;
                expect(handles(globalHandler, "launchRequest", HandledIn.Content)).to.be.false;
                expect(handles(globalHandler, "globalHandler")).to.be.true;
                expect(handles(globalHandler, "globalHandler", HandledIn.Redirect)).to.be.false;
                expect(handles(globalHandler, "globalHandler", HandledIn.Forward)).to.be.false;
                expect(handles(globalHandler, "globalHandler", HandledIn.Content)).to.be.true;
                expect(handles(globalHandler, "unHandled")).to.be.false;
                expect(handles(globalHandler, "unHandled", HandledIn.Redirect)).to.be.false;
                expect(handles(globalHandler, "unHandled", HandledIn.Forward)).to.be.false;
                expect(handles(globalHandler, "unHandled", HandledIn.Content)).to.be.false;
            });
        });
    });
});
