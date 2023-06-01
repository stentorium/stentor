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
                }, 500);
                await expect(studio.query("what is an entity", { controller })).to.be.rejectedWith("The user aborted a request.");
            });
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
                await expect(studio.rag("what is an entity", { controller })).to.be.rejectedWith("The user aborted a request.");
            });
        });
        describe("for an answer it doesn't know", () => {
            it(`returns it doesn't know`, async () => {
                const studio = new StudioService();
                const results = await studio.rag("who is the president");
                expect(results).to.exist;
                expect(results.generated).to.exist;
                expect(results.hasAnswer).to.be.false;
            }).timeout(12000);
        });
    });
});
