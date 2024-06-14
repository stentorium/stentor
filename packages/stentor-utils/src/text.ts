/*! Copyright (c) 2024, XAPP AI */

/**
 * Splits a given text into sentences.
 * A sentence is considered to end with a period, exclamation mark, or question mark followed by a space or end of string.
 * 
 * If no sentences are found, an array with the original text is returned.
 * 
 * @param text - The input text to be split into sentences.
 * @returns An array of sentences.
 */
export function splitTextIntoSentences(text: string): string[] {

    if (!text && typeof text !== "string") {
        return [];
    }

    // Regular expression to match sentences ending with ., !, or ? followed by a space or end of string
    const sentenceRegex = /[^.!?]*[.!?]+(?:\s|$)/g;
    const sentences = text.match(sentenceRegex);

    // Return an empty array if no matches found
    return sentences ? sentences.map(sentence => sentence.trim()) : [text];
}

/**
 * Determines if a given sentence is a question.
 * A sentence is considered a question if it ends with a question mark.
 * 
 * @param sentence - The input sentence to be checked.
 * @returns True if the sentence is a question, false otherwise.
 */
export function isQuestion(sentence: string): boolean {

    if (!sentence) {
        return false;
    }

    // Trim any leading or trailing whitespace from the sentence
    const trimmedSentence = sentence.trim();
    // Check if the sentence ends with a question mark
    return trimmedSentence.endsWith("?");
}

/**
 * Removes the last sentence from the text if it is a question.
 * 
 * @param text - The input text from which the last question sentence will be removed.
 * @returns The modified text with the last question sentence removed, or the original text if the last sentence is not a question.
 */
export function popLastQuestion(text: string): [string, string?] {
    const sentences = splitTextIntoSentences(text);

    if (sentences.length === 0) {
        return [text];
    }

    if (sentences.length === 1) {
        if (isQuestion(sentences[0])) {
            return ["", sentences[0]];
        }
    }

    const lastSentence = sentences[sentences.length - 1];

    if (isQuestion(lastSentence)) {
        // remove the last sentence from the original text using a regular expression
        const modifiedText = text.replace(new RegExp(`${lastSentence}\\s*$`), "").trim();
        return [modifiedText, lastSentence];
    }

    return [text];
}