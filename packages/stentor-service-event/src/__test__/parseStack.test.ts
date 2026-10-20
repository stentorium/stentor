/*! Copyright (c) 2026, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { parseStack } from "../parseStack";

/**
 * The frames stacktrace-parser produced for V8 (Node) stacks, which is where this service runs.
 * Same field names and the same `<unknown>` placeholder, so stored ErrorEvents keep their shape.
 */
describe("#parseStack()", () => {
    const stack = [
        "Error: boom",
        "    at handleLead (/var/task/src/lead/Handler.js:42:13)",
        "    at new LeadService (/var/task/src/lead/LeadService.js:10:5)",
        "    at Object.<anonymous> (/var/task/index.js:7:1)",
        "    at async Promise.all (index 0)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
        "    at /var/task/node_modules/lib/anon.js:3:9",
        "    at Array.map (native)",
        "    at eval (eval at <anonymous> (/var/task/src/evil.js:1:1), <anonymous>:2:3)",
        "    at Foo.bar [as baz] (/var/task/src/Foo.js:88:2)",
    ].join("\n");

    it("reads method, file, line and column from each frame and skips the message line", () => {
        const frames = parseStack(stack);
        expect(frames[0]).to.deep.equal({ file: "/var/task/src/lead/Handler.js", methodName: "handleLead", arguments: [], lineNumber: 42, column: 13 });
        expect(frames[1]).to.deep.equal({ file: "/var/task/src/lead/LeadService.js", methodName: "new LeadService", arguments: [], lineNumber: 10, column: 5 });
        expect(frames[2]).to.deep.equal({ file: "/var/task/index.js", methodName: "Object.<anonymous>", arguments: [], lineNumber: 7, column: 1 });
        expect(frames.map((f) => f.methodName)).to.not.include("Error: boom");
    });

    it("keeps the frames that have no file or no method, the way stacktrace-parser did", () => {
        const frames = parseStack(stack);
        const byMethod = Object.fromEntries(frames.map((f) => [f.methodName, f]));
        expect(byMethod["process.processTicksAndRejections"]).to.deep.equal({ file: "node:internal/process/task_queues", methodName: "process.processTicksAndRejections", arguments: [], lineNumber: 95, column: 5 });
        expect(byMethod["<unknown>"]).to.deep.equal({ file: "/var/task/node_modules/lib/anon.js", methodName: "<unknown>", arguments: [], lineNumber: 3, column: 9 });
        expect(byMethod["Array.map"]).to.deep.equal({ file: null, methodName: "Array.map", arguments: ["native"], lineNumber: null, column: null });
        expect(byMethod["Foo.bar [as baz]"]).to.deep.equal({ file: "/var/task/src/Foo.js", methodName: "Foo.bar [as baz]", arguments: [], lineNumber: 88, column: 2 });
        // "async Promise.all (index 0)" has no file:line, so it is not a frame.
        expect(byMethod["async Promise.all"]).to.equal(undefined);
    });

    it("uses the outer location of an eval frame", () => {
        const frames = parseStack(stack);
        const evalFrame = frames.find((f) => f.methodName === "eval");
        expect(evalFrame).to.deep.equal({ file: "/var/task/src/evil.js", methodName: "eval", arguments: [], lineNumber: 1, column: 1 });
    });

    it("gives nothing for nothing", () => {
        expect(parseStack(undefined)).to.deep.equal([]);
        expect(parseStack("")).to.deep.equal([]);
        expect(parseStack("Error: no frames")).to.deep.equal([]);
    });
});
