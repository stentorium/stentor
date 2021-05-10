/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { LAUNCH_REQUEST } from "./assets";
import { TranslateStentorRequest } from "../Translators";

describe(`${TranslateStentorRequest.name}`, () => {
    describe(`#${TranslateStentorRequest.prototype.translate.name}()`, () => {
        it("returns the request", () => {
            const t = new TranslateStentorRequest();
            const request = t.translate(LAUNCH_REQUEST);
            expect(request).to.deep.equal(LAUNCH_REQUEST);
        });
    });
});

