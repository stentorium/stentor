/*! Copyright (c) 2020, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { RequestSlotMap, ResponseOutput } from "stentor-models";
import { slotValueToSpeech } from "../response";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText">;

export type ResponseMacro = (...args: any[]) => string;

export interface MacroMap {
    [key: string]: ResponseMacro
}

/* private */
function compileString(value: string, slots: RequestSlotMap, key: "ssml" | "displayText", replaceWhenUndefined: boolean, macros?: MacroMap): string {

    let compiledValue: string = value;

    // First look for macros

    // See this regex in action: https://regex101.com/r/MihX7l/1 
    // It is complicated.
    const MACRO_REGEX = /\$\{\s*([a-zA-Z]*)\(\s*((?:["`']\$\{[\s\w]*\}["`']|[^$]\w*)+)\s*\)\s*\}/g;

    let macroResult: RegExpExecArray = MACRO_REGEX.exec(value);

    while (macroResult !== null) {

        const macroName = macroResult[1];

        const macroArgsString = compileString(macroResult[2], slots, key, replaceWhenUndefined);

        // Split them and parse them.
        const macroArgs = macroArgsString.split(",").map((arg) => {

            let parsedArg: string | boolean | number;
            try {
                parsedArg = JSON.parse(arg);
            } catch (e) {
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

            let executedMacroResult: string;
            try {
                executedMacroResult = macro.call(undefined, ...macroArgs);
            } catch (e) { /* If macro fails, what do we do here? */ }

            if (executedMacroResult && typeof executedMacroResult === "string") {
                compiledValue = compiledValue.replace(macroResult[0], executedMacroResult);
            }
        }

        macroResult = MACRO_REGEX.exec(value);
    }

    let result: RegExpExecArray = TEMPLATE_REGEX.exec(value);

    // Set exit condition to be when the results are null
    while (result !== null) {
        // index 1 is the capture
        // trim it so we can support ${ name }
        const captured = result[1].trim();

        let speakableSlotValue: string;

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

        // loop it around again
        result = TEMPLATE_REGEX.exec(value);
    }
    return compiledValue;
}

/**
 * Compiles a templated response with slot values from the
 * provided slot map.
 * 
 * For example, when passed "What date do you want your ${flowers}?"
 * and the slot map contains a slot with name `flowers` it will replace
 * it with the value.
 * 
 * It will handle the different potential value types for slots such as
 * strings, numbers, dates and durations.
 * 
 * By default, if the slot value does not exist, the template value is left untouched.
 * 
 * @param responseOutput 
 * @param slots 
 * @param replaceWhenUndefined - When set to true, it will replace the value with 'undefined' if it doesn't exist, default behavior is to leave the template as is.
 */
export function compileSlotValues(responseOutput: string, slots: RequestSlotMap, replaceWhenUndefined?: boolean, macros?: MacroMap): string;
export function compileSlotValues(responseOutput: ResponseOutput, slots: RequestSlotMap, replaceWhenUndefined?: boolean, macros?: MacroMap): ResponseOutput;
export function compileSlotValues(responseOutput: string | ResponseOutput, slots: RequestSlotMap, replaceWhenUndefined?: boolean, macros?: MacroMap): string | ResponseOutput {

    if (!responseOutput || !slots) {
        return responseOutput;
    }

    let compiledValue: string | ResponseOutput = responseOutput;

    if (typeof compiledValue === "string") {
        // Default it to displayText because it is the safest and works 
        // in both cases.
        compiledValue = compileString(compiledValue, slots, "displayText", replaceWhenUndefined);
    } else {
        // Response is { ssml, displayText }
        const value: ResponseOutput = compiledValue; // This reassignment is only to make TS happy
        // Make some type safe keys
        const keys: (keyof ResponseOutputKeysOnly)[] = ["ssml", "displayText"];

        // Iterate through the keys
        keys.forEach(key => {
            if (value[key]) {
                value[key] = compileString(value[key], slots, key, replaceWhenUndefined, macros);
            }
        });
    }

    return compiledValue;
}