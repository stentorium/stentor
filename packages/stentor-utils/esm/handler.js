/*! Copyright (c) 2019, XAPPmedia */
import { isExecutablePath, isHandler } from "stentor-guards";
import { dessmlify, isValidSSML, ssmlify } from "./ssml.js";
/**
 * Quickly turn an array of Intents and Handlers to a map with the intentIds as the keys.
 */
export function toMap(intents) {
    if (!Array.isArray(intents)) {
        return {};
    }
    return intents.reduce((current, intent) => {
        return Object.assign(Object.assign({}, current), { [intent.intentId]: intent });
    }, {});
}
/**
 * Does the provided intent or handler have utterances.
 */
export function hasUtterances(intent) {
    if (!intent) {
        return false;
    }
    return Array.isArray(intent.utterancePatterns) && intent.utterancePatterns.length > 0;
}
/**
 * Does the provided intent or handler have content.
 */
export function hasContent(intent) {
    let hasContent = false;
    if (isHandler(intent) && intent.content) {
        hasContent = Object.keys(intent.content).length > 0;
    }
    return hasContent;
}
/**
 * Does the provided intent or handler have any reprompts.
 */
export function hasReprompt(intent) {
    let hasReprompt = false;
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
 */
export function hasForwards(intent) {
    let hasForward = false;
    if (isHandler(intent) && typeof intent.forward === "object") {
        hasForward = Object.keys(intent.forward).length > 0;
    }
    return hasForward;
}
/**
 * Filters out the intents from an array of intents and handlers.
 */
export function filterOutIntents(handlersAndIntents) {
    const handlers = [];
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
 * @param {((Intent | Handler))} intent
 * @param {string} intentId
 * @returns {boolean}
 */
export function forwardsTo(intent, intentId) {
    let forwardsTo = false;
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
export var HandledIn;
(function (HandledIn) {
    HandledIn[HandledIn["Any"] = 0] = "Any";
    HandledIn[HandledIn["Redirect"] = 1] = "Redirect";
    HandledIn[HandledIn["Content"] = 2] = "Content";
    HandledIn[HandledIn["Forward"] = 3] = "Forward";
})(HandledIn || (HandledIn = {}));
/**
 * Does the provided Intent / Handler handle the provided ID in some way or another.
 *
 * This checks redirect, content, & forward for the ID as a key.
 *
 * Optionally, you can specify if you only want to check either redirect, content, or forward.  The
 * default is to check all three.
 *
 * @param {((Intent | Handler))} intent
 * @param {string} id
 * @param {HandledIn} [how=HandledIn.Any]
 * @returns {boolean}
 */
export function handles(intent, id, how = HandledIn.Any) {
    let handles = false;
    if (isHandler(intent)) {
        const handledInRedirect = intent.redirect ? Object.keys(intent.redirect).indexOf(id) !== -1 : false;
        const handledInContent = intent.content ? Object.keys(intent.content).indexOf(id) !== -1 : false;
        const handledInForward = intent.forward ? Object.keys(intent.forward).indexOf(id) !== -1 : false;
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
 * @param {Handler} handler
 * @param {string} pathId
 * @returns {(string | undefined)}
 */
export function determineIntentIdToPath(handler, pathId) {
    if (!hasForwards(handler)) {
        return undefined;
    }
    if (!pathId) {
        return undefined;
    }
    let intentId;
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
 * @param {((Intent | Handler))} intent
 * @param {string} character
 * @returns {boolean}
 */
export function responsesContain(intent, character) {
    let responsesContains = false;
    if (isHandler(intent) && intent.content) {
        const contentAsJSON = JSON.stringify(intent.content);
        if (contentAsJSON.includes(character)) {
            responsesContains = true;
        }
    }
    return responsesContains;
}
/**
 * Checks to see if any of the responses within the handler
 * has invalid XML within the SSML fields.
 *
 * @param {((Intent | Handler))} intent
 * @returns {ContainsInvalidResponseResult}
 */
export function containsInvalidResponse(intent) {
    const result = { error: false };
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
//# sourceMappingURL=handler.js.map