/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import {
    cleanInvalid,
    concatSSML,
    concatText,
    dessmlify,
    removeTagsWithContent,
    ssmlify
} from "../ssml";

describe("#cleanInvalid()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(cleanInvalid(undefined)).to.equal(undefined);
        });
    });
    describe("when passed a string without an invalid character", () => {
        it("returns it untouched", () => {
            expect(cleanInvalid("this is normal")).to.equal("this is normal");
        });
    });
    describe("when passed a string with an ampersand", () => {
        describe("with space around it", () => {
            it("preserves the space", () => {
                expect(cleanInvalid("one two three & four")).to.equal("one two three and four");
            });
        });
        describe("without space around it", () => {
            it("adds space", () => {
                expect(cleanInvalid("one two three&four")).to.equal("one two three and four");
            });
            it("adds the necessary space", () => {
                expect(cleanInvalid("one two three& four")).to.equal("one two three and four");
                expect(cleanInvalid("one two three &four")).to.equal("one two three and four");
            });
        });
    });
    describe("when passed an ssml", () => {
        describe("with audio tag with query string", () => {
            it("preserves query string", () => {
                expect(
                    cleanInvalid(
                        '<speak>K&C<audio src="https://s3.amazonaws.com/xapp-files/clip.mp3?foo=1&bar=2"/></speak>'
                    )
                ).to.equal(
                    '<speak>K and C<audio src="https://s3.amazonaws.com/xapp-files/clip.mp3?foo=1&bar=2"/></speak>'
                );
            });
        });
    });
});
describe("dessmlify", () => {
    it("removes the surrounding speak tags", () => {
        const speech = dessmlify("<speak>Hello!</speak>");
        expect(speech).to.equal("Hello!");
    });
    it("removes <speak/>", () => {
        const speech = dessmlify("Hello!</speak>");
        expect(speech).to.equal("Hello!");
    });
    it("removes <speak>", () => {
        const speech = dessmlify("<speak>Hello!");
        expect(speech).to.equal("Hello!");
    });
    it("returns empty string when passed undefined", () => {
        const speech = dessmlify(undefined);
        expect(speech).to.equal("");
    });
    it("throws an error when passed a number", () => {
        expect(dessmlify.bind(this, 1)).throws("Invalid input passed to dessmlify");
    });
    it("does not remove break tags", () => {
        expect(dessmlify('<speak>Awesome! <break time="0.5s"/> great work!</speak>')).to.equal(
            'Awesome! <break time="0.5s"/> great work!'
        );
    });
});
describe("ssmlify", () => {
    it("adds <speak/> tags for short text", () => {
        const ssml = ssmlify("hi");
        expect(ssml).to.equal("<speak>hi</speak>");
    });
    it("adds <speak/> tags to plain text", () => {
        const ssml = ssmlify("hello there");
        expect(ssml).to.equal("<speak>hello there</speak>");
    });
    it("does not add <speak/> tag to SSML", () => {
        const ssml = ssmlify("<speak>hello!</speak>");
        expect(ssml).to.equal("<speak>hello!</speak>");
    });
    it("cleans the trailing spaces", () => {
        const ssml = ssmlify("<speak>Goodbye trailing space</speak> ");
        expect(ssml).to.equal("<speak>Goodbye trailing space</speak>");
    });
    it("cleans the leading spaces", () => {
        const ssml = ssmlify(" <speak>Goodbye leading space</speak>");
        expect(ssml).to.equal("<speak>Goodbye leading space</speak>");
    });
});
describe("concat", () => {
    it("adds two spaces if the first string ends in an exclamation point", () => {
        const one = "Hello!";
        const two = "What is your name?";
        expect(concatText(one, two)).to.equal("Hello!  What is your name?");
    });
    it("adds two spaces if the first string ends in a period", () => {
        const one = "Hello.";
        const two = "What is your name?";
        expect(concatText(one, two)).to.equal("Hello.  What is your name?");
    });
    it("adds two spaces if the first string ends in a question mark", () => {
        const one = "Hello?";
        const two = "What is your name?";
        expect(concatText(one, two)).to.equal("Hello?  What is your name?");
    });
    it("adds one space if the first string ends in a ellipsis with spaces", () => {
        const one = "Hello. . .";
        const two = "what is your name?";
        expect(concatText(one, two)).to.equal("Hello. . . what is your name?");
    });
    it("adds one space if the first string ends in a ellipsis without spaces", () => {
        const one = "Hello...";
        const two = "what is your name?";
        expect(concatText(one, two)).to.equal("Hello... what is your name?");
    });
    it("adds one spaces if the first string ends in a comma", () => {
        const one = "Hello,";
        const two = "what is your name?";
        expect(concatText(one, two)).to.equal("Hello, what is your name?");
    });
    it("concats if the first string is undefined", () => {
        const one: string = undefined;
        const two = "Hello!";
        expect(concatText(one, two)).to.equal("Hello!");
    });
    it("concats if the second string is undefined", () => {
        const one = "Hello!";
        const two: string = undefined;
        expect(concatText(one, two)).to.equal("Hello!");
    });
    it("uses the custom delimiter when provided", () => {
        const one = "Hello!";
        const two = "How are you?";
        expect(concatText(one, two, "\n\n")).to.equal("Hello!\n\nHow are you?");
    });
});
describe("concatSSML", () => {
    it("concats one SSML string and one non-SSML string", () => {
        const one = "<speak>Hello!</speak>";
        const two = "How are you?";
        expect(concatSSML(one, two)).to.equal("<speak>Hello!  How are you?</speak>");
    });
    it("concats two non-SSML strings", () => {
        const one = "Oh";
        const two = "Hello";
        expect(concatSSML(one, two)).to.equal("<speak>Oh Hello</speak>");
    });
    it("concats two SSMl strings", () => {
        const one = "<speak>What?</speak>";
        const two = "<speak>What are you talking about?</speak>";
        expect(concatSSML(one, two)).to.equal("<speak>What?  What are you talking about?</speak>");
    });
    it("concats one undefined and one non-SSML string", () => {
        const one: string = undefined;
        const two = "<speak>Excuse me!</speak>";
        expect(concatSSML(one, two)).to.equal("<speak>Excuse me!</speak>");
    });
});
describe("removeTagsWithContent", () => {
    it("removes break tags", () => {
        const speech = removeTagsWithContent(
            'Absolutely! <break time="0.5s" />My favorite as well!<break time="0.5s" ></break>',
            ["break"]
        );
        expect(speech).to.equal("Absolutely! My favorite as well!");
    });
    it("removes empty break tags", () => {
        const speech = removeTagsWithContent('Absolutely! <break />My favorite as well!<break time="0.5s" ></break>', [
            "break"
        ]);
        expect(speech).to.equal("Absolutely! My favorite as well!");
    });
});
