/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { Context, IntentRequest, RequestSlotMap } from "stentor-models";

import { Compiler, DEFAULT_MARCOS } from '../compiler';

const slots: RequestSlotMap = {
    ["date"]: {
        name: "date",
        value: {
            date: "2019-09-11"
        }
    },
    ["name"]: {
        name: "name",
        value: "bob"
    },
    ["first_name"]: {
        name: "first_name",
        value: "joe"
    }
}

const request: IntentRequest = {
    type: "INTENT_REQUEST",
    intentId: "intentId",
    sessionId: "sessionId",
    userId: "userId",
    slots,
    device: {
        channel: "test",
        audioSupported: true,
        canPlayVideo: false,
        canPlayAudio: true,
        canSpeak: false,
        videoSupported: false,
        canThrowCard: false,
        canTransferCall: false,
        hasScreen: true,
        hasWebBrowser: true
    }
}

const sessionData = {
    suggestion: {
        title: "title",
        url: "url"
    },
    negative: false,
    output: {
        displayText: "session display text",
        ssml: "session ssml"
    },
    nullValue: {
        // @ts-expect-error We are testing null values here
        foo: null
    }
}

const context: Context = {
    device: {
        channel: "test",
        audioSupported: true,
        canPlayAudio: true,
        videoSupported: true,
        canPlayVideo: true,
        canSpeak: true,
        canThrowCard: true,
        hasScreen: false,
        hasWebBrowser: false,
        canTransferCall: false
    },
    storage: {
        createdTimestamp: Date.now(),
        foo: "bar",
        sessionStore: {
            data: {
                ...sessionData
            },
            id: "foo"
        }
    },
    session: {
        get(key: string): any {
            const data: { [v: string]: any } = {
                ...sessionData
            };
            return data[key];
        },
        set() {
            // no op, not used
        },
        getStore() {
            // no op, not used
        }
    },
    // not used
    response: undefined,
    services: {}
}

