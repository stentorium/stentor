/*! Copyright (c) 2019, XAPPmedia */

import { expect } from "chai";
import { logDynamoEvent, withSafeDynamoEventLogging } from "../dynamo-event-utils";

describe("DynamoDB Event Utilities", () => {
    let consoleOutput: string[] = [];
    let originalLog: any;

    beforeEach(() => {
        consoleOutput = [];
        originalLog = console.log;
        
        console.log = (...args: any[]) => {
            consoleOutput.push(args.join(" "));
        };
    });

    afterEach(() => {
        console.log = originalLog;
    });

    describe("logDynamoEvent", () => {
        it("logs a simple DynamoDB event", () => {
            const event = {
                eventType: "MODIFY" as const,
                eventName: "dynamo-app-updated",
                properties: {
                    type: "MODIFY"
                }
            };

            logDynamoEvent(event);
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("DynamoDB Event:");
            expect(consoleOutput[0]).to.contain("MODIFY");
            expect(consoleOutput[0]).to.contain("dynamo-app-updated");
        });

        it("sanitizes large app objects", () => {
            const largeApp = {
                appId: "app123",
                templateType: "OC_STUDIO_STARTER_TEMPLATE",
                examplePhrases: Array(50).fill("example phrase"),
                keywords: ["XAPP", "XAPPmedia", "XAPP AI"],
                icon: "https://example.com/" + "very-long-path/".repeat(100) + "icon.png",
                "stentor:search:needsReIndex": false,
                largeData: "x".repeat(10000)
            };

            const event = {
                eventType: "MODIFY" as const,
                eventName: "dynamo-app-updated",
                properties: {
                    type: "MODIFY",
                    newApp: largeApp
                }
            };

            logDynamoEvent(event);
            
            expect(consoleOutput).to.have.length(1);
            const output = consoleOutput[0];
            
            // Should contain basic app info
            expect(output).to.contain("app123");
            expect(output).to.contain("OC_STUDIO_STARTER_TEMPLATE");
            
            // Should truncate long arrays
            expect(output).to.contain("more]");
            
            // Should truncate long URLs
            expect(output).to.contain("URL truncated");
            
            // Should include truncation info
            expect(output).to.contain("_truncationInfo");
        });

        it("handles events with both newApp and oldApp", () => {
            const event = {
                eventType: "MODIFY" as const,
                eventName: "dynamo-app-updated",
                properties: {
                    type: "MODIFY",
                    newApp: { appId: "app123", name: "New App" },
                    oldApp: { appId: "app123", name: "Old App" }
                }
            };

            logDynamoEvent(event);
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("New App");
            expect(consoleOutput[0]).to.contain("Old App");
        });

        it("handles malformed events gracefully", () => {
            const malformedEvent = {
                eventType: "MODIFY" as const,
                eventName: "dynamo-app-updated",
                properties: {
                    type: "MODIFY",
                    newApp: {
                        get problematic() {
                            throw new Error("Cannot serialize");
                        }
                    }
                }
            };

            // Should not throw
            expect(() => logDynamoEvent(malformedEvent)).to.not.throw();
        });

        it("handles events without properties", () => {
            const event = {
                eventType: "INSERT" as const,
                eventName: "dynamo-user-created"
            };

            logDynamoEvent(event);
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("INSERT");
            expect(consoleOutput[0]).to.contain("dynamo-user-created");
        });
    });

    describe("withSafeDynamoEventLogging", () => {
        it("wraps handler and logs DynamoDB events", async () => {
            const mockHandler = async (event: any) => {
                return { success: true };
            };

            const wrappedHandler = withSafeDynamoEventLogging(mockHandler);
            
            const event = {
                eventType: "MODIFY",
                eventName: "dynamo-app-updated"
            };

            const result = await wrappedHandler(event);
            
            expect(result).to.deep.equal({ success: true });
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("DynamoDB Event:");
        });

        it("passes through non-DynamoDB events without logging", async () => {
            const mockHandler = async (event: any) => {
                return { success: true };
            };

            const wrappedHandler = withSafeDynamoEventLogging(mockHandler);
            
            const event = {
                type: "regular-event",
                data: "some data"
            };

            const result = await wrappedHandler(event);
            
            expect(result).to.deep.equal({ success: true });
            expect(consoleOutput).to.have.length(0); // No DynamoDB event logging
        });

        it("handles errors in wrapped handler", async () => {
            let errorOutput: string[] = [];
            const originalError = console.error;
            console.error = (...args: any[]) => {
                errorOutput.push(args.join(" "));
            };

            try {
                const mockHandler = async (event: any) => {
                    throw new Error("Handler failed");
                };

                const wrappedHandler = withSafeDynamoEventLogging(mockHandler);
                
                const event = {
                    eventType: "MODIFY",
                    eventName: "dynamo-app-updated"
                };

                try {
                    await wrappedHandler(event);
                    expect.fail("Should have thrown error");
                } catch (error) {
                    expect(error.message).to.equal("Handler failed");
                }

                // Should log the DynamoDB event
                expect(consoleOutput).to.have.length(1);
                
                // Should log the error
                expect(errorOutput).to.have.length(1);
                expect(errorOutput[0]).to.contain("Lambda Error:");

            } finally {
                console.error = originalError;
            }
        });

        it("works with synchronous handlers", () => {
            const mockHandler = (event: any) => {
                return { success: true };
            };

            const wrappedHandler = withSafeDynamoEventLogging(mockHandler);
            
            const event = {
                eventType: "INSERT",
                eventName: "dynamo-item-created"
            };

            const result = wrappedHandler(event);
            
            expect(result).to.eventually.deep.equal({ success: true });
            expect(consoleOutput).to.have.length(1);
        });
    });
});