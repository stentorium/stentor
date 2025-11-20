/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";
import * as sinon from "sinon";

import { capabilities, Stentor } from "../Channel";
import { DEFAULT_DEVICE } from "../Constants";
import { LAUNCH_REQUEST } from "./assets";

describe(`#${capabilities.name}()`, () => {
    it("returns the correct value", () => {
        expect(capabilities({ ...LAUNCH_REQUEST })).to.deep.equal(DEFAULT_DEVICE);
        expect(capabilities({ ...LAUNCH_REQUEST, device: { canSpeak: true } })).to.deep.equal({ canSpeak: true })
    });
});

describe("#Stentor()", () => {
    describe("context setting error handling", () => {
        let mockNluService: any;
        let logStub: any;
        let consoleErrorStub: any;

        beforeEach(() => {
            mockNluService = {
                setContext: sinon.stub()
            };

            // Mock the log function
            logStub = {
                error: sinon.stub(),
                debug: sinon.stub()
            };

            // Mock console.error if needed 
            consoleErrorStub = sinon.stub(console, "error");
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should handle context setting errors gracefully", async () => {
            const error = new Error("NLU service unavailable");
            mockNluService.setContext.rejects(error);
            
            const channel = Stentor(mockNluService);
            
            // Mock log function - need to stub the module's log function
            const logModule = require("stentor-logger");
            const logMethodStub = sinon.stub(logModule, "log").returns(logStub);

            const mockRequest = {
                sessionId: "test-session",
                userId: "test-user",
                platform: "test-platform",
                type: "INTENT_REQUEST"
            };

            const mockResponse = {
                response: {
                    context: {
                        active: [
                            { name: "test-context", timeToLive: { turnsToLive: 5 } }
                        ]
                    }
                }
            };

            const mockStorage = {};

            // Call the preResponseTranslation hook
            if (channel.hooks?.preResponseTranslation) {
                await channel.hooks.preResponseTranslation(
                    mockRequest as any,
                    mockResponse as any,
                    mockStorage as any
                );
            }

            // Verify the error was logged with structured data
            expect(logStub.error.calledOnce).to.be.true;
            expect(logStub.error.firstCall.args[0]).to.equal('Context setting failed');
            
            const errorDetails = logStub.error.firstCall.args[1];
            expect(errorDetails).to.deep.include({
                message: 'Error setting context',
                userId: 'test-user',
                sessionId: 'test-session',
                nluService: 'Object', // constructor name
                platform: 'test-platform',
                requestType: 'INTENT_REQUEST',
                activeContextCount: 1
            });

            expect(errorDetails.error).to.deep.equal({
                message: 'NLU service unavailable',
                name: 'Error',
                stack: error.stack
            });

            logMethodStub.restore();
        });

        it("should not log debug info in production", async () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'production';

            const error = new Error("NLU service unavailable");
            mockNluService.setContext.rejects(error);
            
            const channel = Stentor(mockNluService);
            
            // Mock log function
            const logModule = require("stentor-logger");
            const logMethodStub = sinon.stub(logModule, "log").returns(logStub);

            const mockRequest = {
                sessionId: "test-session",
                userId: "test-user",
                platform: "test-platform",
                type: "INTENT_REQUEST"
            };

            const mockResponse = {
                response: {
                    context: {
                        active: [{ name: "test-context", timeToLive: { turnsToLive: 5 } }]
                    }
                }
            };

            const mockStorage = {};

            // Call the preResponseTranslation hook
            if (channel.hooks?.preResponseTranslation) {
                await channel.hooks.preResponseTranslation(
                    mockRequest as any,
                    mockResponse as any,
                    mockStorage as any
                );
            }

            // Verify debug was not called in production
            expect(logStub.debug.called).to.be.false;

            logMethodStub.restore();
            process.env.NODE_ENV = originalEnv;
        });
    });
});