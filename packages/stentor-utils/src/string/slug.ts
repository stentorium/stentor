/*! Copyright (c) 2019, XAPPmedia */

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
     * Locale used when transliterating. Accepted for compatibility; the transliteration is
     * locale independent.
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
 * What slugify spelled out, kept so a name slugged today lands where it did yesterday: appIds
 * and campaign slugs are minted from business names, and "L & J Construction" has to stay
 * "L-and-J-Construction". Symbols, currency, typographic punctuation, and the Latin letters that
 * Unicode decomposition cannot reduce to ASCII (ß, æ, ø, ł, þ, ...). Accented Latin letters need
 * no entry: NFKD decomposition plus dropping the combining marks handles them.
 */
const SPELLED_OUT: Record<string, string> = {
    "$": "dollar", "%": "percent", "&": "and", "<": "less", ">": "greater", "|": "or",
    "¢": "cent", "£": "pound", "¤": "currency", "¥": "yen", "©": "(c)", "®": "(r)",
    "€": "euro", "₹": "indian rupee", "₽": "russian ruble", "₺": "turkish lira", "₿": "bitcoin",
    "₩": "won", "₫": "dong", "₱": "peso", "₦": "naira", "฿": "baht", "元": "yuan", "円": "yen",
    "™": "tm", "℠": "sm", "∑": "sum", "∞": "infinity", "♥": "love", "∂": "d", "∆": "delta",
    "–": "-", "—": "-", "‘": "'", "’": "'", "“": "\"", "”": "\"", "„": "\"", "†": "+", "•": "*", "…": "...",
    "ß": "ss", "ẞ": "SS", "æ": "ae", "Æ": "AE", "œ": "oe", "Œ": "OE", "ø": "o", "Ø": "O",
    "ð": "d", "Ð": "D", "þ": "th", "Þ": "TH", "đ": "d", "Đ": "D", "ł": "l", "Ł": "L", "ı": "i",
    "ħ": "h", "Ħ": "H", "ŧ": "t", "Ŧ": "T", "ŋ": "ng", "Ŋ": "NG", "ĸ": "k", "ſ": "s", "ƒ": "f",
    "ǆ": "dz", "Ǆ": "DZ", "ǉ": "lj", "Ǉ": "LJ", "ǌ": "nj", "Ǌ": "NJ", "ǳ": "dz", "Ǳ": "DZ",
};

/** The characters slugify let through untouched; everything else is dropped. */
const DEFAULT_REMOVE = /[^\w\s$*_+~.()'"!\-:@]+/g;

const ASCII_WORD = /^[A-Za-z0-9]+$/;

/**
 * One character of the input as ASCII, or itself when there is no sensible ASCII for it.
 */
function toAscii(ch: string): string {
    const spelled = SPELLED_OUT[ch];
    if (spelled !== undefined) {
        return spelled;
    }
    // Decompose, drop the combining marks, keep the result only when it is plain letters/digits:
    // "é" -> "e", but "½" must not become "1⁄2".
    const stripped = ch.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
    return stripped !== ch && ASCII_WORD.test(stripped) ? stripped : ch;
}

/**
 * Converts a value into a URL safe slug.
 *
 * This is the single place the slug implementation lives. It used to wrap the `slugify`
 * package and keeps its rules: symbols are spelled out ("&" -> "and"), accents are dropped,
 * the characters it allowed through are allowed through, and spaces become the replacement.
 *
 * It throws on a non string value, which is what the call sites rely on to surface bad input.
 *
 * @param {string} value The value to convert.
 * @param {SlugProps} options The slug options.  If it is a string, it is used as the replacement.
 * @returns {string}
 */
export function slug(value: string, options?: SlugProps): string {
    if (typeof value !== "string") {
        throw new Error("slug: string argument expected");
    }
    const opts: SlugOptions = typeof options === "string" ? { replacement: options } : options || {};
    const replacement = opts.replacement === undefined ? "-" : opts.replacement;
    const trim = opts.trim === undefined ? true : opts.trim;
    const remove = opts.remove || DEFAULT_REMOVE;

    // Character by character, as slugify did, so a caller's `remove` pattern sees each mapped
    // chunk on its own. A character that maps to the replacement reads as a space so it joins
    // the separator run instead of doubling it.
    let result = "";
    for (const ch of value.normalize()) {
        const mapped = toAscii(ch);
        result += (mapped === replacement ? " " : mapped).replace(remove, "");
    }
    if (opts.strict) {
        result = result.replace(/[^A-Za-z0-9\s]/g, "");
    }
    if (trim) {
        result = result.trim();
    }
    result = result.replace(/\s+/g, replacement);
    return opts.lower ? result.toLowerCase() : result;
}
