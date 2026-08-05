/*! Copyright (c) 2019, XAPPmedia */

import { expect } from "chai";
import { cleanInvalid, isValidSSML } from "./ssml.js";

// These tests double as a regression guard for the `xmldoc` dependency: `ssml.ts` does a
// top-level `require("xmldoc")`, so if `xmldoc` is ever bumped to an ESM-only release (>=3.0.0),
// merely importing this module throws `ERR_REQUIRE_ESM` and every test below fails to even load.
// Keep `xmldoc` on the 2.x CommonJS line (see renovate.json).
describe("ssml", () => {
    describe("cleanInvalid()", () => {
        it("loads the xmldoc-backed module and parses SSML without throwing", () => {
            expect(() => cleanInvalid("<speak>Ben and Jerry</speak>")).to.not.throw();
        });

        it("restores '&' inside an <audio> src after normalizing '&' to ' and '", () => {
            const input = `<speak>Ben & Jerry <audio src="https://x.io/a.mp3?u=1&v=2"/></speak>`;
            const result = cleanInvalid(input);

            // The '&' in the audio query string round-trips through XmlDocument back to '&'...
            expect(result).to.contain("u=1&v=2");
            expect(result).to.not.contain("u=1 and v=2");
            // ...while a '&' in plain text stays converted to ' and '.
            expect(result).to.contain("Ben and Jerry");
        });

        it("leaves speech without an '&' untouched", () => {
            const input = "<speak>Nothing to clean here</speak>";
            expect(cleanInvalid(input)).to.equal(input);
        });
    });

    describe("isValidSSML()", () => {
        it("is callable (constructs an XmlDocument) without throwing at module load", () => {
            expect(() => isValidSSML("<speak>hello</speak>")).to.not.throw();
        });
    });
});
