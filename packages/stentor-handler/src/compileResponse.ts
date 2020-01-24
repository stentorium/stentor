/*! Copyright (c) 2019, XAPPmedia */
import { localize } from "@xapp/stentor-locales";
import { Context, Request, Response } from "stentor-models";
import { compileJSONPaths } from "./compileJSONPaths";
import { compileSegments } from "./compileSegments";

/**
 * Compiles a templated response with provided request and context.
 *
 * In order for the template to compile, it must contain ${} with
 * json paths within the mustaches.  For example, a string such as:
 *
 * "Hello ${ $.request.slots.NAME.value }"
 *
 * will be transformed to "Hello Bob" when passed an intent request
 * with a slot "NAME" and value "Bob"
 *
 * @export
 * @param {Response} response
 * @param {Request} request
 * @param {Context} context
 * @returns {Response}
 */
export function compileResponse(
    response: Response,
    request: Request,
    context: Context,
    additionalContext?: object
): Response {
    // fast fail
    if (!response) {
        return response;
    }

    // simple object to pass in for JSON path compilation
    // allows us to do $.request & $.context
    const object = { ...additionalContext, request, context };
    // Make a copy for manipulation
    const compiledResponse: Response = { ...response };
    // Make some type safe keys
    type ResponsesOnly = Pick<Response, "outputSpeech" | "reprompt" | "silencePrompt">;
    const keys: (keyof ResponsesOnly)[] = ["outputSpeech", "reprompt", "silencePrompt"];
    // Parse and update
    keys.forEach(key => {
        const responseOutput = compiledResponse[key];
        if (responseOutput) {
            if (typeof responseOutput === "string") {
                const valueWithCompiledSegments = compileSegments(
                    responseOutput,
                    compiledResponse.segments,
                    request,
                    context
                );
                compiledResponse[key] = compileJSONPaths(valueWithCompiledSegments, object);
            } else {
                // Flatten for locales
                const localizedResponseOutput = localize(responseOutput, request.locale);
                const valueWithCompiledSegments = compileSegments(
                    localizedResponseOutput,
                    compiledResponse.segments,
                    request,
                    context
                );
                compiledResponse[key] = compileJSONPaths(valueWithCompiledSegments, object);
            }
        }
    });

    // Displays!
    if (Array.isArray(compiledResponse.displays) && compiledResponse.displays.length > 0) {
        // First convert it to a string
        const displaysString = JSON.stringify(compiledResponse.displays, undefined, 2);
        // Compile the segments
        let compiledDisplayString = compileSegments(displaysString, compiledResponse.segments, request, context);
        // Compile the JSON
        compiledDisplayString = compileJSONPaths(compiledDisplayString, object);
        // Set it back
        try {
            const compiledDisplays = JSON.parse(compiledDisplayString);
            // Only update if it doesn't explode
            compiledResponse.displays = compiledDisplays;
        } catch (e) {
            console.info("Could not parse compiled displays");
        }
    }

    // return the result
    return compiledResponse;
}
