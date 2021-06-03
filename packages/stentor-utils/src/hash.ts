/*! Copyright (c) 2019, XAPPmedia */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const blueImpMd5 = require("blueimp-md5");

/**
 * Returns an md5 hash for the provided string.
 *
 * Leverages the blueimp-md5 package
 *
 * @param input String to be hashed
 */
export function md5(input: string): string {
    return blueImpMd5(input);
}

/**
 * Simple function to convert a string to a simple numeric hash.
 *
 * This has potential collisions, do not use as a unique key when the population is
 * large.
 *
 * @see https://stackoverflow.com/a/7616484/1349766
 *
 * @param {string} str
 * @returns {number}
 */
export function hashCode(str: string): number {
    let hash = 0;

    if (!str) {
        return hash;
    }

    let chr: number;
    let i: number;

    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        /* tslint:disable:no-bitwise */
        /* tslint:disable:no-magic-numbers */
        hash = (hash << 5) - hash + chr;
        hash = hash & hash; // Convert to 32bit integer
        /* tslint:enable:no-bitwise */
        /* tslint:enable:no-magic-numbers */
    }
    return hash;
}
