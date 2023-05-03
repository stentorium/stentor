/*! Copyright (c) 2019, XAPPmedia */
import { RuntimeContext } from "stentor-models";

/**
 * This follows the current Stentor path convention (.../dev/apps/{appId}/run/{platform})
 *
 * @param {string} path
 * @returns {any}
 */
function parsePath(path: string): { platform?: string; appId?: string } {
    const params: any = {};

    const pathParts: any = path.split("/");
    params.platform = pathParts.pop();
    pathParts.pop(); // "/run/"
    params.appId = pathParts.pop();

    return params;
}

function parseQuery(query: string): any {
    const params: any = {};

    const parts = query.split("&");

    parts.forEach((nvp: string) => {
        if (nvp) {
            const [name, value] = nvp.split("=");
            params[name] = value;
        }
    });

    return params;
}

/**
 * For simulating lambda environments.
 */
const LAMBDA_TIMEOUT = 6000;

/**
 * BST format
 *
 * TODO: What is the difference between this one and the other function with the same name?
 *
 * @param lambdaEvent
 * @param lambdaContext
 * @returns {any}
 */
export function bstContext(lambdaEvent: any, lambdaContext: any): { event: object; context: RuntimeContext } {
    if (lambdaContext.stentorContext || !lambdaContext.request) {
        return undefined;
    }

    const [path, queryParams] = lambdaContext.request.url.split("?");
    const context = Object.assign({} as RuntimeContext, parsePath(path));

    let event = lambdaEvent;
    if (lambdaContext.request.method === "GET") {
        const payload = Object.assign({}, parseQuery(queryParams));
        event = payload;
    }

    context.rawBody = JSON.stringify(lambdaEvent);

    context.buildResponse = (code: number, result: any): any => {
        return result;
    };

    const end = new Date().getTime() + LAMBDA_TIMEOUT;
    context.getRemainingTimeInMillis = (): number => {
        const diff = end - new Date().getTime();
        const t = diff > 0 ? diff : 0;
        return t;
    };

    return { event, context };
}

/**
 * Virtual BST format
 *
 * @param lambdaEvent
 * @param lambdaContext
 * @returns {any}
 */
export function virtualBstContext(lambdaEvent: any): { event: object; context: RuntimeContext } {
    const event = lambdaEvent;
    const path = lambdaEvent.testContext.path;
    const context = Object.assign({} as RuntimeContext, parsePath(path));
    context.buildResponse = (code: number, result: any): any => {
        return result;
    };

    context.rawBody = JSON.stringify(lambdaEvent);

    // Fake the remaining time
    const end = new Date().getTime() + LAMBDA_TIMEOUT;
    context.getRemainingTimeInMillis = (): number => {
        const diff = end - new Date().getTime();
        return diff > 0 ? diff : 0;
    };

    return { event, context };
}

/**
 * Event for an API Gateway Proxy Integration
 *
 * @see https://docs.aws.amazon.com/en_pv/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 */
export interface APIGatewayEvent {
    resource: string;
    path: string;
    httpMethod: string;
    headers: { [header: string]: string };
    multiValueHeaders: { [header: string]: string[] };
    queryStringParameters: { [key: string]: string };
    multiValueQueryStringParameters: { [key: string]: string[] };
    pathParameters: { [key: string]: string };
    stageVariables: { [key: string]: string };
    requestContext: any;
    body: string;
    isBase64Encoded: boolean;
}

/**
 * Lambda Context
 *
 * @see https://docs.aws.amazon.com/en_pv/lambda/latest/dg/nodejs-prog-model-context.html
 */
export interface LambdaContext {
    getRemainingTimeInMillis(): number;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    callbackWaitsForEmptyEventLoop: boolean;
}

/**
 * Basic AWS API Gateway lambda proxy format
 *
 * @param apiGatewayEvent
 * @returns {any}
 */
export function lambdaAPIGatewayContext(
    apiGatewayEvent: APIGatewayEvent,
    lambdaContext: LambdaContext
): { event: object; context: RuntimeContext } {
    const isForm = apiGatewayEvent.headers["Content-Type"] === "application/x-www-form-urlencoded";

    // Form fields come in a tall skinny json
    const event = isForm ? parseQuery(apiGatewayEvent.body): JSON.parse(apiGatewayEvent.body);

    const path = apiGatewayEvent.path;
    const context = Object.assign({} as RuntimeContext, parsePath(path));

    // On APIGateway, we get headers at the root level.
    // see https://docs.aws.amazon.com/lambda/latest/dg/with-on-demand-https.html
    context.rawBody = apiGatewayEvent.body;
    context.headers = apiGatewayEvent.headers;

    context.getRemainingTimeInMillis = lambdaContext.getRemainingTimeInMillis;

    context.buildResponse = (statusCode: number, result: any): any => {
        let body: any = typeof result === "string" ? result : JSON.stringify(result);

        // See  https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format

        const headers: {[header: string]: string} = { "Access-Control-Allow-Origin": "*" };

        // If it is typed string use the payload attribute.
        // We need the type because we have to set the content type (see Twilio).

        if (result.type === "XML") {
            headers["Content-Type"] = "text/xml; charset=utf-8";
            body = result.payload;
        }

        return {
            statusCode,
            headers,
            body
        };
    };

    return { event, context };
}

/**
 * Context for accessing a lambda directly
 */
export function lambdaContext(
    lambdaEvent: object,
    lambdaContext: LambdaContext
): { event: object; context: RuntimeContext } {

    const event = lambdaEvent;

    const context: RuntimeContext = {};

    context.getRemainingTimeInMillis = lambdaContext.getRemainingTimeInMillis;
    context.environment = process.env.NODE_ENV;

    context.buildResponse = (code: number, result: object): object => {
        return result;
    };

    return { event, context }
}
