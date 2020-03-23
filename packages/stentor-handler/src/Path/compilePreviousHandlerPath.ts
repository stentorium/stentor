/*! Copyright (c) 2019, XAPPmedia */
import { isPreviousHandlerPath } from "stentor-guards";
import { Context, ExecutablePath, PreviousHandlerPath, Request } from "stentor-models";
import { keyFromRequest } from "stentor-request";
import { findValueForKey } from "stentor-utils";
import { determinePath } from "./determinePath";

export function compilePreviousHandlerPath(
    previousHandlerPath: PreviousHandlerPath,
    request: Request,
    context: Context
): ExecutablePath | undefined {
    if (!previousHandlerPath) {
        return undefined;
    }

    if (!context && !!context.storage) {
        return undefined;
    }

    let compiledPath: ExecutablePath;

    if (isPreviousHandlerPath(previousHandlerPath)) {
        const previousHandler = context.storage.previousHandler;
        // If we have a previousHandler
        if (previousHandler) {
            // pull off the event
            const key = keyFromRequest(request);
            // and go ahead and evaluate the path for the previous handler
            compiledPath = determinePath(findValueForKey(key, previousHandler.forward), request, context);
        }
    }

    return compiledPath;
}
