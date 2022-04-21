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
            expect(toHTML("one  \ntwo")).to.equal("<p>one<br />two</p>\n");
            expect(toHTML("one\  \ntwo")).to.equal("<p>one<br />two</p>\n");
            expect(toHTML("**Simulated List**\n\n- one\n- two\n- three")).to.equal("<p><strong>Simulated List</strong></p>\n<ul>\n<li>one</li>\n<li>two</li>\n<li>three</li>\n</ul>\n");
            expect(toHTML("one\ntwo\nthree")).to.equal("<p>one<br />two<br />three</p>\n");
            expect(toHTML("**Bold**")).to.equal("<p><strong>Bold</strong></p>\n");
            expect(toHTML("_Italic_")).to.equal("<p><em>Italic</em></p>\n");
            expect(toHTML("_Italic_ **Bold** [Google](https://google.com)")).to.equal("<p><em>Italic</em> <strong>Bold</strong> <a target=\"_blank\" href=\"https://google.com\">Google</a></p>\n");
            expect(toHTML("_Italic_ **Bold** [Google](https://google.com)")).to.equal("<p><em>Italic</em> <strong>Bold</strong> <a target=\"_blank\" href=\"https://google.com\">Google</a></p>\n");
            expect(toHTML("_Italic_\n**Bold**\n[Google](https://google.com)")).to.equal("<p><em>Italic</em><br /><strong>Bold</strong><br /><a target=\"_blank\" href=\"https://google.com\">Google</a></p>\n");
            expect(toHTML("_Italic_\t")).to.equal("<p><em>Italic</em>\t</p>\n");
            expect(toHTML("_Italic_ <a href=&quot;http://www.google.com&quot;>Google</a>")).to.equal("<p><em>Italic</em> <a href=\"http://www.google.com\">Google</a></p>\n");
            expect(toHTML("**Bold** www.xapp.ai _Italic_")).to.equal("<p><strong>Bold</strong> <a target=\"_blank\" href=\"https://www.xapp.ai\">www.xapp.ai</a> <em>Italic</em></p>\n");
            // Table support
            expect(toHTML("| Foo | Bar | \n  | --  | -- | \n  | one | two |")).to.equal("<table>\n<thead>\n<tr>\n<th>Foo</th>\n<th>Bar</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>one</td>\n<td>two</td>\n</tr>\n</tbody></table>\n");
            expect(toHTML("| Foo | Bar | \n  | --  | -- | \n  | one | two |")).to.equal("<table>\n<thead>\n<tr>\n<th>Foo</th>\n<th>Bar</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>one</td>\n<td>two</td>\n</tr>\n</tbody></table>\n");
            // With potential codeblocks
            const noBlocks = toHTML("Our **gutter** protection systems include:\n\n\tGutterglove Pro\n\tGutterglove Ultra\n\tLeaf Blaster\n\tGutterglove Icebreaker\n\nEach of these systems come");
            expect(noBlocks).to.not.contain("<code>")
            const noBlocks0 = toHTML("Here is what I found...\n\"\nGutterglove **Gutter** **Guards**\n\nGutterglove offers superior **gutter** protection with their patented Ultimate **Gutter** Protection System. Gutterglove offers a variety of **gutter** **guards** to fit your home and climate’s specific needs. Our **gutter** protection systems include:\n\n\tGutterglove Pro\n\tGutterglove Ultra\n\tLeaf Blaster\n\tGutterglove Icebreaker\n\nEach of these systems come in different sizes and styles to ensure a perfect match for your home.\n\nKey Benefits of Gutterglove **Gutter** **Guards**:\n\n\tEliminates **gutter** cleaning forever\n\tFilters out all debris from your **gutter**\n\tFirst Stage filter in rain harvesting systems\n\tBarely visible from the ground\n\tNo rain **gutter** clogs ever\" May I have your address where you need the service?");
            expect(noBlocks0).to.not.contain("<code>");
        });
    });
    describe("when passed props", () => {
        describe("with allowedTags", () => {
            it("keeps allowed tags", () => {
                const allowedTags = ["br", "strong", "b", "em", "i", "strike", "u", "tt", "code", "sup", "sub", "nobr"];
                expect(toHTML("one  \ntwo", { allowedTags })).to.equal("one<br />two\n");
                expect(toHTML("_Italic_\n**Bold**\n[Google](https://google.com)", { allowedTags })).to.equal("<em>Italic</em><br /><strong>Bold</strong><br />Google\n");
            });
        });
    });
    describe("with dangerous dirty code", () => {
        it("returns the correct result", () => {
            expect(toHTML("_Italic_ <script>alert('hello world')</script>")).to.equal("<p><em>Italic</em> </p>\n");
        });
    });
});