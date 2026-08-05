/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";
import { removePostFix } from "../removePostFix";

describe(`#${removePostFix.name}()`, () => {
    it("removes the postfix", () => {
        expect(removePostFix("appId", undefined)).to.equal("appId");
        expect(removePostFix("OCNo_bgd", "_bgd")).to.equal("OCNo");
        expect(removePostFix("OCNo", "_bgd")).to.equal("OCNo");
        expect(removePostFix(undefined, "_bgd")).to.equal(undefined);
        expect(removePostFix(undefined, undefined)).to.equal(undefined);
    });
});
