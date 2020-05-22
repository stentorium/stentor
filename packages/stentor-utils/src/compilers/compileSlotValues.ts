/*! Copyright (c) 2020, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { RequestSlotMap, ResponseOutput } from "stentor-models";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText" | "textToSpeech">;

/* private */
function compileString(value: string, slots: RequestSlotMap, replaceWhenUndefined: boolean): string {
    let compiledValue: string = value;
    let result: RegExpExecArray = TEMPLATE_REGEX.exec(value);

    // Set exit condition to be when the results are null
    while (result !== null) {
        // index 1 is the capture
        const captured = result[1];

        // Find the slot
        const slot = slots[captured];
        // console.log(slot);

        // Based on the type, replace it in the string
        let speakableSlotValue: string;

        if (slot) {
            if (typeof slot.value === "string") {
                speakableSlotValue = slot.value;
            }
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
 * For example, when passed "What date do you want your ${Flowers}?"
 * 
 * @param responseOutput 
 * @param slots 
 */
export function compileSlotValues(responseOutput: string, slots: RequestSlotMap, replaceWhenUndefined?: boolean): string;
export function compileSlotValues(responseOutput: ResponseOutput, slots: RequestSlotMap, replaceWhenUndefined?: boolean): ResponseOutput;
export function compileSlotValues(responseOutput: string | ResponseOutput, slots: RequestSlotMap, replaceWhenUndefined?: boolean): string | ResponseOutput {

    if (!responseOutput || !slots) {
        return responseOutput;
    }

    let compiledValue: string | ResponseOutput = responseOutput;

    if (typeof compiledValue === "string") {
        compiledValue = compileString(compiledValue, slots, replaceWhenUndefined);
    } else {
        // Response is { ssml, displayText }
        const value: ResponseOutput = compiledValue; // This reassignment is only to make TS happy
        // Make some type safe keys
        const keys: (keyof ResponseOutputKeysOnly)[] = ["ssml", "displayText", "textToSpeech"];

        // Iterate through the keys
        keys.forEach(key => {
            if (value[key]) {
                value[key] = compileString(value[key], slots, replaceWhenUndefined);
            }
        });
    }

    return compiledValue;
}