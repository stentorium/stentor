/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { StringExpander, StringVariableStyle } from "../StringExpander";

describe("StringExpander", () => {
    let strExp: StringExpander;
    beforeEach(() => {
        strExp = new StringExpander();
    });
    describe("#constructor()", () => {
        it("returns an instance of itself", () => {
            expect(new StringExpander()).to.be.instanceOf(StringExpander);
        });
    });
    describe("#expand()", () => {
        describe("when passed undefined", () => {
            it("returns an empty array", () => {
                expect(strExp.expand(undefined)).to.deep.equal([]);
            });
        });
        describe("when passed a string with old style variables", () => {
            it("translates them to the default ES Literal style ${}", () => {
                const expanded = strExp.expand("hello {-|ONE}");
                expect(expanded).to.have.length(1);
                expect(expanded[0]).to.equal("hello ${ONE}");
            });
        });
        describe("when passed a string with a single set of brackets", () => {
            it("returns the expansion", () => {
                const expanded = strExp.expand("hello {bob|mary|joe|}");
                expect(expanded).to.have.length(4);
                expect(expanded[0]).to.equal("hello bob");
                expect(expanded[1]).to.equal("hello mary");
                expect(expanded[2]).to.equal("hello joe");
                expect(expanded[3]).to.equal("hello ");
            });
            describe("and variable", () => {
                it("returns the expansion", () => {
                    const expanded = strExp.expand("hello {bob|mary|joe|} my name is ${NAME}");
                    expect(expanded).to.have.length(4);
                    expect(expanded[0]).to.equal("hello bob my name is ${NAME}");
                    expect(expanded[1]).to.equal("hello mary my name is ${NAME}");
                    expect(expanded[2]).to.equal("hello joe my name is ${NAME}");
                    expect(expanded[3]).to.equal("hello  my name is ${NAME}");
                });
            });
            describe("and variable in the brackets", () => {
                it("returns the expansion", () => {
                    const expanded = strExp.expand("{${ACKNOWLEDGEMENT}, |}how are you?");
                    expect(expanded).to.have.length(2);
                    expect(expanded[0]).to.equal("${ACKNOWLEDGEMENT}, how are you?");
                    expect(expanded[1]).to.equal("how are you?");
                });
            });
        });
        describe("when passed a string with multiple brackets", () => {
            it("returns the expansion", () => {
                const expanded = strExp.expand("hello {bob|mary|joe}, {what's up|how is it going}?");
                expect(expanded).to.have.length(6);
                expect(expanded[0]).to.equal("hello bob, what's up?");
                expect(expanded[1]).to.equal("hello bob, how is it going?");
            });
        });
        describe("when passed a complicated example of only slots", () => {
            it("returns the expansion", () => {
                const expanded = strExp.expand(
                    "{${prefix}|${acknowledgement} ${prefix}|${acknowledgement}} ${difficulty} ${recipe}"
                );
                expect(expanded).to.have.length(3);
                expect(expanded[0]).to.equal("${prefix} ${difficulty} ${recipe}");
                expect(expanded[1]).to.equal("${acknowledgement} ${prefix} ${difficulty} ${recipe}");
                expect(expanded[2]).to.equal("${acknowledgement} ${difficulty} ${recipe}");
            });
        });
        describe("when AlexaSlot style is set", () => {
            beforeEach(() => {
                strExp = new StringExpander({ variableStyle: StringVariableStyle.AlexaSlot });
            });
            it("translates them to the Alexa slot style {}", () => {
                const expanded = strExp.expand("hello {-|ONE}");
                expect(expanded).to.have.length(1);
                expect(expanded[0]).to.equal("hello {ONE}");
            });
        });
        describe("when Alexa Utterances style is set", () => {
            beforeEach(() => {
                strExp = new StringExpander({ variableStyle: StringVariableStyle.AlexaUtterances });
            });
            it("translates them to the Alexa slot style {}", () => {
                const expanded = strExp.expand("hello {-|ONE}");
                expect(expanded).to.have.length(1);
                expect(expanded[0]).to.equal("hello {-|ONE}");
            });
        });
        describe("when reduceToOneSpace is set", () => {
            beforeEach(() => {
                strExp = new StringExpander({ reduceToOneSpace: true });
            });
            it("expands and ensures the spaces between each are only one", () => {
                const expanded = strExp.expand(
                    "{${prefix}|${acknowledgement} ${prefix}|${acknowledgement}|} {${difficulty}|${adjective}|} {${food_type}|${meal_type}|${oat_food_type}} ${recipe}"
                );
                expect(expanded).to.have.length(36);
                expect(expanded[6]).to.equal("${prefix} ${food_type} ${recipe}");
            });
        });
        describe("when trim is set", () => {
            beforeEach(() => {
                strExp = new StringExpander({ trim: true });
            });
            it("removes leading and trailing spaces", () => {
                const expanded = strExp.expand("  {foo|bar} is the answer   ");
                expect(expanded).to.have.length(2);
                expect(expanded[0]).to.equal("foo is the answer");
                expect(expanded[1]).to.equal("bar is the answer");
            });
            it("doesn't add empty strings", () => {
                const expanded = strExp.expand("  {foo|bar|} {is the answer|}  ");
                expect(expanded).to.have.length(5);
            });
        });
    });
});
