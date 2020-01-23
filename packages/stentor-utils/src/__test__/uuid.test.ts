/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { uuid } from "../uuid";

describe("#uuid()", () => {
    it("generates a UUID", () => {
        expect(uuid()).to.be.a("string");
    });
});
