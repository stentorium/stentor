/*! Copyright (c) 2012, XAPPmedia */
require("dotenv").config();
import { expect } from "chai";

import { StudioService } from "../StudioService";

describe(`${StudioService.name}`, () => {
    describe(`#${StudioService.prototype.query.name}()`, () => {
        describe("for valid request", () => {
            it("returns results", async () => {
                const studio = new StudioService();
                const results = await studio.query("typescript");
                expect(results).to.exist;
            }).timeout(12000);
        });
    });
    describe(`#${StudioService.prototype.faq.name}()`, () => {
        it("returns results", async () => {
            const studio = new StudioService();
            const results = await studio.faq("what is your phone number");
            expect(results).to.exist;
        });
    });
    describe(`#${StudioService.prototype.rag.name}()`, () => {
        it("returns results", async () => {
            const studio = new StudioService();
            const results = await studio.rag("what is an entity");
            expect(results).to.exist;
            expect(results.hasAnswer).to.be.true;
        }).timeout(12000);
        describe("for an answer it doesn't know", () => {
            it(`returns it doesn't know`, async () => {
                const studio = new StudioService();
                const results = await studio.rag("who is the president");
                expect(results).to.exist;
                expect(results.hasAnswer).to.be.false;
            });
        });
    });
});
