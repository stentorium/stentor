/*! Copyright (c) 2019, XAPPmedia */
const slugify = require("slugify");

/**
 * Generates an ID for an Intent.
 *
 * It follows our Intent ID convention that
 * does not have spaces and ends with `Intent`.
 *
 * @export
 * @param {string} name
 * @returns {string | undefined}
 */
export function generateIntentId(name: string): string | undefined {
    if (typeof name !== "string") {
        return undefined;
    }

    // Slugify will catch the non-standard characters
    const slug = slugify(name);

    // Split by capital letters in case it already is
    const split = slug.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1);
    const sentence = split.join(" ");
    // Split by non-word chars or underscore
    const words = sentence.toLowerCase().split(/[\W_]/);
    // Convert to Title Case
    const capitalized: string[] = [];
    for (const word of words) {
        capitalized.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    // Remove the spaces
    let pascalCase = capitalized.join("");

    // TODO: Trim length?
    // ThisIsAReallyLongNameWhereSomebodyIsUsingTheUtteranceAsTheIntent

    // Now we make sure it ends in "Intent"
    if (!pascalCase.endsWith("Intent")) {
        pascalCase += "Intent";
    }

    return pascalCase;
}
