/*! Copyright (c) 2019, XAPPmedia */
import { RuntimeContext } from "stentor-models";
import { bstContext, lambdaAPIGatewayContext, lambdaContext, virtualBstContext } from "./ContextUtils";

/**
 * Pick out the data we need to run stentor depending on the environment we run in.
 * Currently we support AWS default lambda proxy, virtual bst and bst proxy (local debugging).
 */
export function translateEventAndContext(event: any, context: any): { event: object; context: RuntimeContext } {
    let translated = { event, context };
    // TODO: Change these to better guards
    if (event && event.requestContext) {
        // For API Gateway Lambdas
        translated = lambdaAPIGatewayContext(event, context);
    } else if (context.request) {
        translated = bstContext(event, context);
    } else if (event.testContext) {
        translated = virtualBstContext(event);
    } else if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
        translated = lambdaContext(event, context);
    } else {
        // Default to a simple pass through
        translated.context.buildResponse = (code: number, result: object): object => {
            return result;
        };
    }

    return translated;
}
