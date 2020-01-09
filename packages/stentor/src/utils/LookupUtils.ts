/* Copyright (c) 2019, XAPPmedia */
import { log } from "@xapp/logger";
import * as fs from "fs";

import { Context, RequestSlotMap } from "stentor-models";

/**
 * Debug help - print out the slots
 *
 * @param {RequestSlotMap} slots
 */
export function dumpSlots(slots: RequestSlotMap) {
    log().debug(`Slots: ${slots ? JSON.stringify(slots, undefined, 2) : "missing"}`);
}

/**
 * Return the version string
 *
 * @returns {string}
 */
export function version(packageName?: string): string {
    const packageJson = packageName ? "node_modules/" + packageName + "/package.json" : "package.json";
    const json = JSON.parse(fs.readFileSync(packageJson, "utf8"));
    return json.version;
}

export function incrementCount(context: Context, key: string): number {
    let value = context.session.get(key) || 0;
    value = value + 1;
    context.session.set(key, value);
    return value;
}
