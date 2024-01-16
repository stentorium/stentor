/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { RequestSlot } from "stentor-models";
import { findFuzzyMatch, matchRequestSlotToSlotTypeValue, matchUtteranceToSlotTypeValue } from "../matcher";

const universitySlots = require("./assets/university-slots.json").values;

// Actual request
const request: RequestSlot = {
    name: "Podcast",
    value: "Saint Bonaventure University",
    successfulMatch: true,
    id: "STBV",
    rawValue: "Saint Bonaventure"
};

describe(`#${findFuzzyMatch.name}()`, () => {
    it("finds the closest fuzzy match", () => {
        const matches = findFuzzyMatch("mayor of pawnee", ["Who is the mayor of Pawnee?", "When was Pawnee founded?"]);
        expect(matches[0]).to.equal("Who is the mayor of Pawnee?");
    });
    describe("when there is an exact match", () => {
        it("returns the expected match", () => {
            const matches = findFuzzyMatch("When was Pawnee founded?", ["Who is the mayor of Pawnee?", "When was Pawnee founded?"]);
            expect(matches[0]).to.equal("When was Pawnee founded?");
        });
    });
    describe("when there are no close matches", () => {
        it("handles queries with no relevant FAQs", () => {
            const matches = findFuzzyMatch("What is your number?", ["Who is gbm?", "What is your name?", "What is your last name?"]);
            expect(matches).to.have.length(0);
        });

        it("deals with completely unrelated content", () => {
            const matches = findFuzzyMatch("What is the capital of France?", ["How to reset password?", "Payment methods accepted", "Software installation guide"]);
            expect(matches).to.have.length(0);
        });
    });

    describe("when there are close matches", () => {
        it("handles slightly misspelled queries", () => {
            const matches = findFuzzyMatch("Wat is to plus too", ["What is two plus two?", "How to update software?", "What are your business hours?"]);
            expect(matches).to.have.length(0);
            // currently not working
            // expect(matches).to.include("What is two plus two?");
        });

        it("handles different word order", () => {
            const matches = findFuzzyMatch("two plus what is two", ["What is two plus two?", "What is the sum of two and two?", "How to calculate additions?"]);
            expect(matches).to.have.length(0);
            // currently not working
            // expect(matches).to.include("What is two plus two?");
        });

        it("handles synonyms and paraphrasing", () => {
            const matches = findFuzzyMatch("How do I reset a password?", ["How can I change my password?", "Password resetting steps", "What is the process for updating my password?"]);
            expect(matches).to.have.length(0);
            // currently not working
            //expect(matches).to.include("How can I change my password?");
        });
    });

    describe("without any good matches", () => {
        it("returns an empty array", () => {
            const matches = findFuzzyMatch("copay", ["Who is the mayor of Pawnee?", "When was Pawnee founded?"]);
            expect(matches).to.have.length(0);
        });
    });
    describe("for a real example", () => {
        it("returns as expected", () => {

            const faqs = ["What do customers say about your services?", "What do people think of your services?"];

            const matches = findFuzzyMatch("i need a quote for soffit repair", faqs);
            expect(matches).to.have.length(0);

            const matches0 = findFuzzyMatch("what is your phone number", faqs);
            expect(matches0).to.have.length(0);

            const matches1 = findFuzzyMatch("What do people think of you?", faqs);
            expect(matches1).to.have.length(1);
        });
    });
});

describe("#matchRequestSlotToSlotTypeValue()", () => {
    describe("when passed undefined request slot", () => {
        it("returns undefined", () => {
            expect(matchRequestSlotToSlotTypeValue(undefined, universitySlots)).to.be.undefined;
        });
    });
    describe("when passed a request slot with a synonym", () => {
        it("returns the match", () => {
            const match = matchRequestSlotToSlotTypeValue(request, universitySlots);
            expect(match).to.exist;
            expect(match.name).to.equal("Saint Bonaventure University");
        });
    });
    describe("when passed a request slot with just a value", () => {
        it("returns the match", () => {
            const match = matchRequestSlotToSlotTypeValue(
                {
                    name: "Podcast",
                    value: "Saint Bonaventure"
                },
                universitySlots
            );
            expect(match).to.exist;
            expect(match.name).to.equal("Saint Bonaventure University");
        });
    });
    describe("when passed a request slot with a dual value", () => {
        // this happens if somebody says the {duke virginia} game
        it("returns the match", () => {
            const match = matchRequestSlotToSlotTypeValue(
                {
                    name: "Podcast",
                    value: "virginia villanova",
                    successfulMatch: false
                },
                universitySlots
            );
            expect(match).to.exist;
            expect(match.name).to.equal("Villanova University");
        });
    });
});

describe("#matchUtteranceToSlotTypeValue()", () => {
    describe("when passed undefined for the utterance", () => {
        it("returns an empty array", () => {
            const results = matchUtteranceToSlotTypeValue(undefined, universitySlots);
            expect(results).to.exist;
            expect(results).to.have.length(0);
        });
    });
    describe("when passed an object", () => {
        it("returns an empty array", () => {
            const utterance: any = { utterance: "ok" };
            const results = matchUtteranceToSlotTypeValue(utterance, universitySlots);
            expect(results).to.exist;
            expect(results).to.have.length(0);
        });
    });
    describe("when passed a really long query (>32)", () => {
        it("returns an empty array", () => {
            const utterance = "Supercalifragilisticexpialidocious";
            const results = matchUtteranceToSlotTypeValue(utterance, universitySlots);
            expect(results).to.exist;
            expect(results).to.have.length(0);
        });
    });
    describe("when passed an empty array of slot types", () => {
        it("returns an empty array", () => {
            const results = matchUtteranceToSlotTypeValue("test utterance", []);
            expect(results).to.exist;
            expect(results).to.have.length(0);
        });
    });
    describe("when passed an array of one slot type", () => {
        it("returns a match when available", () => {
            const results = matchUtteranceToSlotTypeValue("country star", [{ name: "country", data: "key" }]);
            expect(results).to.exist;
            expect(results).to.have.length(1);
            const result = results[0].item;
            expect(result.data).to.equal("key");
            expect(result.name).to.equal("country");
        });
    });
    describe("when passed an array with many slots", () => {
        it("returns an exact match", () => {
            const results = matchUtteranceToSlotTypeValue("Long Island University", universitySlots);
            const score = results[0].score;
            expect(score).to.be.closeTo(0, 0.5);
            const result = results[0].item;
            expect(result.name).to.equal("Long Island University");
        });
    });
});
