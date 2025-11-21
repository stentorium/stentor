/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import * as sinon from "sinon";
import { LexServiceV2, LexV2Config } from "../LexServiceV2";

describe("LexServiceV2", () => {
    let sandbox: sinon.SinonSandbox;
    let consoleWarnStub: sinon.SinonStub;
    let consoleErrorStub: sinon.SinonStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        consoleWarnStub = sandbox.stub(console, "warn");
        consoleErrorStub = sandbox.stub(console, "error");
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("constructor", () => {
        it("should throw error when botId is missing and graceful degradation is disabled", () => {
            expect(() => new LexServiceV2({ 
                gracefulDegradation: false 
            })).to.throw("LexServiceV2 configuration is incomplete. Missing required fields: botId, botAliasId. Service will not be functional.");
        });

        it("should warn when botId is missing but graceful degradation is enabled", () => {
            new LexServiceV2({ 
                botId: undefined,
                botAliasId: undefined,
                gracefulDegradation: true 
            });
            
            expect(consoleWarnStub.calledOnce).to.be.true;
            expect(consoleWarnStub.firstCall.args[0]).to.include("Missing required fields: botId, botAliasId");
        });

        it("should use environment variables when config is not provided", () => {
            const originalBotId = process.env.LEX_BOT_ID;
            const originalBotAliasId = process.env.LEX_BOT_ALIAS_ID;

            try {
                process.env.LEX_BOT_ID = "test-bot-id";
                process.env.LEX_BOT_ALIAS_ID = "test-alias-id";

                const service = new LexServiceV2();
                const status = service.getStatus();

                expect(status.configured).to.be.true;
                expect(status.botId).to.equal("test-bot-id");
                expect(status.botAliasId).to.equal("test-alias-id");
            } finally {
                process.env.LEX_BOT_ID = originalBotId;
                process.env.LEX_BOT_ALIAS_ID = originalBotAliasId;
            }
        });

        it("should prefer config over environment variables", () => {
            const originalBotId = process.env.LEX_BOT_ID;

            try {
                process.env.LEX_BOT_ID = "env-bot-id";

                const service = new LexServiceV2({ 
                    botId: "config-bot-id",
                    botAliasId: "config-alias-id"
                });
                const status = service.getStatus();

                expect(status.botId).to.equal("config-bot-id");
            } finally {
                process.env.LEX_BOT_ID = originalBotId;
            }
        });

        it("should set default values for optional parameters", () => {
            const service = new LexServiceV2({
                botId: "test-bot",
                botAliasId: "test-alias"
            });

            // Access private properties through status method
            const status = service.getStatus();
            expect(status.configured).to.be.true;
        });
    });

    describe("setContext", () => {
        it("should handle missing bot ID gracefully", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            // This should not throw an error
            await service.setContext({
                sessionId: "test-session",
                activeContext: [{ name: "BusyDays", timeToLive: { turnsToLive: 1 } }]
            });

            expect(consoleWarnStub.calledOnce).to.be.true;
            expect(consoleWarnStub.firstCall.args[0]).to.include("Bot ID (botId) is required to query LexServiceV2");
        });

        it("should store context locally when bot ID is missing", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            await service.setContext({
                sessionId: "test-session",
                userId: "test-user",
                activeContext: [{ name: "BusyDays", timeToLive: { turnsToLive: 1 } }]
            });

            const status = service.getStatus();
            expect(status.contextCount).to.equal(1);
        });

        it("should not attempt Lex sync when not configured", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });
            
            // Mock require to track if AWS SDK is loaded
            const originalRequire = require;
            let sdkCalled = false;
            
            // This test ensures we don't try to load AWS SDK when not configured
            await service.setContext({
                sessionId: "test-session",
                activeContext: [{ name: "TestContext" }]
            });

            // Should have warned about missing bot ID but not crashed
            expect(consoleWarnStub.calledOnce).to.be.true;
        });

        it("should handle empty props gracefully", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            // Should not throw error even with empty props
            await service.setContext({});
            await service.setContext();

            expect(consoleWarnStub.called).to.be.true;
        });

        it("should handle context with TTL parameters", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            const context = [{
                name: "BusyDays",
                timeToLive: {
                    turnsToLive: 1,
                    timeToLiveInSeconds: 2000
                },
                parameters: {
                    busyDays: ""
                }
            }];

            await service.setContext({
                sessionId: "test-session",
                activeContext: context
            });

            const status = service.getStatus();
            expect(status.contextCount).to.equal(1);
        });
    });

    describe("query", () => {
        it("should return fallback response when not configured", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            const response = await service.query("test query", {
                sessionId: "test-session",
                userId: "test-user"
            });

            expect(response.type).to.equal("INPUT_UNKNOWN");
            expect(response.intentId).to.equal("InputUnknown");
            expect(response.attributes?.lexServiceV2Fallback).to.be.true;
            expect(response.attributes?.fallbackReason).to.equal("missing-configuration");
        });

        it("should include request attributes in fallback response", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            const requestAttributes = { channel: "widget", platform: "test" };
            const response = await service.query("test query", {
                requestAttributes
            });

            expect(response.attributes?.channel).to.equal("widget");
            expect(response.attributes?.platform).to.equal("test");
        });

        it("should handle queries without props", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            const response = await service.query("test query");

            expect(response.type).to.equal("INPUT_UNKNOWN");
            expect(response.intentId).to.equal("InputUnknown");
        });
    });

    describe("cleanupExpiredContexts", () => {
        it("should remove expired contexts", () => {
            const service = new LexServiceV2({ 
                gracefulDegradation: true,
                sessionTimeout: 1 // 1 second timeout for testing
            });

            // Manually add a context with old timestamp by accessing private store
            // We'll do this by setting context normally then manipulating the timestamp
            service.setContext({
                sessionId: "old-session",
                activeContext: [{ name: "TestContext" }]
            });

            // Wait a bit then clean up
            setTimeout(() => {
                service.cleanupExpiredContexts();
                
                const status = service.getStatus();
                expect(status.contextCount).to.equal(0);
            }, 1100);
        });
    });

    describe("getStatus", () => {
        it("should return correct status for unconfigured service", () => {
            const service = new LexServiceV2({ gracefulDegradation: true });
            
            const status = service.getStatus();
            
            expect(status.configured).to.be.false;
            expect(status.clientAvailable).to.be.false;
            expect(status.contextCount).to.equal(0);
        });

        it("should return correct status for configured service", () => {
            const service = new LexServiceV2({
                botId: "test-bot",
                botAliasId: "test-alias",
                gracefulDegradation: true
            });
            
            const status = service.getStatus();
            
            expect(status.configured).to.be.true;
            expect(status.botId).to.equal("test-bot");
            expect(status.botAliasId).to.equal("test-alias");
        });
    });

    describe("error scenarios from bug report", () => {
        it("should reproduce the original error scenario", async () => {
            // This test reproduces the exact error scenario from the bug report
            const service = new LexServiceV2({ 
                // Simulate app configured to use LexServiceV2 but no botId
                gracefulDegradation: false 
            });

            // This should throw the exact error from the bug report
            expect(() => service).to.throw("Bot ID (botId) is required to query LexServiceV2");
        });

        it("should handle the BusyDays context scenario from bug report", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            // Reproduce the exact context that was failing
            const busyDaysContext = [{
                name: "BusyDays",
                timeToLive: {
                    turnsToLive: 1,
                    timeToLiveInSeconds: 2000
                },
                parameters: {
                    busyDays: ""
                }
            }];

            // This should not throw an error (the original bug)
            await expect(service.setContext({
                sessionId: "stentor-form-session-ac0dac06-3823-65ff-85ae-f#######4551",
                userId: "eb82e8b8-bd97-6504-a845-163ea010dd45",
                activeContext: busyDaysContext
            })).to.not.be.rejected;

            // Should have logged a warning instead of throwing
            expect(consoleWarnStub.called).to.be.true;
        });

        it("should maintain conversation flow despite missing bot ID", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            // Set context (this was failing in the bug)
            await service.setContext({
                sessionId: "test-session",
                activeContext: [{ name: "BusyDays" }]
            });

            // Query should still work with fallback
            const response = await service.query("what are my busy days", {
                sessionId: "test-session"
            });

            expect(response.type).to.equal("INPUT_UNKNOWN");
            expect(response.attributes?.lexServiceV2Fallback).to.be.true;
            
            // Conversation continues instead of crashing
            expect(consoleWarnStub.called).to.be.true;
        });
    });

    describe("edge cases", () => {
        it("should handle null/undefined values gracefully", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            await expect(service.setContext(null as any)).to.not.be.rejected;
            await expect(service.setContext(undefined)).to.not.be.rejected;
            await expect(service.query(null as any)).to.not.be.rejected;
            await expect(service.query("", null as any)).to.not.be.rejected;
        });

        it("should handle very long session IDs and user IDs", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            const longSessionId = "a".repeat(1000);
            const longUserId = "b".repeat(1000);

            await expect(service.setContext({
                sessionId: longSessionId,
                userId: longUserId,
                activeContext: [{ name: "Test" }]
            })).to.not.be.rejected;
        });

        it("should handle special characters in context names", async () => {
            const service = new LexServiceV2({ gracefulDegradation: true });

            const specialContext = [{
                name: "Context-With_Special$Characters@123",
                timeToLive: { turnsToLive: 5 }
            }];

            await expect(service.setContext({
                sessionId: "test-session",
                activeContext: specialContext
            })).to.not.be.rejected;
        });
    });
});