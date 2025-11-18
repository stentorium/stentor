/*! Copyright (c) 2019, XAPPmedia */
import {
    DETECTION_CATCH_ALL,
    DETECTION_CATCH_ALL_WITH_EXCLUSION_REGEX,
    DETECTION_ID_ONLY_REGEX,
    DETECTION_INCLUDE_ONLY_REGEX
} from "./Constants";
import { KeyDescription } from "./KeyDescription";

/**
 * Describes the key in terms of what type of IDs it accepts.
 *
 * @param {string} key
 * @returns {KeyDescription}
 */
export function describeKey(key: string): KeyDescription {
    if (typeof key !== "string") {
        return { indescribable: true };
    }

    let description: KeyDescription = {};

    const idOnlyMatch = DETECTION_ID_ONLY_REGEX.exec(key);
    const catchAllMatch = DETECTION_CATCH_ALL.exec(key);
    const catchAllWithExclusionMatch = DETECTION_CATCH_ALL_WITH_EXCLUSION_REGEX.exec(key);
    const includeOnlyMatch = DETECTION_INCLUDE_ONLY_REGEX.exec(key);
    if (idOnlyMatch) {
        description = {
            intentId: key,
            includedIntentIds: [key],
            catchAll: false
        };
    } else if (catchAllMatch && !catchAllWithExclusionMatch) {
        description = {
            catchAll: true
        };
    } else if (catchAllWithExclusionMatch) {
        const ids = catchAllWithExclusionMatch[1].split("|");
        const excludedIntentIds: string[] = [];
        ids.forEach(id => excludedIntentIds.push(id.replace("^", "").replace(/\$/g, "")));
        description = {
            excludedIntentIds,
            catchAll: true
        };
    } else if (includeOnlyMatch) {
        const ids = includeOnlyMatch[1].split("|");
        const includedIntentIds: string[] = [];
        ids.forEach(id => includedIntentIds.push(id.replace("^", "").replace(/\$/g, "")));
        description = {
            catchAll: false,
            includedIntentIds
        };

        if (includedIntentIds.length === 1) {
            description.intentId = includedIntentIds[0];
        }
    } else {
        description = {
            indescribable: true
        };
    }

    return description;
}
