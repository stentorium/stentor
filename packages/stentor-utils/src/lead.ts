/*! Copyright (c) 2026, XAPP AI */
import type { LeadFormField } from "stentor-models";

/**
 * Contact-field resolution for a lead: "what is this lead's first name / phone / zip".
 *
 * This consolidates two implementations that used to live in the consumers - `getNames` /
 * `findValue` in stentor-api's lead listener, and `splitName` / `extractZip` / the phone
 * normalizer in `@xapp/contact-capture-handler`'s external booking strategy. They disagreed
 * with each other, so the move had to pick a behaviour. What was chosen, and why:
 *
 * 1. **Precedence** - an explicit `first_name` / `last_name` beats a `full_name` split. An
 *    explicitly captured field is better evidence than a heuristic split, and only the parts
 *    that are missing get filled in from the split. This is the *opposite* of the old
 *    stentor-api `getNames`, where the full name won.
 * 2. **Unresolvable values are `undefined`** - not the string `"N/A"` (old stentor-api) and not
 *    `""` (old contact-capture-handler). A sentinel that reads as a value leaks into payloads;
 *    each caller maps `undefined` to whatever its own output shape wants.
 * 3. **Internal whitespace is preserved** - a full name is split on the *first* whitespace only
 *    and the remainder is kept as-is, so `"Ada  van der Berg"` keeps its surname intact rather
 *    than being collapsed and rejoined.
 *
 * `fullName` follows from (1): when an explicit first or last name is present it is composed
 * from the resolved parts, otherwise the captured `full_name` is returned verbatim.
 *
 * Both input shapes are accepted - the `LeadFormField[]` of a lead and the plain
 * `Record<string, unknown>` of collected form data - because the two callers each have one.
 */

/** The two shapes a lead's contact fields arrive in. */
export type LeadFields = LeadFormField[] | Record<string, unknown>;

/** The names resolved off a lead. Any of them can be undefined. */
export interface LeadNames {
    firstName?: string;
    lastName?: string;
    fullName?: string;
}

/**
 * Field name aliases for the values we pull off a lead. Form field names are not
 * consistent across widgets and configurations (`phone` vs `phone_number`,
 * `full_name` vs `fullName`, ...) so every lookup goes through an alias list.
 *
 * These are shared so every path resolves a lead the same way. Matching is case insensitive.
 */
export const LEAD_FIELD_ALIASES = {
    firstName: ["firstname", "first_name"],
    lastName: ["lastname", "last_name"],
    fullName: ["fullname", "full_name"],
    phone: ["phone", "phonenumber", "phone_number"],
    email: ["email", "emailaddress", "email_address"],
    address: ["address", "address1", "address2", "street_address"],
    zip: ["zip", "zipcode", "zip_code", "postalcode", "postal_code"],
    company: ["company", "organization", "companyname", "company_name", "organizationname", "organization_name"],
    message: ["message", "note"]
} as const;

/** Coerces a captured value to a non-empty trimmed string, or undefined. */
function toValue(value: unknown): string | undefined {
    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : undefined;
    }
    if (typeof value === "number") {
        return String(value);
    }
    return undefined;
}

function matches(name: string, possibleKeys: readonly string[]): boolean {
    return possibleKeys.some((key) => key.toLocaleLowerCase() === name.toLocaleLowerCase());
}

/**
 * Returns the trimmed value of the first field matching any of the possible keys, or
 * undefined. Matching is case insensitive and blank values are treated as absent.
 */
export function findValue(possibleKeys: readonly string[], fields?: LeadFields): string | undefined {
    if (!fields) {
        return undefined;
    }

    if (Array.isArray(fields)) {
        for (const field of fields) {
            if (field?.name && matches(field.name, possibleKeys)) {
                const value = toValue(field.value);
                if (value) {
                    return value;
                }
            }
        }
        return undefined;
    }

    for (const name of Object.keys(fields)) {
        if (matches(name, possibleKeys)) {
            const value = toValue(fields[name]);
            if (value) {
                return value;
            }
        }
    }
    return undefined;
}

/**
 * Resolves the first, last and full name off a lead's fields, filling in whichever is
 * missing from whichever is present.
 *
 * An explicit first or last name wins over the `full_name` split; the split only supplies
 * the part that is missing. Anything unresolvable is undefined. See the module doc comment
 * for why.
 */
export function getNames(fields?: LeadFields): LeadNames {
    const explicitFirst = findValue(LEAD_FIELD_ALIASES.firstName, fields);
    const explicitLast = findValue(LEAD_FIELD_ALIASES.lastName, fields);
    const full = findValue(LEAD_FIELD_ALIASES.fullName, fields);

    let firstName = explicitFirst;
    let lastName = explicitLast;

    if (full && (!firstName || !lastName)) {
        // Split on the FIRST whitespace only, so a multi word surname survives intact.
        const firstSpace = full.search(/\s/);
        const head = firstSpace === -1 ? full : full.slice(0, firstSpace);
        const rest = firstSpace === -1 ? undefined : toValue(full.slice(firstSpace + 1));
        firstName = firstName || head;
        lastName = lastName || rest;
    }

    // The captured full name is only authoritative when nothing explicit overrode part of it.
    const composed = [firstName, lastName].filter((name) => !!name).join(" ");
    const fullName = (!explicitFirst && !explicitLast && full) ? full : (composed || undefined);

    return { firstName, lastName, fullName };
}

/**
 * Resolves the zip: an explicit zip field, otherwise the first five digit zip found in the
 * address.
 */
export function extractZip(fields?: LeadFields): string | undefined {
    const explicit = findValue(LEAD_FIELD_ALIASES.zip, fields);
    if (explicit) {
        return explicit;
    }

    const address = findValue(LEAD_FIELD_ALIASES.address, fields);
    const match = address ? address.match(/\b(\d{5})(?:-\d{4})?\b/) : undefined;
    return match ? match[1] : undefined;
}

/**
 * Normalizes a 10 digit phone to `NNN-NNN-NNNN`; anything else (already formatted,
 * international, partial) is passed through unchanged.
 */
export function normalizePhone(phone?: string): string | undefined {
    if (!phone) {
        return undefined;
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phone;
}
