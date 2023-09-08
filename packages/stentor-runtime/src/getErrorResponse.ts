/*! Copyright (c) 2023, XAPP AI */

import { TROUBLE_WITH_REQUEST } from "stentor-constants";
import { Request, Response, Context } from "stentor-models";
import { ResponseBuilder, compileResponse, getResponse } from "stentor-response";

/**
 * Returns a error occurred style response with debugging information in the card.
 * @param request 
 * @param context Optional, we might not have the context yet at this point.
 * @param error 
 * @returns 
 */
export function getErrorResponse(error: Error, request: Request, context?: Context): Response {

    const builder = new ResponseBuilder({ device: request.device });

    let response: Response;

    if (context) {
        response = builder.respond(getResponse(TROUBLE_WITH_REQUEST, request, context)).build();
    } else {
        response = builder.respond(TROUBLE_WITH_REQUEST[0]).build();
    }

    const compiled = compileResponse(response, request, context, { error });
    // Testing this, see how this works
    compiled.displays = [
        {
            type: "CARD",
            title: `${error.name || "Error"}`,
            context: `${error.message}`
        }
    ];

    return compiled;
}