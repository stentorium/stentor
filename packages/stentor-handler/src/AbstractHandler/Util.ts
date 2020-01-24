/*! Copyright (c) 2019, XAPPmedia */
import { Handler, Intent, Request, RequestSlot, Slot, SlotTypeMap } from "stentor-models";
import { hasSlots, INPUT_UNKNOWN_ID, isIntentRequest, LAUNCH_REQUEST_ID } from "stentor-request";
import { dessmlify, isValidSSML, matchRequestSlotToSlotTypeValue, ssmlify } from "stentor-utils";
import { isExecutablePath } from "../Path";
import { isHandler } from "./Guards";

/**
 * Returns the slot type for the given slot name.
 *
 * @export
 * @param {string} slotName
 * @param {Slot[]} slots
 * @returns {(string | undefined)}
 */
export function getSlotType(slotName: string, slots: Slot[]): string | undefined {
    if (!slots) {
        return undefined;
    }

    const slot = slots.find(slot => {
        return slot.name === slotName;
    });

    return slot ? slot.type : undefined;
}

/**
 * If the provided request is an intent request, it searches for the provided slot name
 * and then tries to find the appropriate data associated with that slot value.
 *
 * @export
 * @param {Request} request
 * @param {string} slotName
 * @param {Slot[]} slots
 * @returns {({ url: string, responseData: Response[] } | undefined)}
 */
export function getMatchedSlotData<T>(
    request: Request,
    slotName: string,
    slots: Slot[],
    slotTypeMap: SlotTypeMap<T>
): T | undefined {
    let data: T | undefined;

    if (isIntentRequest(request) && hasSlots(request)) {
        // Intent request and we have slots
        const requestSlot: RequestSlot = request.slots[slotName];

        // First failure condition, no requested slot
        if (!requestSlot) {
            console.info(`Could not find a slot for ${slotName}`);
            return data;
        }

        // Second possible failure condition, no slot value or id was given
        // for what we are looking up
        if (!requestSlot.id && !requestSlot.value) {
            // This is something we want to see in the logs.
            console.info(`No slot value or id was returned for ${slotName}`);
            // return undefined
            return data;
        }

        // figure out the slot type for provided name
        const slotType = getSlotType(slotName, slots);
        // find the slot values if the type exists or set it to an empty array
        const slotValues = slotTypeMap[slotType] ? slotTypeMap[slotType].values : [];
        // then find the podcast utterance within the slot type values
        const slotTypeValue = matchRequestSlotToSlotTypeValue(requestSlot, slotValues);
        // Figure out what type of data we have
        if (slotTypeValue) {
            data = slotTypeValue.data;
        } else {
            // This is something we want to see in the logs
            console.info(
                `Could not match utterance "${requestSlot.id}" or "${requestSlot.value}" to a slot value in ${slotType}`
            );
        }
    }

    return data;
}

/**
 * Global handlers have utterances and can be accessed
 * at any time.
 *
 * @export
 * @param {(Intent | Handler)} handler
 * @returns {boolean}
 */
export function isGlobalHandler(handler: Intent | Handler): boolean {
    if (!handler) {
        return false;
    }

    // LaunchRequests & InputUnknowns are auto global
    if (handler.intentId === LAUNCH_REQUEST_ID || handler.intentId === INPUT_UNKNOWN_ID) {
        return true;
    }

    const isActualHandler: boolean = isHandler(handler);
    const hasUtterances: boolean = Array.isArray(handler.utterancePatterns) && handler.utterancePatterns.length > 0;
    return isActualHandler && hasUtterances;
}

export interface IntentMap {
    [intentId: string]: Intent | Handler;
}
export interface HandlerMap {
    [intentId: string]: Handler;
}

/**
 * Quickly turn an array of Intents and Handlers to a map with the intentIds as the keys.
 *
 * @export
 * @template T extends Intent
 * @param {T[]} intents
 * @returns {{ [id: string]: T }}
 */
export function toMap<T extends Intent>(intents: T[]): { [id: string]: T } {
    if (!Array.isArray(intents)) {
        return {};
    }

    return intents.reduce((current, intent) => {
        return { ...current, [intent.intentId]: intent };
    }, {});
}

/**
 * Does the provided intent or handler have utterances.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @returns {boolean}
 */
export function hasUtterances(intent: Intent | Handler): boolean {
    if (!intent) {
        return false;
    }
    return Array.isArray(intent.utterancePatterns) && intent.utterancePatterns.length > 0;
}

/**
 * Does the provided intent or handler have content.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @returns {boolean}
 */
export function hasContent(intent: Intent | Handler): boolean {
    let hasContent: boolean = false;

    if (isHandler(intent) && intent.content) {
        hasContent = Object.keys(intent.content).length > 0;
    }

    return hasContent;
}

/**
 * Does the provided intent or handler have any reprompts.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @returns {boolean}
 */
export function hasReprompt(intent: Intent | Handler): boolean {
    let hasReprompt: boolean = false;

    if (isHandler(intent) && intent.content) {
        Object.keys(intent.content).forEach(key => {
            const responses = intent.content[key];
            responses.forEach(response => {
                if (response.reprompt !== undefined) {
                    hasReprompt = true;
                }
            });
        });
    }

    return hasReprompt;
}

/**
 * Does the provided intent or handler have any forward paths setup.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @returns {boolean}
 */
