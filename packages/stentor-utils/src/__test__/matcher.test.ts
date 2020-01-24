/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { RequestSlot } from "stentor-models";
import { matchRequestSlotToSlotTypeValue, matchUtteranceToSlotTypeValue } from "../matcher";

const universitySlots = require("./assets/university-slots.json").values;

// Actual request
const request: RequestSlot = {
    name: "Podcast",
    value: "Saint Bonaventure University",
    successfulMatch: true,
    id: "STBV",
    rawValue: "Saint Bonaventure"
};

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
            expect(score).to.equal(0);
            const result = results[0].item;
            expect(result.name).to.equal("Long Island University");
        });
    });
});
