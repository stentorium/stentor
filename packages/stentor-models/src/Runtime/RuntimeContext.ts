/*! Copyright (c) 2019, XAPPmedia */
import { AppRuntimeData } from "../App";
import { StudioContext } from "./StudioContext";

export interface RuntimeContext {
    /**
     * Context specific to One Voice AI
     * 
     * @deprecated Deprecated in favor of studio key.
     */
    ovai?: StudioContext;
    /**
     * Context specific to the setup within OC Studio
     */
    studio?: StudioContext;
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
     * @returns The remaining execution time of the function
     */
    getRemainingTimeInMillis?(): number;
    /**
     * Current environment
     */
    environment?: "dev" | "stage" | "prod" | "production" | string;
    /**
     * The request body as a string.
     *
     * This is extremely important when verifying the payload comes from Alexa.  It must
     * be exactly how it comes in.  It cannot be JSON.parsed then JSON.stringified as
     * the order is important for certification.
     */
    rawBody?: string;
    /**
     * Builds the response for the specific platform
     *
     * @param code
     * @param result
     */
    buildResponse?(code: number, result: object): object;
}
