/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { isBuiltInEntity } from "../isBuiltIn";

describe(`#${isBuiltInEntity.name}()`, () => {
    it("returns the correct value", () => {
        expect(isBuiltInEntity(undefined)).to.be.false;
        expect(isBuiltInEntity("foo")).to.be.false;
        expect(isBuiltInEntity("STENTOR.DATE_TIME")).to.be.true;
    });
});
