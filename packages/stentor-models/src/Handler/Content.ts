/*! Copyright (c) 2019, XAPPmedia */
import { Response } from "../Response";

/**
 * Base content map for the handler.
 *
 * All handlers have contextual help and cancel content
 */
export interface Content {
    /**
     * Used when the user says "cancel" or "exit"
     */
    CancelIntent?: Response[];
    /**
     * Used when the user asks for help, opportunity to provide contextual help based
     * on the current handler.
     */
    HelpIntent?: Response[];
    /**
     * All remaining content must be an array of string keys corresponding to an array of responses.
     */
    [key: string]: Response[] | undefined;
}
