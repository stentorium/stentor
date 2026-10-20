/*! Copyright (c) 2026, XAPPmedia */
import * as fs from "fs";
import * as path from "path";

/**
 * One `KEY=value` entry. `export` may prefix the key; the value may be bare, or wrapped in single,
 * double or backtick quotes; a quoted value may span lines; `\n` expands inside double quotes
 * only; a `#` starts a comment outside quotes.
 */
const ENTRY = /^[ \t]*(?:export[ \t]+)?([\w.-]+)[ \t]*=[ \t]*(?:"((?:\\"|[^"])*)"|'((?:\\'|[^'])*)'|`((?:\\`|[^`])*)`|([^#\r\n]*))?[ \t]*(?:#.*)?$/gm;

/**
 * The entries in a .env file's text, by dotenv's rules.
 */
export function parseDotEnv(text: string): Record<string, string> {
    const parsed: Record<string, string> = {};
    const normalized = text.replace(/\r\n?/g, "\n");
    let match: RegExpExecArray | null;
    while ((match = ENTRY.exec(normalized)) !== null) {
        const [, key, double, single, back, bare] = match;
        if (double !== undefined) {
            parsed[key] = double.replace(/\\n/g, "\n").replace(/\\"/g, '"');
        } else if (single !== undefined) {
            parsed[key] = single.replace(/\\'/g, "'");
        } else if (back !== undefined) {
            parsed[key] = back.replace(/\\`/g, "`");
        } else {
            parsed[key] = (bare || "").trim();
        }
    }
    return parsed;
}

/**
 * Loads a .env file (`.env` in the working directory by default) onto process.env, never
 * overwriting a variable that is already set. A missing or unreadable file is not an error: in a
 * deployed Lambda the environment comes from the function configuration and there is no file.
 */
export function loadDotEnv(file: string = path.resolve(process.cwd(), ".env")): void {
    let text: string;
    try {
        text = fs.readFileSync(file, "utf8");
    } catch {
        return;
    }
    const parsed = parseDotEnv(text);
    for (const key of Object.keys(parsed)) {
        if (process.env[key] === undefined) {
            process.env[key] = parsed[key];
        }
    }
}
