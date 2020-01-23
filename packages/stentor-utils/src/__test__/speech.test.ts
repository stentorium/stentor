/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import {
    containsNumbers,
    containsUppercase,
    isDefiniteArticle,
    isIndefiniteArticle,
    isPreposition,
    ListDelimiter,
    listisize,
    toWords
} from "../speech";

describe("speech", () => {
    describe("#listicize()", () => {
        describe("passing in undefined", () => {
            it("returns an empty string", () => {
                expect(listisize(undefined)).to.equal("");
            });
        });
        describe("with an empty array", () => {
            it("returns an empty string", () => {
                expect(listisize([])).to.equal("");
            });
        });
        describe("with an array of one items", () => {
            it("returns the item", () => {
                expect(listisize(["item"])).to.equal("item");
            });
        });
        describe("with an array of two items", () => {
            describe("with delimiter specified", () => {
                it("puts the specified deliminter in-between the two items", () => {
                    expect(listisize(["one", "two"], ListDelimiter.and)).to.equal("one and two");
                });
            });
            describe("without delimiter specified", () => {
                it("puts the default delimiter in-between the two items", () => {
                    expect(listisize(["one", "two"])).to.equal("one or two");
                });
            });
        });
        describe("with an array of three items", () => {
            it("inserts the delimiter between the second and third items", () => {
                expect(listisize(["one", "two", "three"])).to.equal("one, two or three");
            });
        });
        describe("with an array of four items", () => {
            it("inserts the delimiter between the third and fourth items", () => {
                expect(listisize(["one", "two", "three", "four"])).to.equal("one, two, three or four");
            });
        });
    });
    describe("#words()", () => {
        describe("when passed undefined", () => {
            it("returns an empty array", () => {
                expect(toWords(undefined)).to.have.length(0);
            });
        });
        describe("when passed a one word sentence", () => {
            it("returns an array with length one", () => {
                expect(toWords("hello")).to.have.length(1);
            });
            it("returns the word in the first item of the array", () => {
                expect(toWords("hello")[0]).to.equal("hello");
            });
        });
        describe("when passed two word sentence", () => {
            it("returns an array with length two", () => {
                expect(toWords("hello world")).to.have.length(2);
            });
            it("returns the words at the appropriate indexes", () => {
                expect(toWords("hello world")[0]).to.equal("hello");
                expect(toWords("hello world")[1]).to.equal("world");
            });
        });
        describe("when passed sentence with punctuation", () => {
            it("strips the punctuation", () => {
                const wordsArray = toWords("hello world! one, two & three");
                /* tslint:disable */
                expect(wordsArray[0]).to.equal("hello");
                expect(wordsArray[1]).to.equal("world");
                expect(wordsArray[2]).to.equal("one");
                expect(wordsArray[3]).to.equal("two");
                expect(wordsArray[4]).to.equal("three");
                /* tslint:enable */
            });
        });
    });
    describe("#isDefiniteArticle()", () => {
        describe("when passed undefined", () => {
            it("returns false", () => {
                expect(isDefiniteArticle(undefined)).to.be.false;
            });
        });
        describe("when passed 'the'", () => {
            it("returns true", () => {
                expect(isDefiniteArticle("THE")).to.be.true;
                expect(isDefiniteArticle(" the ")).to.be.true;
            });
        });
    });
    describe("#isIndefiniteArticle()", () => {
        describe("when passed undefined", () => {
            it("returns false", () => {
                expect(isIndefiniteArticle(undefined)).to.be.false;
            });
        });
        describe("when passed 'a'", () => {
            it("returns true", () => {
                expect(isIndefiniteArticle("a")).to.be.true;
                expect(isIndefiniteArticle(" a ")).to.be.true;
                expect(isIndefiniteArticle("A ")).to.be.true;
            });
        });
        describe("when passed 'an'", () => {
            it("returns true", () => {
                expect(isIndefiniteArticle("an")).to.be.true;
                expect(isIndefiniteArticle("AN")).to.be.true;
                expect(isIndefiniteArticle(" an ")).to.be.true;
            });
        });
    });
    describe("#isPreposition()", () => {
        describe("when passed undefined", () => {
            it("returns false", () => {
                expect(isPreposition(undefined)).to.be.false;
            });
        });
        describe("when passed a preposition", () => {
            it("returns true", () => {
                expect(isPreposition("on")).to.be.true;
                expect(isPreposition("WITH")).to.be.true;
                expect(isPreposition(" within ")).to.be.true;
            });
        });
    });
    describe("#containsNumbers()", () => {
        describe("when passed undefined", () => {
            it("returns false", () => {
                expect(containsNumbers(undefined)).to.be.false;
            });
        });
        describe("when passed a string with numbers", () => {
            it("returns true", () => {
                expect(containsNumbers("this is 1")).to.be.true;
            });
        });
        describe("when passed string without numbers", () => {
            it("returns false", () => {
                expect(containsNumbers("this is not one")).to.be.false;
            });
        });
    });
    describe("#containsUppercase()", () => {
        describe("when passed undefined", () => {
            it("returns false", () => {
                expect(containsUppercase(undefined)).to.be.false;
            });
        });
        describe("when passed a string with uppercase letters", () => {
            it("returns true", () => {
                expect(containsUppercase("why Yes!")).to.be.true;
            });
        });
        describe("when passed a string without uppercase letters", () => {
            it("returns false", () => {
                expect(containsUppercase("no way")).to.false;
            });
        });
    });
});
