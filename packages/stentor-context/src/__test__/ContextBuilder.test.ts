/*! Copyright (c) 2019, XAPPmedia */
import { Context } from "stentor-models";
import { expect } from "chai";
import { ContextBuilder } from "../ContextBuilder";

describe("ContextBuilder", () => {
    let builder: ContextBuilder;
    beforeEach(() => {
        builder = new ContextBuilder();
    });
    describe("constructor", () => {
        it("returns in instance of the ContextBuilder", () => {
            expect(builder).to.be.instanceof(ContextBuilder);
        });
    });
    describe("#build()", () => {
        let context: Context;
        beforeEach(() => {
            context = builder.build();
        });
        it("returns a context", () => {
            expect(context).to.exist;
            expect(context).to.be.an("object");
        });
    });
});
