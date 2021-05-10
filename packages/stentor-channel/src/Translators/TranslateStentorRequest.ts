/*! Copyright (c) 2019, XAPPmedia */
import { Translator } from "@xapp/patterns";
import { Request } from "stentor-models";

export class TranslateStentorRequest extends Translator<Request, Request>  {
    public translate(request: Request): Request {
        if (!request.channel) {
            request.channel = "unknown";
        }
        return request;
    }
}
