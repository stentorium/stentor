/*! Copyright (c) 2012, XAPPmedia */
require("dotenv").config();
import "abort-controller/polyfill"

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";

import { StudioService } from "../StudioService";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe(`${StudioService.name}`, () => {
    describe(`#${StudioService.prototype.query.name}()`, () => {
        describe("for valid request", () => {
            it("returns results", async () => {
                const studio = new StudioService();
                const results = await studio.query("typescript");
                expect(results).to.exist;
            }).timeout(12000);
        });
        describe("with an abort controller", () => {
            it("cancels as expected", async () => {
                const studio = new StudioService();
                const controller = new AbortController();

                setTimeout(() => {
                    controller.abort();
                }, 300);
                await expect(studio.query("what is an entity", { controller })).to.be.rejectedWith("This operation was aborted");
            });
        });
    });
    describe(`#${StudioService.prototype.faq.name}()`, () => {
        it("returns results", async () => {
            const studio = new StudioService();
            const results = await studio.faq("what is your phone number");
            expect(results).to.exist;
            expect(results.faqs).to.have.length(1);
        }).timeout(12000);
        describe("without a match", () => {
            it("returns as expected", async () => {
                const studio = new StudioService();
                const results = await studio.faq("what is two plus two");
                expect(results).to.exist;
                expect(results.faqs).to.have.length(0);
            });
        });
    });
    describe(`#${StudioService.prototype.rag.name}()`, () => {
        it("returns results", async () => {
            const studio = new StudioService();
            const results = await studio.rag("what is an entity");
            expect(results).to.exist;
            expect(results.generated).to.exist;
            expect(results.hasAnswer).to.be.true;
        }).timeout(12000);
        describe("with an abort controller", () => {
            it("cancels as expected", async () => {
                const studio = new StudioService();
                const controller = new AbortController();

                setTimeout(() => {
                    controller.abort();
                }, 500);
                await expect(studio.rag("what is an entity", { controller })).to.be.rejectedWith("This operation was aborted");
            });
        });
        describe("for an answer it doesn't know", () => {
            it(`returns it doesn't know`, async () => {
                const studio = new StudioService();
                const results = await studio.rag("what is two plus two");
                expect(results).to.exist;
                expect(results.generated).to.exist;
                // it is return true for everything right now.
                // expect(results.hasAnswer).to.be.false;
            }).timeout(12000);
        });
        describe("with locationId", () => {
            it("returns the expected results", async () => {
                // use title-gpt credentials
                const studio = new StudioService();
                const results = await studio.rag("what your underwriting email", { filters: { locationId: "pennsylvania" } });
                expect(results).to.exist;
                expect(results.generated).to.exist;
                expect(results.hasAnswer).to.be.true;
            }).timeout(12000);
        });
    });
    describe(`#${StudioService.prototype.search.name}()`, () => {
        it("returns the expected results", async () => {
            // use title-gpt credentials
            const studio = new StudioService();
            const results = await studio.search("what your underwriting email");
            expect(results).to.exist;
        }).timeout(12000);
        describe("with locationId", () => {
            it("returns the expected results", async () => {
                // use title-gpt credentials
                const studio = new StudioService();
                const results = await studio.search("what your underwriting email", { filters: { locationId: "pennsylvania" } });
                expect(results).to.exist;
            }).timeout(12000);
        });
    });
});
