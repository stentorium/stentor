/*! Copyright (c) 2019, XAPPmedia */
import { Playlist } from "@xapp/stentor-media";
import {
    AbstractResponseBuilder,
    CanFulfillIntentResult,
    Card,
    ListItem,
    PlayableMedia,
    Response,
    ResponseBuilderProps,
    ResponseOutput,
    SuggestionTypes,
    UserDataRequestStatus,
    UserDataType,
    UserDataValue
} from "stentor-models";
import { toResponseOutput } from "@xapp/stentor-utils";
import { concatResponseOutput } from "./concat";

/**
 * A response builder for stentor responses.
 *
 * @export
 * @class ResponseBuilder
 * @extends {AbstractResponseBuilder<Response>}
 */
export class ResponseBuilder<T = Response<ResponseOutput>> extends AbstractResponseBuilder<T> {
    constructor(props: ResponseBuilderProps) {
        super(props);
    }

    respond(response: Response): ResponseBuilder<T> {
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

    say(say: string | ResponseOutput, append?: boolean): ResponseBuilder<T> {
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

    reprompt(reprompt: string | ResponseOutput, append?: boolean): ResponseBuilder<T> {
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

    withSuggestions(suggestion: SuggestionTypes | SuggestionTypes[], append?: boolean): ResponseBuilder<T> {
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
            const existingSuggestions = this._response.outputSpeech.suggestions;
            this._response.outputSpeech.suggestions = Array.isArray(existingSuggestions)
                ? existingSuggestions.concat(outputSpeechSuggests)
                : existingSuggestions;
        } else {
            this._response.outputSpeech.suggestions = outputSpeechSuggests;
        }

        return this;
    }

    /*
     * Display
     */

    withCard(card: Card): ResponseBuilder<T> {
        if (!card) {
            return this;
        }
        if (!Array.isArray(this._response.displays)) {
            this._response.displays = [];
        }
        this._response.displays.push(card);

        return this;
    }

    withList(items: ListItem[], title?: string): ResponseBuilder<T> {
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

    withCarousel(items: ListItem[]): ResponseBuilder<T> {
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

    /*
     * System
     */

    async askForUserData(userDataType: UserDataType): Promise<UserDataValue> {
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

    askForAccountLinking(response?: string): ResponseBuilder<T> {
        this._response.system = "ACCOUNT_LINK";
        if (response) {
            // TODO: Make sure this aligns
            this._response.data = {
                accountLinkRequestTTSContext: response
            };
        }
        return this;
    }

    askForNotification(intentId?: string): ResponseBuilder<T> {
        this._response.system = "PERMISSION_NOTIFICATION";
        this._response.data = {
            permissionNotificationIntent: intentId
        };
        return this;
    }

    askForSurfaceChange(notificationText?: string, notificationLabel?: string): ResponseBuilder<T> {
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

    askForListAccess(response?: string | Response): ResponseBuilder<T> {
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

    /*
     * Media
     */
    play(playable: PlayableMedia): ResponseBuilder<T> {
        if (!playable) {
            return this;
        }
        if (!Array.isArray(this._response.media)) {
            this._response.media = [];
        }
        this._response.media.push(playable);
        return this;
    }

    playPlaylist(playlist: Playlist<PlayableMedia> | PlayableMedia[]): ResponseBuilder<T> {
        if (!playlist) {
            return this;
        }
        this._response.media = playlist;
        return this;
    }

    stop(): ResponseBuilder<T> {
        this._response.system = "MEDIA_STOP";
        return this;
    }

    enqueue(next: PlayableMedia, current: PlayableMedia): ResponseBuilder<T> {
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

    build(): T {
        return this._response as T; // Not sure why I have to type this but it gives an error if I don't
    }

    withCanFulfill(results: CanFulfillIntentResult): ResponseBuilder<T> {
        return this;
    }

    askForCallTransfer(phoneNumber: string): AbstractResponseBuilder<T> {
        this._response.system = "TRANSFER_CALL";
        this._response.data = {
            transferPhoneNumber: phoneNumber
        };

        return this;
    }
}
