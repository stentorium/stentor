/*! Copyright (c) 2019, XAPPmedia */

import { expect } from "chai";
import { safeStringify, safeEventLog, logLambdaError } from "../logging";

describe("Safe Logging Utilities", () => {
    describe("safeStringify", () => {
        it("handles primitives correctly", () => {
            expect(safeStringify("hello")).to.equal('"hello"');
            expect(safeStringify(123)).to.equal("123");
            expect(safeStringify(true)).to.equal("true");
            expect(safeStringify(null)).to.equal("null");
            expect(safeStringify(undefined)).to.equal("undefined");
        });

        it("handles simple objects", () => {
            const obj = { name: "test", value: 42 };
            const result = safeStringify(obj);
            expect(result).to.contain('"name": "test"');
            expect(result).to.contain('"value": 42');
        });

        it("truncates long strings", () => {
            const longString = "x".repeat(15000);
            const obj = { data: longString };
            const result = safeStringify(obj);
            expect(result).to.contain("truncated");
            expect(result.length).to.be.lessThan(longString.length);
        });

        it("handles circular references", () => {
            const obj: any = { name: "test" };
            obj.circular = obj;
            
            const result = safeStringify(obj);
            expect(result).to.contain("Circular Reference");
            expect(result).to.contain('"name": "test"');
        });

        it("truncates large arrays", () => {
            const largeArray = Array(200).fill("item");
            const obj = { array: largeArray };
            const result = safeStringify(obj);
            expect(result).to.contain("more items");
        });

        it("handles JSON stringify errors gracefully", () => {
            const problematicObj = {
                get value() {
                    throw new Error("Cannot serialize");
                }
            };
            
            const result = safeStringify(problematicObj);
            expect(result).to.contain("JSON stringify error");
        });

        it("respects maxSize parameter", () => {
            const obj = { data: "x".repeat(1000) };
            const result = safeStringify(obj, 100);
            expect(result.length).to.be.lessThanOrEqual(110); // Allow for truncation message
        });
    });

    describe("safeEventLog", () => {
        let consoleOutput: string[] = [];
        let originalLog: any;
        let originalError: any;

        beforeEach(() => {
            consoleOutput = [];
            originalLog = console.log;
            originalError = console.error;
            
            console.log = (...args: any[]) => {
                consoleOutput.push(args.join(" "));
            };
            console.error = (...args: any[]) => {
                consoleOutput.push(args.join(" "));
            };
        });

        afterEach(() => {
            console.log = originalLog;
            console.error = originalError;
        });

        it("logs events with prefix", () => {
            const obj = { type: "test", data: "hello" };
            safeEventLog("Event:", obj);
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("Event:");
            expect(consoleOutput[0]).to.contain('"type": "test"');
        });

        it("handles large objects safely", () => {
            const largeObj = {
                type: "test",
                data: "x".repeat(50000),
                array: Array(500).fill("item")
            };
            
            safeEventLog("Large Event:", largeObj);
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("Large Event:");
        });
    });

    describe("logLambdaError", () => {
        let consoleOutput: string[] = [];
        let originalError: any;

        beforeEach(() => {
            consoleOutput = [];
            originalError = console.error;
            
            console.error = (...args: any[]) => {
                consoleOutput.push(args.join(" "));
            };
        });

        afterEach(() => {
            console.error = originalError;
        });

        it("logs error objects correctly", () => {
            const error = new Error("Test error");
            logLambdaError(error);
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("Lambda Error:");
            expect(consoleOutput[0]).to.contain("Test error");
        });

        it("logs string errors correctly", () => {
            logLambdaError("String error message");
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("Lambda Error:");
            expect(consoleOutput[0]).to.contain("String error message");
        });

        it("includes context when provided", () => {
            const error = new Error("Test error");
            const context = { requestId: "12345", userId: "user123" };
            
            logLambdaError(error, context);
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("requestId");
            expect(consoleOutput[0]).to.contain("12345");
        });

        it("handles large context objects safely", () => {
            const error = new Error("Test error");
            const largeContext = {
                data: "x".repeat(100000),
                items: Array(1000).fill("item")
            };
            
            logLambdaError(error, largeContext);
            
            expect(consoleOutput).to.have.length(1);
            expect(consoleOutput[0]).to.contain("Lambda Error:");
            // Should not crash or produce an extremely long log
        });
    });
});