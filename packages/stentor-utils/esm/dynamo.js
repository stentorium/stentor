/*! Copyright (c) 2019, XAPPmedia */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import dynamoItemSize from "dyno-item-size";
/**
 * Estimate the size of the object for DynamoDB
 *
 * @see http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CapacityUnitCalculations.html
 *
 * @param {object} json
 */
export function estimateSize(json) {
    // Wrapping this function for Types
    // See https://github.com/mcwhittemore/dyno-item-size
    return dynamoItemSize(json);
}
//# sourceMappingURL=dynamo.js.map