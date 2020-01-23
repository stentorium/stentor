/*! Copyright (c) 2019, XAPPmedia */
const converter = require("number-to-words");
import * as numeral from "numeral";
import wordsToNumbers from "words-to-numbers";

const US_PHONE_NUMBER_LENGTH = 10;

const PHONE_LEN1 = 3;
const PHONE_POS2 = 3;
const PHONE_LEN2 = 3;
const PHONE_POS3 = 6;

/**
 * Number of chars to leave readable and the mask
 */
const MASK_CLEAR_LENGTH = 4;
const MASK_CHAR = "#";

// https://stackoverflow.com/questions/39418130/determine-if-string-has-phone-number-in-js
const PHONE_REGEX = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g;

/**
 * Sanitizes a phone number for text to speech.
 *
 * @export
 * @param {string} phoneNumber
 * @returns {string}
 */
export function sanitizePhoneNumber(phoneNumber: string): string {
    if (typeof phoneNumber !== "string") {
        return undefined;
    }

    let standardNo = phoneNumber.trim().replace(/[^\d]/g, "");

    // Remove 1 for US
    if (standardNo.length === US_PHONE_NUMBER_LENGTH + 1 && standardNo.startsWith("1")) {
        standardNo = standardNo.substr(1);
    }

    if (standardNo.length === US_PHONE_NUMBER_LENGTH) {
        // With dashes in it it reads as a phone number on both alexa and google (no ssml trickery required)
        standardNo =
            standardNo.substr(0, PHONE_LEN1) +
            "-" +
            standardNo.substr(PHONE_POS2, PHONE_LEN2) +
            "-" +
            standardNo.substr(PHONE_POS3);

        return standardNo;
    }

    return undefined;
}

/**
 * Takes a string with a phone number, sanitizes and masks it while leaving
 * the last four digits legible.
 *
 * For example:
 *   888-8888 -> XXX-8888
 *   (704) 444 1234 -> XXX-XXX-1234
 *
 * @export
 * @param {string} phoneNumber
 * @returns {string}
 */
export function maskNumber(phoneNumber: string): string {
    if (typeof phoneNumber !== "string") {
        return undefined;
    }

    let standardNo = phoneNumber.trim().replace(/[^\d]/g, "");

    // Remove 1 for US
    if (standardNo.length === US_PHONE_NUMBER_LENGTH + 1 && standardNo.startsWith("1")) {
        standardNo = standardNo.substr(1);
    }

    // At this point it should be 10 digits with area code (US)

    // Mask it keeping MASK_CLEAR_LENGTH
    standardNo = standardNo.replace(new RegExp(`.(?=.{${MASK_CLEAR_LENGTH},}$)`, "g"), MASK_CHAR);

    // Add dashes if correct size
    if (standardNo.length === US_PHONE_NUMBER_LENGTH) {
        standardNo =
            standardNo.substr(0, PHONE_LEN1) +
            "-" +
            standardNo.substr(PHONE_POS2, PHONE_LEN2) +
            "-" +
            standardNo.substr(PHONE_POS3);
    }

    return standardNo;
}

/**
 * Detects the phone numbers within a string and masks the numbers
 * with #s, preserving the formatting.
 *
 * @export
 * @param {string} s
 * @param {boolean} [partial=false] When true it keeps the last four digits of the number
 * @returns {string}
 */
export function maskPhoneNumbers(s: string, partial: boolean = false): string {
    if (typeof s !== "string") {
        return undefined;
    }

    let cleanString: string = s;

    const matches = cleanString.match(PHONE_REGEX);

    if (matches) {
        matches.forEach((match: string) => {
            if (partial) {
                // Partial preserves the last 4
                const lastFour = match.substr(match.length - MASK_CLEAR_LENGTH, match.length - 1);
                const cleanMatched = match.replace(/[0-9]/g, "#").slice(0, match.length - MASK_CLEAR_LENGTH) + lastFour;
                cleanString = cleanString.replace(match, cleanMatched);
            } else {
                const cleanMatched = match.replace(/[0-9]/g, "#");
                cleanString = cleanString.replace(match, cleanMatched);
            }
        });
    }

    return cleanString;
}

/**
 * Converts number to their word (en) equivalent
 *
 * @export
 * @param {number} n
 * @returns {string}
 */
export function numberToWord(n: number): string | undefined {
    return typeof n === "number" ? converter.toWords(n) : n;
}

/**
 * Format numbers for display.  This is a thin wrapper around http://numeraljs.com/
 *
 * Default format is "0,0" which turns 1000 to 1,000.  More
 * formats can be found http://numeraljs.com/#format
 *
 * @export
 * @param {number} n
 * @param {string} [format="0,0"]
 * @returns {string}
 */
export function formatNumberForDisplay(n: number | string, format: string = "0,0"): string {
    return numeral(n).format(format);
}

/**
 * Converts a word like "one hundred" to the number 100.
 *
 * Words that are not numbers are passed through.
 *
 * @export
 * @param {string} word
 * @returns {(number | string)}
 */
export function wordToNumber(word: string): number | string {
    if (typeof word === "undefined") {
        return word;
    }

    return wordsToNumbers(word);
}
