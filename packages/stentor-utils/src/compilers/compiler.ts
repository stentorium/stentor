/*! Copyright (c) 2030, XAPPmedia */
import { SESSION_STORAGE_SLOTS_KEY, TEMPLATE_REGEX } from "stentor-constants";
import { Context, IntentRequest, Request, RequestSlotMap, ResponseOutput } from "stentor-models";
import { JSONPath } from "jsonpath-plus";

import { MacroMap } from "./macro";
import { slotValueToSpeech } from "../response";
import { capitalize, truncate } from "../string";
import { combineRequestSlots } from "../request";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText" | "html">;

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
    /**
     * When true, it will replace the ${foo} with undefined.  Default behavior will leave ${foo} if it does not have a value.
     */
    readonly replaceWhenUndefined?: boolean;
    /**
     * When provided it overrides the DEFAULT_MACROS and are used when compiling the templates.
     * 
     * You can include the DEFAULT_MACROS if you include them:
     * 
     * ```ts
     * macros: {
     *    ...DEFAULT_MACROS,
     *    ...myMacros
     * }
     * ```
     */
    readonly macros?: MacroMap;
    /**
     * When provided, the additional context will be used when compiling the templates.  This is an opportunity to inject
     * more information beyond the provided request and context objects.
     */
    readonly additionalContext?: Record<string, unknown>;
}

/**
 * Compiles the templated response based on the provided request and context with some configurability.
 * 
 * You can provide custom macros that can be used to modify the templated response and also additional context
 * that will be used as possible replacements.
 */
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

    private compileString(value: string, request: Request, context: Context, key: "displayText" | "ssml" | "html"): string {

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
                if (slot && key !== "html") {
                    speakableSlotValue = slotValueToSpeech(slot.value, key);
                }

            }

            const pathResult = JSONPath({ path: captured.trim(), json: { ...this.additionalContext, request, context } });
            const pathReplacement = pathResult[0];

            // if it exists OR replaceWhenUndefined
            if (speakableSlotValue || pathReplacement || this.replaceWhenUndefined) {

                let replacement: string = speakableSlotValue;

                if (!replacement) {
                    // pathReplacement can be anything so do some 
                    if (typeof pathReplacement === "string") {
                        replacement = pathReplacement;
                    } else if (typeof pathReplacement === "number") {
                        replacement = `${pathReplacement}`;
                    } else if (typeof pathReplacement === "object") {
                        // Try the key, it might be a ResponseOutput
                        if (pathReplacement[key]) {
                            replacement = pathReplacement[key];
                        } else {
                            // Otherwise it will just look like [Object object], which isn't
                            // helpful so we stringify it
                            replacement = JSON.stringify(pathReplacement);
                        }
                    } else {
                        // No idea, good luck
                        replacement = pathReplacement;
                    }
                }

                // replace it
                compiledValue = compiledValue.replace(result[0], replacement);
            }

            // loop it around again
            result = TEMPLATE_REGEX.exec(value);
        }

        return compiledValue;

    }

    /**
     * Compiles the provided response output or string based on the provided request and context.
     * 
     * @param responseOutput 
     * @param request 
     * @param context 
     */
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
            const keys: (keyof ResponseOutputKeysOnly)[] = ["ssml", "displayText", "html"];

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
