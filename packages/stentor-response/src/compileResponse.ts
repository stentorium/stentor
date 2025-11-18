/*! Copyright (c) 2019, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { isTemplatedList } from "stentor-guards";
import { localize } from "stentor-locales";
import { log } from "stentor-logger";
import { Context, Request, Response } from "stentor-models";
import { Compiler, DEFAULT_MARCOS, existsAndNotEmpty, getJSONPath, MacroMap } from "stentor-utils";

import { compileSegments } from "./compileSegments";

/**
 * Necessary to JSON.parse strings with newlines that need escaping.  Otherwise JSON.parse fails.
 * @param json 
 * @returns 
 */
export function jsonEscape(json: string): string {
    return json.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}

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
    additionalContext?: Record<string, unknown>,
    macros?: MacroMap
): Response {
    // fast fail
    if (!response) {
        return response;
    }

    const compiler = new Compiler(
        {
            macros: { ...DEFAULT_MARCOS, ...macros },
            additionalContext,
            replaceWhenUndefined: true
        }
    );

    // Make a copy for manipulation
    // We need to figure out how to do a deep copy
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
                compiledResponse[key] = compiler.compile(valueCompiled, request, context);
            } else {
                // Flatten for locales
                const localizedResponseOutput = localize(responseOutput, request.locale);
                const valueCompiled = compileSegments(
                    localizedResponseOutput,
                    compiledResponse.segments,
                    request,
                    context
                );
                compiledResponse[key] = compiler.compile(valueCompiled, request, context);
            }
        }
    });

    // Displays!
    if (Array.isArray(compiledResponse.displays) && compiledResponse.displays.length > 0) {
        // We want to first check to see if they have the itemObject feature
        // Note, just care about the first one here.
        const firstDisplay = { ...compiledResponse.displays[0] };

        if (isTemplatedList(firstDisplay)) {
            // This is what we will replace the items on firstDisplay with
            const compiledItems: any[] = [];
            // Defaults to "items"
            const itemsName = firstDisplay.itemsName || "items";
            // The collection variable. The regex is just for the syntactical similarity. ex  "${ $.session.storeList }"
            const itemsObject = firstDisplay.itemsObject;
            // then delete these since they may cause problems later in compilation
            delete firstDisplay.itemsObject;
            delete firstDisplay.itemsName;

            // If dynamic no reason to give more
            if (firstDisplay.items.length !== 1) {
                throw new Error("Templated Lists must only have 1 item");
            }

            const itemTemplate = firstDisplay.items[0];

            const itemsObjectResult = new RegExp(TEMPLATE_REGEX).exec(itemsObject);

            if (!itemsObjectResult) {
                throw new Error(`Unable to determine JSON path for ${itemsObject}, which is required for compilation.`);
            }

            const itemsObjectResultPath = itemsObjectResult[1].trim();

            // Now, find the object.
            // try just the session variables first
            let sessionValue: any[];
            const sessionPathResult = getJSONPath(itemsObjectResultPath, context?.storage?.sessionStore?.data);
            if (existsAndNotEmpty(sessionPathResult) && sessionPathResult[0]) {
                sessionValue = sessionPathResult[0];
            }

            // Last, we just try a JSON path
            let pathValue: any[];
            const pathResult = getJSONPath(itemsObjectResultPath, {
                ...additionalContext,
                request,
                context,
                storage: context.storage,
                session: context.session
            });
            if (existsAndNotEmpty(pathResult) && pathResult[0]) {
                pathValue = pathResult[0];
            }

            // Prefer the session over the path one
            let itemsObjectArray: any[] = sessionValue || pathValue;

            if (!Array.isArray(itemsObjectArray)) {
                throw new Error(`Item found at JSONPath for itemsObject was not an array.`);
            }
            // if a range exists, trim to the range
            itemsObjectArray = firstDisplay.range ? itemsObjectArray.slice(firstDisplay.range.from, firstDisplay.range.length) : itemsObjectArray;
            // Time to iterate and do replacements
            itemsObjectArray.forEach((item, index) => {
                // Stringify
                const itemString = JSON.stringify(itemTemplate);
                let compiledItemString = compileSegments(itemString, compiledResponse.segments, request, context);

                // New compiler
                const itemCompiler = new Compiler(
                    {
                        macros: { ...DEFAULT_MARCOS, ...macros },
                        additionalContext: {
                            ...additionalContext,
                            [`${itemsName}`]: item,
                            index
                        },
                        replaceWhenUndefined: true
                    }
                );
                compiledItemString = itemCompiler.compile(compiledItemString, request, context);

                try {
                    const compiledItem = JSON.parse(jsonEscape(compiledItemString));
                    // Only update if it doesn't explode
                    compiledItems.push(compiledItem);
                } catch (e) {
                    log().error(`Could not compile display item:`, e);
                }
            });

            // ok, time to update the items.
            firstDisplay.items = compiledItems;
            // update on the compiled response
            compiledResponse.displays[0] = firstDisplay;
        }

        // Then pass it through as a string convert it to a string
        const displaysString = JSON.stringify(compiledResponse.displays);
        // Compile the segments
        let compiledDisplayString = compileSegments(displaysString, compiledResponse.segments, request, context);

        compiledDisplayString = compiler.compile(compiledDisplayString, request, context);
        // Set it back
        try {
            const compiledDisplays = JSON.parse(jsonEscape(compiledDisplayString));
            // Only update if it doesn't explode
            compiledResponse.displays = compiledDisplays;
        } catch (e) {
            log().error(`Could not compile display:`, e);
        }
    }

    // return the result
    return compiledResponse;
}
