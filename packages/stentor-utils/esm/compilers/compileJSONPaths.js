/*! Copyright (c) 2019, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { JSONPath } from "jsonpath-plus";
/* private */
function compileString(value, object, replaceWhenUndefined) {
    let compiledValue = value;
    let result;
    const reg = new RegExp(TEMPLATE_REGEX);
    // Set exit condition to be when the results are null
    while ((result = reg.exec(value)) !== null) {
        // index 1 is the capture
        const captured = result[1].trim();
        // query the path
        const pathResult = JSONPath({ path: captured.trim(), json: object });
        const replacement = pathResult[0];
        // now replace if we have a result
        if (replacement || replaceWhenUndefined) {
            compiledValue = compiledValue.replace(result[0], pathResult[0]);
        }
    }
    return compiledValue;
}
export function compileJSONPaths(responseOutput, object, replaceWhenUndefined) {
    if (!responseOutput || !object) {
        return responseOutput;
    }
    let compiledValue = responseOutput;
    if (typeof compiledValue === "string") {
        compiledValue = compileString(compiledValue, object, replaceWhenUndefined);
    }
    else {
        // Response is { ssml, displayText }
        const value = compiledValue; // This reassignment is only to make TS happy
        // Make some type safe keys
        const keys = ["ssml", "displayText", "textToSpeech"];
        // Iterate through the keys
        keys.forEach(key => {
            if (value[key]) {
                value[key] = compileString(value[key], object, replaceWhenUndefined);
            }
        });
    }
    return compiledValue;
}
//# sourceMappingURL=compileJSONPaths.js.map