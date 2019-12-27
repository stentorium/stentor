/*! Copyright (c) 2019, XAPPmedia */
import { AppRuntimeData } from "../App";
import { OVAIContext } from "./OVAIContext";

export interface RuntimeContext {
    /**
     * Context specific to One Voice AI
     */
    ovai?: OVAIContext;
    /**
     * App data used at runtime.
     */
    appData?: AppRuntimeData;
    /**
     * The headers for the request
     */
    headers?: any;
    /**
     * Optional, for functions as a service, it gets the remaining execution time.
     *
     * @returns {number}
     * @memberof RuntimeContext
     */
    getRemainingTimeInMillis?(): number;
    /**
     * Current environment
     *
     * @type {("dev" | "stage" | "prod" | "production")}
     * @memberof RuntimeContext
     */
    environment?: "dev" | "stage" | "prod" | "production";
    /**
     * The request body as a string.
     *
     * This is extremely important when verifying the payload comes from Alexa.  It must
     * be exactly how it comes in.  It cannot be JSON.parsed then JSON.stringified as
     * the order is important for certification.
     *
     * @type {string}
     * @memberof RuntimeContext
     */
    rawBody?: string;
    /**
     * Builds the response for the specific platform
     *
     * @param {number} code
     * @param {object} result
     * @returns {object}
     * @memberof RuntimeEvent
     */
    buildResponse?(code: number, result: object): object;
}
