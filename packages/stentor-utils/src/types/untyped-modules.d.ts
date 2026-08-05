/*! Copyright (c) 2026, XAPPmedia */

/*
 * Ambient declarations for dependencies that ship no types.
 *
 * Lives under src/ rather than typings/ because the root .gitignore ignores
 * typings/ repo-wide — putting it there means it works locally and fails in
 * CI with TS7016, which is exactly what happened.
 *
 * These were previously loaded with `const x = require("...")`, which returns
 * `any` and needed no declaration. That syntax is not valid in the ESM build
 * output, so the imports became real ESM imports and TypeScript now wants
 * types. The shapes below cover only what this package actually calls.
 */

declare module "dyno-item-size" {
    /** Approximate DynamoDB item size, in bytes. */
    function dynoItemSize(item: unknown): number;
    export = dynoItemSize;
}

declare module "number-to-words" {
    export function toWords(input: number | string): string;
}
