/*! Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import { REPEAT_INTENT } from "stentor-interaction-model";
import {
    Content,
    Context,
    Data,
    ExecutablePath,
    Forward,
    Handler,
    Redirect,
    Request,
    RequestHandler,
    Slot,
    SlotTypeMap,
    UserDataType
} from "stentor-models";
import { INPUT_UNKNOWN_ID, keyFromRequest } from "stentor-request";
import { manipulateStorage } from "stentor-storage";
import { concatText, dessmlify, findValueForKey } from "stentor-utils";
import { isActionable } from "../Action";
import { determineResponse } from "../determineResponse";
import { getResponse } from "../getResponse";
import { determinePath } from "../Path";
import { INPUT_UNKNOWN_STRATEGY_GOOGLE, INPUT_UNKNOWN_STRATEGY_REPROMPT } from "./Constants";

/**
 * The AbstractHandler takes in intents and translates them to responses.
 *
 * All handlers must extend the AbstractHandler.
 */
export abstract class AbstractHandler<
    C extends Content = Content,
    D extends Data = Data,
    F extends Forward = Forward,
    R extends Redirect = Redirect
    > implements RequestHandler, Handler<C, D, F, R> {

    public readonly type: string;

    public readonly intentId: string;

    public readonly appId: string;

    public readonly organizationId: string;

    public readonly createdAt: string;

    public readonly content: C;
    // TODO: We need to figure out how to make this readonly again
    public data: D;

    public readonly forward: F;

    public readonly redirect: R;

    public readonly name?: string;

    public readonly slots?: Slot[];

    public readonly slotTypes?: SlotTypeMap;

    public readonly permissions?: UserDataType[];

    public constructor(props: Handler<C, D, F, R>) {
        if (typeof props !== "object") {
            throw new TypeError("Invalid props passed to handler");
        }

        this.appId = props.appId;
        this.content = props.content;
        this.createdAt = props.createdAt;
        this.data = props.data;
        this.forward = props.forward;
        this.intentId = props.intentId;
        this.name = props.name;
        this.organizationId = props.organizationId;
        this.permissions = props.permissions;
        this.redirect = props.redirect;
        this.slots = props.slots;
        this.slotTypes = props.slotTypes;
        this.type = props.type;
    }

    /**
     * Determines if the request is for itself.
     */
    public isOwnRequest(request: Request): boolean {
        const key = keyFromRequest(request);
        return this.intentId === key;
    }

    /**
     * In order to determine if another handler needs to be requested, we need to see if the
     * current handler can handle the request.
     *
     * @public
     */
    public canHandleRequest(request: Request, context: Context): boolean {
        const key = keyFromRequest(request);

        // First see if we have a forwarding path
        if (determinePath(findValueForKey(key, this.forward), request, context)) {
            return true;
        }
        // Then a response
        if (determineResponse(findValueForKey(key, this.content), request, context)) {
            return true;
        }
        // If they ask us to repeat, then yes we can.
        if (key === REPEAT_INTENT) {
            // TODO: But what if we don't have a last response on storage
            return true;
        }

        return false;
    }

    /**
     * Get the forwarding path for the provided request.
     *
     * Returns undefined if a path could not be found.
     *
     * @public
     */
    public forwardingPathForRequest(request: Request, context: Context): ExecutablePath | undefined {
        const key = keyFromRequest(request);
        const paths = findValueForKey(key, this.forward);
        return determinePath(paths, request, context);
    }

    /**
     * Check if we have redirects (applied before handling the request). Usually some gate condition.
     *
     * Returns undefined if a path could not be found.
     *
     * @public
     */
    public redirectingPathForRequest(request: Request, context: Context): ExecutablePath | undefined {
        const key = keyFromRequest(request);
        const paths = findValueForKey(key, this.redirect);
        return determinePath(paths, request, context);
    }

    /**
     * Can handle InputUnknown
     *
     * @param {Context} context
     * @returns {boolean}
     * @memberof Handler
     */
    public canHandleInputUnknown(request: Request, context: Context): boolean {
        let canHandleInputUnknown = false;

        // We need this if the INPUT_UNKNOWN_STRATEGY is REPROMPT
        let hasPreviousRepromptResponse = false;
        if (context.storage && context.storage.previousResponse && context.storage.previousResponse.reprompt) {
            hasPreviousRepromptResponse = true;
        }

        if (this.data.inputUnknownStrategy === INPUT_UNKNOWN_STRATEGY_REPROMPT && hasPreviousRepromptResponse) {
            // we need a reprompt
            canHandleInputUnknown = true;
        }

        if (this.data.inputUnknownStrategy === INPUT_UNKNOWN_STRATEGY_GOOGLE && hasPreviousRepromptResponse) {
            canHandleInputUnknown = true;
        }

        return canHandleInputUnknown;
    }

    /**
     * Kicks off the handler, typically called when the intent associated with the
     * handler is requested.
     *
     * @public
     */
    public async start(request: Request, context: Context): Promise<void> {
        const response = getResponse(this.content, request, context);
        if (response) {
            context.response.respond(response);

            if (isActionable(response)) {
                manipulateStorage(context.storage, response.actions);
            }
        }
    }
    /**
     * Repeats the last uttered response.
     *
     * @protected
     */
    protected async repeat(request: Request, context: Context): Promise<void> {
        // Look on the storage, pull of the previous request and send it back
        const previousResponse = context.storage.previousResponse;
        if (previousResponse && previousResponse.outputSpeech) {
            context.response.say(previousResponse.outputSpeech);
            if (previousResponse.reprompt) {
                context.response.reprompt(previousResponse.reprompt);
            }
        } else {
            console.info("Could not fulfill request to repeat, previous response was not set");
            context.response.say("Sorry, I'm not sure what you want me to repeat.");
        }
    }

    /**
     * Handles the situation where the handler
     *
     * @protected
     * @param {Request} request
     * @param {Context} context
     * @returns {Promise<void>}
     * @memberof Handler
     */
    protected async inputUnknown(request: Request, context: Context): Promise<void> {
        switch (this.data.inputUnknownStrategy) {
            case INPUT_UNKNOWN_STRATEGY_REPROMPT:
                if (context.storage.previousResponse && context.storage.previousResponse.reprompt) {
                    const reprompt = context.storage.previousResponse.reprompt;
                    context.response.say(reprompt);
                    context.response.reprompt(reprompt);
                }
                break;
            default:
                const currentUnknownInputs = context.session.get("unknownInputs")
                    ? context.session.get("unknownInputs")
                    : 0;

                switch (currentUnknownInputs) {
                    case 0:
                        // First time, simple & quick, maybe they just misspoke
                        context.response.say("Sorry, what was that?").reprompt("Can you please say it again?");
                        // Also, save the previous response if available so we can reuse it on the next step
                        const reprompt = context.storage.previousResponse
                            ? context.storage.previousResponse.reprompt
                            : undefined;
                        const helpResponse = determineResponse(this.content.HelpIntent, request, context);
                        const helpOutputSpeech = helpResponse ? helpResponse.outputSpeech : undefined;
                        // Reprompt first, then help if available.
                        const response = reprompt || helpOutputSpeech;
                        // Set a default one in case no help response
                        let help = "What was that?";
                        if (response) {
                            if (typeof response === "string") {
                                help = response;
                            } else {
                                help = dessmlify(response.ssml);
                            }
                        }
                        // Set the helper for access later
                        context.session.set("helper", help);
                        break;
                    case 1:
                        // Second time, add the help information / the reprompt for the previous response
                        const helper = context.session.get("helper");
                        context.response.say(concatText("Sorry, I still didn't catch that.", helper)).reprompt(helper);
                        break;
                    default:
                        // Third (or greater), say bye.  Recommendation from Google
                        context.response.say("Sorry, I wasn't able to help.");
                }

                // increase the unknownInput
                context.session.set("unknownInputs", currentUnknownInputs + 1);
        }
    }

    /**
     * Handles the incoming request.  Sets the necessary responses and saves the necessary items
     * to storage.
     *
     * @public
     */
    public async handleRequest(request: Request, context: Context): Promise<void> {
        const event = keyFromRequest(request);

        switch (event) {
            /* If it is the first request for this intent, fire off start */
            case this.intentId:
                return this.start(request, context);
            case REPEAT_INTENT:
                return this.repeat(request, context);
            case INPUT_UNKNOWN_ID:
                return this.inputUnknown(request, context);
            default:
                // NOTE: Any way we can combine this with the start() method?  It does
                // something similar and can handle any type of request.
                // Try to find one in the content
                const response = getResponse(this.content, request, context);
                if (response) {
                    context.response.respond(response);
                    if (isActionable(response)) {
                        manipulateStorage(context.storage, response.actions);
                    }
                    return;
                } else {
                    log().info(
                        `Could not determine response on ${this.intentId} for event ${event}, falling back to input unknown workflow`
                    );
                    // INPUT UNKNOWN TIME!
                    return this.inputUnknown(request, context);
                }
        }
    }
}
