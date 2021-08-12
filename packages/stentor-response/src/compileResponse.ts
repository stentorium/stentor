/*! Copyright (c) 2019, XAPPmedia */
import { localize } from "stentor-locales";
import { Context, Request, Response } from "stentor-models";
import { Compiler, MacroMap } from "stentor-utils";

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
 * @param response - Response to be compiled
 * @param request - Request to pull information from for compilation 
 * @param context - Context to pull information from for compilation
 * @param additionalContext - Additional, optional, context to pull information from for compilation
 */
export function compileResponse(
    response: Response,
    request: Request,
    context: Context,
    additionalContext?: object,
    macros?: MacroMap
): Response {
    // fast fail
    if (!response) {
        return response;
    }

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
                const valueCompiled = compileSegments(
                    responseOutput,
                    compiledResponse.segments,
                    request,
                    context
                );

                compiledResponse[key] = new Compiler(
                    {
                        macros,
                        additionalContext: additionalContext as Record<string, unknown>
                    }
                ).compile(valueCompiled, request, context);

            } else {
                // Flatten for locales
                const localizedResponseOutput = localize(responseOutput, request.locale);
                const valueCompiled = compileSegments(
                    localizedResponseOutput,
                    compiledResponse.segments,
                    request,
                    context
                );
                compiledResponse[key] = new Compiler(
                    {
                        macros,
                        additionalContext: additionalContext as Record<string, unknown>
                    }
                ).compile(valueCompiled, request, context);
            }
        }
    });

    // Displays!
    if (Array.isArray(compiledResponse.displays) && compiledResponse.displays.length > 0) {
        // First convert it to a string
        const displaysString = JSON.stringify(compiledResponse.displays, undefined, 2);
        // Compile the segments
        let compiledDisplayString = compileSegments(displaysString, compiledResponse.segments, request, context);
        compiledDisplayString = new Compiler(
            {
                macros,
                additionalContext: additionalContext as Record<string, unknown>
            }
        ).compile(compiledDisplayString, request, context);

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
