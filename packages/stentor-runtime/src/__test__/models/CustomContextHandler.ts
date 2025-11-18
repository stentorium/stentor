/*! Copyright (c) 2022, XAPPmedia */
import { AbstractHandler, Context, keyFromRequest, Request } from "stentor";

export interface CustomContext extends Context {
    foo: number;
}

export class CustomContextHandler extends AbstractHandler {

    public canHandleRequest(request: Request, context: CustomContext): boolean {

        const key = keyFromRequest(request);

        const handled: string[] = ["HelpIntent"];

        if (handled.includes(key)) {
            return true;
        }

        return super.canHandleRequest(request, context);
    }

    // Use the CustomContext instead of the Context 
    public async handleRequest(request: Request, context: CustomContext): Promise<void> {
        // This is how we can test the custom context.
        context.response.say(`${request.userId} ${context.foo}`);

        return;
    }
}