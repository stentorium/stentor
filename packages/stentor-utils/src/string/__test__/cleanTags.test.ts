/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { cleanTags } from "../cleanTags";

describe("#cleanTags()", () => {
    it("removes the tags", () => {
        expect(cleanTags("<p>Hello! <strong>Can you hear me?</strong></p>")).to.equal("Hello! Can you hear me?");
        expect(cleanTags("<tag1><tag2></tag2></tag1>")).to.equal("");
    });
    it("returns undefined if passed undefined", () => {
        expect(cleanTags(undefined)).to.be.undefined;
    });
});
