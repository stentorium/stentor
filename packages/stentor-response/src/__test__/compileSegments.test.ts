/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { SimpleSegment } from "stentor-models";
import { compileSegments } from "../compileSegments";

const GREETING: SimpleSegment[] = [
    {
        segment: "Hello"
    }
];

const SSML_GREETING: SimpleSegment[] = [
    {
        segment: {
            ssml: "SSML",
            displayText: "DisplayText"
        }
    }
];

const SSML_WITH_TAGS: SimpleSegment[] = [
    {
        segment: {
            ssml: "<speak>tags</speak>",
            displayText: "tags"
        }
    }
];

describe("#compileSegments()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(compileSegments(undefined, undefined, undefined, undefined)).to.be.undefined;
        });
    });
    describe("when passed undefined segments", () => {
        it("returns the provided value", () => {
            expect(compileSegments("Hello Bob.", undefined, undefined, undefined)).to.equal("Hello Bob.");
        });
    });
    describe("when passed segments", () => {
        describe("with one segment", () => {
            it("inserts the segment", () => {
                // simple string segments
                const compiled = compileSegments("${GREETING} Bob.", { ["GREETING"]: GREETING }, undefined, undefined);
                expect(compiled).to.exist;
                expect(compiled).to.equal("Hello Bob.");
                // complex ssml, displayText segments
                const compiledSSML = compileSegments(
                    { ssml: "<audio />${GREETING} Bob.", displayText: "${GREETING} Bob." },
                    { ["GREETING"]: SSML_GREETING },
                    undefined,
                    undefined
                );
                expect(compiledSSML).to.exist;
                expect(compiledSSML).to.deep.equal({ ssml: "<audio />SSML Bob.", displayText: "DisplayText Bob." });
            });
        });
        describe("with SSML that has <speak> tags", () => {
            it("inserts the segment removing the <speak> tags", () => {
                const compiledSSML = compileSegments(
                    { ssml: "<audio />${GREETING} Bob.", displayText: "${GREETING} Bob." },
                    { ["GREETING"]: SSML_WITH_TAGS },
                    undefined,
                    undefined
                );
                expect(compiledSSML).to.exist;
                expect(compiledSSML).to.deep.equal({ ssml: "<audio />tags Bob.", displayText: "tags Bob." });
            });
        });
    });
});
