/*! Copyright (c) 2019, XAPPmedia */
import { RequestSlot, SlotTypeValue } from "stentor-models";
// For the types
import Fuse from "fuse.js";
// To prevent the error Unhandled error TypeError: fuse_js_1.default is not a constructor
// Use this for the constructor
const FuseConstructor = require("fuse.js");


export interface FuzzyMatchOptions {
    /**
     * If you pass in an array of objects, match within the provided keys.
     */
    keys?: (string)[];
    /**
     * Only match to those with length that exceeds this value.
     * 
     * {@see https://fusejs.io/api/options.html#minmatchcharlength}
     */
    minMatchCharLength?: number;
    /**
     * Should comparisons be case sensitive.
     * 
     * {@see https://fusejs.io/api/options.html#iscasesensitive}
     */
    isCaseSensitive?: boolean;
    /**
     * At which point the results are ignored, a number between 0.0 and 1.0.  0.0 is a perfect match
     * 
     * {@see https://fusejs.io/api/options.html#threshold}
     */
    threshold?: number;
}

/**
 * From the provided string, find the closest match from the items provided.
 * 
 * This is a simple wrapper around [Fuse.js](https://fusejs.io)
 * 
 * @param find - The query to find a match from
 * @param from 
 * @param options 
 * @returns 
 */
export function findFuzzyMatch<T = string | Record<string, unknown>>(find: string, from: T[], options: FuzzyMatchOptions = {}): T[] {

    let matches: T[] = [];

    if (!find) {
        return matches;
    }

    const fuseOptions: Fuse.IFuseOptions<T> = {
        distance: 100,
        location: 0,
        minMatchCharLength: 1,
        shouldSort: true,
        includeScore: true,
        ...options
    };

    const fuse = new FuseConstructor(from, fuseOptions);
    const result: Fuse.FuseResult<T>[] = fuse.search(find); // Literal here is to turn numbers to strings

    matches = result.map((result) => {
        return from[result.refIndex];
    });

    return matches;
}

/**
 * Matches the utterance to the slot type.
 * 
 * @public
 */
export function matchUtteranceToSlotTypeValue<T>(
    utterance: string | number,
    slotTypeValues: SlotTypeValue<T>[]
): MatchResult<T>[] {
    // Lets make sure the input is good
    if (typeof utterance !== "string" && typeof utterance !== "number") {
        return [];
    }

    // Options for fuzzy string matching
    const options: Fuse.IFuseOptions<SlotTypeValue<T>> = {
        distance: 100,
        keys: ["name"],
        location: 0,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.5,
        includeScore: true
    };

    const fuse = new FuseConstructor(slotTypeValues, options);
    const searchValue = `${utterance}`;
    const result: Fuse.FuseResult<SlotTypeValue<T>>[] = fuse.search(searchValue); // Literal here is to turn numbers to strings
    // @ts-ignore The types from Fuse are not 100%
    return result;
}

/**
 * Results returned by the fuzzy string matcher.
 *
 * @public
 */
export interface MatchResult<T> extends Fuse.FuseResult<SlotTypeValue<T>> { }

/**
 * Match the request slot to the provided slot type values.
 *
 * Both synonym and value are used, whichever has the highest
 * score is returned.
 *
 * @public
 */
export function matchRequestSlotToSlotTypeValue<T>(
    slot: RequestSlot,
    slotTypeValues: SlotTypeValue<T>[]
): SlotTypeValue<T> | undefined {
    if (!slot) {
        return undefined;
    }

    let potentialMatches: MatchResult<T>[] = [];

    // The order of preference here is canonical value
    const value = slot.value;
    if (typeof value === "string") {
        const valueMatches = matchUtteranceToSlotTypeValue(value, slotTypeValues);
        if (valueMatches.length > 0) {
            potentialMatches = potentialMatches.concat(valueMatches);
        }
    }

    // Then raw value
    const rawValue = slot.rawValue;
    if (rawValue) {
        const rawValueMatches = matchUtteranceToSlotTypeValue(rawValue, slotTypeValues);
        if (rawValueMatches.length > 0) {
            potentialMatches = potentialMatches.concat(rawValueMatches);
        }
    }

    // Now find the highest match!
    let highestMatch: MatchResult<T>;

    potentialMatches.forEach(potentialMatch => {
        // it doesn't already exist, set it
        if (!highestMatch) {
            highestMatch = potentialMatch;
        } else if (highestMatch.score > potentialMatch.score) {
            // remember, lower is better, 0 is a perfect match
            highestMatch = potentialMatch;
        }
    });

    return highestMatch ? highestMatch.item : undefined;
}




