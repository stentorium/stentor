/*! Copyright (c) 2019, XAPPmedia */
import { Translator } from "@xapp/patterns";
import { log } from "stentor-logger";
import { RequestResponse, Response } from "stentor-models";
import { toHTML, toResponseOutput } from "stentor-utils";

export class TranslateStentorResponse extends Translator<RequestResponse, Response> {
    public translate(requestResponse: RequestResponse): Response {

        const { request, response } = requestResponse;

        const channel = request.channel;

        if (!response.outputSpeech) {
            log().warn(`${TranslateStentorResponse.name}.${TranslateStentorResponse.prototype.translate.name}() was passed an empty response.`);
            return response;
        }

        // Ensure we are passing out the right markdown in the displayText!
        if (channel && channel.toLowerCase() === "widget" || channel.toLowerCase() === "intelligent-search") {
            response.outputSpeech = toResponseOutput(response.outputSpeech);
            if (response?.outputSpeech?.displayText) {
                response.outputSpeech.html = toHTML(response.outputSpeech.displayText);
            }
            if (response.reprompt) {
                response.reprompt = toResponseOutput(response.reprompt);
                if (response.reprompt.displayText) {
                    response.reprompt.html = toHTML(response.reprompt.displayText);
                }
            }
        }

        return response;
    }
}
