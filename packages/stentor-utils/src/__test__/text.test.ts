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

    it("should handle multiple punctuations correctly", () => {
        const text = "Hello... Is it you? Yes! It is.";
        const sentences = ["Hello...", "Is it you?", "Yes!", "It is."];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle multiple punctuations correctly, including up to 10 periods, exclamation marks, or question marks", () => {
        const text = "Hello... Is it you? Yes! It is.......... Sure! Alright.........";
        const sentences = ["Hello...", "Is it you?", "Yes!", "It is..........", "Sure!", "Alright........."];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle common abbreviations without splitting", () => {
        const text = "Dr. Bela is the best at D.P.A.. No one can beat him.";
        const sentences = ["Dr. Bela is the best at D.P.A..", "No one can beat him."];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle PhD abbreviation correctly", () => {
        const text = "Dr. Bela has a PhD. in biomechanics. No one can beat him.";
        const sentences = ["Dr. Bela has a PhD. in biomechanics.", "No one can beat him."];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle text with more than 2 spaces and tabs/new lines in between sentences", () => {
        const text = "Hello world! \t \t \t \t \t How are you today? \t \t \n \t \t This is a test.";
        const sentences = ["Hello world!", "How are you today?", "This is a test."];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle text with just two carriage returns in between sentences", () => {
        const text = "This is the answer.\n\nAnything else I can help with?";
        const sentences = ["This is the answer.", "Anything else I can help with?"];
        expect(splitTextIntoSentences(text)).to.deep.equal(sentences);
    });

    it("should handle text without punctuation", () => {
        const text = "This is a test with no punctuation";
        const sentences = ["This is a test with no punctuation"];
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

    it("should handle two sentences with new lines in between", () => {
        const text = "This is the answer.\n\nAnything else I can help with?";
        expect(popLastQuestion(text)).to.deep.equal(["This is the answer.", "Anything else I can help with?"]);
    });

    it("should handle bad input", () => {
        // @ts-ignore Testing only
        const text: string = null;
        expect(popLastQuestion(text)).to.deep.equal([null]);
    });
});