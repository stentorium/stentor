/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Device } from "stentor-models";
import { ResponseBuilder } from "../ResponseBuilder";

const device: Device = {
    channel: "test",
    canPlayAudio: true,
    canPlayVideo: false,
    hasScreen: false,
    canSpeak: true,
    canThrowCard: false,
    audioSupported: true,
    videoSupported: false,
    canTransferCall: false,
    hasWebBrowser: false
};

describe("ResponseBuilder", () => {
    let builder: ResponseBuilder;
    beforeEach(() => {
        builder = new ResponseBuilder({ device });
    });
    describe("#constructor()", () => {
        it("returns an instance", () => {
            expect(builder).to.be.instanceOf(ResponseBuilder);
        });
    });
    describe("#respond()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.respond(undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed a response with string outputSpeech", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .respond({
                            name: "NAME",
                            tag: "TAG",
                            outputSpeech: "say",
                            haveNotSeenWithin: {
                                amount: 5,
                                format: "h"
                            }
                        })
                        .build()
                ).to.deep.equal({
                    name: "NAME",
                    tag: "TAG",
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    },
                    haveNotSeenWithin: {
                        amount: 5,
                        format: "h"
                    }
                });
            });
        });
        describe("when passed a response with string reprompt", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .respond({
                            name: "NAME",
                            tag: "TAG",
                            outputSpeech: {
                                ssml: "say",
                                displayText: "say"
                            },
                            reprompt: "reprompt",
                            haveNotSeenWithin: {
                                amount: 5,
                                format: "h"
                            }
                        })
                        .build()
                ).to.deep.equal({
                    name: "NAME",
                    tag: "TAG",
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    },
                    reprompt: {
                        ssml: "<speak>reprompt</speak>",
                        displayText: "reprompt"
                    },
                    haveNotSeenWithin: {
                        amount: 5,
                        format: "h"
                    }
                });
            });
        });
    });
    describe("#say()", () => {
        it("returns itself", () => {
            expect(builder.say("say")).to.equal(builder);
        });
        describe("when passed undefined", () => {
            it("does not set the outputSpeech", () => {
                expect(builder.say(undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed a string", () => {
            it("sets the SSML and displayText", () => {
                expect(builder.say("say").build()).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    }
                });
            });
        });
        describe("when passed a ResponseOutput", () => {
            it("sets the outputSpeech", () => {
                expect(
                    builder
                        .say({
                            ssml: "ssml",
                            displayText: "displayText"
                        })
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>ssml</speak>",
                        displayText: "displayText"
                    }
                });
            });
        });
        describe("when already called", () => {
            it("overwrites the previous call", () => {
                expect(
                    builder
                        .say("one")
                        .say("two")
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>two</speak>",
                        displayText: "two"
                    }
                });
            });
        });
        describe("with append", () => {
            describe("with existing outputSpeech", () => {
                it("appends to the end", () => {
                    expect(
                        builder
                            .say("one")
                            .say("two", true)
                            .build()
                    ).to.deep.equal({
                        outputSpeech: {
                            ssml: "<speak>one two</speak>",
                            displayText: "one two"
                        }
                    });
                });
            });
            describe("without existing outputSpeech", () => {
                it("sets the outputSpeech", () => {
                    expect(builder.say("one", true).build()).to.deep.equal({
                        outputSpeech: {
                            ssml: "<speak>one</speak>",
                            displayText: "one"
                        }
                    });
                });
            });
        });
    });
    describe("#reprompt()", () => {
        it("returns itself", () => {
            expect(builder.say("say").reprompt("reprompt")).to.equal(builder);
        });
        describe("when called before #say()", () => {
            it("throws an error", () => {
                expect(builder.reprompt).to.throw();
            });
        });
        describe("when passed undefined", () => {
            it("doesn't set the reprompt", () => {
                expect(
                    builder
                        .say("say")
                        .reprompt(undefined)
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    }
                });
            });
        });
        describe("when passed a string", () => {
            it("sets the SSML and displayText", () => {
                expect(
                    builder
                        .say("say")
                        .reprompt("reprompt")
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    },
                    reprompt: {
                        ssml: "<speak>reprompt</speak>",
                        displayText: "reprompt"
                    }
                });
            });
        });
        describe("when passed a ResponseOutput", () => {
            it("sets the outputSpeech", () => {
                expect(
                    builder
                        .say("say")
                        .reprompt({
                            ssml: "ssml",
                            displayText: "displayText"
                        })
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    },
                    reprompt: {
                        ssml: "<speak>ssml</speak>",
                        displayText: "displayText"
                    }
                });
            });
        });
        describe("when already called", () => {
            it("overwrites the previous call", () => {
                expect(
                    builder
                        .say("say")
                        .reprompt("one")
                        .reprompt("two")
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    },
                    reprompt: {
                        ssml: "<speak>two</speak>",
                        displayText: "two"
                    }
                });
            });
        });
        describe("with append", () => {
            describe("with existing reprompt", () => {
                it("appends to the end", () => {
                    expect(
                        builder
                            .say("say")
                            .reprompt("one")
                            .reprompt("two", true)
                            .build()
                    ).to.deep.equal({
                        outputSpeech: {
                            ssml: "<speak>say</speak>",
                            displayText: "say"
                        },
                        reprompt: {
                            ssml: "<speak>one two</speak>",
                            displayText: "one two"
                        }
                    });
                });
            });
            describe("without existing reprompt", () => {
                it("sets the reprompt", () => {
                    expect(
                        builder
                            .say("say")
                            .reprompt("one", true)
                            .build()
                    ).to.deep.equal({
                        outputSpeech: {
                            ssml: "<speak>say</speak>",
                            displayText: "say"
                        },
                        reprompt: {
                            ssml: "<speak>one</speak>",
                            displayText: "one"
                        }
                    });
                });
            });
        });
    });
    describe("#withSuggestions()", () => {
        describe("when called before #say()", () => {
            it("throws an error", () => {
                expect(builder.withSuggestions).to.throw();
            });
        });
        describe("when passed undefined", () => {
            it("does not set suggestions", () => {
                expect(
                    builder
                        .say("say")
                        .withSuggestions(undefined)
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    }
                });
            });
        });
        describe("when passed a suggestion", () => {
            it("sets the suggestion in an array", () => {
                expect(
                    builder
                        .say("say")
                        .withSuggestions({ title: "suggestion" })
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say",
                        suggestions: [{ title: "suggestion" }]
                    }
                });
            });
        });
        describe("when passed an array", () => {
            it("sets the suggestions", () => {
                expect(
                    builder
                        .say("say")
                        .withSuggestions([{ title: "suggestion" }])
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say",
                        suggestions: [{ title: "suggestion" }]
                    }
                });
            });
        });
        describe("when already called", () => {
            it("overwrites the first call", () => {
                expect(
                    builder
                        .say("say")
                        .withSuggestions({ title: "one" })
                        .withSuggestions({ title: "two" })
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say",
                        suggestions: [{ title: "two" }]
                    }
                });
            });
        });
        describe("with append", () => {
            it("adds the suggestion to the array", () => {
                it("sets the suggestion in an array", () => {
                    expect(
                        builder
                            .say("say")
                            .withSuggestions({ title: "one" })
                            .withSuggestions([{ title: "two" }], true)
                            .build()
                    ).to.deep.equal({
                        outputSpeech: {
                            ssml: "<speak>say</speak>",
                            displayText: "say",
                            suggestions: [{ title: "one" }, { title: "two" }]
                        }
                    });
                });
            });
        });
    });
    describe(`#${ResponseBuilder.prototype.withActiveContext.name}()`, () => {
        describe("when passed a single context", () => {
            it("sets the active contexts", () => {
                const response = new ResponseBuilder({ device })
                    .say("foo")
                    .withActiveContext({ name: "bar", timeToLive: { turnsToLive: 2 } })
                    .build();

                expect(response).to.exist;
                expect(response.context).to.deep.equal({
                    active: [{ name: "bar", timeToLive: { turnsToLive: 2 } }]
                });
            });
        });
        describe("when passed an array of contexts", () => {
            it("sets the active contexts", () => {
                const response = new ResponseBuilder({ device })
                    .say("foo")
                    .withActiveContext([{ name: "bar", timeToLive: { turnsToLive: 2 } }])
                    .build();

                expect(response).to.exist;
                expect(response.context).to.deep.equal({
                    active: [{ name: "bar", timeToLive: { turnsToLive: 2 } }]
                });
            });
        });
        describe("when called more than once", () => {
            it("adds all the contexts", () => {
                const response = new ResponseBuilder({ device })
                    .say("foo")
                    .withActiveContext({ name: "bar", timeToLive: { turnsToLive: 2 } })
                    .withActiveContext([{ name: "baz", timeToLive: { turnsToLive: 4 } }])
                    .build();

                expect(response).to.exist;
                expect(response.context).to.deep.equal({
                    active: [
                        { name: "bar", timeToLive: { turnsToLive: 2 } },
                        { name: "baz", timeToLive: { turnsToLive: 4 } }
                    ]
                });
            });
        });
        describe("when passed undefined", () => {
            it("does nothing", () => {
                const response = new ResponseBuilder({ device }).say("foo").withActiveContext(undefined).build();
                expect(response).to.exist;
                expect(response.context).to.be.undefined;
            });
        });
    });
    describe("#withCard()", () => {
        describe("when passed undefined", () => {
            it("it doesn't set displays", () => {
                expect(
                    builder
                        .say("say")
                        .withCard(undefined)
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    }
                });
            });
        });
        describe("when passed a card", () => {
            it("adds it to the displays", () => {
                expect(
                    builder
                        .say("say")
                        .withCard({
                            type: "CARD",
                            title: "Card",
                            subTitle: "Card sub-title",
                            content: "content",
                            smallImageUrl: "https://image"
                        })
                        .build()
                ).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    },
                    displays: [
                        {
                            type: "CARD",
                            subTitle: "Card sub-title",
                            title: "Card",
                            content: "content",
                            smallImageUrl: "https://image"
                        }
                    ]
                });
            });
        });
    });
    describe("#withList()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.withList(undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed list items", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .withList(
                            [
                                {
                                    title: "Title",
                                    token: "TOKEN"
                                }
                            ],
                            "List Title"
                        )
                        .build()
                ).to.deep.equal({
                    displays: [
                        {
                            type: "LIST",
                            title: "List Title",
                            items: [{ title: "Title", token: "TOKEN" }]
                        }
                    ]
                });
            });
        });
    });
    describe("#withCarousel()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.withCarousel(undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed list items", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .withCarousel([
                            {
                                title: "Title",
                                token: "TOKEN"
                            }
                        ])
                        .build()
                ).to.deep.equal({
                    displays: [
                        {
                            type: "CAROUSEL",
                            items: [{ title: "Title", token: "TOKEN" }]
                        }
                    ]
                });
            });
        });
    });
    describe(`#${ResponseBuilder.prototype.withDisplay.name}`, () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.withDisplay(undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed a custom object", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .withDisplay(
                            {
                                type: "CUSTOM",
                                title: "Title",
                                token: "TOKEN"
                            }
                        )
                        .build()
                ).to.deep.equal({
                    displays: [
                        {
                            type: "CUSTOM",
                            title: "Title",
                            token: "TOKEN"
                        }
                    ]
                });
            });
        });
    });
    describe("#askForAccountLinking()", () => {
        describe("when passed undefined", () => {
            it("sets the system response", () => {
                expect(builder.askForAccountLinking().build()).to.deep.equal({
                    system: "ACCOUNT_LINK"
                });
            });
        });
        describe("when passed a response", () => {
            it("sets the outputSpeech and system response", () => {
                expect(builder.askForAccountLinking("To use this feature").build()).to.deep.equal({
                    system: "ACCOUNT_LINK",
                    data: {
                        accountLinkRequestTTSContext: "To use this feature"
                    }
                });
            });
        });
    });
    describe("#askForSurfaceChange()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.askForSurfaceChange().build()).to.deep.equal({
                    system: "SURFACE_CHANGE"
                });
            });
        });
        describe("when passed just the notificationText", () => {
            it("returns the correct response", () => {
                expect(builder.askForSurfaceChange("The information you requested").build()).to.deep.equal({
                    system: "SURFACE_CHANGE",
                    data: {
                        surfaceChangeRequestTTSContext: "The information you requested"
                    }
                });
            });
        });
        describe("when passed just the notificationText and notificationLabel", () => {
            it("returns the correct response", () => {
                expect(builder.askForSurfaceChange("The information you requested", "Label").build()).to.deep.equal({
                    system: "SURFACE_CHANGE",
                    data: {
                        surfaceChangeRequestTTSContext: "The information you requested",
                        surfaceChangeRequestNotificationTitle: "Label"
                    }
                });
            });
        });
    });
    describe("#askForListAccess()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.askForListAccess().build()).to.deep.equal({
                    system: "PERMISSION_LIST"
                });
            });
        });
        describe("when passed a string response", () => {
            it("returns the correct response", () => {
                expect(builder.askForListAccess("say").build()).to.deep.equal({
                    outputSpeech: {
                        ssml: "say",
                        displayText: "say"
                    },
                    system: "PERMISSION_LIST"
                });
            });
        });
        describe("when passed a Response", () => {
            it("returns the correct response", () => {
                expect(builder.askForListAccess({ outputSpeech: "say", reprompt: "reprompt" }).build()).to.deep.equal({
                    outputSpeech: {
                        ssml: "<speak>say</speak>",
                        displayText: "say"
                    },
                    reprompt: {
                        ssml: "<speak>reprompt</speak>",
                        displayText: "reprompt"
                    },
                    system: "PERMISSION_LIST"
                });
            });
        });
    });
    describe("#play()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.play(undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed a response", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .play({
                            type: "Audio",
                            url: "https://url"
                        })
                        .build()
                ).to.deep.equal({
                    media: [
                        {
                            type: "Audio",
                            url: "https://url"
                        }
                    ]
                });
            });
        });
    });
    describe("#playPlaylist()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.playPlaylist(undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed a response", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .playPlaylist([
                            {
                                type: "Audio",
                                url: "https://url"
                            }
                        ])
                        .build()
                ).to.deep.equal({
                    media: [
                        {
                            type: "Audio",
                            url: "https://url"
                        }
                    ]
                });
            });
        });
    });
    describe("#stop()", () => {
        it("returns the correct response", () => {
            expect(builder.stop().build()).to.deep.equal({
                system: "MEDIA_STOP"
            });
        });
    });
    describe("#enqueue()", () => {
        describe("when passed undefined", () => {
            it("returns the correct response", () => {
                expect(builder.enqueue(undefined, undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed next media only", () => {
            it("returns the correct response", () => {
                expect(builder.enqueue({ url: "https://url", type: "Audio" }, undefined).build()).to.deep.equal({});
            });
        });
        describe("when passed next and current media only", () => {
            it("returns the correct response", () => {
                expect(
                    builder
                        .enqueue(
                            { url: "https://url", type: "Audio" },
                            { url: "https://url", type: "Audio", token: "token" }
                        )
                        .build()
                ).to.deep.equal({
                    system: "MEDIA_ENQUEUE",
                    media: [
                        {
                            url: "https://url",
                            type: "Audio"
                        }
                    ],
                    data: {
                        expectedPreviousToken: "token"
                    }
                });
            });
        });
    });
    describe("#build()", () => {
        it("returns the Response", () => {
            expect(builder.build()).to.deep.equal(builder.response);
        });
    });
    it("can be subclassed", () => {

        class SubBuilder extends ResponseBuilder {
            // Less than ideal, would like to figure out
            // how to subclass without rewriting the method with new
            // return value
            public say(say: string): SubBuilder {
                super.say(say);
                return this;
            }

            public newMethod(): SubBuilder {
                return this;
            }
        }

        const sub = new SubBuilder({ device });
        expect(sub).to.be.instanceOf(SubBuilder);

        sub.say("foo").newMethod();

    });
});


