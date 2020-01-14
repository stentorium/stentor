/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Translator } from "@xapp/patterns";
import { Request, RuntimeContext } from "stentor-models";
import { IntentRequestBuilder } from "@xapp/stentor-request";
import { ChannelSelector } from "../ChannelSelector";

class TestTranslator extends Translator<object, Request> {
    translate(request: object): Request {
        return new IntentRequestBuilder().withIntentId("Test").build();
    }
}

class Test1Translator extends Translator<object, Request> {
    translate(request: object): Request {
        return new IntentRequestBuilder().withIntentId("Test1").build();
    }
}

describe("ChannelSelector", () => {
    let selectChannel: ChannelSelector;
    let fakeContext: RuntimeContext;

    describe("#constructor()", () => {
        describe("when passed valid props", () => {
            it("returns a the correct instance", () => {
                expect(new ChannelSelector()).to.be.instanceOf(ChannelSelector);
            });
        });
    });
    describe("#from", () => {
        describe("when passed invalid props", () => {
            beforeEach(() => {
                selectChannel = new ChannelSelector();
            });
            it("throws an error", () => {
                expect(selectChannel.from.bind(selectChannel, undefined)).to.throw(
                    TypeError,
                    "Invalid properties passed to ChannelSelector.from()"
                );
            });
        });
        describe("without a matching translator", () => {
            beforeEach(() => {
                selectChannel = new ChannelSelector();
                fakeContext = { ovai: { platform: "test" } };
            });
            it("throws an error", () => {
                expect(
                    selectChannel.from.bind(
                        selectChannel,
                        [
                            {
                                name: "bar",
                                request: new TestTranslator(),
                                response: new TestTranslator()
                            },
                            {
                                name: "baz",
                                request: new Test1Translator(),
                                response: new Test1Translator()
                            }
                        ],
                        {},
                        fakeContext
                    )
                ).to.throw('Unable to select channel.  Estimated channel from context: "test".');
                expect(
                    selectChannel.from.bind(
                        selectChannel,
                        [
                            {
                                name: "bar",
                                request: new TestTranslator(),
                                response: new TestTranslator()
                            },
                            {
                                name: "baz",
                                request: new Test1Translator(),
                                response: new Test1Translator()
                            }
                        ],
                        { foo: "one", bar: "two" },
                        fakeContext
                    )
                ).to.throw(
                    'Unable to select channel.  Request contains the top level keys: foo,bar.  Estimated channel from context: "test".'
                );
            });
            describe("without a platform on the context", () => {
                beforeEach(() => {
                    selectChannel = new ChannelSelector();
                });
                it("throws an error", () => {
                    expect(
                        selectChannel.from.bind(
                            selectChannel,
                            [
                                {
                                    name: "bar",
                                    request: new TestTranslator(),
                                    response: new TestTranslator()
                                },
                                {
                                    name: "baz",
                                    request: new Test1Translator(),
                                    response: new Test1Translator()
                                },
                                {
                                    name: "foo",
                                    test(body: object) {
                                        return false;
                                    },
                                    request: new Test1Translator(),
                                    response: new Test1Translator()
                                }
                            ],
                            {}
                        )
                    ).to.throw("Unable to select channel.");
                });
            });
        });
        describe("with multiple matching translator", () => {
            beforeEach(() => {
                selectChannel = new ChannelSelector();
                fakeContext = { ovai: { platform: "test" } };
            });
            it("throws an error", () => {
                expect(
                    selectChannel.from.bind(
                        selectChannel,
                        [
                            {
                                name: "test",
                                translator: new TestTranslator()
                            },
                            {
                                name: "foo",
                                test(body: object) {
                                    return true;
                                },
                                translator: new Test1Translator()
                            }
                        ],
                        {},
                        fakeContext
                    )
                ).to.throw("Request matched to more than one possible channel: test, foo");
            });
            describe("without a platform on the context", () => {
                beforeEach(() => {
                    selectChannel = new ChannelSelector();
                });
                it("throws an error", () => {
                    expect(
                        selectChannel.from.bind(
                            selectChannel,
                            [
                                {
                                    name: "test",
                                    request: new TestTranslator()
                                },
                                {
                                    name: "foo",
                                    test(body: object) {
                                        return true;
                                    },
                                    request: new TestTranslator()
                                },
                                {
                                    name: "bar",
                                    test(body: object) {
                                        return true;
                                    },
                                    request: new Test1Translator()
                                }
                            ],
                            {}
                        )
                    ).to.throw("Request matched to more than one possible channel: foo, bar");
                });
            });
        });
        describe("with a matching translator", () => {
            beforeEach(() => {
                selectChannel = new ChannelSelector();
                fakeContext = { stentorContext: { platform: "test" } } as any;
            });
            it("returns the correct translated request", () => {
                const channel = selectChannel.from(
                    [
                        {
                            name: "test",
                            test(body: object) {
                                return true;
                            },
                            request: new TestTranslator(),
                            response: new TestTranslator(),
                            capabilities() {
                                return {
                                    channel: "test",
                                    canPlayAudio: true,
                                    canPlayVideo: false,
                                    canSpeak: true,
                                    canThrowCard: true,
                                    audioSupported: true,
                                    videoSupported: false,
                                    hasScreen: false,
                                    canTransferCall: false
                                };
                            }
                        },
                        {
                            name: "foo",
                            test(body: object) {
                                return false;
                            },
                            request: new Test1Translator(),
                            response: new TestTranslator(),
                            capabilities() {
                                return {
                                    channel: "test",
                                    canPlayAudio: true,
                                    canPlayVideo: false,
                                    canSpeak: true,
                                    canThrowCard: true,
                                    audioSupported: true,
                                    videoSupported: false,
                                    hasScreen: false,
                                    canTransferCall: false
                                };
                            }
                        }
                    ],
                    {},
                    fakeContext
                );
                expect(channel).to.exist;
                expect(channel.name).to.equal("test");
            });
            describe("without a platform on the context", () => {
                beforeEach(() => {
                    selectChannel = new ChannelSelector();
                });
                it("returns the correct channel", () => {
                    const channel = selectChannel.from(
                        [
                            {
                                name: "test",
                                test(body: object) {
                                    return true;
                                },
                                request: new TestTranslator(),
                                response: new TestTranslator(),
                                capabilities() {
                                    return {
                                        channel: "test",
                                        canPlayAudio: true,
                                        canPlayVideo: false,
                                        canSpeak: true,
                                        canThrowCard: true,
                                        audioSupported: true,
                                        videoSupported: false,
                                        hasScreen: false,
                                        canTransferCall: false
                                    };
                                }
                            },
                            {
                                name: "test1",
                                test(body: object) {
                                    return false;
                                },
                                request: new Test1Translator(),
                                response: new Test1Translator(),
                                capabilities() {
                                    return {
                                        channel: "test",
                                        canPlayAudio: true,
                                        canPlayVideo: false,
                                        canSpeak: true,
                                        canThrowCard: true,
                                        audioSupported: true,
                                        videoSupported: false,
                                        hasScreen: false,
                                        canTransferCall: false
                                    };
                                }
                            }
                        ],
                        {}
                    );
                    expect(channel).to.exist;
                    expect(channel.name).to.equal("test");
                });
            });
        });
        /* TODO: Move this test and asset to somewhere more helpful?
        describe("AMAZON.HelpIntent request", () => {
            it("returns a HelpIntent request", () => {
                const body = helpRequest;
                const request = factory.from(body, fakeContext);
                expect(context).to.exist;
                expect(isIntentRequest(request)).to.be.true;
                if (isIntentRequest(request)) {
                    expect(request.intentId).to.equal(HELP_INTENT);
                }
            });
        }); */
    });
});
