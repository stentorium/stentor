/*! Copyright (c) 2020, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { RequestSlotMap, ResponseOutput } from "stentor-models";
import { slotValueToSpeech } from "../response";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText">;

/* private */
function compileString(value: string, slots: RequestSlotMap, key: "ssml" | "displayText", replaceWhenUndefined: boolean): string {
    let compiledValue: string = value;
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
 * @param responseOutput 
 * @param slots 
 * @param replaceWhenUndefined 
 */
export function compileSlotValues(responseOutput: string, slots: RequestSlotMap, replaceWhenUndefined?: boolean): string;
export function compileSlotValues(responseOutput: ResponseOutput, slots: RequestSlotMap, replaceWhenUndefined?: boolean): ResponseOutput;
export function compileSlotValues(responseOutput: string | ResponseOutput, slots: RequestSlotMap, replaceWhenUndefined?: boolean): string | ResponseOutput {

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
                value[key] = compileString(value[key], slots, key, replaceWhenUndefined);
            }
        });
    }

    return compiledValue;
}