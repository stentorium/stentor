/*! Copyright (c) 2019, XAPPmedia */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dynamoItemSize = require("dyno-item-size");

/**
 * Estimate the size of the object for DynamoDB
 *
 * @see http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CapacityUnitCalculations.html
 *
 * @export
 * @param {object} json
 */
export function estimateSize(json: object): number {
    // Wrapping this function for Types
    // See https://github.com/mcwhittemore/dyno-item-size
    return dynamoItemSize(json);
}
