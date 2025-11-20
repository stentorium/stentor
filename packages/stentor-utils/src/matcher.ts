/*! Copyright (c) 2019, XAPPmedia */
import { RequestSlot, SlotTypeValue } from "stentor-models";

import union from 'lodash.union';
import keys from 'lodash.keys';
import sumBy from 'lodash.sumby';

import Fuse from "fuse.js";


// Function to tokenize text
const tokenize = (text: string): string[] => {
    return text.toLowerCase().match(/\b(\w+)\b/g) || [];
};

// Function to create a word frequency vector
const createVector = (tokens: string[]): { [key: string]: number } => {
    const frequency: { [key: string]: number } = {}; // Add index signature
    tokens.forEach((token) => {
        if (!frequency[token]) {
            frequency[token] = 1;
        } else {
            frequency[token]++;
        }
    });
    return frequency;
};

// Function to calculate cosine similarity
const cosineSimilarity = (vec1: Record<string, number>, vec2: Record<string, number>): number => {
    const uniqueWords = union(keys(vec1), keys(vec2));
    const dotProduct = uniqueWords.reduce((sum, word) => {
        return sum + (vec1[word] || 0) * (vec2[word] || 0);
    }, 0);

    const magnitudeA = Math.sqrt(sumBy(keys(vec1), (k) => Math.pow(vec1[k], 2)));
    const magnitudeB = Math.sqrt(sumBy(keys(vec2), (k) => Math.pow(vec2[k], 2)));

    return dotProduct / (magnitudeA * magnitudeB);
};

const computeStringSimilarity = (str1: string, str2: string): number => {
    const vector1 = createVector(tokenize(str1));
    const vector2 = createVector(tokenize(str2));

    return cosineSimilarity(vector1, vector2);
};

// Define question words
const questionWords = ["who", "what", "where", "when", "why", "how"];

// Function to check if a query starts with a question word
const startsWithQuestionWord = (query: string): boolean => {
    const firstWord = query.split(' ')[0].toLowerCase();
    return questionWords.includes(firstWord);
};

/**
 * Uses cosine similarity to find all similar FAQs.
 * 
 * In comparing similarity using cosine similarity, 0.0 is dissimilar and 1.0 is similar.
 * 
 * @param query 
 * @param faqQuestions 
 * @param baseThreshold 
 * @returns 
 */
const findAllSimilarFAQs = (query: string, faqQuestions: string[], baseThreshold = 0.76): string[] => {
    const similarQuestions: string[] = [];

    // Adjust threshold based on query type
    // if it does not start with a question word, lower the threshold
    // this lets "mayor of pawnee" match with "who is the mayor of pawnee"
    const threshold = startsWithQuestionWord(query) ? baseThreshold : baseThreshold * 0.8;

    faqQuestions.forEach(question => {
        const score = computeStringSimilarity(query, question);

        if (score >= threshold) {
            similarQuestions.push(question);
        }
    });

    return similarQuestions;
};


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
        threshold: 0.3,
        minMatchCharLength: 1,
        shouldSort: true,
        includeScore: true,
        ...options
    };

    const fuse = new Fuse(from, fuseOptions);
    const result: Fuse.FuseResult<T>[] = fuse.search(find); // Literal here is to turn numbers to strings

    matches = result.map((result) => {
        return from[result.refIndex];
    });

    // further filter if matches is an array of strings
    if (typeof matches[0] === "string" && matches.length > 0) {
        // findAllSimilarFAQs is looking for opposite number than what Fuse.js is looking for
        // in fuse, 0.0 is a perfect match and 1.0 is a bad match
        // in findAllSimilarFAQs, 0.0 is a bad match and 1.0 is a perfect match
        // so if a threshold is provided we need to flip it
        const similarThreshold: number | undefined = options.threshold ? 1 - options.threshold : undefined;
        matches = findAllSimilarFAQs(find, matches as string[], similarThreshold) as T[];
    }

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

    const fuse = new Fuse(slotTypeValues, options);
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




