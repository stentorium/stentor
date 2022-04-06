/*! Copyright (c) 2019, XAPPmedia */
import { RequestSlot, SlotTypeValue } from "stentor-models";
// For the types
import Fuse from "fuse.js";
// To prevent the error Unhandled error TypeError: fuse_js_1.default is not a constructor
// Use this for the constructor
const FuseConstructor = require("fuse.js");

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
    const result = fuse.search(searchValue); // Literal here is to turn numbers to strings
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


