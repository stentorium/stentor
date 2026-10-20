/*! Copyright (c) 2026, XAPPmedia */
import { ErrorPayloadStack } from "stentor-models";

const UNKNOWN_FUNCTION = "<unknown>";

/**
 * "file:line:col" or "file:line" from the right, so a file path may itself contain colons
 * ("node:internal/process/task_queues:95:5", "C:\\app\\x.js:1:2").
 */
function splitLocation(location: string): { file: string; lineNumber: number | null; column: number | null } | undefined {
    const parts = location.split(":");
    const last = parts[parts.length - 1];
    const beforeLast = parts[parts.length - 2];
    if (parts.length >= 3 && /^\d+$/.test(last) && /^\d+$/.test(beforeLast)) {
        return { file: parts.slice(0, -2).join(":"), lineNumber: Number(beforeLast), column: Number(last) };
    }
    if (parts.length >= 2 && /^\d+$/.test(last)) {
        return { file: parts.slice(0, -1).join(":"), lineNumber: Number(last), column: null };
    }
    return undefined;
}

/**
 * One V8 frame: "    at method (location)", "    at location", "    at method (native)" or an
 * eval frame "    at eval (eval at outer (location), <anonymous>:l:c)", whose outer location is
 * the one reported. Plain string work, no backtracking regular expressions.
 */
function parseFrame(line: string): ErrorPayloadStack | undefined {
    const trimmed = line.trim();
    if (!trimmed.startsWith("at ")) {
        return undefined;
    }
    const body = trimmed.slice(3).trim();
    let methodName = "";
    let location = body;
    if (body.endsWith(")")) {
        const open = body.indexOf("(");
        if (open < 0) {
            return undefined;
        }
        methodName = body.slice(0, open).trim();
        location = body.slice(open + 1, -1);
    }
    if (location === "native") {
        return { file: null, methodName: methodName || UNKNOWN_FUNCTION, arguments: ["native"], lineNumber: null, column: null };
    }
    if (location.startsWith("eval at ")) {
        // Outer location: the first parenthesised group inside the eval description.
        const innerOpen = location.indexOf("(");
        const innerClose = location.indexOf(")", innerOpen);
        if (innerOpen < 0 || innerClose < 0) {
            return undefined;
        }
        location = location.slice(innerOpen + 1, innerClose);
    }
    const split = splitLocation(location);
    if (!split) {
        return undefined;
    }
    return { ...split, methodName: methodName || UNKNOWN_FUNCTION, arguments: [] };
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
        const frame = parseFrame(line);
        if (frame) {
            frames.push(frame);
        }
    }
    return frames;
}
