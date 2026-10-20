/*! Copyright (c) 2019, XAPPmedia */

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

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALES = ["", "thousand", "million", "billion", "trillion", "quadrillion"];

/** 1-999 in words: "one hundred twenty-three", no "and". */
function hundredsToWords(n: number): string {
    const parts: string[] = [];
    if (n >= 100) {
        parts.push(`${ONES[Math.floor(n / 100)]} hundred`);
    }
    const rest = n % 100;
    if (rest >= 20) {
        parts.push(`${TENS[Math.floor(rest / 10)]}${rest % 10 ? `-${ONES[rest % 10]}` : ""}`);
    } else if (rest > 0) {
        parts.push(ONES[rest]);
    }
    return parts.join(" ");
}

/** `$0,0.00%` and its parts: optional $, 0 with optional ,0 grouping, optional .0+ decimals, optional %. */
const SUPPORTED_FORMAT = /^\$?0(,0)?(\.0+)?%?$/;

/**
 * Format numbers for display. The format is the subset of numeral's that this code base used
 * (numeral itself is gone): an optional leading `$`, `0,0` for thousands grouping, `.0`/`.00`
 * for the decimals shown (rounded), and an optional trailing `%` that multiplies by 100.
 * Anything not a finite number renders as 0, as numeral did. Any other format string throws:
 * numeral's optional decimals ("0.[00]"), abbreviations ("0.0a") and ordinals ("0o") are not
 * rendered, and misreading them silently would be worse than refusing them.
 *
 * @param {number | string} number The number to format
 * @param {string} format The format, defaults to "0,0" (so 10000 -> "10,000")
 * @returns {string}
 */
export function formatNumberForDisplay(number: number | string, format = "0,0"): string {
    // Only the subset below is rendered. Anything else (numeral's "0.[00]", "0.0a", "0o", ...)
    // would be misread silently, so it is refused instead.
    if (!SUPPORTED_FORMAT.test(format)) {
        throw new Error(`Unsupported number format "${format}": use $, 0,0, .0/.00 and % only`);
    }
    const prefix = format.startsWith("$") ? "$" : "";
    const percent = format.endsWith("%");
    const core = format.slice(prefix.length, percent ? -1 : undefined);
    const decimals = core.includes(".") ? core.length - core.indexOf(".") - 1 : 0;
    const grouped = core.includes(",");

    // numeral read its own output back ("1,234.5", "$1,234", "50%"), so a formatted string is
    // still accepted: grouping commas and a currency sign come off, a trailing % divides by 100.
    let parsed: number;
    if (typeof number === "number") {
        parsed = number;
    } else {
        const text = String(number ?? "").trim();
        const isPercent = text.endsWith("%");
        parsed = Number(text.replace(/[,$%]/g, ""));
        if (isPercent) {
            parsed /= 100;
        }
    }
    let value = Number.isFinite(parsed) ? parsed : 0;
    if (percent) {
        value *= 100;
    }
    // Rounded half away from zero at the shown decimals. toLocaleString never falls into
    // exponent form, which `${value}e${decimals}` string tricks and toFixed both do for 1e-7 or
    // 1e21, and it rounds the decimal digits rather than the binary ones (1.005 -> "1.01").
    const magnitude = Math.abs(value);
    const [whole, fraction = ""] = magnitude.toLocaleString("en-US", {
        useGrouping: false,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).split(".");
    const digits = grouped ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : whole;
    const roundsToZero = /^0*$/.test(whole) && /^0*$/.test(fraction);
    const sign = value < 0 && !roundsToZero ? "-" : "";
    return `${sign}${prefix}${digits}${fraction ? `.${fraction}` : ""}${percent ? "%" : ""}`;
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
    if (typeof num !== "number") {
        return num;
    }
    if (!Number.isFinite(num)) {
        throw new Error(`Not a finite number: ${num}`);
    }
    // Toward zero, as before: 2.2 is "two" and -2.7 is "minus two".
    const whole = Math.trunc(num);
    if (!Number.isSafeInteger(whole)) {
        throw new Error("Input is not a safe number, it is either too large or too small.");
    }
    if (whole === 0) {
        return "zero";
    }
    const groups: string[] = [];
    let remaining = Math.abs(whole);
    for (let scale = 0; remaining > 0; scale++) {
        const chunk = remaining % 1000;
        if (chunk > 0) {
            groups.unshift(`${hundredsToWords(chunk)}${SCALES[scale] ? ` ${SCALES[scale]}` : ""}`);
        }
        remaining = Math.floor(remaining / 1000);
    }
    return `${whole < 0 ? "minus " : ""}${groups.join(", ")}`;
}

const SMALL: Record<string, number> = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
    eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
    eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
    eighty: 80, ninety: 90,
    first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9,
    tenth: 10, eleventh: 11, twelfth: 12, thirteenth: 13, fourteenth: 14, fifteenth: 15, sixteenth: 16,
    seventeenth: 17, eighteenth: 18, nineteenth: 19, twentieth: 20, thirtieth: 30, fortieth: 40,
    fiftieth: 50, sixtieth: 60, seventieth: 70, eightieth: 80, ninetieth: 90,
};
const MAGNITUDE: Record<string, number> = {
    hundred: 100, hundredth: 100, thousand: 1e3, thousandth: 1e3, million: 1e6, millionth: 1e6,
    billion: 1e9, billionth: 1e9, trillion: 1e12, quadrillion: 1e15, quintillion: 1e18,
};
const CONNECTORS = new Set(["and", "point", "a"]);

