/*! Copyright (c) 2019, XAPPmedia */
import { ResponseOutput } from "stentor-models";
import { concatSSML, concatText } from "stentor-utils";

/**
 * Options used when concatenating two ResponseOutputs
 *
 * @interface ConcatResponseOutputOptions
 */
export interface ConcatResponseOutputOptions {
    /**
     * Delimiter for combining text and SSML
     *
     * @type {string}
     * @memberof ConcatResponseOutputOptions
     */
    delimiter?: string;
}

/**
 * Concatenate two ResponseOutput objects.
 *
 * Note if neither parameters are passed then it returns undefined.
 *
 * @param {ResponseOutput} first
 * @param {ResponseOutput} second
 * @param {ConcatOptions} [options]
 * @returns {ResponseOutput}
 */
export function concatResponseOutput(
    first: ResponseOutput,
    second: ResponseOutput,
    options?: ConcatResponseOutputOptions
): ResponseOutput {
    // If either don't exist, return the other
    if (!second && first) {
        return first;
    } else if (!first && second) {
        return second;
    } else if (!first && !second) {
        return undefined;
    }

    // Do we have a delimiter?
    const delimiter = options ? options.delimiter : undefined;

    const output: ResponseOutput = {};

    const ssml = concatSSML(first.ssml, second.ssml, delimiter) || undefined;
    if (ssml) {
        output.ssml = ssml;
    }
    const textToSpeech = concatText(first.textToSpeech, second.textToSpeech, delimiter) || undefined;
    if (textToSpeech) {
        output.textToSpeech = textToSpeech;
    }
    const displayText = concatText(first.displayText, second.displayText, delimiter) || undefined;
    if (displayText) {
        output.displayText = displayText;
    }

    if (Array.isArray(second.suggestions) && second.suggestions.length > 0) {
        // If the first doesn't have suggestions, just use an empty array
        const firstSuggestions = Array.isArray(first.suggestions) ? first.suggestions : [];
        output.suggestions = firstSuggestions.concat(second.suggestions);
    } else {
        if (Array.isArray(first.suggestions)) {
            output.suggestions = first.suggestions;
        }
    }

    return output;
}
