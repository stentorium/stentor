/*! Copyright (c) 2026, XAPPmedia */
import { ErrorPayloadStack } from "stentor-models";

const UNKNOWN_FUNCTION = "<unknown>";

/** "    at method (file:line:col)" — the V8 shape, with native, eval and anonymous variants. */
const V8_FRAME = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
/** The location inside an eval frame: "eval at <anonymous> (file:line:col), <anonymous>:2:3". */
const V8_EVAL = /\((\S*)(?::(\d+))(?::(\d+))\)/;
/** "    at file:line:col" and "    at method (node:internal/...:line:col)" — frames the first shape misses. */
const NODE_FRAME = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;

function parseV8(line: string): ErrorPayloadStack | undefined {
    const parts = V8_FRAME.exec(line);
    if (!parts) {
        return undefined;
    }
    const isNative = parts[2].startsWith("native");
    const isEval = parts[2].startsWith("eval");
    const inner = isEval ? V8_EVAL.exec(parts[2]) : null;
    const file = inner ? inner[1] : parts[2];
    const line_ = inner ? inner[2] : parts[3];
    const column = inner ? inner[3] : parts[4];
    return {
        file: isNative ? null : file,
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: isNative ? [parts[2]] : [],
        lineNumber: line_ ? Number(line_) : null,
        column: column ? Number(column) : null,
    };
}

function parseNode(line: string): ErrorPayloadStack | undefined {
    const parts = NODE_FRAME.exec(line);
    if (!parts) {
        return undefined;
    }
    return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: Number(parts[3]),
        column: parts[4] ? Number(parts[4]) : null,
    };
}

/**
 * The frames of an Error's stack, one object per "at ..." line, in the shape stacktrace-parser
 * gave (which this replaces): file, methodName (`<unknown>` when anonymous), arguments (the
 * word "native" for a native frame), lineNumber and column. Lines that are not frames, such as
 * the message, are skipped.
 */
export function parseStack(stack: string | undefined): ErrorPayloadStack[] {
    if (!stack) {
        return [];
    }
    const frames: ErrorPayloadStack[] = [];
    for (const line of stack.split("\n")) {
        const frame = parseV8(line) || parseNode(line);
        if (frame) {
            frames.push(frame);
        }
    }
    return frames;
}
