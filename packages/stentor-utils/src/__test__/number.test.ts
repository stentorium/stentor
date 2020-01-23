/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { formatNumberForDisplay, maskPhoneNumbers, numberToWord, sanitizePhoneNumber, wordToNumber } from "../number";

describe("#sanitizePhoneNumber()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(sanitizePhoneNumber(undefined)).to.equal(undefined);
        });
    });
    describe("when passed a number", () => {
        it("returns undefined", () => {
            const notString: any = 1;
            expect(sanitizePhoneNumber(notString)).to.equal(undefined);
        });
    });
    describe("when passed a phone number with the country code", () => {
        it("cleans off the 1 and adds the hyphens", () => {
            const withCode = "18048881226";
            expect(sanitizePhoneNumber(withCode)).to.equal("804-888-1226");
        });
    });
    describe("when passed a phone number without the country code", () => {
        it("adds the hyphens", () => {
            const withOutCode = "8048881226";
            expect(sanitizePhoneNumber(withOutCode)).to.equal("804-888-1226");
        });
    });
});
describe("#maskPhoneNumbers()", () => {
    describe("for a string without numbers", () => {
        it("passes them through", () => {
            expect(maskPhoneNumbers("hello world")).to.equal("hello world");
            expect(maskPhoneNumbers("i am #1")).to.equal("i am #1");
            expect(maskPhoneNumbers("0e8b6fa1-bdcd-415d-8bb6-cce0dcf68c97")).to.equal(
                "0e8b6fa1-bdcd-415d-8bb6-cce0dcf68c97"
            );
            // This one is trying to trick it because it might think it has a number in the middle 154-8006
            expect(maskPhoneNumbers("0e8b6fa1-bdcd-4154-8006-cce0dcf68c97")).to.equal(
                "0e8b6fa1-bdcd-4154-8006-cce0dcf68c97"
            );
        });
    });
    describe("for a string with one number", () => {
        it("masks correctly", () => {
            const sentence = "Sms sent to (703) 595-7631 bam!";
            const partialClean = "Sms sent to (###) ###-7631 bam!";
            const fullClean = "Sms sent to (###) ###-#### bam!";
            expect(maskPhoneNumbers(sentence, true)).to.equal(partialClean);
            expect(maskPhoneNumbers(sentence)).to.equal(fullClean);
            expect(maskPhoneNumbers("1 number is 804-749-4949")).to.equal("1 number is ###-###-####");
            expect(maskPhoneNumbers(JSON.stringify({ number: "804-888-1226", bar: "2" }))).to.equal(
                `{"number":"###-###-####","bar":"2"}`
            );
        });
    });
    describe("for a string with two numbers", () => {
        it("masks correctly", () => {
            const sentence = "Sms sent to (703) 595-7631 and 555-6898888 bam!";
            const partialClean = "Sms sent to (###) ###-7631 and ###-###8888 bam!";
            const fullClean = "Sms sent to (###) ###-#### and ###-####### bam!";
            expect(maskPhoneNumbers(sentence)).to.equal(fullClean);
            expect(maskPhoneNumbers(sentence, true)).to.equal(partialClean);
        });
    });
    describe("for a string with a number without country code or formatting", () => {
        it("masks correctly", () => {
            const sentence = "Sms sent to 5957631 bam!";
            const clean = "Sms sent to ####### bam!";
            expect(maskPhoneNumbers(sentence)).to.equal(clean);
            expect(maskPhoneNumbers("Sms sent to 5957631")).to.equal("Sms sent to #######");
        });
    });
});

describe("#numberToWord()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(numberToWord(undefined)).to.be.undefined;
        });
    });
    describe("when passed a number", () => {
        it("returns the correct word", () => {
            /* tslint:disable:no-magic-numbers */
            expect(numberToWord(1)).to.equal("one");
            expect(numberToWord(-1)).to.equal("minus one");
            expect(numberToWord(0)).to.equal("zero");
            expect(numberToWord(1986)).to.equal("one thousand, nine hundred eighty-six");
            /* tslint:enable:no-magic-numbers */
        });
    });
});

/* tslint:disable:no-magic-numbers */
describe("#formatNumberForDisplay()", () => {
    describe("when using the default format", () => {
        it("returns the correct formatting", () => {
            expect(formatNumberForDisplay(10000)).to.equal("10,000");
            expect(formatNumberForDisplay("1000")).to.equal("1,000");
        });
    });
    describe("when passed an optional format", () => {
        it("returns the correct formatting", () => {
            expect(formatNumberForDisplay(10000, "$0,0.00")).to.equal("$10,000.00");
            expect(formatNumberForDisplay("1", "0%")).to.equal("100%");
        });
    });
});
/* tslint:enable:no-magic-numbers */

describe("#wordToNumber()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(wordToNumber(undefined)).to.be.undefined;
        });
    });
    describe("when passed a normal word", () => {
        it("passes it through", () => {
            expect(wordToNumber("foo")).to.equal("foo");
        });
    });
    /* tslint:disable:no-magic-numbers */
    describe("when passed a word that is a number", () => {
        it("passes it through", () => {
            expect(wordToNumber("fifty-five")).to.equal(55);
        });
    });
});
