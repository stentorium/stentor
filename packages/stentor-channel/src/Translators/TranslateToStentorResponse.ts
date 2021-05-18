/*! Copyright (c) 2019, XAPPmedia */
import { Translator } from "@xapp/patterns";
import { RequestResponse, Response } from "stentor-models";

export class TranslateStentorResponse extends Translator<RequestResponse, Response> {
    public translate(requestResponse: RequestResponse): Response {
        return requestResponse.response;
    }
}
