/* Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import * as fs from "fs";

import { Context, RequestSlotMap } from "stentor-models";

/**
 * Print out the slots to help with debugging.
 *
 * @param slots - Slots from an intent request
 * @public
 */
export function dumpSlots(slots: RequestSlotMap): void {
    log().debug(`Slots: ${slots ? JSON.stringify(slots, undefined, 2) : "missing"}`);
}

/**
 * Return the version string from the package.json
 *
 * @param packageName - Optional package name within the node_modules to get the version of.  By default it returns the root level package.json version
 * @returns String that contains the version within the package.json file.
 * @public
 */
export function version(packageName?: string): string {
    const packageJson = packageName ? "node_modules/" + packageName + "/package.json" : "package.json";
    const json = JSON.parse(fs.readFileSync(packageJson, "utf8"));
    return json.version;
}

/**
 * Helper function to increment a count on the session storage for the provided key.
 * @param context - Context with session storage
 * @param key - Key to increment
 * @returns - The new updated value, 0 if context or session storage was undefined.
 */
export function incrementCount(context: Context, key: string): number {

    if (!context || !context.session) {
        return 0;
    }

    let value = context.session.get(key) || 0;
    value = value + 1;
    context.session.set(key, value);
    return value;
}
