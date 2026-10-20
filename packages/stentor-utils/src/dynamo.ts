/*! Copyright (c) 2019, XAPPmedia */

/**
 * Size of one attribute value by DynamoDB's rules: strings their UTF-8 bytes, numbers one byte
 * per two significant digits plus one (at most 38 digits), binary its raw length, booleans and
 * null one byte, a list or map three bytes plus its contents (each map entry also counts its
 * attribute name's UTF-8 bytes). `undefined` is not stored, so it costs nothing.
 */
function sizeOf(value: unknown): number {
    if (typeof value === "string") {
        return Buffer.byteLength(value, "utf8");
    }
    if (typeof value === "number") {
        const digits = String(value)
            .replace(/e[+-]?\d+$/, "")
            .replace(/^-/, "")
            .replace(".", "")
            .replace(/^0+/, "")
            .replace(/0+$/, "");
        return Math.ceil(Math.min(digits.length, 38) / 2) + 1;
    }
    if (typeof value === "boolean" || value === null) {
        return 1;
    }
    if (Buffer.isBuffer(value)) {
        return value.length;
    }
    if (Array.isArray(value)) {
        return 3 + value.reduce<number>((sum, item) => sum + sizeOf(item), 0);
    }
    if (typeof value === "object") {
        const map = value as Record<string, unknown>;
        return 3 + Object.keys(map).reduce((sum, name) =>
            map[name] === undefined ? sum : sum + Buffer.byteLength(name, "utf8") + sizeOf(map[name]), 0);
    }
    return 0;
}

/**
 * Estimate the size of the object for DynamoDB, in bytes.
 *
 * @see http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CapacityUnitCalculations.html
 *
 * @param {object} json
 */
export function estimateSize(json: object): number {
    // The item itself is a map without the map's own three-byte overhead.
    return sizeOf(json) - 3;
}
