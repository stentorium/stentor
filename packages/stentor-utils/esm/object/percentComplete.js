/**
 * Checks for all falsey items that we allow.
 *
 * @param val
 */
function isAllowed(val) {
    if (!val) {
        // We like 'false' and '0'
        return val === 0 || val === false;
    }
    return true;
}
export function percentComplete(template, required, returnRemaining) {
    const denominator = required.length;
    const remaining = [];
    let count = 0;
    for (const requiredKey of required) {
        if (isAllowed(template[requiredKey])) {
            ++count;
        }
        else {
            remaining.push(requiredKey);
        }
    }
    const percentComplete = count / denominator;
    return returnRemaining ? { percentComplete, remaining } : percentComplete;
}
//# sourceMappingURL=percentComplete.js.map