/*! Copyright (c) 2019, XAPPmedia */
const MASK_CHAR = "*";

const EMAIL_REGEX = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/g;

/**
 * Partially masks a single email
 *
 * @param {string} email
 * @returns {string}
 */
export function maskEmail(email: string): string {
    if (typeof email !== "string") {
        return undefined;
    }

    const index = email.lastIndexOf("@");
    const prefix = email.substring(0, index);
    const postfix = email.substring(index);

    const mask = prefix
        .split("")
        .map((o, i) => {
            if (i === 0 || i === index - 1) {
                return o;
            } else {
                return MASK_CHAR;
            }
        })
        .join("");

    return mask + postfix;
}

/**
 * Masks emails within a given string.
 *
 * @param {string} s
 * @param {boolean} [partial=false] When true, some of the email remains
 * @returns {string}
 */
export function maskEmails(s: string, partial = false): string {
    if (typeof s !== "string") {
        return undefined;
    }

    let cleanString: string = s;

    const matches = cleanString.match(EMAIL_REGEX);

    if (matches) {
        matches.forEach((emailAddress: string) => {
            if (partial) {
                cleanString = cleanString.replace(emailAddress, maskEmail(emailAddress));
            } else {
                const cleanEmail = emailAddress.replace(/[A-Za-z0-9]/g, MASK_CHAR);
                cleanString = cleanString.replace(emailAddress, cleanEmail);
            }
        });
    }

    return cleanString;
}
