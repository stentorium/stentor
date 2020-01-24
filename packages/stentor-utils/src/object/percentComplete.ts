/*! Copyright (c) 2019, XAPPmedia */
export type PercentComplete = number;
export interface PercentCompleteAndRemaining<T> {
    percentComplete: PercentComplete;
    remaining: (keyof T)[];
}

/**
 * Checks for all falsey items that we allow.
 * 
 * @param val
 */
function isAllowed(val: any): boolean {
    if (!val) {
        // We like 'false' and '0'
        return val === 0 || val === false;
    }
    return true;
}

/**
 * Calculates the percentage complete of the required parameters
 * for the given template.
 *
 * @export
 * @template T
 * @param {Partial<T>} template
 * @param {(keyof T)[]} required
 * @returns {number}
 */
export function percentComplete<T>(template: Partial<T>, required: (keyof T)[]): PercentComplete;
export function percentComplete<T>(
    template: Partial<T>,
    required: (keyof T)[],
    returnRemaining: true
): PercentCompleteAndRemaining<T>;
export function percentComplete<T>(
    template: Partial<T>,
    required: (keyof T)[],
    returnRemaining?: boolean
): PercentComplete | PercentCompleteAndRemaining<T> {
    const denominator = required.length;
    const remaining: (keyof T)[] = [];

    let count = 0;
    for (const requiredKey of required) {
        if (isAllowed(template[requiredKey])) {
            ++count;
        } else {
            remaining.push(requiredKey);
        }
    }

    const percentComplete: PercentComplete = count / denominator;
    return returnRemaining ? { percentComplete, remaining } : percentComplete;
}
