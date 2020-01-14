/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { executeTemplate, TemplatedResponseOutput } from "../TemplatedResponseOutput";

interface SimpleType {
    one: string;
    two: string;
    three: number;
}

const data: SimpleType = {
    one: "one",
    two: "two",
    three: 3
};

describe("TemplatedResponseOutput", () => {
    describe("#executeTemplate()", () => {
        describe("with data undefined", () => {
            let response: TemplatedResponseOutput<SimpleType>;
            let undefinedData: SimpleType;
            beforeEach(() => {
                undefinedData = undefined;
                response = {
                    ssml: "<speak>Hello! ${one}</speak>",
                    displayText: "${one}, ${two} and ${three}",
                    textToSpeech: "${one}, I said ${one}",
                    data: undefinedData
                };
            });
            it("throws an error", () => {
                expect(executeTemplate.bind(response)).to.throw;
            });
        });
        describe("with data", () => {
            describe("for a response output with all parameters", () => {
                let response: TemplatedResponseOutput<SimpleType>;

                beforeEach(() => {
                    response = {
                        ssml: "<speak>Hello! ${one}</speak>",
                        displayText: "${one}, ${two} and ${three}",
                        textToSpeech: "${one}, I said ${one}",
                        data
                    };
                });

                it("returns a response", () => {
                    return executeTemplate(response).then(executedResponse => {
                        expect(executedResponse).to.exist;
                    });
                });
                it("replaces the SSML", () => {
                    return executeTemplate(response).then(executedResponse => {
                        expect(executedResponse.ssml).to.exist;
                        expect(executedResponse.ssml).to.equal("<speak>Hello! one</speak>");
                    });
                });
                it("replaces the displayText", () => {
                    return executeTemplate(response).then(executedResponse => {
                        expect(executedResponse.displayText).to.exist;
                        expect(executedResponse.displayText).to.equal("one, two and 3");
                    });
                });
                it("replaces the textToSpeech", () => {
                    return executeTemplate(response).then(executedResponse => {
                        expect(executedResponse.textToSpeech).to.exist;
                        expect(executedResponse.textToSpeech).to.equal("one, I said one");
                    });
                });
            });
        });
    });
});
