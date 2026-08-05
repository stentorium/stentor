import union from 'lodash.union';
import keys from 'lodash.keys';
import sumBy from 'lodash.sumby';
import Fuse from "fuse.js";
// Function to tokenize text
const tokenize = (text) => {
    return text.toLowerCase().match(/\b(\w+)\b/g) || [];
};
// Function to create a word frequency vector
const createVector = (tokens) => {
    const frequency = {}; // Add index signature
    tokens.forEach((token) => {
        if (!frequency[token]) {
            frequency[token] = 1;
        }
        else {
            frequency[token]++;
        }
    });
    return frequency;
};
// Function to calculate cosine similarity
const cosineSimilarity = (vec1, vec2) => {
    const uniqueWords = union(keys(vec1), keys(vec2));
    const dotProduct = uniqueWords.reduce((sum, word) => {
        return sum + (vec1[word] || 0) * (vec2[word] || 0);
    }, 0);
    const magnitudeA = Math.sqrt(sumBy(keys(vec1), (k) => Math.pow(vec1[k], 2)));
    const magnitudeB = Math.sqrt(sumBy(keys(vec2), (k) => Math.pow(vec2[k], 2)));
    return dotProduct / (magnitudeA * magnitudeB);
};
const computeStringSimilarity = (str1, str2) => {
    const vector1 = createVector(tokenize(str1));
    const vector2 = createVector(tokenize(str2));
    return cosineSimilarity(vector1, vector2);
};
// Define question words
const questionWords = ["who", "what", "where", "when", "why", "how"];
// Function to check if a query starts with a question word
const startsWithQuestionWord = (query) => {
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
const findAllSimilarFAQs = (query, faqQuestions, baseThreshold = 0.76) => {
    const similarQuestions = [];
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
export function findFuzzyMatch(find, from, options = {}) {
    let matches = [];
    if (!find) {
        return matches;
    }
    const fuseOptions = Object.assign({ distance: 100, location: 0, threshold: 0.3, minMatchCharLength: 1, shouldSort: true, includeScore: true }, options);
    const fuse = new Fuse(from, fuseOptions);
    const result = fuse.search(find); // Literal here is to turn numbers to strings
    matches = result.map((result) => {
        return from[result.refIndex];
    });
    // further filter if matches is an array of strings
    if (typeof matches[0] === "string" && matches.length > 0) {
        // findAllSimilarFAQs is looking for opposite number than what Fuse.js is looking for
        // in fuse, 0.0 is a perfect match and 1.0 is a bad match
        // in findAllSimilarFAQs, 0.0 is a bad match and 1.0 is a perfect match
        // so if a threshold is provided we need to flip it
        const similarThreshold = options.threshold ? 1 - options.threshold : undefined;
        matches = findAllSimilarFAQs(find, matches, similarThreshold);
    }
    return matches;
}
/**
 * Matches the utterance to the slot type.
 *
 * @public
 */
export function matchUtteranceToSlotTypeValue(utterance, slotTypeValues) {
    // Lets make sure the input is good
    if (typeof utterance !== "string" && typeof utterance !== "number") {
        return [];
    }
    // Options for fuzzy string matching
    const options = {
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
    const result = fuse.search(searchValue); // Literal here is to turn numbers to strings
    // @ts-ignore The types from Fuse are not 100%
    return result;
}
/**
 * Match the request slot to the provided slot type values.
 *
 * Both synonym and value are used, whichever has the highest
 * score is returned.
 *
 * @public
 */
export function matchRequestSlotToSlotTypeValue(slot, slotTypeValues) {
    if (!slot) {
        return undefined;
    }
    let potentialMatches = [];
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
    let highestMatch;
    potentialMatches.forEach(potentialMatch => {
        // it doesn't already exist, set it
        if (!highestMatch) {
            highestMatch = potentialMatch;
        }
        else if (highestMatch.score > potentialMatch.score) {
            // remember, lower is better, 0 is a perfect match
            highestMatch = potentialMatch;
        }
    });
    return highestMatch ? highestMatch.item : undefined;
}
//# sourceMappingURL=matcher.js.map