describe(`${Compiler.name}`, () => {
    describe(`#${Compiler.prototype.compile.name}()`, () => {
        describe("when passed a string", () => {
            describe("with slot name", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler().compile(
                        "Hi ${name}!",
                        request,
                        context
                    );
                    expect(compiled).to.equal("Hi bob!");
                });
            });
            describe("with session value", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler().compile(
                        "${negative}",
                        request,
                        context
                    );
                    expect(compiled).to.equal("false");
                });
                describe('that is an object', () => {
                    it("compiles the value", () => {
                        const compiled = new Compiler().compile(
                            {
                                ssml: "${output}!",
                                displayText: "${output}"
                            },
                            request,
                            context
                        );
                        expect(compiled).to.deep.equal({
                            displayText: "session display text",
                            ssml: "session ssml!"
                        });
                    });
                });
            });
            describe("with a JSONPath", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler().compile(
                        "Hi ${$.request.slots.name.value}!",
                        request,
                        context
                    );
                    expect(compiled).to.equal("Hi bob!");
                });
                describe("pulling data off the request", () => {
                    it("compiles the value", () => {
                        const compiled = new Compiler().compile(
                            "${$.request.device.canSpeak} && true",
                            request,
                            context
                        );
                        expect(compiled).to.equal("false && true");
                    });
                });
            });
            describe("with a macro", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler().compile(
                        "Hi ${capitalize('bob')}!",
                        request,
                        context
                    );
                    expect(compiled).to.equal("Hi Bob!");
                });
                describe("mixed with replacements", () => {
                    it("compiles the value", () => {
                        const compiled = new Compiler().compile(
                            "Hi ${capitalize('${$.request.slots.name.value}')} ${capitalize('${name}')}!",
                            request,
                            context
                        );
                        expect(compiled).to.equal("Hi Bob Bob!");
                    });
                });
                describe("with single quote", () => {
                    it("compiles the value", () => {
                        const compiled = new Compiler().compile(
                            "<speak>Thank you, ${capitalize('${first_name}')}. Lastly, can you provide your address in case we need to look up information about your house?</speak>",
                            request,
                            context
                        );
                        expect(compiled).to.equal("<speak>Thank you, Joe. Lastly, can you provide your address in case we need to look up information about your house?</speak>");
                    });
                });
                describe("with escaped quotes", () => {
                    it("compiles the value", () => {
                        const compiled = new Compiler().compile(
                            "<speak>Thank you, ${capitalize(\"${first_name}\")}. Lastly, can you provide your address in case we need to look up information about your house?</speak>",
                            request,
                            context
                        );
                        expect(compiled).to.equal("<speak>Thank you, Joe. Lastly, can you provide your address in case we need to look up information about your house?</speak>");
                    });
                });
            });
            describe("without any replacements", () => {
                it("passes it through", () => {
                    const compiled = new Compiler().compile(
                        "Hi bob!",
                        request,
                        context
                    );
                    expect(compiled).to.equal("Hi bob!");
                });
            });
            describe("with replaceWhenUndefined set to true", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler({
                        replaceWhenUndefined: true
                    }).compile('!!"${no_exist}"', request, context);
                    expect(compiled).to.deep.equal('!!""');
                    const compiled1 = new Compiler({
                        replaceWhenUndefined: true
                    }).compile('"${no_exist}"', request, context);
                    expect(compiled1).to.deep.equal('""');
                    const compiled2 = new Compiler({
                        replaceWhenUndefined: true
                    }).compile('`${no_exist}`', request, context);
                    expect(compiled2).to.deep.equal('``');
                    // this one should still compile
                    const compiled3 = new Compiler({
                        replaceWhenUndefined: true
                    }).compile('"${$.context.storage.foo}" === "bar"', request, context);
                    expect(compiled3).to.deep.equal('"bar" === "bar"');
                });
            });
        });
        describe("when passed a response output object", () => {
            it("compiles the value", () => {
                const compiled = new Compiler().compile({
                    ssml: "<speak>Hi ${name}!</speak>",
                    displayText: "Hi ${name}!"
                }, request, context);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi bob!</speak>",
                    displayText: "Hi bob!"
                });
            });
            describe("with suggestion chips", () => {
                it("compiles the values", () => {
                    const compiled = new Compiler().compile({
                        ssml: "<speak>Hi ${name}!</speak>",
                        displayText: "Hi ${name}!",
                        suggestions: [
                            {
                                title: "${suggestion.title}",
                                url: "${suggestion.url}"
                            }
                        ]
                    }, request, context);
                    expect(compiled).to.deep.equal({
                        ssml: "<speak>Hi bob!</speak>",
                        displayText: "Hi bob!",
                        suggestions: [{ title: "title", url: "url" }]
                    });
                });
                describe("when the URL comes back as undefined", () => {
                    it("compiles the values", () => {
                        const compiled = new Compiler().compile({
                            ssml: "<speak>Hi ${name}!</speak>",
                            displayText: "Hi ${name}!",
                            suggestions: [
                                {
                                    title: "${suggestion.title}",
                                    url: "${undefined.url}"
                                }
                            ]
                        }, request, context);
                        expect(compiled).to.deep.equal({
                            ssml: "<speak>Hi bob!</speak>",
                            displayText: "Hi bob!",
                            suggestions: []
                        });
                    });
                });
            });
        });
        describe("with additional context set", () => {
            it("compiles the value", () => {
                const compiled = new Compiler({
                    additionalContext: {
                        foo: {
                            bar: "bob"
                        }
                    }
                }).compile({
                    ssml: "<speak>Hi ${$.foo.bar}!",
                    displayText: "Hi ${name}!"
                }, request, context);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi bob!",
                    displayText: "Hi bob!"
                });
            });
            describe("with a response output object on the context", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler({
                        additionalContext: {
                            foo: {
                                bar: "bob"
                            },
                            answer: {
                                displayText: "Display Text",
                                ssml: "Speech"
                            }
                        }
                    }).compile({
                        ssml: "<speak>Hi ${$.answer}!</speak>",
                        displayText: "Hi ${$.answer}!"
                    }, request, context);
                    expect(compiled).to.deep.equal({
                        ssml: "<speak>Hi Speech!</speak>",
                        displayText: "Hi Display Text!"
                    });
                });
            });
        });
        describe("with custom macro set", () => {
            it("compiles the value", () => {
                // Simple macro that 
                const foo: (input: string) => string = (input: string) => {
                    return `${input} foo`;
                };

                const compiled = new Compiler({
                    additionalContext: {
                        foo: {
                            bar: "bob"
                        }
                    },
                    macros: {
                        ...DEFAULT_MARCOS,
                        foo
                    }
                }).compile({
                    ssml: "<speak>Hi ${capitalize('${$.foo.bar}')}!",
                    displayText: "Hi ${foo('${name}')}!"
                }, request, context);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi Bob!",
                    displayText: "Hi bob foo!"
                });
            });
        });
        describe("with replaceWhenUndefined set to true", () => {
            it("compiles the value", () => {
                const compiled = new Compiler({
                    replaceWhenUndefined: true
                }).compile({
                    ssml: "<speak>Hi ${f_name}!",
                    displayText: "Hi ${f_name}!"
                }, request, context);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi undefined!",
                    displayText: "Hi undefined!"
                });
            });
            describe("and defined values", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler({
                        replaceWhenUndefined: true
                    }).compile({
                        ssml: "<speak>Your name is ${ $.request.slots.name.value } (${name})</speak>",
                        displayText: "Your name is ${ $.request.slots.name.value } (${name})!"
                    }, request, context);
                    expect(compiled).to.deep.equal({
                        ssml: "<speak>Your name is bob (bob)</speak>",
                        displayText: "Your name is bob (bob)!"
                    });
                });
            });
        });
        describe("with slots on the session store", () => {
            it("compiles the value", () => {
                const contextWithSession: Context = {
                    ...context,
                    session: {
                        get: () => {
                            return {
                                last: {
                                    name: "last",
                                    value: "vance"
                                }
                            }
                        },
                        set: undefined,
                        getStore: undefined
                    }
                };
                const compiled = new Compiler().compile({
                    ssml: "<speak>Hi ${name} ${last}!</speak>",
                    displayText: "Hi ${name} ${capitalize('${last}')}!"
                }, request, contextWithSession);
                expect(compiled).to.deep.equal({
                    ssml: "<speak>Hi bob vance!</speak>",
                    displayText: "Hi bob Vance!"
                });
            });
        });
        describe("when a resolved path value is null", () => {
            it("compiles the values", () => {
                const json = '{"description":"${currentResult.document}","title":"${nullValue.foo}","url":"${currentResult.source}","synonyms":[],"token":"result-${index}"}';
                const compiled = new Compiler().compile(json, request, context);
                expect(compiled).to.exist;
                expect(compiled).to.equal(json);
            });
        });
    });
});
