/*! Copyright (c) 2019, XAPPmedia */
import { Playlist } from "stentor-media";
import {
    AbstractResponseBuilder,
    ActiveContext,
    CanFulfillIntentResult,
    Card,
    ListItem,
    PlayableMedia,
    Response,
    ResponseBuilderProps,
    ResponseOutput, SimpleResponse,
    SuggestionTypes,
    UserDataRequestStatus,
    UserDataType,
    UserDataValue
} from "stentor-models";
import { mergeSuggestions, toResponseOutput } from "stentor-utils";
import { concatResponseOutput } from "./concat";
import { OrderDescription, PaymentParameters } from "stentor-models/lib/Response/Transactions";

/**
 * A builder for stentor responses.
 */
export class ResponseBuilder<T = Response<ResponseOutput>> extends AbstractResponseBuilder<T> {
    public constructor(props: ResponseBuilderProps) {
        super(props);
    }
    /**
     * Provide a fully formed response object
     *
     * Note: This will overwrite any existing response that has been set previously with the builder.
     */
    public respond(response: Response): ResponseBuilder<T> {
        if (!response) {
            return this;
        }
        // Convert them to output speech SSML & displayText
        if (response.outputSpeech) {
            response.outputSpeech = toResponseOutput(response.outputSpeech);
        }

        if (response.reprompt) {
            response.reprompt = toResponseOutput(response.reprompt);
        }

        this._response = response as Response<ResponseOutput>;
        return this;
    }

    /**
     * Communicate to the provided text user.  Depending on the channel, this will be displayed in a chat message style bubble
     * or spoken with text to speech.  You can provide both at the same time, text for display (displayText) or spoken (ssml).
     *
     * If you use this without also providing a reprompt, the conversation will end on channels with voice input.
     */
    public say(say: string | ResponseOutput, append?: boolean): ResponseBuilder<T> {
        if (!say) {
            return this;
        }

        const outputSpeechResponseOutput: ResponseOutput = toResponseOutput(say);

        if (append) {
            this._response.outputSpeech = concatResponseOutput(this._response.outputSpeech, outputSpeechResponseOutput);
        } else {
            this._response.outputSpeech = outputSpeechResponseOutput;
        }
        return this;
    }

    /**
     * Used on voice input channels, the reprompt is used when the user does not provide an input within a timely manner.
     */
    public reprompt(reprompt: string | ResponseOutput, append?: boolean): ResponseBuilder<T> {
        if (!this._response.outputSpeech) {
            throw new Error("Cannot call #reprompt() without first calling #say()");
        }

        if (!reprompt) {
            // fast exit
            return this;
        }

        const repromptResponseOutput: ResponseOutput = toResponseOutput(reprompt);

        if (append) {
            this._response.reprompt = concatResponseOutput(this._response.reprompt, repromptResponseOutput);
        } else {
            this._response.reprompt = repromptResponseOutput;
        }

        return this;
    }

    /**
     * Provide suggestion chips to the response.
     */
    public withSuggestions(suggestion: SuggestionTypes | SuggestionTypes[], append?: boolean): ResponseBuilder<T> {
        if (!this._response.outputSpeech) {
            throw new Error("Cannot call #withSuggestions() without first calling #say()");
        }

        if (!suggestion) {
            return this;
        }

        let outputSpeechSuggests: SuggestionTypes[];
        if (Array.isArray(suggestion)) {
            outputSpeechSuggests = suggestion;
        } else {
            outputSpeechSuggests = [suggestion];
        }

        if (append) {
            this._response.outputSpeech.suggestions = mergeSuggestions(this._response.outputSpeech.suggestions, outputSpeechSuggests);
        } else {
            this._response.outputSpeech.suggestions = outputSpeechSuggests;
        }

        return this;
    }

    /**
     * Provides active context that the NLU can use to help select the next intent.
     */
    public withActiveContext(context: ActiveContext | ActiveContext[]): ResponseBuilder<T> {

        if (!context) {
            return this;
        }

        const active: ActiveContext[] = (this._response?.context?.active || []).concat(context);

        this._response.context = {
            ...this._response.context,
            active
        }

        return this;
    }

    /*
     * Display
     */

    /**
     * Add a display card element to the response.
     */
    public withCard(card: Card): ResponseBuilder<T> {
        if (!card) {
            return this;
        }
        if (!Array.isArray(this._response.displays)) {
            this._response.displays = [];
        }
        this._response.displays.push(card);

        return this;
    }

    /**
     * Add a vertical list to the response
     */
    public withList(items: ListItem[], title?: string): ResponseBuilder<T> {
        if (Array.isArray(items)) {
            if (!Array.isArray(this._response.displays)) {
                this._response.displays = [];
            }
            this._response.displays.push({
                type: "LIST",
                title,
                items
            });
        }

        return this;
    }

    /**
     * Add a horizontal list to the response.
     */
    public withCarousel(items: ListItem[]): ResponseBuilder<T> {
        if (Array.isArray(items)) {
            if (!Array.isArray(this._response.displays)) {
                this._response.displays = [];
            }
            this._response.displays.push({
                type: "CAROUSEL",
                items
            });
        }
        return this;
    }
    /**
     * Add a custom display object to the response.
     */
    public withDisplay(display: object): ResponseBuilder<T> {
        if (display) {
            if (!Array.isArray(this._response.displays)) {
                this._response.displays = [];
            }
            this._response.displays.push(display);
        }

        return this;
    }

    /*
     * System
     */

