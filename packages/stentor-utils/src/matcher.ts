/*! Copyright (c) 2019, XAPPmedia */
import { RequestSlot, SlotTypeValue } from "stentor-models";
import * as Fuse from "fuse.js";

/**
 * Results returned by the fuzzy string matcher.
 *
 * @export
 * @interface MatchResult
 * @template T
 */
export interface MatchResult<T> extends Fuse.FuseResult<SlotTypeValue<T>> {}

/**
 * Match the request slot to the provided slot type values.
 *
 * Both synonym and value are used, whichever has the highest
 * score is returned.
 *
 * @export
 * @template T
 * @param {RequestSlot} slot
 * @param {SlotTypeValue<T>[]} slotTypeValues
 * @returns {(SlotTypeValue<T> | undefined)}
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

/**
 * Matches the utterance to the slot type.
 *
 * @export
 * @template T
 * @param {string} utterance
 * @param {SlotTypeValue<T>[]} slotTypeValues
 * @returns {(SlotTypeValue<T> | undefined)}
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
    const options: Fuse.FuseOptions<SlotTypeValue<T>> = {
        distance: 100,
        keys: ["name"],
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.5,
        includeScore: true
    };

    const fuse = new Fuse(slotTypeValues, options);
    const searchValue = `${utterance}`;
    const result = fuse.search(searchValue); // Literal here is to turn numbers to strings
    // @ts-ignore: Something is wrong with the types for fuse.js.  Output is good
    return result;
}
