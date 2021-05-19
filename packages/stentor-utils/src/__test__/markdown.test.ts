/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";
import { toHTML } from "../markdown";

describe(`#${toHTML.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(toHTML(undefined)).to.be.undefined;
        });
    });
    describe("when passed markdown", () => {
        it("returns the correct result", () => {
            expect(toHTML("**Bold**")).to.equal("<p><strong>Bold</strong></p>\n");
            expect(toHTML("_Italic_")).to.equal("<p><em>Italic</em></p>\n");
            expect(toHTML("_Italic_ **Bold** [Google](https://google.com)")).to.equal("<p><em>Italic</em> <strong>Bold</strong> <a target=\"_blank\" href=\"https://google.com\">Google</a></p>\n");
            expect(toHTML("_Italic_ **Bold** [Google](https://google.com)")).to.equal("<p><em>Italic</em> <strong>Bold</strong> <a target=\"_blank\" href=\"https://google.com\">Google</a></p>\n");
            expect(toHTML("_Italic_\n**Bold**\n[Google](https://google.com)")).to.equal("<p><em>Italic</em>\n<strong>Bold</strong>\n<a target=\"_blank\" href=\"https://google.com\">Google</a></p>\n");
            expect(toHTML("_Italic_\t")).to.equal("<p><em>Italic</em>    </p>\n");
            expect(toHTML("_Italic_ <a href=&quot;http://www.google.com&quot;>Google</a>")).to.equal("<p><em>Italic</em> <a href=\"http://www.google.com\">Google</a></p>\n");
            expect(toHTML("**Bold** www.xapp.ai _Italic_")).to.equal("<p><strong>Bold</strong> <a target=\"_blank\" href=\"https://www.xapp.ai\">www.xapp.ai</a> <em>Italic</em></p>\n");
        });
    });
    describe("with dangerous dirty code", () => {
        it("returns the correct result", () => {
            expect(toHTML("_Italic_ <script>alert('hello world')</script>")).to.equal("<p><em>Italic</em> </p>\n");
        });
    });
});