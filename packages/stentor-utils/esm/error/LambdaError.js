/*! Copyright (c) 2019, XAPPmedia */
import { HTTP_500_INTERNAL_SERVICE_ERROR } from "stentor-constants";
/**
 * An Error that allows for a status code to be stored.  By default the status code is 500.
 */
export class LambdaError extends Error {
    /**
     * Creates an instance of LambdaError.
     *
     * @param {(string | Error | LambdaError)} message Error message to pass.
     * @param {number} [statusCode] The status code linked to the error message. Default is 500.
     */
    constructor(message, statusCode) {
        super(typeof message === "string" ? message : message.message);
        this.statusCode = message.statusCode || statusCode || HTTP_500_INTERNAL_SERVICE_ERROR;
    }
}
//# sourceMappingURL=LambdaError.js.map