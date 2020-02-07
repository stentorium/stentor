/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Intent } from "stentor-models";
import { mergeIntents, mergeModels, MergeModelsResults, MergePatternsResults, mergeUtterancePatterns } from "../merge";

const intentOne: Intent = {
    intentId: "one",
    appId: "appOne",
    organizationId: "orgOne",
    name: "One",
    utterancePatterns: ["one", "{three|four}", "{-|NUMBER}"],
    slots: [
        {
            name: "NUMBER",
            type: "STENTOR.NUMBER"
        }
    ]
};

const intentTwo: Intent = {
    intentId: "two",
    appId: "appTwo",
    organizationId: "orgTwo",
    name: "Two",
    slots: [
        {
            name: "TWO",
            type: "STENTOR.LITERAL"
        },
        {
            name: "THREE",
            type: "NAMES"
        }
    ],
    slotTypes: {
        ["NAMES"]: {
            name: "NAMES",
            values: [
                {
                    name: "bob",
                    data: {}
                }
            ]
        }
    },
    utterancePatterns: ["two", "two {-|TWO}", "{-|THREE}"]
};

const intentTwoSimilar: Intent = {
    intentId: "two",
    appId: "appTwo",
    organizationId: "orgTwo",
    name: "Two",
    slots: [
        {
            name: "TWO",
            type: "STENTOR.LITERAL"
        },
        {
            name: "THREE",
            type: "NAMES"
        }
    ],
    slotTypes: {
        ["NAMES"]: {
            name: "NAMES",
            values: [
                {
                    name: "bob",
                    data: {}
                }
            ]
        }
    },
    utterancePatterns: [
        "two", // THIS IS THE OVERLAP
        "too",
        "to {-|TWO}",
        "to {-|THREE}"
    ]
};

const intentThree: Intent = {
    intentId: "three",
    appId: "appOne",
    organizationId: "orgOne",
    name: "Three",
    utterancePatterns: ["three", "{-|NUMBER}"],
    slots: [
        {
            name: "NUMBER",
            type: "STENTOR.NUMBER"
        }
    ]
};

describe("#mergeModels()", () => {
    let mergedModel: Intent[];
    let result: MergeModelsResults;
    describe("when passed undefined primary model", () => {
        beforeEach(() => {
            mergedModel = mergeModels(undefined, [intentOne]);
        });
        it("returns the secondary", () => {
            expect(mergedModel).to.have.length(1);
            expect(mergedModel[0]).to.equal(intentOne);
        });
    });
    describe("when passed undefined primary and secondary", () => {
        it("returns an empty array", () => {
            expect(mergeModels(undefined, undefined)).to.have.length(0);
        });
    });
    describe("when passed two models without overlap", () => {
        beforeEach(() => {
            result = {};
            mergedModel = mergeModels([intentOne, intentTwo], [intentThree], result);
        });
        it("merges the intents", () => {
            /* tslint:disable:no-magic-numbers */
            expect(mergedModel).to.have.length(3);
            /* tslint:enable:no-magic-numbers */
        });
        it("sets the results", () => {
            expect(result.addedIntents).to.equal(1);
            expect(result.mergedIntents).to.equal(0);
        });
    });
    describe("when passed two models with overlap", () => {
        beforeEach(() => {
            result = {};
            mergedModel = mergeModels([intentOne, intentTwo], [intentTwoSimilar], result);
        });
        it("merges the intents", () => {
            /* tslint:disable:no-magic-numbers */
            expect(mergedModel).to.have.length(2);
            /* tslint:enable:no-magic-numbers */
        });
        it("merges the overlapping intent", () => {
            // pull out the second
            const two = mergedModel[1];
            expect(two.intentId).to.equal("two");
            const length = intentTwo.utterancePatterns.length + intentTwoSimilar.utterancePatterns.length - 1; // 1 is overlapped
            expect(two.utterancePatterns).to.have.length(length);
        });
        it("sets the results", () => {
            expect(result.addedIntents).to.equal(0);
            expect(result.mergedIntents).to.equal(1);
            expect(result.totalOverlappedPatterns).to.equal(1);
            expect(result.totalAddedSlots).to.equal(0);
            expect(result.totalIgnoredSlots).to.equal(2);
        });
    });
});

