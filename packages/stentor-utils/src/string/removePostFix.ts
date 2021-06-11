/*! Copyright (c) 2021, XAPPmedia */

/**
 * Removes a postfix from a string if it exists.  If the postfix does not exist then 
 * the string is passed through unedited.
 * 
 * For example, when passed "foo" and post fix "_bar", "foo" will be returned.  
 * If you pass "foo_bar" and "_bar" then "_bar" will be removed and "foo" will be returned.
 * 
 * @param original 
 * @param postFix 
 * @returns 
 */
export function removePostFix(original: string, postFix: string): string {
    if (original && original.endsWith(postFix)) {
        return original.slice(0, original.indexOf(postFix));
    } else {
        return original;
    }
}
