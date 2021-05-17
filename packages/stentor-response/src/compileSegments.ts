/*! Copyright (c) 2019, XAPPmedia */
import { TEMPLATE_REGEX } from "stentor-constants";
import { localize } from "stentor-locales";
import { Context, Request, ResponseOutput, ResponseSegment, ResponseSegmentsMap } from "stentor-models";
import { dessmlify } from "stentor-utils";
import { determineSegment } from "./determineSegment";

type ResponseOutputKeysOnly = Pick<ResponseOutput, "ssml" | "displayText" | "textToSpeech">;

interface FoundSegments {
    [key: string]: ResponseSegment;
}

/* private */
function compileString(
    value: string,
    segmentsMap: FoundSegments,
    request: Request,
    context: Context,
    responseKey?: keyof ResponseOutputKeysOnly
): string {
    let compiledValue: string = value;

    let result: RegExpExecArray = TEMPLATE_REGEX.exec(compiledValue);
    while (result !== null) {
        // Pull the first key out
        const key = result[1] ? result[1].trim() : undefined;
        const foundSegment = segmentsMap[key];

        if (foundSegment) {
            const segment = foundSegment.segment;
            if (typeof segment === "string") {
                const cleanSegment = dessmlify(segment);
                compiledValue = compiledValue.replace(result[0], cleanSegment);
            } else {
                if (!responseKey) {
                    console.info("Key for segment was not provided, defaulting to displayText");
                    responseKey = "displayText";
                }
                const responseOutput: ResponseOutput = segment;
                const locale = request ? request.locale : undefined;
                const localizedResponseOutput = localize(responseOutput, locale);
                const cleanSegment = dessmlify(localizedResponseOutput[responseKey]);

                compiledValue = compiledValue.replace(result[0], cleanSegment);
            }
        }
        // Run the value back through until we have replaced all the templates
        result = TEMPLATE_REGEX.exec(compiledValue);
    }

    return compiledValue;
}

/* private */
function findSegments(
    value: string,
    segmentsMap: ResponseSegmentsMap,
    request: Request,
    context: Context
): FoundSegments {
    const foundSegments: FoundSegments = {};

    let result: RegExpExecArray = TEMPLATE_REGEX.exec(value);
    while (result !== null) {
        const key = result[1] ? result[1].trim() : undefined;
        const segments = segmentsMap[key] || [];
        const matchedSegment = determineSegment(segments, request, context);
        foundSegments[key] = matchedSegment;
        result = TEMPLATE_REGEX.exec(value);
    }

    return foundSegments;
}

/**
 * Compile the response output with provided segments.
 *
 * @param {string} responseOutput
 * @param {ResponseSegmentsMap} segments
 * @param {Request} request
 * @param {Context} context
 * @returns {string}
 */
export function compileSegments(
    responseOutput: string,
    segmentsMap: ResponseSegmentsMap,
    request: Request,
    context: Context
): string;
export function compileSegments(
    responseOutput: ResponseOutput,
    segmentsMap: ResponseSegmentsMap,
    request: Request,
    context: Context
): ResponseOutput;
export function compileSegments(
    responseOutput: string | ResponseOutput,
    segmentsMap: ResponseSegmentsMap,
    request: Request,
    context: Context
): string | ResponseOutput {
    if (!responseOutput || !segmentsMap) {
        return responseOutput;
    }

    let compiledValue: string | ResponseOutput = responseOutput;

    if (typeof compiledValue === "string") {
        const foundSegments = findSegments(compiledValue, segmentsMap, request, context);
        compiledValue = compileString(compiledValue, foundSegments, request, context);
    } else {
        // Response is { ssml, displayText }
        const value: ResponseOutput = compiledValue; // This reassignment is only to make TS happy
        // Make some type safe keys
        const keys: (keyof ResponseOutputKeysOnly)[] = ["ssml", "displayText", "textToSpeech"];
        let foundSegments: FoundSegments = {};
        // Iterate through the keys to find all the segments and match them
        keys.forEach(key => {
            if (value[key]) {
                foundSegments = {
                    ...foundSegments,
                    ...findSegments(value[key], segmentsMap, request, context)
                };
            }
        });
        // And then do it again to then compile
        keys.forEach(key => {
            if (value[key]) {
                value[key] = compileString(value[key], foundSegments, request, context, key);
            }
        });
    }

    return compiledValue;
}
