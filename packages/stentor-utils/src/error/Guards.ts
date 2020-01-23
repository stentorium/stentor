/*! Copyright (c) 2019, XAPPmedia */
import { LambdaError } from "./LambdaError";

/**
 * Is the Error a LambdaError, which has a statusCode.
 *
 * @export
 * @param {(LambdaError | Error)} error
 * @returns {error is LambdaError}
 */
export function isLambdaError(error: LambdaError | Error): error is LambdaError {
    return !!error && (<LambdaError>error).statusCode !== undefined;
}
