/**
 * Is the Error a LambdaError, which has a statusCode.
 *
 * @param {(LambdaError | Error)} error
 * @returns {error is LambdaError}
 */
export function isLambdaError(error) {
    return !!error && error.statusCode !== undefined;
}
//# sourceMappingURL=Guards.js.map