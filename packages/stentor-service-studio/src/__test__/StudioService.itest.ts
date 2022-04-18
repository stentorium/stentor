/*! Copyright (c) 2012, XAPPmedia */
require("dotenv").config();
import { expect } from "chai";

import { StudioService } from "../StudioService";

describe(`${StudioService.name}`, () => {
    describe(`#${StudioService.prototype.query.name}()`, () => {
        describe("for valid request", () => {
            it("returns results", async () => {
                const studio = new StudioService();
                const results = await studio.query("size of the smallest park");
                console.log(results);
                expect(results).to.exist;
                expect(results.documents).to.have.length.greaterThan(1);
            });
        });
    });
});