    public async askForUserData(userDataType: UserDataType): Promise<UserDataValue> {
        const permissionContext = {
            ["NAME"]: "",
            ["EMAIL"]: "To send you emails",
            ["DEVICE_COARSE_LOCATION"]: "",
            ["DEVICE_PRECISE_LOCATION"]: "",
            ["PHONE_NUMBER"]: "To send you a text message",
            ["UPDATE"]: ""
        };

        switch (userDataType) {
            case "EMAIL":
                this._response.system = "PERMISSION_EMAIL";
                break;
            case "DEVICE_COARSE_LOCATION":
                this._response.system = "PERMISSION_LOCATION_COARSE";
                break;
            case "DEVICE_PRECISE_LOCATION":
                this._response.system = "PERMISSION_LOCATION_PRECISE";
                break;
            default:
                return Promise.resolve({ requestStatus: UserDataRequestStatus.ERROR });
        }

        this._response.data = {
            permissionRequestTTSContext: permissionContext[userDataType]
        };

        return Promise.resolve({ requestStatus: UserDataRequestStatus.DEFERRED });
    }

    public askForAccountLinking(response?: string): ResponseBuilder<T> {
        this._response.system = "ACCOUNT_LINK";
        if (response) {
            // TODO: Make sure this aligns
            this._response.data = {
                accountLinkRequestTTSContext: response
            };
        }
        return this;
    }

    public askForNotification(intentId?: string): ResponseBuilder<T> {
        this._response.system = "PERMISSION_NOTIFICATION";
        this._response.data = {
            permissionNotificationIntent: intentId
        };
        return this;
    }

    public askForSurfaceChange(notificationText?: string, notificationLabel?: string): ResponseBuilder<T> {
        this._response.system = "SURFACE_CHANGE";
        if (notificationText) {
            this._response.data = {
                surfaceChangeRequestTTSContext: notificationText
            };
            if (notificationLabel) {
                this._response.data = {
                    ...this._response.data,
                    surfaceChangeRequestNotificationTitle: notificationLabel
                };
            }
        }

        return this;
    }

    public askForListAccess(response?: string | Response): ResponseBuilder<T> {
        this._response.system = "PERMISSION_LIST";
        if (typeof response === "string") {
            this._response.outputSpeech = {
                ssml: response,
                displayText: response
            };
        } else if (typeof response === "object") {
            this.say(response.outputSpeech).reprompt(response.reprompt);
        }
        return this;
    }

    public askTransactionRequirements(): ResponseBuilder<T> {
        this._response.system = "TRANSACTION_REQUIREMENTS_CHECK";
        return this;
    }

    askForDeliveryAddress(response?: string | SimpleResponse<string | ResponseOutput>): AbstractResponseBuilder<T> {
        this._response.system = "TRANSACTION_DELIVERY_ADDRESS";
        if (response) {
            this._response.data = {
                txAddressRequestTTSContext: response
            };
        }
        return this;
    }

    askForTransactionDecision(paymentParameters: PaymentParameters, order: OrderDescription): AbstractResponseBuilder<T> {
        this._response.system = "TRANSACTION_DECISION";
        this._response.data = {
            txPaymentParameters: paymentParameters,
            txOrder: order
        };
        return this;
    }

    askForOrderUpdate(response: string | SimpleResponse<string | ResponseOutput>, order: OrderDescription): AbstractResponseBuilder<T> {
        this._response.system = "TRANSACTION_STATUS";
        if (response) {
            this._response.data = {
                txOrderStatusTTSContext: response
            };
        }
        this._response.data.txOrder = order;
        return this;
    }

    /*
     * Media
     */

    /**
     * Play the provided media.
     */
    public play(playable: PlayableMedia): ResponseBuilder<T> {
        if (!playable) {
            return this;
        }
        if (!Array.isArray(this._response.media)) {
            this._response.media = [];
        }
        this._response.media.push(playable);
        return this;
    }

    public playPlaylist(playlist: Playlist<PlayableMedia> | PlayableMedia[]): ResponseBuilder<T> {
        if (!playlist) {
            return this;
        }
        this._response.media = playlist;
        return this;
    }

    public stop(): ResponseBuilder<T> {
        this._response.system = "MEDIA_STOP";
        return this;
    }

    public enqueue(next: PlayableMedia, current: PlayableMedia): ResponseBuilder<T> {
        if (!next || !current) {
            return this;
        }
        this._response.system = "MEDIA_ENQUEUE";
        if (!Array.isArray(this._response.media)) {
            this._response.media = [];
        }
        this._response.media.push(next);
        this._response.data = {
            expectedPreviousToken: current.token
        };
        return this;
    }

    public build(): T {
        return this._response as T; // Not sure why I have to type this but it gives an error if I don't
    }

    public withCanFulfill(results: CanFulfillIntentResult): ResponseBuilder<T> {
        this._response.data = {
            ...this._response.data,
            canFulfillIntent: {
                ...results
            }
        }

        return this;
    }

    /**
     *
     * @alpha - The feature is under active development
     * @param phoneNumber - The phone number to transfer to
     */
    public askForCallTransfer(phoneNumber: string): AbstractResponseBuilder<T> {
        this._response.system = "TRANSFER_CALL";
        this._response.data = {
            transferPhoneNumber: phoneNumber
        };

        return this;
    }

    /**
     *
     * @alpha - The feature is under active development
     * @param handoffTargetId - The id that represents the handoff target (app id/name, queue id/name, etc)
     */
    public askForHandoff(handoffTargetId: string): AbstractResponseBuilder<T> {
        this._response.system = "HANDOFF";
        this._response.data = {
            handoffTargetId
        };

        return this;
    }
}