export function hasForwards(intent: Intent | Handler): boolean {
    let hasForward: boolean = false;

    if (isHandler(intent) && typeof intent.forward === "object") {
        hasForward = Object.keys(intent.forward).length > 0;
    }

    return hasForward;
}

/**
 * Filters out the intents from an array of intents and handlers.
 *
 * @export
 * @param {((Intent | Handler)[])} handlersAndIntents
 * @returns {Handler[]}
 */
export function filterOutIntents(handlersAndIntents: (Intent | Handler)[]): Handler[] {
    const handlers: Handler[] = [];

    if (!handlersAndIntents) {
        // fast fail
        return handlers;
    }

    handlersAndIntents.forEach(undecided => {
        if (isHandler(undecided)) {
            handlers.push(undecided);
        }
    });

    return handlers;
}

/**
 * Does the provided intent or handler forward to the provided ID.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @param {string} intentId
 * @returns {boolean}
 */
export function forwardsTo(intent: Intent | Handler, intentId: string): boolean {
    let forwardsTo: boolean = false;

    if (isHandler(intent)) {
        if (intent.forward) {
            Object.keys(intent.forward).forEach(key => {
                const paths = intent.forward[key];
                paths.forEach(path => {
                    if (isExecutablePath(path)) {
                        if (path.intentId === intentId) {
                            forwardsTo = true;
                        }
                    }
                });
            });
        }
    }
    return forwardsTo;
}

export enum HandledIn {
    Any = 0,
    Redirect,
    Content,
    Forward
}

/**
 * Does the provided Intent / Handler handle the provided ID in some way or another.
 *
 * This checks redirect, content, & forward for the ID as a key.
 *
 * Optionally, you can specify if you only want to check either redirect, content, or forward.  The
 * default is to check all three.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @param {string} id
 * @param {HandledIn} [how=HandledIn.Any]
 * @returns {boolean}
 */
export function handles(intent: Intent | Handler, id: string, how: HandledIn = HandledIn.Any): boolean {
    let handles: boolean = false;

    if (isHandler(intent)) {
        const handledInRedirect: boolean = intent.redirect ? Object.keys(intent.redirect).indexOf(id) !== -1 : false;
        const handledInContent: boolean = intent.content ? Object.keys(intent.content).indexOf(id) !== -1 : false;
        const handledInForward: boolean = intent.forward ? Object.keys(intent.forward).indexOf(id) !== -1 : false;

        switch (how) {
            case HandledIn.Redirect:
                handles = handledInRedirect;
                break;
            case HandledIn.Content:
                handles = handledInContent;
                break;
            case HandledIn.Forward:
                handles = handledInForward;
                break;
            default:
                handles = handledInRedirect || handledInContent || handledInForward;
        }
    }

    return handles;
}

/**
 * For the given handler, find the intentId that will lead to the provided path.
 *
 * @export
 * @param {Handler} handler
 * @param {string} pathId
 * @returns {(string | undefined)}
 */
export function determineIntentIdToPath(handler: Handler, pathId: string): string | undefined {
    if (!hasForwards(handler)) {
        return undefined;
    }

    if (!pathId) {
        return undefined;
    }

    let intentId: string;

    // go through the paths, looking for a match
    Object.keys(handler.forward).forEach(id => {
        const paths = handler.forward[id];
        for (const path of paths) {
            if (isExecutablePath(path)) {
                if (path.intentId === pathId) {
                    intentId = id;
                    break;
                }
            }
        }
    });

    return intentId;
}

/**
 * Does the provided intent or handler have a response that contains the provided
 * character.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @param {string} character
 * @returns {boolean}
 */
export function responsesContain(intent: Intent | Handler, character: string): boolean {
    let responsesContains: boolean = false;

    if (isHandler(intent) && intent.content) {
        const contentAsJSON = JSON.stringify(intent.content);
        if (contentAsJSON.includes(character)) {
            responsesContains = true;
        }
    }

    return responsesContains;
}

export interface ContainsInvalidResponseResult {
    error: boolean;
    response?: string;
}

/**
 * Checks to see if any of the responses within the handler
 * has invalid XML within the SSML fields.
 *
 * @export
 * @param {((Intent | Handler))} intent
 * @returns {ContainsInvalidResponseResult}
 */
export function containsInvalidResponse(intent: Intent | Handler): ContainsInvalidResponseResult {
    const result: ContainsInvalidResponseResult = { error: false };

    if (isHandler(intent) && intent.content) {
        Object.keys(intent.content).forEach(id => {
            if (Array.isArray(intent.content[id]) && intent.content[id].length > 0) {
                intent.content[id].forEach(response => {
                    if (typeof response.outputSpeech === "object") {
                        // make sure it is ssmlified
                        let ssml = dessmlify(response.outputSpeech.ssml);
                        ssml = ssmlify(ssml, false);
                        result.error = isValidSSML(ssml);
                        if (result.error) {
                            result.response = ssml;
                        }
                    }

                    if (typeof response.reprompt === "object") {
                        // make sure it is ssmlified
                        let ssml = dessmlify(response.reprompt.ssml);
                        ssml = ssmlify(ssml, false);
                        result.error = isValidSSML(ssml);
                        if (result.error) {
                            result.response = ssml;
                        }
                    }
                });
            }
        });
    }

    return result;
}