/** A word that can start a number phrase. "a" and "point" only continue one ("a thousand"). */
function isNumberWord(w: string): boolean {
    return w in SMALL || w in MAGNITUDE;
}

/** "six million five thousand and two" -> 6005002; "one point five" -> 1.5. */
function phraseToNumber(words: string[]): number | undefined {
    const pointAt = words.indexOf("point");
    const wholeWords = pointAt >= 0 ? words.slice(0, pointAt) : words;
    const fractionWords = pointAt >= 0 ? words.slice(pointAt + 1) : [];
    let total = 0;
    let current = 0;
    let sawNumber = false;
    for (const w of wholeWords) {
        if (w === "and") {
            continue;
        }
        if (w === "a") {
            current = current || 1;
            continue;
        }
        if (w in SMALL) {
            current += SMALL[w];
            sawNumber = true;
        } else if (w in MAGNITUDE) {
            const m = MAGNITUDE[w];
            sawNumber = true;
            if (m === 100) {
                current = (current || 1) * 100;
            } else {
                total += (current || 1) * m;
                current = 0;
            }
        }
    }
    if (!sawNumber && fractionWords.length === 0) {
        return undefined;
    }
    let value = total + current;
    if (fractionWords.length > 0) {
        const digits = fractionWords.filter((w) => w in SMALL && SMALL[w] < 10).map((w) => SMALL[w]).join("");
        value = Number(`${value}.${digits || "0"}`);
    }
    return value;
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
    // Tokens keep their separators so a sentence can be rebuilt around the numbers found in it.
    const tokens = word.split(/(\s+|-|,)/).filter((t) => t !== "");
    const isSeparator = (t: string): boolean => /^(\s+|-|,)$/.test(t);
    const out: string[] = [];
    let phrase: string[] = [];
    let raw: string[] = [];
    let pending: string[] = [];
    const flush = (): void => {
        if (phrase.length === 0) {
            return;
        }
        const value = phraseToNumber(phrase);
        // A phrase of connectors only ("and") is not a number: put the words back as they were.
        out.push(value === undefined ? raw.join("") : String(value));
        phrase = [];
        raw = [];
    };
    const nextWord = (from: number): string | undefined => tokens.slice(from + 1).find((t) => !isSeparator(t))?.toLowerCase();
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (isSeparator(token)) {
            // A separator inside a phrase belongs to it only if another number word follows.
            if (phrase.length > 0) {
                pending.push(token);
            } else {
                out.push(token);
            }
            continue;
        }
        const lower = token.toLowerCase();
        // "a" opens a phrase only before a magnitude ("a thousand"), otherwise it is an article.
        const opensWithArticle = lower === "a" && phrase.length === 0 && (nextWord(i) ?? "") in MAGNITUDE;
        if (isNumberWord(lower) || opensWithArticle || (phrase.length > 0 && CONNECTORS.has(lower))) {
            if (phrase.length > 0) {
                raw.push(...pending);
            }
            pending = [];
            phrase.push(lower);
            raw.push(token);
            continue;
        }
        flush();
        out.push(...pending);
        pending = [];
        out.push(token);
    }
    flush();
    out.push(...pending);
    const joined = out.join("");
    const wholeInputIsNumber = tokens.every((t) => isSeparator(t) || isNumberWord(t.toLowerCase()) || CONNECTORS.has(t.toLowerCase()))
        && tokens.some((t) => isNumberWord(t.toLowerCase()))
        && out.filter((t) => !isSeparator(t)).length === 1;
    const asNumber = Number(joined.trim());
    return wholeInputIsNumber && Number.isFinite(asNumber) ? asNumber : joined;
}

