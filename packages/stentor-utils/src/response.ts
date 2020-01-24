/*! Copyright (c) 2019, XAPPmedia */
import { ResponseOutput } from "stentor-models";
import { dessmlify, ssmlify } from "./ssml";

/**
 * Ensures that an outputSpeech or reprompt, either string or ResponseOutput,
 * is a ResponseOutput.
 *
 * @param input
 */
export function toResponseOutput(input: string | ResponseOutput): ResponseOutput {
    if (typeof input === "undefined") {
        return input;
    }

    let responseOutput: ResponseOutput;

    if (typeof input === "string") {
        responseOutput = {
            ssml: ssmlify(input),
            displayText: dessmlify(input)
        };
    } else if (typeof input === "object") {
        responseOutput = {
            ...input,
            ssml: ssmlify(input.ssml),
            displayText: dessmlify(input.displayText)
        };
    }

    return responseOutput;
}
