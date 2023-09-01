/*! Copyright (c) 2019, XAPPmedia */
import { Context, Request, ResponseOutput } from "stentor-models";
const template = require("lodash.template");

export interface TemplatedResponseOutput<T> extends ResponseOutput {
    data?: T;
}

/**
 * Convert the template to an actual response.
 *
 * Throws an error if it can't find a match in the provided data so wrap this in
 * a try { } catch { } and plan on having a fallback response.
 *
 * This function leverages _.template, see https://lodash.com/docs/#template
 *
 * @param {TemplatedResponseOutput<T>} templatedResponse
 * @returns {Promise<ResponseOutput>}
 */
export function executeTemplate<T extends object>(
    templatedResponse: TemplatedResponseOutput<T>
): Promise<ResponseOutput> {
    // Using a promise right now because we will eventually
    // want to pass in the source and that will resolve the data
    // and then execute the template
    return new Promise((resolve) => {
        const { data } = templatedResponse;

        const ssmlBuilder = template(templatedResponse.ssml);
        const ssml = ssmlBuilder(data);

        const textToSpeechBuilder = template(templatedResponse.textToSpeech);
        const textToSpeech = textToSpeechBuilder(data);

        const displayTextBuilder = template(templatedResponse.displayText);
        const displayText = displayTextBuilder(data);

        resolve({
            ssml,
            textToSpeech,
            displayText
        });
    });
}


function _replace(s: string, data: any): string {
    if (!s) {
        return s;
    }

    try {
        const compiled = template(s);
        const result = compiled(data);
        return result;
    } catch (error) {
        console.error(error);
    }

    // return the original in case of error
    return s;
}

/**
 * Replaces the placeholders in template
 *
 * Examples: 'hello ${ $.session.car } ${ $.storage.status.cool }. You have uttered: ${ $.request.rawQuery } !'
 *
 * @param {string | ResponseOutput} template
 * @param {Request} request
 * @param {Context} context
 * @returns {string | ResponseOutput}
 */
export function replacePlaceholders(
    template: string | ResponseOutput,
    request: Request,
    context: Context
): string | ResponseOutput {
    if (!template) {
        return template;
    }

    const data = {
        $: {
            storage: context.storage,
            pii: context.pii,
            session: context.session.getStore(),
            request
        }
    };

    if ("string" === typeof template) {
        return _replace(template as string, data);
    } else {
        const result: ResponseOutput = {
            ssml: _replace(template.ssml, data),
            displayText: _replace(template.displayText, data),
            textToSpeech: _replace(template.textToSpeech, data)
        };

        return result;
    }
}

