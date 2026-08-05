/*! Copyright (c) 2020, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { slotValueToSpeech } from "../response.js";
/* private */
function compileString(value, slots, key, replaceWhenUndefined, macros) {
    let compiledValue = value;
    // First look for macros
    // See this regex in action: https://regex101.com/r/MihX7l/2 
    // It is complicated.
    const MACRO_REGEX = /\$\{\s*([a-zA-Z]*)\(\s*((?:["`']\$\{(?:\s*\$\.)?[\s\w\.]*\}["`']|[^$]\w*)+)\s*\)\s*\}/g;
    let macroResult;
    const macroReg = new RegExp(MACRO_REGEX);
    while ((macroResult = macroReg.exec(value)) !== null) {
        const macroName = macroResult[1];
        const macroArgsString = compileString(macroResult[2], slots, key, replaceWhenUndefined);
        // Split them and parse them.
        const macroArgs = macroArgsString.split(",").map((arg) => {
            let parsedArg;
            try {
                parsedArg = JSON.parse(arg);
            }
            catch (e) {
                // We just leave them as is, a string.
                parsedArg = arg;
            }
            // If it is a string, it is probably wrapped in some quote
            // so we want to strip those out
            if (typeof parsedArg === "string") {
                parsedArg = parsedArg.replace(/^['"`](.*)['"`]$/, '$1');
            }
            return parsedArg;
        });
        const macro = macros[macroName];
        if (macro && typeof macro === "function") {
            let executedMacroResult;
            try {
                executedMacroResult = macro.call(undefined, ...macroArgs);
            }
            catch (e) { /* If macro fails, what do we do here? */ }
            if (executedMacroResult && typeof executedMacroResult === "string") {
                compiledValue = compiledValue.replace(macroResult[0], executedMacroResult);
            }
        }
    }
    let result;
    const reg = new RegExp(TEMPLATE_REGEX);
    // Set exit condition to be when the results are null
    while ((result = reg.exec(value)) !== null) {
        // index 1 is the capture
        // trim it so we can support ${ name }
        const captured = result[1].trim();
        let speakableSlotValue;
        // Find the slot
        const slot = slots[captured];
        // Based on the type, replace it in the string
        if (slot) {
            speakableSlotValue = slotValueToSpeech(slot.value, key);
        }
        // if it exists OR replaceWhenUndefined
        if (speakableSlotValue || replaceWhenUndefined) {
            // replace it
            compiledValue = compiledValue.replace(result[0], speakableSlotValue);
        }
    }
    return compiledValue;
}
export function compileSlotValues(responseOutput, slots, replaceWhenUndefined, macros) {
    if (!responseOutput || !slots) {
        return responseOutput;
    }
    let compiledValue = responseOutput;
    if (typeof compiledValue === "string") {
        // Default it to displayText because it is the safest and works 
        // in both cases.
        compiledValue = compileString(compiledValue, slots, "displayText", replaceWhenUndefined);
    }
    else {
        // Response is { ssml, displayText }
        const value = compiledValue; // This reassignment is only to make TS happy
        // Make some type safe keys
        const keys = ["ssml", "displayText"];
        // Iterate through the keys
        keys.forEach(key => {
            if (value[key]) {
                value[key] = compileString(value[key], slots, key, replaceWhenUndefined, macros);
            }
        });
    }
    return compiledValue;
}
//# sourceMappingURL=compileSlotValues.js.map