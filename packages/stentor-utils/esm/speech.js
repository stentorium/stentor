/*! Copyright (c) 2019, XAPPmedia */
export var ListDelimiter;
(function (ListDelimiter) {
    ListDelimiter[ListDelimiter["or"] = 0] = "or";
    ListDelimiter[ListDelimiter["and"] = 1] = "and";
})(ListDelimiter || (ListDelimiter = {}));
/**
 * Builds a speakable and readable list from a set of items.
 *
 * For example, ["one", "two", "three", "four"] will be transformed
 * to "one, two, three or four".
 *
 * @param {string[]} items
 * @param {ListisizeDelimiter} [delimiter]
 */
export function listisize(items, preferredDelimiter = ListDelimiter.or) {
    const delimiter = ListDelimiter[preferredDelimiter];
    if (!items || items.length === 0) {
        return "";
    }
    else if (items.length === 1) {
        return items[0];
    }
    else if (items.length >= 2) {
        const secondToLast = items.length - 2;
        return items.reduce((current, item, currentIndex) => {
            current += item;
            if (currentIndex < secondToLast) {
                current += ", ";
            }
            else if (currentIndex === secondToLast) {
                current += ` ${delimiter} `;
            }
            return current;
        }, "");
    }
}
/**
 * From the provided sentence you return just the words in an array.
 *
 * All commas and other punctuation marks will be removed.
 *
 * @param {string} sentence
 * @returns {string[]}
 */
export function toWords(sentence) {
    let words = [];
    if (typeof sentence !== "string") {
        return words;
    }
    // Clean off punctuation
    // source: https://stackoverflow.com/a/4328722/1349766
    sentence = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    // Remove extra spaces
    sentence = sentence.replace(/\s{2,}/g, " ");
    // Then split by spaces
    words = sentence.split(" ");
    return words;
}
/**
 * Is the word the definite article "the"
 *
 * @param {string} word
 * @returns
 */
export function isDefiniteArticle(word) {
    return !!word && word.trim().toLowerCase() === "the";
}
/**
 * Is the word the indefinite article "a" or "an"
 *
 * @param {string} word
 * @returns
 */
export function isIndefiniteArticle(word) {
    if (typeof word !== "string") {
        return false;
    }
    const cleaned = word.trim().toLowerCase();
    return cleaned === "a" || cleaned === "an";
}
/*
 * Set of most common english prepositions
 */
export const PREPOSITIONS = [
    "about",
    "above",
    "across",
    "after",
    "against",
    "along",
    "among",
    "around",
    "at",
    "before",
    "behind",
    "between",
    "beyond",
    "by",
    "despite",
    "down",
    "during",
    "following",
    "for",
    "from",
    "in",
    "including",
    "into",
    "like",
    "near",
    "of",
    "on",
    "out",
    "over",
    "since",
    "through",
    "throughout",
    "to",
    "towards",
    "under",
    "until",
    "up",
    "upon",
    "with",
    "within",
    "without"
];
/**
 * Is the word an english preposition.
 *
 * NOTE: The list it checks against is not
 * exhaustive.
 *
 * @param {string} word
 * @returns {boolean}
 */
export function isPreposition(word) {
    if (typeof word !== "string") {
        return false;
    }
    const cleaned = word.trim().toLowerCase();
    return PREPOSITIONS.indexOf(cleaned) !== -1;
}
/**
 * Does the provided string contain numbers.
 *
 * @param {string} word
 * @returns {boolean}
 */
export function containsNumbers(word) {
    // From https://stackoverflow.com/a/28813213/1349766
    return /\d/.test(word);
}
/**
 * Does the provided string contain uppercase letters.
 *
 * @param word - Word to check
 * @returns True if the word contains uppercase letters, false if not
 */
export function containsUppercase(word) {
    return /[A-Z]/.test(word);
}
//# sourceMappingURL=speech.js.map