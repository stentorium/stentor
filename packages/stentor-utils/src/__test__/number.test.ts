/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import {
    formatNumberForDisplay,
    maskPhoneNumbers,
    numberToWord,
    sanitizePhoneNumber,
    wordToNumber,
    isNumeric
} from "../number";

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
            expect(numberToWord(1)).to.equal("one");
            expect(numberToWord(-1)).to.equal("minus one");
            expect(numberToWord(0)).to.equal("zero");
            expect(numberToWord(1986)).to.equal("one thousand, nine hundred eighty-six");
            // This isn't supported yet https://github.com/marlun78/number-to-words/issues/9
            expect(numberToWord(2.2)).to.equal("two");
        });
    });
});

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

describe("#formatNumberForDisplay() formats", () => {
    // The numeral formats this code base used, now rendered by our own formatter.
    it("groups thousands and rounds to the decimals the format shows", () => {
        expect(formatNumberForDisplay(1234567.891, "0,0")).to.equal("1,234,568");
        expect(formatNumberForDisplay(1234.5, "0,0.00")).to.equal("1,234.50");
        expect(formatNumberForDisplay(0.125, "0.0")).to.equal("0.1");
        expect(formatNumberForDisplay(42, "0")).to.equal("42");
        expect(formatNumberForDisplay(1234, "0")).to.equal("1234");
    });
    it("renders currency and percent", () => {
        expect(formatNumberForDisplay(-1234.5, "$0,0.00")).to.equal("-$1,234.50");
        expect(formatNumberForDisplay(0.256, "0.0%")).to.equal("25.6%");
        expect(formatNumberForDisplay("0.5", "0%")).to.equal("50%");
    });
    it("never falls into exponent form, for the very small or the very large", () => {
        expect(formatNumberForDisplay(0.0000001)).to.equal("0");
        expect(formatNumberForDisplay(-0.0000001)).to.equal("0");
        expect(formatNumberForDisplay(1e-9, "0.0%")).to.equal("0.0%");
        expect(formatNumberForDisplay(1e21)).to.equal("1,000,000,000,000,000,000,000");
        expect(formatNumberForDisplay(1.005, "0.00")).to.equal("1.01");
    });
    it("reads a formatted string back, as numeral did", () => {
        expect(formatNumberForDisplay("1,234")).to.equal("1,234");
        expect(formatNumberForDisplay("$1,234.5", "$0,0.00")).to.equal("$1,234.50");
        expect(formatNumberForDisplay("50%", "0%")).to.equal("50%");
        expect(formatNumberForDisplay("  42 ")).to.equal("42");
    });
    it("renders nothing numeric as 0, the way numeral did", () => {
        expect(formatNumberForDisplay("abc")).to.equal("0");
        expect(formatNumberForDisplay(undefined as unknown as number)).to.equal("0");
        expect(formatNumberForDisplay(NaN, "$0,0.00")).to.equal("$0.00");
    });
});

describe("#numberToWord() shapes", () => {
    // The number-to-words shapes callers see: hyphenated tens, "hundred" with no "and", groups
    // joined with a comma, truncation toward zero, and a throw for what cannot be spoken.
    it("spells small and compound numbers", () => {
        expect(numberToWord(21)).to.equal("twenty-one");
        expect(numberToWord(100)).to.equal("one hundred");
        expect(numberToWord(101)).to.equal("one hundred one");
        expect(numberToWord(110)).to.equal("one hundred ten");
        expect(numberToWord(1000)).to.equal("one thousand");
        expect(numberToWord(1000001)).to.equal("one million, one");
    });
    it("spells large numbers group by group", () => {
        expect(numberToWord(12345)).to.equal("twelve thousand, three hundred forty-five");
        expect(numberToWord(123456789)).to.equal("one hundred twenty-three million, four hundred fifty-six thousand, seven hundred eighty-nine");
        expect(numberToWord(1000000000)).to.equal("one billion");
        expect(numberToWord(1000000000000)).to.equal("one trillion");
        expect(numberToWord(1000000000000000)).to.equal("one quadrillion");
    });
    it("truncates toward zero and keeps the sign", () => {
        expect(numberToWord(-2.7)).to.equal("minus two");
    });
    it("throws for what cannot be spoken", () => {
        expect(() => numberToWord(NaN)).to.throw();
        expect(() => numberToWord(Infinity)).to.throw();
        expect(() => numberToWord(1e18)).to.throw();
    });
});

describe("#wordToNumber() shapes", () => {
    // The shapes callers pass: a single number word or phrase (returns a number), or a sentence
    // with number words inside it (returned with the digits substituted).
    it("reads phrases with and, a, hyphens and commas", () => {
        expect(wordToNumber("one hundred and five")).to.equal(105);
        expect(wordToNumber("twenty one")).to.equal(21);
        expect(wordToNumber("a thousand")).to.equal(1000);
        expect(wordToNumber("hundred")).to.equal(100);
        expect(wordToNumber("zero")).to.equal(0);
        expect(wordToNumber("twenty-thousand, five-hundred and sixty-nine")).to.equal(20569);
        expect(wordToNumber("six million five thousand and two")).to.equal(6005002);
    });
    it("reads decimals spoken with point", () => {
        expect(wordToNumber("one point five")).to.equal(1.5);
    });
    it("reads ordinals", () => {
        expect(wordToNumber("first")).to.equal(1);
        expect(wordToNumber("third")).to.equal(3);
    });
    it("does not read a lone article or point as a number", () => {
        expect(wordToNumber("a")).to.equal("a");
        expect(wordToNumber("just a second")).to.equal("just a 2");
        expect(wordToNumber("from one point to another")).to.equal("from 1 to another");
    });
    it("substitutes digits inside a sentence and leaves the rest alone", () => {
        expect(wordToNumber("I have twenty apples")).to.equal("I have 20 apples");
        expect(wordToNumber("twelve dozen")).to.equal("12 dozen");
        expect(wordToNumber("2 apples")).to.equal("2 apples");
        expect(wordToNumber("5")).to.equal("5");
    });
});

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
    describe("when passed a word that is a number", () => {
        it("passes it through", () => {
            expect(wordToNumber("fifty-five")).to.equal(55);
        });
    });
});

describe(`#${isNumeric.name}()`, () => {
    it('it returns the correct value', () => {
        expect(isNumeric(undefined)).to.be.false;
        expect(isNumeric("2")).to.be.true;
        expect(isNumeric(2)).to.be.true;
        expect(isNumeric("2.2")).to.be.true;
        expect(isNumeric(2.2)).to.be.true;
        expect(isNumeric({})).to.be.false;
        expect(isNumeric(true)).to.be.false;
        expect(isNumeric("foo")).to.be.false;
    });
});
