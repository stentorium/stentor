/*! Copyright (c) 2019, XAPPmedia */

import { expect } from "chai";
import * as sinon from "sinon";
import { 
    safeCloseESClient, 
    createSafeESClient, 
    isValidESClient, 
    ElasticsearchClient 
} from "../elasticsearch";

describe("Elasticsearch utilities", () => {
    let loggerStub: { error: sinon.SinonStub };

    beforeEach(() => {
        loggerStub = {
            error: sinon.stub()
        };
    });

    describe("safeCloseESClient", () => {
        it("should handle undefined client gracefully", async () => {
            await expect(safeCloseESClient(undefined, loggerStub)).to.be.fulfilled;
            expect(loggerStub.error).to.not.have.been.called;
        });

        it("should handle null client gracefully", async () => {
            await expect(safeCloseESClient(null, loggerStub)).to.be.fulfilled;
            expect(loggerStub.error).to.not.have.been.called;
        });

        it("should handle client without close method gracefully", async () => {
            const invalidClient = {} as ElasticsearchClient;
            await expect(safeCloseESClient(invalidClient, loggerStub)).to.be.fulfilled;
            expect(loggerStub.error).to.not.have.been.called;
        });

        it("should successfully close a valid async client", async () => {
            const closeStub = sinon.stub().resolves();
            const client: ElasticsearchClient = { close: closeStub };
            
            await safeCloseESClient(client, loggerStub);
            
            expect(closeStub).to.have.been.calledOnce;
            expect(loggerStub.error).to.not.have.been.called;
        });

        it("should successfully close a valid sync client", async () => {
            const closeStub = sinon.stub().returns(undefined);
            const client: ElasticsearchClient = { close: closeStub };
            
            await safeCloseESClient(client, loggerStub);
            
            expect(closeStub).to.have.been.calledOnce;
            expect(loggerStub.error).to.not.have.been.called;
        });

        it("should handle close method throwing error", async () => {
            const error = new Error("Connection already closed");
            const closeStub = sinon.stub().throws(error);
            const client: ElasticsearchClient = { close: closeStub };
            
            await expect(safeCloseESClient(client, loggerStub)).to.be.fulfilled;
            
            expect(closeStub).to.have.been.calledOnce;
            expect(loggerStub.error).to.have.been.calledWith(
                "Error closing ES client: Connection already closed",
                error
            );
        });

        it("should handle async close method rejecting", async () => {
            const error = new Error("Async close failed");
            const closeStub = sinon.stub().rejects(error);
            const client: ElasticsearchClient = { close: closeStub };
            
            await expect(safeCloseESClient(client, loggerStub)).to.be.fulfilled;
            
            expect(closeStub).to.have.been.calledOnce;
            expect(loggerStub.error).to.have.been.calledWith(
                "Error closing ES client: Async close failed",
                error
            );
        });

        it("should use console.error when no logger provided", async () => {
            const consoleErrorStub = sinon.stub(console, "error");
            const error = new Error("Test error");
            const closeStub = sinon.stub().throws(error);
            const client: ElasticsearchClient = { close: closeStub };
            
            await safeCloseESClient(client);
            
            expect(consoleErrorStub).to.have.been.calledWith(
                "Error closing ES client: Test error",
                error
            );
            
            consoleErrorStub.restore();
        });

        it("should handle non-Error objects thrown from close", async () => {
            const closeStub = sinon.stub().throws("String error");
            const client: ElasticsearchClient = { close: closeStub };
            
            await safeCloseESClient(client, loggerStub);
            
            expect(loggerStub.error).to.have.been.calledWith(
                "Error closing ES client: String error",
                sinon.match.instanceOf(Error)
            );
        });
    });

    describe("createSafeESClient", () => {
        it("should create client and provide safe close method", async () => {
            const closeStub = sinon.stub().resolves();
            const client: ElasticsearchClient = { close: closeStub };
            const createClientStub = sinon.stub().returns(client);
            
            const result = createSafeESClient(createClientStub, loggerStub);
            
            expect(result.client).to.equal(client);
            expect(createClientStub).to.have.been.calledOnce;
            
            await result.safeClose();
            expect(closeStub).to.have.been.calledOnce;
            expect(loggerStub.error).to.not.have.been.called;
        });

        it("should handle errors in safe close method", async () => {
            const error = new Error("Close failed");
            const closeStub = sinon.stub().throws(error);
            const client: ElasticsearchClient = { close: closeStub };
            const createClientStub = sinon.stub().returns(client);
            
            const result = createSafeESClient(createClientStub, loggerStub);
            
            await expect(result.safeClose()).to.be.fulfilled;
            expect(loggerStub.error).to.have.been.calledWith(
                "Error closing ES client: Close failed",
                error
            );
        });
    });

    describe("isValidESClient", () => {
        it("should return true for valid client", () => {
            const client: ElasticsearchClient = { close: sinon.stub() };
            expect(isValidESClient(client)).to.be.true;
        });

        it("should return false for undefined", () => {
            expect(isValidESClient(undefined)).to.be.false;
        });

        it("should return false for null", () => {
            expect(isValidESClient(null)).to.be.false;
        });

        it("should return false for client without close method", () => {
            const client = {};
            expect(isValidESClient(client)).to.be.false;
        });

        it("should return false for client with non-function close property", () => {
            const client = { close: "not a function" };
            expect(isValidESClient(client)).to.be.false;
        });

        it("should return false for primitive types", () => {
            expect(isValidESClient("string")).to.be.false;
            expect(isValidESClient(123)).to.be.false;
            expect(isValidESClient(true)).to.be.false;
        });
    });
});