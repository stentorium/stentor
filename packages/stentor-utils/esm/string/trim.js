/*! Copyright (c) 2019, XAPPmedia */
/**
 * Trims all the strings in a string array.
 *
 * @param strings The strings to trim.
 * @param filter An optional filter to prevent strings strings from being added.
 */
export function trim(strings, filter) {
    if (filter) {
        return strings.reduce((last, now) => {
            const trimmed = now.trim();
            return filter(trimmed) ? last.concat(trimmed) : last;
        }, []);
    }
    else {
        return strings.map((s) => {
            return s.trim();
        });
    }
}
//# sourceMappingURL=trim.js.map