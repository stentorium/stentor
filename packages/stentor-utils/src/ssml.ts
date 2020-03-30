/*! Copyright (c) 2019, XAPPmedia */

import { XmlElement } from "xmldoc";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xmldoc = require("xmldoc");

/**
 * Checks to see if the SSML is valid.
 *
 * @param response
 */
export function isValidSSML(response: string): boolean {
    if (!response) {
        return false;
    }

    let result = false;

    try {
        new xmldoc.XmlDocument(response);
    } catch (e) {
        result = true;
    }

    return result;
}

/**
 * Removes any invalid characters for SSML
 *
 * <p>
 * Note: This will need to be beefed up in the future.
 * </p>
 *
 * @see https://github.com/mandnyc/ssml-builder/blob/master/index.js#L257
 * @export
 * @param {string} outputSpeech
 * @returns {string}
 */
export function cleanInvalid(outputSpeech: string): string {
    if (outputSpeech && typeof outputSpeech === "string" && outputSpeech.indexOf("&") > 0) {
        outputSpeech = outputSpeech.replace(/\s?\&\s?/g, " and ");

        // if ssml, fix the audio sources (& signs for query params)
        if (outputSpeech.trim().startsWith("<speak>")) {
            try {
                // parse
                const document = new xmldoc.XmlDocument(outputSpeech);

                // undo the the " and " in the audio src attributes
                document.childrenNamed("audio").forEach((node: XmlElement) => {
                    node.attr.src = node.attr.src.replace(/ and /g, "&");
                });

                // get the string back and reset the normalized "&" chars (annoying!)
                outputSpeech = document
                    .toString({
                        preserveWhitespace: true,
                        compressed: true
                    })
                    .replace(/&amp;/g, "&");
            } catch (e) {
                console.error("Error while converting & sign in ssml", e);
            }
        }
    }

    return outputSpeech;
}

/**
 * Removes tags <speak> & </speak> from SSML
 *
 * @public
 * @param str - String to remove <speak> tags. 
 * @returns String without <speak> tags.
 */
export function dessmlify(str: string): string {
    // fast return
    if (!str) {
        return "";
    }

    // can only handle strings, they got a bug
    if (typeof str !== "string") {
        throw new Error("Invalid input passed to dessmlify");
    }

    // First trim leading & trailing spaces
    str = str.trim();
    // TODO: Replace below with regex
    str = str.replace("<speak>", "");
    str = str.replace("< speak>", "");
    str = str.replace("<speak >", "");
    str = str.replace("< speak >", "");
    str = str.replace("</speak>", "");
    str = str.replace("</ speak>", "");
    str = str.replace("</speak >", "");
    str = str.replace("</ speak >", "");

    return str;
}

/**
 * Ensures the speech is properly wrapped by <speak> tags.
 * The method is innocuous if they already exist
 *
 * @public
 * @param str - String to surround with <speak> tags
 * @returns String surrounded by <speak> tags
 */
export function ssmlify(str: string, clean = true): string {
    // fast return
    if (!str) {
        return "<speak></speak>";
    }

    // we can only handle strings, they got a bug
    if (typeof str !== "string") {
        throw new Error("Invalid input passed to ssmlify");
    }

    const SPEAK_START = 0;
    const SPEAK_END = 7;
    const SPEAK_LENGTH = 8;

    // first clean it
    if (clean) {
        str = cleanInvalid(str);
    }

    // trim leading and trailing spaces
    str = str.trim();

    if (str.substring(SPEAK_START, SPEAK_END) !== "<speak>") {
        str = "<speak>" + str;
    }

    if (str.substring(str.length - SPEAK_LENGTH, str.length) !== "</speak>") {
        str = str + "</speak>";
    }

    return str;
}

/**
 * Combine two strings in a smart way for TTS or display.
 *
 * @export
 * @param {string} one
 * @param {string} two
 * @param {string} [delimiter]
 * @returns {string}
 */
export function concatText(one: string, two: string, delimiter?: string): string {
    one = one ? one : "";
    two = two ? two : "";

    let spacing = " ";

    if (one.endsWith("!") || one.endsWith(".") || one.endsWith("?")) {
        // Two spaces
        spacing = "  ";
    }
    // Edge case, the ellipsis, one space
    if (one.endsWith("...") || one.endsWith(". . .")) {
        spacing = " ";
    }
    // However, if there is a custom delimiter, use that
    if (delimiter) {
        spacing = delimiter;
    }
    // Final, if either are an empty string, no space
    if (two.length === 0 || one.length === 0) {
        spacing = "";
    }
    // Combine the two texts, dessmlifing just in case
    return dessmlify(one) + spacing + dessmlify(two);
}

/**
 * Concat SSML in a smart way
 *
 * @export
 * @param {string} one
 * @param {string} two
 * @param {string} [delimiter]
 * @returns {string}
 */
export function concatSSML(one: string, two: string, delimiter?: string): string {
    return ssmlify(concatText(dessmlify(one), dessmlify(two), delimiter));
}

function removeTagWithContent(speech: string, tag: string): string {
    // Step 1
    const regex1 = new RegExp("(<" + tag + "([^>]+)>)", "ig"); //     /(<break([^>]+)>)/ig;
    speech = speech.replace(regex1, "");

    // Step 2
    const regex2 = new RegExp("(</" + tag + "([ ]*)>)", "ig"); //     /(<\/break([ ]*)>)/ig;
    speech = speech.replace(regex2, "");

    return speech;
}

export function removeTagsWithContent(speech: string, tags: string[]): string {
    if (!speech) {
        return speech;
    }

    tags.forEach(tag => {
        speech = removeTagWithContent(speech, tag);
    });

    return speech;
}


