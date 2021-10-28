/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { isTemplatedList } from "../isTemplatedList";

describe(`#${isTemplatedList.name}()`, () => {
    it("returns the correct result", () => {
        expect(isTemplatedList(undefined)).to.be.false;
        expect(isTemplatedList({ itemsObject: "foo" })).to.be.false;
        expect(isTemplatedList({ itemsObject: "foo", itemsName: "bar", items: [] })).to.be.true;
    })
});