/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Intent } from "stentor-models";
import { augmentWithPolyfill } from "../augmentWithPolyfill";

describe("#augmentWithPolyfill()", () => {
    describe("when passed undefined", () => {
        it("returns undefined when passed undefined", () => {
            expect(augmentWithPolyfill(undefined)).to.equal(undefined);
        });
    });
    describe("when passed a non-builtin intent", () => {
        it("passes it through unmodified", () => {
            const someIntent = {
                organizationId: "organizationId",
                appId: "appId",
                intentId: "SomeIntent",
                utterancePatterns: ["bob"]
            };
            expect(augmentWithPolyfill(someIntent)).to.deep.equal(someIntent);
        });
    });
    describe("when passed a builtin intent", () => {
        it("augments with utterance patterns", () => {
            const yesIntent: Intent = {
                appId: "appId",
                organizationId: "organizationId",
                intentId: "YesIntent"
            };
            expect(augmentWithPolyfill(yesIntent).utterancePatterns).to.be.an("Array");
            const noIntent: Intent = {
                appId: "appId",
                organizationId: "organizationId",
                intentId: "NoIntent"
            };
            expect(augmentWithPolyfill(noIntent).utterancePatterns).to.be.an("Array");
            const startOverIntent: Intent = {
                appId: "appId",
                organizationId: "organizationId",
                intentId: "YesIntent"
            };
            expect(augmentWithPolyfill(startOverIntent).utterancePatterns).to.be.an("Array");
        });
    });
    describe("when passed a builtin intent with minimal props", () => {
        let augmented: Intent;
        beforeEach(() => {
            const yesIntent: Intent = {
                appId: "appId",
                organizationId: "organizationId",
                intentId: "YesIntent"
            };
            augmented = augmentWithPolyfill(yesIntent);
        });
        it("preserves the appId", () => {
            expect(augmented.appId).to.equal("appId");
        });
        it("preserves the organizationId", () => {
            expect(augmented.organizationId).to.equal("organizationId");
        });
        it("adds the missing name", () => {
            expect(augmented.name).to.equal("Yes Intent");
        });
        it("adds the utterance patterns", () => {
            expect(augmented.utterancePatterns).to.have.length.greaterThan(1);
            expect(augmented.utterancePatterns).to.contain("yes");
        });
    });
    describe("when passed a builtin intent with some existing props", () => {
        let augmented: Intent;
        beforeEach(() => {
            const yesIntent: Intent = {
                appId: "appId",
                organizationId: "organizationId",
                intentId: "YesIntent",
                name: "My Yes Intent",
                utterancePatterns: ["hell yeah"]
            };
            augmented = augmentWithPolyfill(yesIntent);
        });
        it("preserves the appId", () => {
            expect(augmented.appId).to.equal("appId");
        });
        it("preserves the organizationId", () => {
            expect(augmented.organizationId).to.equal("organizationId");
        });
        it("preserves the existing name", () => {
            expect(augmented.name).to.equal("My Yes Intent");
        });
        it("preserves existing patterns and adds polyfill patterns", () => {
            expect(augmented.utterancePatterns).to.have.length.greaterThan(1);
            expect(augmented.utterancePatterns).to.contain("yes");
            expect(augmented.utterancePatterns).to.contain("hell yeah");
        });
    });
});
