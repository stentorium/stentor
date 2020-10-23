/*! Copyright (c) 2019, XAPPmedia */

/**
 * Removes any duplicates from an array.
 *
 * This is a wrapper around lodash.uniq
 *
 * @param input
 */
export function uniq<T>(input: T[]): T[] {
    return [...new Set(input)];
}

/**
 * Removes any duplicates from an array.
 *
 * This is a wrapper around lodash.uniq.
 * @param input
 */
export function dedupe<T>(input: T[]): T[] {
    return uniq(input);
}

/**
 * Returns a random item from the given array.
 *
 * @export
 * @template T
 * @param {T[]} items
 * @returns {T}
 */
export function random<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

/**
 * Shuffles the contents of an array, returning a new array.
 *
 * @see https://bost.ocks.org/mike/shuffle/
 * @export
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffle<T>(array: T[]): T[] {
    let m = array.length;
    let t: T;
    let i: number;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

/**
 * Quick function to see if the array exists and has a length
 * greater than 0.
 *
 * You would use this instead of writing `myArray && myArray.length > 0`,
 * which increases your cyclomatic complexity.
 *
 * @export
 * @template T
 * @param {T[]} items
 * @returns {boolean}
 */
export function existsAndNotEmpty<T>(items: T[] | undefined): boolean {
    // Use isArray here to check for undefined and that it is an array
    // since strings are also have .length
    return Array.isArray(items) && items.length > 0;
}
