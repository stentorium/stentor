/*! Copyright (c) 2023, XAPP AI */

const stopWords = new Set([
    "a", "an", "and", "are", "as", "at", "be", "but", "by",
    "for", "if", "in", "into", "is", "it",
    "no", "not", "of", "on", "or", "such",
    "that", "the", "their", "then", "there", "these",
    "they", "this", "to", "was", "will", "with"
]);

function cleanString(input: string): string {
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const words = input.replace(regex, "").toLowerCase().split(/\s+/);
    const filteredWords = words.filter(word => !stopWords.has(word));
    return filteredWords.join(" ");
}

/**
 * Compares two strings for loose equality.  
 * 
 * It will clean punctuation, lowercase, and remove all stop words for both the strings and then compare them for equality.
 * 
 * It allows a string like "What is conversational AI" to equal "What are conversational AI?".
 * 
 * @param one 
 * @param two 
 * @returns True if the sentences are basically the same.
 */
export function compareStrings(one: string, two: string): boolean {

    const cleanOne = cleanString(one);
    const cleanTwo = cleanString(two);

    return cleanOne === cleanTwo;

}