/*! Copyright (c) 2019, XAPPmedia */
import { Intent } from "stentor-models";
import { mergeSlots, MergeSlotsResult, mergeSlotTypeMaps } from "../Slot";
import { UtteranceGenerator } from "./UtteranceGenerator";

/**
 * Merge two arrays utterance patterns.
 */
export function mergeUtterancePatterns(
    primary: string[],
    secondary: string[],
    results: MergePatternsResults = {}
): string[] {
    // initial values
    results.totalAddedPatterns = 0;
    results.addedPatterns = [];
    results.totalOverlappedPatterns = 0;

    if (!primary && !secondary) {
        return undefined;
    }

    if (!primary) {
        results.totalAddedPatterns = secondary.length;
        return secondary;
    }

    let mergedPatterns: string[] = primary.slice();

    if (Array.isArray(secondary)) {
        const utteranceGenerator = new UtteranceGenerator();
        // Generate the utterances from the primary and look for the new ones on the secondary
        const primarySampleUtterances: string[] = utteranceGenerator.forPatterns(primary);

        secondary.forEach(utterancePattern => {
            // generate utterances for each pattern
            const patternSampleUtterances: string[] = utteranceGenerator.forPatterns([utterancePattern]);
            const addableSampleUtterances: string[] = [];

            patternSampleUtterances.forEach(sample => {
                if (primarySampleUtterances.indexOf(sample) === -1) {
                    addableSampleUtterances.push(sample);
                }
            });

            if (patternSampleUtterances.length === addableSampleUtterances.length) {
                // if same length just add the pattern
                mergedPatterns.push(utterancePattern);
                // add the result
                ++results.totalAddedPatterns;
                results.addedPatterns.push(utterancePattern);
            } else {
                // otherwise just add the addable ones
                mergedPatterns = mergedPatterns.concat(addableSampleUtterances);
                results.totalAddedPatterns += addableSampleUtterances.length;
                results.totalOverlappedPatterns += patternSampleUtterances.length - addableSampleUtterances.length;
                results.addedPatterns = results.addedPatterns.concat(addableSampleUtterances);
            }
        });
    }

    return mergedPatterns;
}

/**
 * Merge the properties of two intents.
 *
 * The first intent being the primary, and the second being the
 * secondary.  Values from the primary are preferred
 * over the secondary.
 */
export function mergeIntents(primary: Intent, secondary: Intent, results?: MergeIntentsResults): Intent {
    if (!primary && !secondary) {
        return undefined;
    }

    if (!primary) {
        return secondary;
    }

    // Make a copy, bringing in the fields from both
    // while also preferring the primary
    const newIntent: Intent = {
        ...secondary,
        ...primary
    };

    // Merge the patterns
    newIntent.utterancePatterns = mergeUtterancePatterns(
        primary.utterancePatterns,
        secondary.utterancePatterns,
        results
    );
    // Merge the slots
    newIntent.slots = mergeSlots(primary.slots, secondary.slots, results);
    // Merge the slot type maps
    newIntent.slotTypes = mergeSlotTypeMaps(primary.slotTypes, secondary.slotTypes);

    return newIntent;
}

export interface MergeModelsResults extends MergeIntentsResults {
    /**
     * The number of intents that were merged
     *
     * @type {number}
     * @memberof MergeModelsResults
     */
    mergedIntents?: number;
    /**
     * The number of new intents added from the primary to the secondary
     *
     * @type {number}
     * @memberof MergeModelsResults
     */
    addedIntents?: number;
}

/**
 * Merges two models (arrays of Intents).
 *
 * It looks for opportunities to merge based on a common intentId.
 *
 * @export
 * @param {Intent[]} primary
 * @param {Intent[]} secondary
 * @param {MergeModelsResults} [results={}]
 * @returns {Intent[]}
 */
export function mergeModels(primary: Intent[], secondary: Intent[], results: MergeModelsResults = {}): Intent[] {
    results.addedIntents = 0;
    results.mergedIntents = 0;

    if (!primary) {
        primary = [];
    }

    if (!secondary) {
        secondary = [];
    }

    // Make a map of the primary
    interface IntentMap {
        [intendId: string]: Intent;
    }
    const primaryMap: IntentMap = primary.reduce(
        (map, intent) => {
            return { ...map, [intent.intentId]: intent };
        },
        {} as IntentMap
    );

    const newIntents: Intent[] = [];

    secondary.forEach(intent => {
        const intentId = intent.intentId;
        if (primaryMap[intentId]) {
            primaryMap[intentId] = mergeIntents(primaryMap[intentId], intent, results);
            ++results.mergedIntents;
        } else {
            newIntents.push(intent);
            ++results.addedIntents;
        }
    });

    const existingIntents: Intent[] = [];

    Object.keys(primaryMap).forEach(key => {
        existingIntents.push(primaryMap[key]);
    });

    return existingIntents.concat(newIntents);
}

export interface MergeIntentsResults extends MergePatternsResults, MergeSlotsResult { }

export interface MergePatternsResults {
    /**
     * Number of patterns added to the primary from the seconday
     *
     * @type {number}
     * @memberof MergePatternsResults
     */
    totalAddedPatterns?: number;
    /**
     * List of of added patterns.
     *
     * @type {string[]}
     * @memberof MergePatternsResults
     */
    addedPatterns?: string[];
    /**
     * Number of patterns that overlapped and were ignored
     *
     * @type {number}
     * @memberof MergePatternsResults
     */
    totalOverlappedPatterns?: number;
}

