/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import * as sinon from "sinon";
import "mocha";

import { StudioService } from "../StudioService";

describe("StudioService Error Handling", () => {
    let fetchStub: sinon.SinonStub;
    let service: StudioService;

    beforeEach(() => {
        fetchStub = sinon.stub(global, "fetch");
        service = new StudioService({ 
            token: "test-token", 
            appId: "test-app-id" 
        });
    });

    afterEach(() => {
        fetchStub.restore();
    });

    describe("faq() method", () => {
        it("should include query in error message for network failures", async () => {
            const testQuery = "test query with special chars !@#$%";
            fetchStub.rejects(new TypeError("Network request failed"));

            try {
                await service.faq(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.faq() network error");
                expect(error.message).to.include(testQuery);
                expect(error.message).to.include("Network request failed");
            }
        });

        it("should include query in error message for abort errors", async () => {
            const testQuery = "test abort query";
            const abortError = new Error("The operation was aborted");
            abortError.name = "AbortError";
            fetchStub.rejects(abortError);

            try {
                await service.faq(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.faq() aborted");
                expect(error.message).to.include(testQuery);
            }
        });

        it("should include query and response in error message for HTTP errors", async () => {
            const testQuery = "test http error query";
            const mockResponse = {
                status: 500,
                statusText: "Internal Server Error",
                json: () => Promise.resolve({ error: "Database connection failed" })
            };
            fetchStub.resolves(mockResponse);

            try {
                await service.faq(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.faq() returned 500");
                expect(error.message).to.include(testQuery);
                expect(error.message).to.include("Database connection failed");
            }
        });

        it("should handle unexpected errors with query context", async () => {
            const testQuery = "test unexpected error query";
            fetchStub.rejects(new Error("Unexpected JSON parse error"));

            try {
                await service.faq(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.faq() unexpected error");
                expect(error.message).to.include(testQuery);
                expect(error.message).to.include("Unexpected JSON parse error");
            }
        });
    });

    describe("search() method", () => {
        it("should include query in error message for network failures", async () => {
            const testQuery = "search test query";
            fetchStub.rejects(new TypeError("Failed to fetch"));

            try {
                await service.search(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.search() network error");
                expect(error.message).to.include(testQuery);
                expect(error.message).to.include("Failed to fetch");
            }
        });

        it("should include query in error message for HTTP errors", async () => {
            const testQuery = "search http error query";
            const mockResponse = {
                status: 404,
                statusText: "Not Found",
                json: () => Promise.resolve({ message: "Knowledge base not found" })
            };
            fetchStub.resolves(mockResponse);

            try {
                await service.search(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.search() returned 404");
                expect(error.message).to.include(testQuery);
                expect(error.message).to.include("Knowledge base not found");
            }
        });
    });

    describe("rag() method", () => {
        it("should include query in error message for network failures", async () => {
            const testQuery = "rag test query";
            fetchStub.rejects(new TypeError("Network error"));

            try {
                await service.rag(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.rag() network error");
                expect(error.message).to.include(testQuery);
                expect(error.message).to.include("Network error");
            }
        });

        it("should include query in error message for HTTP errors", async () => {
            const testQuery = "rag http error query";
            const mockResponse = {
                status: 503,
                statusText: "Service Unavailable",
                json: () => Promise.resolve({ error: "RAG service temporarily unavailable" })
            };
            fetchStub.resolves(mockResponse);

            try {
                await service.rag(testQuery);
                expect.fail("Should have thrown an error");
            } catch (error) {
                expect(error.message).to.include("StudioService.rag() returned 503");
                expect(error.message).to.include(testQuery);
                expect(error.message).to.include("RAG service temporarily unavailable");
            }
        });
    });
});