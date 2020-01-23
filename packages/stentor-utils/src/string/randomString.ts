/*! Copyright (c) 2019, XAPPmedia */
/**
 * Generates a random string of characters both upper and lowercase with numbers.
 *
 * @param {number} size Length of the string.  Can not be null.
 * @param {string} charset Optionally a subset of characters to pull from.
 */
export function randomString(size: number) {
    if (size < 0) {
        throw Error("Random string can not have a negative length.");
    }
    const useChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let full = "";
    for (let i = 0; i < size; ++i) {
        full += useChars.charAt(Math.floor(Math.random() * useChars.length));
    }
    return full;
}
