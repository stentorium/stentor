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
    if (typeof text !== "string") {
        return [];
    }

    if (text.length === 0) {
        return [""];
    }

    // List of common abbreviations
    const abbreviations = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Sr.", "Jr.", "St.", "Mt.", "Ave.", "Rd.", "Blvd.", "Ph.D.", "PhD.", "M.D.", "D.D.S.", "D.V.M.", "D.P.A.", "Pharm.D.", "B.A.", "M.A.", "M.S.", "M.B.A.", "M.D.", "M.P.H.", "M.P.P.", "M.P.A.", "M.S.W.", "M.F.A.", "M.Div.", "M.Ed.", "M.S.Ed.", "M.S.N."];

    // Regular expression to match sentence end markers followed by a space or end of string
    const sentenceEndRegex = /([.!?])(\s{1,100}|$)/g;

    // Split the text based on the sentence end markers, keeping the punctuation marks separate
    const parts = text.trim().split(sentenceEndRegex);

    const sentences = [];
    let currentSentence = "";

    for (let i = 0; i < parts.length; i += 3) {

        currentSentence += parts[i]; // Add the text part

        let addedPunctuation = false;

        if (i + 1 < parts.length) {
            currentSentence += parts[i + 1]; // Add the punctuation mark
            addedPunctuation = true;
        }

        const trimmedSentence = currentSentence.trim();
        const lastWord = trimmedSentence.split(" ").pop();

        // Check if the last word plus punctuation is an abbreviation
        const possibleAbbreviation = addedPunctuation ? lastWord : lastWord + (parts[i + 1] || '');

        if (abbreviations.includes(possibleAbbreviation)) {
            currentSentence += parts[i + 2]; // Add the abbreviation
            continue; // If it is an abbreviation, continue without splitting
        } else {
            if (trimmedSentence.length > 0) {
                sentences.push(trimmedSentence); // Add the sentence to the array
            }
            currentSentence = ""; // Reset the current sentence for the next iteration
        }
    }

    // If there's any remaining part of the sentence that wasn't added, add it now
    if (currentSentence.trim().length > 0) {
        sentences.push(currentSentence.trim());
    }

    return sentences.filter(sentence => sentence.length > 0); // Ensure no empty strings are added
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
 * @returns Returns an array with the modified text in the first element and the last question sentence in the second element.  
 * If there isn't a question in the text the first element will be unmodified and the second element will not be provided.
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
        // remove the last sentence from the original text
        const modifiedText = text.trim().replace(lastSentence.trim(), "").trim();
        return [modifiedText, lastSentence];
    }

    return [text];
}