describe("#mergeIntents()", () => {
    let mergedIntent: Intent;
    describe("when passed undefined primary intent", () => {
        it("returns the secondary", () => {
            expect(mergeIntents(undefined, intentTwo)).to.equal(intentTwo);
        });
    });
    describe("when passed both undefined primary and secondary intents", () => {
        it("returns undefined", () => {
            expect(mergeIntents(undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed two intents", () => {
        beforeEach(() => {
            mergedIntent = mergeIntents(intentOne, intentTwo);
        });
        it("keeps the id from the primary", () => {
            expect(mergedIntent.intentId).to.equal("one");
        });
        it("keeps the appId from the primary", () => {
            expect(mergedIntent.appId).to.equal("appOne");
        });
        it("keeps the organizationId from the primary", () => {
            expect(mergedIntent.organizationId).to.equal("orgOne");
        });
        it("keeps the name from the primary", () => {
            expect(mergedIntent.name).to.equal("One");
        });
        it("combines the utterance patterns", () => {
            const length = intentOne.utterancePatterns.length + intentTwo.utterancePatterns.length;
            expect(mergedIntent.utterancePatterns.length).to.equal(length);
        });
        it("combines the slots", () => {
            const length = intentOne.slots.length + intentTwo.slots.length;
            expect(mergedIntent.slots).to.have.length(length);
        });
        it("combines the slot types", () => {
            expect(mergedIntent.slotTypes.NAMES).to.exist;
        });
    });
});

const patterns = ["one", "{two|three}"];

const patternsNoOverlap = ["four", "{five|six}"];

const patternsPartialOverlap = ["seven", "{one|eight}"];

describe("#mergeUtterancePatterns()", () => {
    describe("when passed undefined primary", () => {
        it("returns the secondary", () => {
            const patterns = ["one"];
            expect(mergeUtterancePatterns(undefined, patterns)).to.equal(patterns);
        });
        describe("with results", () => {
            let results: MergePatternsResults;
            beforeEach(() => {
                results = {}; // reset the results
                const patterns = ["one", "two"];
                mergeUtterancePatterns(undefined, patterns, results);
            });
            it("sets the addedPatterns", () => {
                expect(results.totalAddedPatterns).to.equal(2);
            });
            it("sets the overlappedPatterns to zero", () => {
                expect(results.totalOverlappedPatterns).to.equal(0);
            });
        });
    });
    describe("when passed undefined primary and secondary", () => {
        it("returns undefined", () => {
            expect(mergeUtterancePatterns(undefined, undefined)).to.be.undefined;
        });
        describe("with results", () => {
            it("sets the addedPatterns to zero", () => {
                const results: MergePatternsResults = {};
                expect(mergeUtterancePatterns(undefined, undefined, results)).to.be.undefined;
                expect(results.totalAddedPatterns).to.equal(0);
            });
            it("sets the overlappedPatterns to zero", () => {
                const results: MergePatternsResults = {};
                expect(mergeUtterancePatterns(undefined, undefined, results)).to.be.undefined;
                expect(results.totalOverlappedPatterns).to.equal(0);
            });
        });
    });
    describe("when passed patterns without overlap", () => {
        it("combines them", () => {
            expect(mergeUtterancePatterns(patterns, patternsNoOverlap)).to.deep.equal([
                "one",
                "{two|three}",
                "four",
                "{five|six}"
            ]);
        });
        describe("with results", () => {
            let results: MergePatternsResults;
            let mergedPatterns: string[];
            beforeEach(() => {
                results = {}; // reset the results
                mergedPatterns = mergeUtterancePatterns(patterns, patternsNoOverlap, results);
            });
            it("combines the patterns", () => {
                expect(mergedPatterns).to.deep.equal(["one", "{two|three}", "four", "{five|six}"]);
            });
            it("sets the addedPatterns", () => {
                expect(results.totalAddedPatterns).to.equal(2);
            });
            it("sets the overlappedPatterns", () => {
                expect(results.totalOverlappedPatterns).to.equal(0);
            });
        });
    });
    describe("when passed patterns with overlap in a pattern", () => {
        it("combines them omitting the overlap", () => {
            expect(mergeUtterancePatterns(patterns, patternsPartialOverlap)).to.deep.equal([
                "one",
                "{two|three}",
                "seven",
                "eight"
            ]);
        });
        describe("with results", () => {
            let results: MergePatternsResults;
            let mergedPatterns: string[];
            beforeEach(() => {
                results = {}; // reset the results
                mergedPatterns = mergeUtterancePatterns(patterns, patternsPartialOverlap, results);
            });
            it("combines the patterns", () => {
                expect(mergedPatterns).to.deep.equal(["one", "{two|three}", "seven", "eight"]);
            });
            it("sets the addedPatterns", () => {
                expect(results.totalAddedPatterns).to.equal(2);
            });
            it("sets the overlappedPatterns", () => {
                expect(results.totalOverlappedPatterns).to.equal(1);
            });
        });
    });
});
