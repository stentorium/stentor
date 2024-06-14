/*! Copyright (c) 2024, XAPP AI */
import { expect } from "chai";
import { splitTextIntoSentences, isQuestion, popLastQuestion } from "../text";

describe("#splitTextIntoSentences()", () => {
    it("should handle empty string", () => {
        expect(splitTextIntoSentences("")).to.deep.equal([""]);
    });

    it("should split sentences correctly", () => {
        const text = "Hello world! How are you today? This is a test.";
        const sentences = ["Hello world!", "How are you today?", "This is a test."];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle text without punctuation", () => {
        const text = "This is a test with no punctuation";
        const sentences = ["This is a test with no punctuation"];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle multiple punctuations correctly", () => {
        const text = "Hello... Is it you? Yes! It is.";
        const sentences = ["Hello...", "Is it you?", "Yes!", "It is."];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle bad input", () => {
        // @ts-ignore Testing only
        const text: string = null;
        expect(splitTextIntoSentences(text)).to.have.lengthOf(0);
    });
});

describe("#isQuestion()", () => {
    it("should return true for question sentence", () => {
        expect(isQuestion("How are you today?")).to.be.true;
    });

    it("should return false for non-question sentence", () => {
        expect(isQuestion("This is a test.")).to.be.false;
    });

    it("should handle empty string", () => {
        expect(isQuestion("")).to.be.false;
    });

    it("should handle sentence with multiple question marks", () => {
        expect(isQuestion("Is this correct??")).to.be.true;
    });

    it("should handle bad input", () => {
        // @ts-ignore Testing only
        const sentence: string = null;
        expect(isQuestion(sentence)).to.be.false;
    });
});

describe("#popLastQuestion()", () => {
    it("should remove last question sentence", () => {
        const text = "Hello world! How are you today? This is a test.";
        expect(popLastQuestion(text)).to.deep.equal([text]);
    });

    it("should not remove last sentence if it is not a question", () => {
        const text = "Hello world! This is a test.";
        expect(popLastQuestion(text)).to.deep.equal([text]);
    });

    it("should handle empty string", () => {
        expect(popLastQuestion("")).to.deep.equal([""]);
    });

    it("should handle single question sentence", () => {
        const text = "Is this the only question?";
        expect(popLastQuestion(text)).to.deep.equal(["", "Is this the only question?"]);
    });

    it("should handle bad input", () => {
        // @ts-ignore Testing only
        const text: string = null;
        expect(popLastQuestion(text)).to.deep.equal([null]);
    });
});