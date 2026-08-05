/*! Copyright (c) 2019, XAPPmedia */
import slugify from "slugify";

/**
 * Options for {@link slug}.
 */
export interface SlugOptions {
    /**
     * Character that spaces are replaced with.  Defaults to `-`.
     */
    replacement?: string;
    /**
     * Characters matched by this are removed from the slug.
     */
    remove?: RegExp;
    /**
     * Lowercase the slug.
     */
    lower?: boolean;
    /**
     * Strip everything that is not alphanumeric or the replacement.
     */
    strict?: boolean;
    /**
     * Locale used when transliterating.
     */
    locale?: string;
    /**
     * Trim leading and trailing replacement characters.  Defaults to true.
     */
    trim?: boolean;
}

/**
 * Options for {@link slug}.  A string is shorthand for `{ replacement: <string> }`.
 */
export type SlugProps = SlugOptions | string;

/**
 * Converts a value into a URL safe slug.
 *
 * This is the single place the slug implementation lives - use it instead of depending on
 * `slugify` directly so a change in the underlying library is one edit rather than nine.
 *
 * It throws on a non string value, which is what the call sites rely on to surface bad input.
 *
 * @param {string} value The value to convert.
 * @param {SlugProps} options The slug options.  If it is a string, it is used as the replacement.
 * @returns {string}
 */
export function slug(value: string, options?: SlugProps): string {
    return slugify(value, options);
}
