/*! Copyright (c) 2019, XAPPmedia */
import { Translator } from "@xapp/patterns";
import { RequestResponse, Response } from "stentor-models";

export class TranslateStentorResponse extends Translator<RequestResponse, Response> {
    public translate(requestResponse: RequestResponse): Response {


        // Ensure we are passing out the right markdown in the displayText!


        return requestResponse.response;
    }
}
