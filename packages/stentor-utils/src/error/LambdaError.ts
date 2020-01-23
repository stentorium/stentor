/*! Copyright (c) 2019, XAPPmedia */
import { HTTP_500_INTERNAL_SERVICE_ERROR } from "stentor-constants";

/**
 * An Error that allows for a status code to be stored.  By default the status code is 500.
 *
 * Note: This was taken from stentor-api https://github.com/XappMedia/stentor-api/blob/eafa58834fb42b5c8b72c2dd615c99d68a774157/src/main/shared/utils/ServerUtils.ts#L47
 *
 * @export
 * @class LambdaError
 * @extends {Error}
 */
export class LambdaError extends Error {
    statusCode?: number;

    /**
     * Creates an instance of LambdaError.
     *
     * @param {(string | Error | LambdaError)} message Error message to pass.
     * @param {number} [statusCode] The status code linked to the error message. Default is 500.
     * @memberof LambdaError
     */
    constructor(message: string | Error | LambdaError, statusCode?: number) {
        super(typeof message === "string" ? message : message.message);
        this.statusCode = (<LambdaError>message).statusCode || statusCode || HTTP_500_INTERNAL_SERVICE_ERROR;
    }
}
