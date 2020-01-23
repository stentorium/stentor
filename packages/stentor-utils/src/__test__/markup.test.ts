/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import {
    hasMarkup
} from "../markup";

describe("#hasMarkup()", () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(hasMarkup(undefined)).to.be.false;
        });
    });
    describe("when passed plain string", () => {
        it("returns false", () => {
            expect(hasMarkup("This is a simple text")).to.be.false;
        });
    });
    describe("when passed plain string with suspicious characters", () => {
        it("returns false", () => {
            expect(hasMarkup("foo > bar (greater then)")).to.be.false;
        });
    });
    describe("when passed a string with markups", () => {
        it("returns true", () => {
            expect(hasMarkup("First line<br/>Second line")).to.be.true;
            expect(hasMarkup("Always <u>feed</u> your ladybird tasty aphids.")).to.be.true;
            expect(hasMarkup("<font size=\"7\">Cake</font> <br> <font size=\"3\">This is the best cake recipe ever. <br>")).to.be.true;
            expect(hasMarkup("<action token=\"VALUE\">clickable text </action>")).to.be.true;
            expect(hasMarkup("<img src='URL' width='WIDTH' height='HEIGHT' alt='TEXT' />")).to.be.true;
        });
    });
 });
