/*! Copyright (c) 2019, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { ResponseOutput } from "stentor-models";
import * as jp from "jsonpath";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText" | "textToSpeech">;

/* private */
function compileString(value: string, object: object, replaceWhenUndefined: boolean): string {
    let compiledValue: string = value;
    let result: RegExpExecArray = TEMPLATE_REGEX.exec(value);
    // Set exit condition to be when the results are null
    while (result !== null) {
        // index 1 is the capture
        const captured = result[1].trim();
        // query the path
        const pathResult = jp.query(object, captured.trim());
        const replacement = pathResult[0];
        // now replace if we have a result
        if (replacement || replaceWhenUndefined) {
            compiledValue = compiledValue.replace(result[0], pathResult[0]);
        }
        // loop it around again
        result = TEMPLATE_REGEX.exec(value);
    }
    return compiledValue;
}

/**
 * Compiles all instances of a template with the provided string by looking
 * up the JSON path within the provided object.
 *
 * For example, when passed "${greeting} ${foo.name}, how are you?" and
 * { greeting: "Hello", foo: {name: "Bob" }} will be compiled to "Hello Bob, how are you?"
 */
export function compileJSONPaths(responseOutput: string, object: object, replaceWhenUndefined?: boolean): string;
export function compileJSONPaths(responseOutput: ResponseOutput, object: object, replaceWhenUndefined?: boolean): ResponseOutput;
export function compileJSONPaths(responseOutput: string | ResponseOutput, object: object, replaceWhenUndefined?: boolean): string | ResponseOutput {
    if (!responseOutput || !object) {
        return responseOutput;
    }

    let compiledValue: string | ResponseOutput = responseOutput;

    if (typeof compiledValue === "string") {
        compiledValue = compileString(compiledValue, object, replaceWhenUndefined);
    } else {
        // Response is { ssml, displayText }
        const value: ResponseOutput = compiledValue; // This reassignment is only to make TS happy
        // Make some type safe keys
        const keys: (keyof ResponseOutputKeysOnly)[] = ["ssml", "displayText", "textToSpeech"];
        // Iterate through the keys
        keys.forEach(key => {
            if (value[key]) {
                value[key] = compileString(value[key], object, replaceWhenUndefined);
            }
        });
    }

    return compiledValue;
}
