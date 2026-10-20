/*! Copyright (c) 2019, XAPPmedia */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as converter from "number-to-words";
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
 * @public
 * @param phoneNumber - Phone number to be cleaned for text to speech
 * @returns Cleaned phone number
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
 * @public
 * @param phoneNumber - Number to be masked
 * @returns The masked number, leaving the last four digits
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
 * @public
 * @param str The string containing phone numbers.
 * @param partial - Defaults to false. When true it keeps the last four digits of the number
 * @returns String with phone numbers masked.
 */
export function maskPhoneNumbers(str: string, partial = false): string {
    if (typeof str !== "string") {
        return undefined;
    }

    let cleanString: string = str;

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
 * Converts number to their word (en) equivalent.  For example,
 * 1 is converted to one and 55 if converted to fifty-five
 *
 * @public
 * @param num - Number to convert to it's word equivalent
 * @returns The word representation of the number provided such as "one" or "fifty-five"
 */
export function numberToWord(num: number): string | undefined {
    return typeof num === "number" ? converter.toWords(num) : num;
}

/**
 * Format numbers for display. The format is the subset of numeral's that this code base used
 * (numeral itself is gone): an optional leading `$`, `0,0` for thousands grouping, `.0`/`.00`
 * for the decimals shown (rounded), and an optional trailing `%` that multiplies by 100.
 * Anything not a finite number renders as 0, as numeral did.
 *
 * @param {number | string} number The number to format
 * @param {string} format The format, defaults to "0,0" (so 10000 -> "10,000")
 * @returns {string}
 */
export function formatNumberForDisplay(number: number | string, format = "0,0"): string {
    const prefix = format.startsWith("$") ? "$" : "";
    const percent = format.endsWith("%");
    const core = format.slice(prefix.length, percent ? -1 : undefined);
    const decimals = core.includes(".") ? core.length - core.indexOf(".") - 1 : 0;
    const grouped = core.includes(",");

    const parsed = typeof number === "number" ? number : Number(number);
    let value = Number.isFinite(parsed) ? parsed : 0;
    if (percent) {
        value *= 100;
    }
    // Round in decimal, not binary: 1.005 at two places is 1.01, which toFixed alone gets wrong.
    const rounded = Math.abs(Number(`${Math.round(Number(`${Math.abs(value)}e${decimals}`))}e-${decimals}`));
    const [whole, fraction] = rounded.toFixed(decimals).split(".");
    const digits = grouped ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : whole;
    const sign = value < 0 && rounded !== 0 ? "-" : "";
    return `${sign}${prefix}${digits}${fraction ? `.${fraction}` : ""}${percent ? "%" : ""}`;
}

/**
 * Converts a word like "one hundred" to the number 100.
 *
 * Words that are not numbers are passed through.
 *
 * @public
 * @param word - Word to convert to a number
 * @returns Returns either the original value or the number that was converted.
 */
export function wordToNumber(word: string): number | string {
    if (typeof word === "undefined") {
        return word;
    }

    return wordsToNumbers(word);
}

/**
 * Check to see if the provided parameter is a number.
 * 
 * "2" or 2 will return true.
 * 
 * Source {@link https://stackoverflow.com/a/42356340/1349766}
 * 
 * @param num - The value to check if it is numeric
 * @returns True if the value is numeric.
 */
export function isNumeric(num: any): boolean {
    num = '' + num; //coerce num to be a string
    return !isNaN(parseFloat(num)) && isFinite(num);
}
