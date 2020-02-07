/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Intent } from "stentor-models";
import { UtteranceGenerator } from "../UtteranceGenerator";

describe(`${UtteranceGenerator.name}`, () => {
    let generateUtterances: UtteranceGenerator;
    describe("#constructor()", () => {
        it("returns an instance of itself", () => {
            expect(new UtteranceGenerator()).to.be.instanceOf(UtteranceGenerator);
        });
    });
    describe(`#${UtteranceGenerator.prototype.forIntent.name}()`, () => {
        beforeEach(() => {
            generateUtterances = new UtteranceGenerator();
        });
        describe("when passed undefined", () => {
            it("returns an empty array", () => {
                expect(generateUtterances.forIntent(undefined)).to.deep.equal([]);
            });
        });
        describe("when passed an Intent without utterance patterns", () => {
            it("returns an empty array", () => {
                expect(
                    generateUtterances.forIntent({
                        organizationId: "organizationId",
                        appId: "appId",
                        intentId: "intentId",
                        utterancePatterns: []
                    })
                ).to.deep.equal([]);
            });
        });
        describe("when passed an Intent with utterance patterns", () => {
            it("returns the various patterns", () => {
                expect(
                    generateUtterances.forIntent({
                        organizationId: "organizationId",
                        appId: "appId",
                        intentId: "intentId",
                        utterancePatterns: ["mary", "{bob|joe}"]
                    })
                ).to.deep.equal(["mary", "bob", "joe"]);
            });
        });
        describe("when passed an Intent with duplicate patterns", () => {
            it("deduplicate the utterances", () => {
                expect(
                    generateUtterances.forIntent({
                        organizationId: "organizationId",
                        appId: "appId",
                        intentId: "intentId",
                        utterancePatterns: ["bob", "{mary|bob}"]
                    })
                ).to.deep.equal(["bob", "mary"]);
            });
        });
        describe("when passed an Intent with untrimmed patterns", () => {
            it("trims the patterns", () => {
                expect(
                    generateUtterances.forIntent({
                        organizationId: "organizationId",
                        appId: "appId",
                        intentId: "intentId",
                        utterancePatterns: [" jo ", "{mary | bob}", "  {jan |jeff} "]
                    })
                ).to.deep.equal(["jo", "mary", "bob", "jan", "jeff"]);
            });
        });
        describe("when passed an intent with utterance patterns and substitutions", () => {
            it("makes the substitutions", () => {
                expect(
                    generateUtterances.forIntent({
                        organizationId: "organizationId",
                        appId: "appId",
                        intentId: "intentId",
                        utterancePatterns: ["jo", "${FOO} ${BAR} ${_1_}", "${FOO}", "${FOO} jo"],
                        substitutions: {
                            ["FOO"]: "{mary|${BAZ}}",
                            ["_1_"]: "hi"
                        }
                    })
                ).to.deep.equal(["jo", "mary ${BAR} hi", "${BAZ} ${BAR} hi", "mary", "${BAZ}", "mary jo", "${BAZ} jo"]);
            });
        });
        describe("when overriding with locales.", () => {
            it("returns the language level pattern.", () => {
                expect(
                    generateUtterances.forIntent(
                        {
                            organizationId: "organizationId",
                            appId: "appId",
                            intentId: "intentId",
                            utterancePatterns: [],
                            locales: {
                                es: {
                                    utterancePatterns: [" jo ", "{mary | bob}", "  {jan |jeff} "]
                                }
                            }
                        },
                        "es"
                    )
                ).to.deep.equal(["jo", "mary", "bob", "jan", "jeff"]);
            });
            it("returns the dialect level pattern.", () => {
                expect(
                    generateUtterances.forIntent(
                        {
                            organizationId: "organizationId",
                            appId: "appId",
                            intentId: "intentId",
                            utterancePatterns: [],
                            locales: {
                                es: {
                                    utterancePatterns: []
                                },
                                "es-MX": {
                                    utterancePatterns: [" jo ", "{mary | bob}", "  {jan |jeff} "]
                                }
                            }
                        },
                        "es-MX"
                    )
                ).to.deep.equal(["jo", "mary", "bob", "jan", "jeff"]);
            });
            it("returns the language level pattern when asked for it explicitly.", () => {
                expect(
                    generateUtterances.forIntent(
                        {
                            organizationId: "organizationId",
                            appId: "appId",
                            intentId: "intentId",
                            utterancePatterns: [],
                            locales: {
                                es: {
                                    utterancePatterns: [" jo ", "{mary | bob}", "  {jan |jeff} "]
                                },
                                "es-MX": {
                                    utterancePatterns: []
                                }
                            }
                        },
                        "es"
                    )
                ).to.deep.equal(["jo", "mary", "bob", "jan", "jeff"]);
            });
            it("returns the default pattern when detail is missing.", () => {
                expect(
                    generateUtterances.forIntent(
                        {
                            organizationId: "organizationId",
                            appId: "appId",
                            intentId: "intentId",
                            utterancePatterns: [" jo ", "{mary | bob}", "  {jan |jeff} "],
                            locales: {
                                es: {
                                    utterancePatterns: []
                                },
                                "es-MX": {
                                    utterancePatterns: []
                                }
                            }
                        },
                        "de"
                    )
                ).to.deep.equal(["jo", "mary", "bob", "jan", "jeff"]);
            });
        });
        describe("when passed an Intent with a SearchQuery slot", () => {
            const intentWithSearchQuerySlot: Intent = {
                organizationId: "organizationId",
                appId: "appId",
                intentId: "intentId",
                utterancePatterns: [
                    "this has a ${query}",
                    "this has a ${query} and a ${custom}", // invalid
                    "this has a {${query}|${custom}}", // partially invalid
                    "this has ${custom} and ${foo}",
                    "${query}" // invalid, must include carrier phrase
                ],
                slots: [
                    {
                        name: "custom",
                        type: "CUSTOM"
                    },
                    {
                        name: "query",
                        type: "STENTOR.SEARCH_QUERY"
                    },
                    {
                        name: "foo",
                        type: "CUSTOM"
                    }
                ]
            };
            describe("with ignoreInvalidUtterancesForPlatform is turned on", () => {
                it("ignores the utterances with a query and custom slot", () => {
                    const utterances = new UtteranceGenerator({
                        ignoreInvalidUtterancesForPlatform: "alexa"
                    }).forIntent(intentWithSearchQuerySlot);
                    expect(utterances).to.deep.equal([
                        "this has a ${query}",
                        "this has a ${custom}",
                        "this has ${custom} and ${foo}"
                    ]);
                });
            });
        });
    });
    describe(`#${UtteranceGenerator.prototype.forPatterns.name}()`, () => {
        it("returns the correct samples", () => {
            expect(new UtteranceGenerator().forPatterns(["foo", "{baz|bar}"])).to.deep.equal(["foo", "baz", "bar"]);
        });
        describe("with substitutions", () => {
            it("returns the correct samples", () => {
                expect(
                    new UtteranceGenerator().forPatterns(
                        ["foo", "{baz|bar}", "${_SUB_} world", "${_SUB_} ${locations}"],
                        { _SUB_: "{hello|}" }
                    )
                ).to.deep.equal(["foo", "baz", "bar", "hello world", "world", "hello ${locations}", "${locations}"]);
            });
        });
    });
});
