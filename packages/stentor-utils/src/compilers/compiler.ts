/*! Copyright (c) 2030, XAPPmedia */
import { SESSION_STORAGE_SLOTS_KEY, TEMPLATE_REGEX } from "stentor-constants";
import { Context, IntentRequest, Request, RequestSlotMap, ResponseOutput } from "stentor-models";
import { JSONPath } from "jsonpath-plus";

import { MacroMap } from "./macro";
import { slotValueToSpeech } from "../response";
import { capitalize, truncate } from "../string";
import { combineRequestSlots } from "../request";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText">;

// We are redefining this here so we don't have to import the entire stentor-request package
// as a depdenency, which we can't because it would then be circular
// Idealing we have isIntentRequest in the stentor-guards package
function isIntentRequest(request: Request): request is IntentRequest {
    return !!request && request.type === "INTENT_REQUEST";
}

export const DEFAULT_MARCOS: MacroMap = {
    capitalize: capitalize,
    slotValueToSpeech: slotValueToSpeech,
    truncate: truncate,
}

export interface CompilerProps {
    readonly replaceWhenUndefined?: boolean;
    readonly macros?: MacroMap;
    readonly additionalContext?: Record<string, unknown>;
}

export class Compiler implements CompilerProps {

    public readonly replaceWhenUndefined?: boolean;

    public readonly macros?: MacroMap = { ...DEFAULT_MARCOS };

    public readonly additionalContext?: Record<string, unknown> = {};

    public constructor(props?: CompilerProps) {

        if (typeof props === "object") {
            if (typeof props.replaceWhenUndefined === "boolean") {
                this.replaceWhenUndefined = props.replaceWhenUndefined;
            }
            if (typeof props.macros === "object") {
                this.macros = { ...props.macros };
            }
            if (typeof props.additionalContext === "object") {
                this.additionalContext = { ...props.additionalContext };
            }
        }
    }

    private compileString(value: string, request: Request, context: Context, key: "ssml" | "displayText"): string {

        let compiledValue: string = value;

        // First look for macros

        // See this regex in action: https://regex101.com/r/MihX7l/2 
        // It is complicated.
        const MACRO_REGEX = /\$\{\s*([a-zA-Z]*)\(\s*((?:["`']\$\{(?:\s*\$\.)?[\s\w\.]*\}["`']|[^$]\w*)+)\s*\)\s*\}/g;

        let macroResult: RegExpExecArray = MACRO_REGEX.exec(value);

        while (macroResult !== null) {

            const macroName = macroResult[1];

            const macroArgsString = this.compileString(macroResult[2], request, context, key);

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

            const macro = this.macros[macroName];

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

        // Next, looks for slots names & JSONpaths

        let result: RegExpExecArray = TEMPLATE_REGEX.exec(value);

        // Set exit condition to be when the results are null
        while (result !== null) {
            // index 1 is the capture
            // trim it so we can support ${ name }
            const captured = result[1].trim();

            let speakableSlotValue: string;

            if (isIntentRequest(request)) {

                const slots: RequestSlotMap = isIntentRequest(request) && context.session ? combineRequestSlots(context.session.get(SESSION_STORAGE_SLOTS_KEY), request.slots) : context.session ? context.session.get(SESSION_STORAGE_SLOTS_KEY) : request.slots || {};
                // Find the slot
                const slot = slots[captured];
                // Based on the type, replace it in the string
                if (slot) {
                    speakableSlotValue = slotValueToSpeech(slot.value, key);
                }

                // if it exists OR replaceWhenUndefined
                if (speakableSlotValue || this.replaceWhenUndefined) {
                    // replace it
                    compiledValue = compiledValue.replace(result[0], speakableSlotValue);
                }
            }

            const pathResult = JSONPath({ path: captured.trim(), json: { ...this.additionalContext, request, context } });
            const replacement = pathResult[0];
            // now replace if we have a result
            if (replacement || this.replaceWhenUndefined) {
                compiledValue = compiledValue.replace(result[0], pathResult[0]);
            }

            // loop it around again
            result = TEMPLATE_REGEX.exec(value);
        }

        return compiledValue;

    }


    public compile(responseOutput: string, request: Request, context: Context): string;
    public compile(responseOutput: ResponseOutput, request: Request, context: Context): ResponseOutput;
    public compile(responseOutput: string | ResponseOutput, request: Request, context: Context): string | ResponseOutput {

        if (!responseOutput) {
            return responseOutput;
        }

        let compiledValue: string | ResponseOutput = responseOutput;

        if (typeof compiledValue === "string") {
            // Default it to displayText because it is the safest and works 
            // in both cases.
            compiledValue = this.compileString(compiledValue, request, context, "displayText");
        } else {
            // Response is { ssml, displayText }
            const value: ResponseOutput = compiledValue; // This reassignment is only to make TS happy
            // Make some type safe keys
            const keys: (keyof ResponseOutputKeysOnly)[] = ["ssml", "displayText"];

            // Iterate through the keys
            keys.forEach(key => {
                if (value[key]) {
                    value[key] = this.compileString(value[key], request, context, key);
                }
            });
        }

        return compiledValue;

    }
}
