/*! Copyright (c) 2019, XAPPmedia */
import { Slot } from "stentor-models";
import { expect } from "chai";
import { determineSlots } from "../determineSlots";

describe("#determineSlots()", () => {
    it("should return an array of Slots for an utterance", () => {
        const exampleUtterance = "{-|Podcast}";
        const expectedResponse: Slot[] = [{ name: "Podcast", type: "" }];
        const actual = determineSlots([exampleUtterance], []);

        expect(expectedResponse).to.eql(actual);
    });
    describe("when passed undefined", () => {
        it("passes out an empty array", () => {
            expect(determineSlots(undefined, undefined)).to.eql([]);
        });
    });
    describe("when passed patterns without any slots", () => {
        it("passes out an empty array", () => {
            const exampleUtterance = "{neato}";
            const expectedResponse: Slot[] = [];
            const actual = determineSlots([exampleUtterance], []);

            expect(expectedResponse).to.eql(actual);
        });
    });
    describe("when passed patterns that have multiple slots", () => {
        it("passes out the correct number of slots", () => {
            const exampleUtterance: string[] = ["{do} {something} {-|neat}", "{do} {something} {-|funny}"];
            const expectedResponse: Slot[] = [{ name: "neat", type: "" }, { name: "funny", type: "" }];
            const actual = determineSlots(exampleUtterance, []);

            expect(expectedResponse.length).to.equal(actual.length);
            expect(expectedResponse).to.eql(actual);
        });
    });
});
