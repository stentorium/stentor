/*! Copyright (c) 2019, XAPPmedia */
import { existsAndNotEmpty } from "stentor-utils";
import { CATCH_ALL_REGEX } from "./Constants";
import { KeyDescription } from "./KeyDescription";

/**
 * Generate a key from the provided key description.
 *
 * @export
 * @param {KeyDescription} description
 * @returns {string}
 */
export function generateKey(description: KeyDescription): string {
    let key: string;

    if (typeof description !== "object") {
        return key;
    }

    if (description.catchAll && !existsAndNotEmpty(description.includedIntentIds) && !description.intentId) {
        key = CATCH_ALL_REGEX.source;
        if (existsAndNotEmpty(description.excludedIntentIds)) {
            const exclude = description.excludedIntentIds.reduce((previous, current, index) => {
                const pipe = index !== 0 ? "|" : "";
                return (previous += `${pipe}^${current}$`);
            }, "");
            key = `^(?!(${exclude})).*$`;
        }
    } else if (existsAndNotEmpty(description.includedIntentIds) && !description.catchAll) {
        if (description.includedIntentIds.length === 1) {
            key = description.includedIntentIds[0];
        } else {
            key = description.includedIntentIds.reduce((previous, current, index) => {
                const pipe = index !== 0 ? "|" : "";
                return (previous += `${pipe}^${current}$`);
            }, "");
        }
    } else if (description.intentId && !description.catchAll && !existsAndNotEmpty(description.excludedIntentIds)) {
        key = description.intentId;
    }
    return key;
}
