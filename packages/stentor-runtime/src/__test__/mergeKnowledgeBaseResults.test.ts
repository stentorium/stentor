/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { KnowledgeBaseResult } from "stentor-models";
import { InputUnknownRequestBuilder, IntentRequestBuilder, isIntentRequest } from "stentor-request";

import { mergeKnowledgeBaseResult } from "../mergeKnowledgeBaseResult";

const emptyResult: KnowledgeBaseResult = {
    faqs: [],
    documents: [],
    suggested: []
}

const faqResult: KnowledgeBaseResult = {
    faqs: [
        {
            document: "Blue",
            question: "What is your favorite color?"
        }
    ]
}

const faqAndDocumentResult: KnowledgeBaseResult = {
    faqs: [
        {
            document: "Red",
            question: "What is your favorite color?"
        }
    ],
    documents: [
        {
            title: "Favorite Colors",
            document: "Everybody has different favorite colors but red is typically preferred."
        }
    ]
}

describe.only(`#${mergeKnowledgeBaseResult.name}()`, () => {
    describe("with a config", () => {
        describe("with setIntentId", () => {
            it("modifies the intentId", () => {
                const intentRequest = new IntentRequestBuilder().withIntentId("first").build();
                const request = mergeKnowledgeBaseResult(intentRequest, emptyResult, { setIntentId: "second" });
                expect(isIntentRequest(request)).to.be.true;
                if (isIntentRequest(request)) {
                    expect(request.intentId).to.equal("second");
                }
            });
            describe("with InputUnknown request", () => {
                it("modifies the intentId and type", () => {
                    const intentRequest = new InputUnknownRequestBuilder().build();
                    const request = mergeKnowledgeBaseResult(intentRequest, emptyResult, { setIntentId: "second" });
                    expect(isIntentRequest(request)).to.be.true;
                    if (isIntentRequest(request)) {
                        expect(request.intentId).to.equal("second");
                    }
                });
            });
        });
        describe("without setIntentId", () => {
            it("maintains the intentId", () => {
                const intentRequest = new IntentRequestBuilder().withIntentId("first").build();
                const request = mergeKnowledgeBaseResult(intentRequest, emptyResult);
                expect(isIntentRequest(request)).to.be.true;
                if (isIntentRequest(request)) {
                    expect(request.intentId).to.equal("first");
                }
            });
        });
        describe("with merge results", () => {
            it("merges both knowledgebase results", () => {
                const intentRequest = new IntentRequestBuilder().withIntentId("first").withKnowledgeBaseResult(faqResult).build();
                const request = mergeKnowledgeBaseResult(intentRequest, faqAndDocumentResult, { mergeResults: true });
                expect(isIntentRequest(request)).to.be.true;
                expect(isIntentRequest(request)).to.be.true;
                if (isIntentRequest(request)) {
                    expect(request.intentId).to.equal("first");
                    expect(request.knowledgeBaseResult.faqs).to.have.length(2);
                    expect(request.knowledgeBaseResult.documents).to.have.length(1);
                    expect(request.knowledgeBaseResult.suggested).to.have.length(0);
                }
            });
        });
    });
    describe("without a config", () => {
        it("sets the results on the request", () => {
            const intentRequest = new IntentRequestBuilder().withIntentId("first").build();
            const request = mergeKnowledgeBaseResult(intentRequest, faqResult, {});
            expect(isIntentRequest(request)).to.be.true;
            if (isIntentRequest(request)) {
                expect(request.intentId).to.equal("first");
                expect(request.knowledgeBaseResult).to.deep.equal(faqResult);
            }
        });
    });
});