/*! Copyright (c) 2030, XAPPmedia */
import { SESSION_STORAGE_SLOTS_KEY, TEMPLATE_REGEX } from "stentor-constants";
import { isIntentRequest } from "stentor-guards";
import { Context, Request, RequestSlotMap, ResponseOutput, SuggestionTypes } from "stentor-models";
import { JSONPath } from "jsonpath-plus";

import { MacroMap } from "./macro";
import { slotValueToSpeech } from "../response";
import { capitalize, truncate } from "../string";
import { combineRequestSlots } from "../request";
import { existsAndNotEmpty } from "../array";
import { isLinkoutSuggestion } from "stentor-guards";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText" | "html">;

export const DEFAULT_MARCOS: MacroMap = {
    capitalize: capitalize,
    slotValueToSpeech: slotValueToSpeech,
    truncate: truncate
}

export interface CompilerProps {
    /**
     * When true, it will replace the ${foo} with undefined or null if the value for `foo` cannot be found.  Default behavior will leave ${foo} if it does not have a value.
     * 
     * A caveat to this is when the `foo` is in a string such as `"${foo}"` then it will replace it with an empty string instead of undefined, thus "" instead of "undefined".  The reason for this
     * is "" is falsey and "undefined" is not.  If you are doing string comparisons then this will be a problem.
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
    /**
     * Private method that focuses on an individual string.
     * 
     * @param value 
     * @param request 
     * @param context 
     * @param key - Optional, if not provided it is just assumed to be a string 
     * @returns 
     */
    private compileString(value: string, request: Request, context: Context, key?: "displayText" | "ssml" | "html"): string {

        let compiledValue: string = value;
        // First look for macros
        // See this regex in action: https://regex101.com/r/MihX7l/2 
        // It is complicated.
        const MACRO_REGEX = /\$\{\s*([a-zA-Z]*)\(\s*((?:["`']\$\{(?:\s*\$\.)?[\s\w\.]*\}["`']|[^$]\w*){0,5})\s*\)\s*\}/g;

        let macroResult: RegExpExecArray;
        const macroReg = new RegExp(MACRO_REGEX);

        while ((macroResult = macroReg.exec(value)) !== null) {

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
        }

        // Next, looks for slots names & JSONpaths
        let result: RegExpExecArray;

        const reg = new RegExp(TEMPLATE_REGEX);
        // Set exit condition to be when the results are null
        while ((result = reg.exec(value)) !== null) {
            // index 1 is the capture
            // trim it so we can support ${ name }
            const captured = result[1].trim();
            // 1st special case, users can just do ${slot_name} and we convert the value for them
            let speakableSlotValue: string;

            let slots: RequestSlotMap = context?.session?.get(SESSION_STORAGE_SLOTS_KEY) || {};

            if (isIntentRequest(request)) {
                slots = combineRequestSlots(context?.session?.get(SESSION_STORAGE_SLOTS_KEY), request.slots);
            }

            // Find the slot
            const slot = slots[captured];
            // Based on the type, replace it in the string
            if (slot && key !== "html") {
                // passing "displayText" if no key exists here
                speakableSlotValue = slotValueToSpeech(slot.value, key || "displayText");
            }

            // 2nd special case, session value, which allows you to do ${session_value.key}
            let sessionValue: string;
            const sessionPathResult = JSONPath({ path: captured, json: context?.storage?.sessionStore?.data });
            if (existsAndNotEmpty(sessionPathResult) && `${sessionPathResult[0]}`) {

                const sessionReplacement = sessionPathResult[0];

                if (sessionReplacement && typeof sessionReplacement === "object") {
                    // Try the key, it might be a ResponseOutput
                    if (sessionPathResult[0][key]) {
                        sessionValue = `${sessionReplacement[key]}`;
                    } else {
                        // Otherwise it will just look like [Object object], which isn't
                        // helpful so we stringify it
                        sessionValue = JSON.stringify(sessionReplacement);
                    }
                } else if (typeof sessionReplacement === "string") {
                    sessionValue = sessionReplacement
                } else if (sessionReplacement !== null) {
                    sessionValue = `${sessionReplacement}`;
                }
            }

            // Last, we just try a JSON path
            const pathResult = JSONPath({
                path: captured.trim(), json: {
                    ...this.additionalContext,
                    request,
                    context,
                    storage: context?.storage,
                    session: context?.session || undefined
                }
            });
            let pathReplacement: string;
            if (existsAndNotEmpty(pathResult) && `${pathResult[0]}`) {

                const replacement = pathResult[0];

                if (replacement && typeof replacement === "object") {
                    // Try the key, it might be a ResponseOutput
                    if (replacement[key]) {
                        pathReplacement = `${replacement[key]}`;
                    } else {
                        // Otherwise it will just look like [Object object], which isn't
                        // helpful so we stringify it
                        pathReplacement = JSON.stringify(replacement);
                    }
                } else if (typeof replacement === "string") {
                    pathReplacement = replacement;
                } else if (replacement !== null) {
                    pathReplacement = `${replacement}`;
                }
            }

            // Possible replacement value
            const replacement: string = speakableSlotValue || sessionValue || pathReplacement;
            // Check if we do replacement
            // Either we have a replacement value or we are replacing it with undefined
            if (replacement || this.replaceWhenUndefined) {

                const current: string = result[0];
                const input = result.input;

                // We want to check to see if the value we are replacing is surrounded by
                // any kind of quotes
                const beforeIndex = result.index - 1;
                const before = input[beforeIndex];
                const afterIndex = result.index + current.length;
                const after = input[afterIndex];
                // So, no replacement value and we are replacing with undefined &&
                // we are surrounded by "", we want to preserve the fact that "" is falsey
                // so we replace it with empty string.
                // Otherwise we do "undefined" and that is no longer falsey
                if (!replacement && this.replaceWhenUndefined && !key && /['||"||`]/.test(before) && /['||"||`]/.test(after)) {
                    compiledValue = compiledValue.replace(current, "");
                } else {
                    // replace it
                    compiledValue = compiledValue.replace(current, replacement);
                }
            }
        }

        return compiledValue;
    }

    /**
     * Compiles the provided response output or string based on the provided request and context.
     * 
     * It is used for compiling conditions on a response or injecting variables into responses.
     * 
     * @param input - Either a string or a set of responses.  
     * @param request - The request
     * @param context - Context object
     */
    public compile(input: string, request: Request, context: Context): string;
    public compile(input: ResponseOutput, request: Request, context: Context): ResponseOutput;
    public compile(input: string | ResponseOutput, request: Request, context: Context): string | ResponseOutput {

        if (!input) {
            return input;
        }

        let compiledValue: string | ResponseOutput = input;

        if (typeof compiledValue === "string") {
            // Default it to displayText because it is the safest and works 
            // in both cases.
            compiledValue = this.compileString(compiledValue, request, context);
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

            // Last, lets do suggestion chips!
            if (existsAndNotEmpty(value.suggestions)) {
                // Make a copy
                const compiledSuggestions: SuggestionTypes[] = [];

                value.suggestions.forEach((suggestion) => {

                    if (typeof suggestion === "string") {
                        compiledSuggestions.push(this.compileString(suggestion, request, context, "displayText"))
                    } else {
                        let skip = false;
                        // Run through each key
                        suggestion.title = this.compileString(suggestion.title, request, context, "displayText");
                        if (isLinkoutSuggestion(suggestion)) {

                            const originalUrl = suggestion.url;
                            const originalHasRegex = !!originalUrl.match(new RegExp(TEMPLATE_REGEX))

                            suggestion.url = this.compileString(suggestion.url, request, context, "displayText");

                            if (this.replaceWhenUndefined && suggestion.url === "undefined") {
                                // First skip condition, it was replaced to be undefined
                                skip = true;
                            } else if (originalHasRegex && originalUrl === suggestion.url) {
                                // Second skip condition, original has regex and it was not updated
                                skip = true
                            }
                        }

                        if (!skip) {
                            compiledSuggestions.push(suggestion);
                        }
                    }
                });

                value.suggestions = compiledSuggestions;
            }
        }

        return compiledValue;
    }
}
