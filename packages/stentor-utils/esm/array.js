/*! Copyright (c) 2019, XAPPmedia */
/**
 * Removes any duplicates from an array.
 *
 * This is a wrapper around lodash.uniq
 *
 * @param input
 */
export function uniq(input) {
    return [...new Set(input)];
}
/**
 * Removes any duplicates from an array.
 *
 * This is a wrapper around lodash.uniq.
 * @param input
 */
export function dedupe(input) {
    return uniq(input);
}
/**
 * Returns a random item from the given array.
 *
 * @param {T[]} items
 * @returns {T}
 */
export function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}
/**
 * Shuffles the contents of an array, returning a new array.
 *
 * @see https://bost.ocks.org/mike/shuffle/
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffle(array) {
    let m = array.length;
    let t;
    let i;
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
 * @param {T[]} items
 * @returns {boolean}
 */
export function existsAndNotEmpty(items) {
    // Use isArray here to check for undefined and that it is an array
    // since strings are also have .length
    return Array.isArray(items) && items.length > 0;
}
/**
 * Combines two arrays, either of which can be undefined.  It always returns an array.
 *
 * @param one
 * @param two
 */
export function combine(one, two) {
    one = one || [];
    two = two || [];
    return [...one, ...two];
}
//# sourceMappingURL=array.js.map