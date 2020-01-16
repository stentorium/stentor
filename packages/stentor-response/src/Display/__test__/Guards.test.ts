/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Card, SimpleDisplay } from "stentor-models";
import { isCard, isSimpleDisplay } from "../Guards";

const card: Card = {
    type: "CARD",
    title: "Title",
    content: "Content",
    smallImageUrl: "https://some.icon"
};

const simpleDisplay: SimpleDisplay = {
    type: "ShortText",
    token: "token",
    title: "Title"
};

describe("#isSimpleDisplay()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isSimpleDisplay(undefined)).to.be.false;
        });
    });
    describe("when passed another object", () => {
        it("returns false", () => {
            expect(isSimpleDisplay({ foo: "foo" })).to.be.false;
        });
    });
    describe("when passed a Card", () => {
        it("returns false", () => {
            expect(isSimpleDisplay(card)).to.be.false;
        });
    });
    describe("when passed a Simple Display", () => {
        it("returns true", () => {
            expect(isSimpleDisplay(simpleDisplay)).to.be.true;
        });
    });
});

describe("#isCard()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isCard(undefined)).to.be.false;
        });
    });
    describe("when passed a Render Template", () => {
        it("returns false", () => {
            expect(isCard(simpleDisplay)).to.be.false;
        });
    });
    describe("when passed a Card", () => {
        it("returns true", () => {
            expect(isCard(card)).to.be.true;
        });
    });
    describe("when passed a Simple Display", () => {
        it("returns false", () => {
            expect(isCard(simpleDisplay)).to.be.false;
        });
    });
});
