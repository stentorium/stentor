export const SUPPORTED_DURATION_FORMATS = [
    "milliseconds",
    "seconds",
    "minutes",
    "hours",
    "days",
    "weeks",
    "months",
    "years",
];
function isValidAmount(value) {
    return typeof value === "number" && !isNaN(value) && value >= 0;
}
/**
 * Converts a duration and format into milliseconds.
 *
 * @param amount - The amount of time
 * @param format - The format of the time (e.g., "minutes", "hours")
 * @returns The duration in milliseconds
 */
export function getDurationMs(amount, format) {
    if (!isValidAmount(amount)) {
        throw new Error(`Invalid duration amount: ${amount}`);
    }
    switch (format) {
        case "millisecond":
        case "milliseconds":
        case "ms":
            return amount;
        case "second":
        case "seconds":
        case "s":
            return amount * 1000;
        case "minute":
        case "minutes":
        case "m":
            return amount * 60000;
        case "hour":
        case "hours":
        case "h":
            return amount * 3600000;
        case "day":
        case "days":
        case "d":
            return amount * 86400000;
        case "week":
        case "weeks":
        case "w":
            return amount * 604800000;
        case "month":
        case "months":
        case "M":
            return amount * 2592000000;
        case "quarter":
        case "quarters":
        case "Q":
            return amount * 7776000000;
        case "year":
        case "years":
        case "y":
            return amount * 31536000000;
        default:
            throw new Error(`Unsupported duration format: ${format}`);
    }
}
//# sourceMappingURL=getDurationMs.js.map