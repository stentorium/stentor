/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { TranslateStentorResponse } from "../Translators";
import { LAUNCH_REQUEST } from "./assets";

describe(`${TranslateStentorResponse.name}`, () => {
    describe(`#${TranslateStentorResponse.prototype.translate.name}()`, () => {
        it("returns the request", () => {
            const t = new TranslateStentorResponse();
            const response = t.translate({
                request: {
                    ...LAUNCH_REQUEST,
                    channel: "foo"
                },
                response: {
                    outputSpeech: {
                        displayText: "Hi, how are you?"
                    }
                }
            });
            expect(response).to.exist;
            expect(response.outputSpeech).to.be.an("object");
            if (typeof response.outputSpeech === "object") {
                expect(response.outputSpeech).to.deep.equal({
                    displayText: "Hi, how are you?"
                });
            }
            describe("for widget channel", () => {
                it("returns the request", () => {
                    const displayText = "__Hi__\n\tHow are you? *Bye*";
                    const t = new TranslateStentorResponse();
                    const response = t.translate({
                        request: LAUNCH_REQUEST,
                        response: {
                            outputSpeech: {
                                displayText: "__Hi__\n\tHow are you? *Bye*"
                            },
                            reprompt: {
                                displayText: "[Bye](https://google.com)"
                            }
                        }
                    });
                    expect(response).to.exist;
                    expect(response.outputSpeech).to.be.an("object");
                    if (typeof response.outputSpeech === "object") {
                        expect(response.outputSpeech.displayText).to.equal(displayText);
                        expect(response.outputSpeech.html).to.exist;
                        expect(response.outputSpeech.html).to.equal("<p><strong>Hi</strong>\n    How are you? <em>Bye</em></p>\n");
                    }
                    expect(response.reprompt).to.be.an("object");
                    if (typeof response.reprompt === "object") {
                        expect(response.reprompt.displayText).to.equal("[Bye](https://google.com)");
                        expect(response.reprompt.html).to.exist;
                        expect(response.reprompt.html).to.equal("<p><a href=\"https://google.com\">Bye</a></p>\n");
                    }
                });
            });
        });
    });
});