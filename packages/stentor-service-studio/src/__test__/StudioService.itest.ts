/*! Copyright (c) 2012, XAPPmedia */
require("dotenv").config();
import { expect } from "chai";

import { StudioService } from "../StudioService";

describe(`${StudioService.name}`, () => {
    describe(`#${StudioService.prototype.query.name}()`, () => {
        describe("for valid request", () => {
            it("returns results", async () => {
                const studio = new StudioService();
                const results = await studio.query("mayor of pawnee");
                expect(results).to.exist;
                expect(results.documents).to.have.length(0);
                expect(results.faqs).to.have.length(2);
            });
        });
    });
    describe(`#${StudioService.prototype.faq.name}()`, () => {
        it("returns results", async () => {
            const studio = new StudioService();
            const results = await studio.faq("mayor of pawnee");
            expect(results).to.exist;
            expect(results.total).to.equal(4);
        });
    });
});
