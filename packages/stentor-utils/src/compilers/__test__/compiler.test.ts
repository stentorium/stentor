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
    }
}

const request: IntentRequest = {
    type: "INTENT_REQUEST",
    intentId: "intentId",
    sessionId: "sessionId",
    userId: "userId",
    slots
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
        sessionStore: {
            data: {},
            id: "foo"
        }
    },
    // we won't use this
    response: undefined
};

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
            describe("with a JSONPath", () => {
                it("compiles the value", () => {
                    const compiled = new Compiler().compile(
                        "Hi ${$.request.slots.name.value}!",
                        request,
                        context
                    );
                    expect(compiled).to.equal("Hi bob!");
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
                    ssml: "<speak>Hi ${first_name}!",
                    displayText: "Hi ${first_name}!"
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
    });
});