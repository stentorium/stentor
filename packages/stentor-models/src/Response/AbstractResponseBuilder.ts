/*! Copyright (c) 2019, XAPPmedia */
import { UserDataValue } from "../Context";
import { Device } from "../Device";
import { Card, ImageSpecification, ListItem } from "../Display";
import { PlayableMedia } from "../Media";
import { ApiAccessData } from "../Request";
import { ActiveContext, CanFulfillIntentResult } from "../Response";
import { SuggestionTypes } from "../Suggestion";
import { UserDataType } from "../UserData";
import { Response, SimpleResponse } from "./Response";
import { ResponseOutput } from "./ResponseOutput";
import { OrderDescription, PaymentParameters } from "./Transactions";

export interface ResponseBuilderProps {
    /**
     * Capabilities of the current device used by the builder
     */
    device: Readonly<Device>;
    /**
     * Sets the background image for some channels with display surfaces.
     *
     * @deprecated In favor of setting the background image on the channel.
     */
    backgroundImage?: ImageSpecification[];
    /**
     * Sets the title for some channels with display surfaces.
     *
     * @deprecated In favor of setting the title directly on the channel.
     */
    assistantTitle?: string;
}

export abstract class AbstractResponseBuilder<R = any> {
    /**
     * Information about the device capabilities.  Use to determine
     * if you can present display information or play media.
     *
     * @readonly
     */
    protected readonly device: Readonly<Device>;
    /**
     * Do not use.
     *
     * @deprecated Use metadata from the App model
     */
    protected readonly backgroundImage?: ImageSpecification[];
    /**
     * Do not use.
     *
     * @deprecated Use metadata from the App model
     */
    protected readonly assistantTitle?: string;
    /**
     * The response that will be communicated to the user
     *
     * @readonly
     */
    public get response(): Readonly<Response<ResponseOutput>> | undefined {
        return this._response;
    }
    /**
     * @internal
     */
    protected _response: Response<ResponseOutput>;

    /**
     * Tag used by supported 3rd party analytics to track the response.
     */
    public tag: string | string[] | undefined;

    public constructor(props: ResponseBuilderProps) {
        this.tag = undefined;
        this.device = props.device;
        this._response = {};
    }
    /**
     * Respond to the user.
     *
     * Can contain just an output speech but can also contain an reprompt.
     *
     * @param response - The entire response
     * @returns The builder instance
     */
    public abstract respond(response: Response): AbstractResponseBuilder<R>;
    /**
     * Say something to the user.
     *
     * @param ssml - The response, either as a string or a response output object which contains SSML and display text.
     * @param append - Append the response to the existing, if available
     * @returns The builder instance
     */
    public abstract say(ssml: string | ResponseOutput, append?: boolean): AbstractResponseBuilder<R>;
    /**
     * Provide a reprompt, necessary if you want to "ask" something
     *
     * @param ssml - The reprompt, either as a string or a response output object which contains SSML and display text.
     * @param append - Append the response to the existing, if available
     * @returns The builder instance
     */
    public abstract reprompt(ssml: string | ResponseOutput, append?: boolean): AbstractResponseBuilder<R>;
    /**
     * Provide a card
     *
     * @param card - Card to be displayed to the user
     * @returns The builder instance
     */
    public abstract withCard(card: Card): AbstractResponseBuilder<R>;
    /**
     * Provide a list (vertical selection)
     *
     * @param items - List items to display
     * @param title - The title for the list
     * @returns The builder instance
     */
    public abstract withList(items: ListItem[], title?: string): AbstractResponseBuilder<R>;
    /**
     * Provide a carousel (horizontal selection)
     *
     * @param items - List items to display in the carousel
     * @returns The builder instance
     */
    public abstract withCarousel(items: ListItem[]): AbstractResponseBuilder<R>;
    /**
     * Add a custom display object to the response
     *
     * @param display - A custom display object
     * @returns The builder instance
     */
    public abstract withDisplay(display: object): AbstractResponseBuilder<R>;
    /**
     * Provide suggestions for the user.
     *
     * Limited support across platforms for this at the moment, only Google Assistant.
     *
     * @param suggestion - Either a single suggestion chip or an array
     * @returns The builder instance
     */
    public abstract withSuggestions(
        suggestion: SuggestionTypes | SuggestionTypes[],
        append?: boolean
    ): AbstractResponseBuilder<R>;
    /**
     * Active contexts provide guidance to the NLU to help it better select the next intent from the user's utterance.
     *
     * @param context - Either a single context or array of contexts.
     * @returns The builder instance
     */
    public abstract withActiveContext(context: ActiveContext | ActiveContext[]): AbstractResponseBuilder<R>;
    /**
     * Build intent pre-fetch results aka "CanFulfillRequest"
     *
     * @param results
     * @returns The builder instance
     */
    public abstract withCanFulfill(results: CanFulfillIntentResult): AbstractResponseBuilder<R>;

    /******************************
     * Audio Specific Responses   *
     ******************************/

    /**
     * Play the provided audio
     *
     * @param playable - Media to play
     * @returns The builder instance
     */
    public abstract play(playable: PlayableMedia, offset?: number): AbstractResponseBuilder<R>;
    /**
     * Play a playlist
     *
     * Note: Only supported by Actions on Google at the moment.  If attempting to use this function on
     * Alexa, only the first item in the playlist will be played.
     *
     * @param playlist - The playlist to be played
     * @returns The builder instance
     */
    public abstract playPlaylist(playlist: PlayableMedia[] | PlayableMedia[]): AbstractResponseBuilder<R>;
    /**
     * Stop the current audio
     *
     * @returns The builder instance
     */
    public abstract stop(): AbstractResponseBuilder<R>;
    /**
     * Enqueue the next audio
     *
     * @param next - Track to be queued
     * @param current - The current track playing
     * @returns The builder instance
     */
    public abstract enqueue(next: PlayableMedia, current: PlayableMedia): AbstractResponseBuilder<R>;
    /**
     * The number of playables that can be sent at once. Override it if the platform handles more.
     */
    public mediaQueueSize(): number {
        return 1;
    }

    /********************************************
     * Account Linking & Permission Responses   *
     ********************************************/

    /**
     * Request account linking
     *
     * @returns The builder instance
     */
    public abstract askForAccountLinking(response?: string | SimpleResponse): AbstractResponseBuilder<R>;
    /**
     * Request notification to intent
     *
     * @beta This is a beta feature.
     * @param intentId -
     * @returns The builder instance
     */
    public abstract askForNotification(intentId?: string): AbstractResponseBuilder<R>;
    /**
     * Ask the user to change surfaces, for example from a smart speaker to a mobile phone.
     *
     * @param response - Response to give as context to the user for the surface change
     * @param notificationLabel - The label for the notification on the new surface
     * @returns The builder instance
     */
    public abstract askForSurfaceChange(
        response?: string | SimpleResponse,
        notificationLabel?: string
    ): AbstractResponseBuilder<R>;
    /**
     * Request access to shopping lists
     *
     * @returns The builder instance
     */
    public abstract askForListAccess(response?: string | SimpleResponse): AbstractResponseBuilder<R>;
    /**
     * Chase down the user profile data
     *
     * @returns The builder instance
     */
    public abstract askForUserData(userDataType: UserDataType, accessData?: ApiAccessData): Promise<UserDataValue>;
    /**
     * Ask for call transfer (on telephony capable channels)
     *
     * @param phoneNumber - The phone number to transfer the call to
     * @returns The builder instance
     */
    public abstract askForCallTransfer(phoneNumber: string): AbstractResponseBuilder<R>;
    /**
    *
    * @alpha - The feature is under active development
    * @param handoffTargetId - The id that represents the handoff target (app id/name, queue id/name, etc)
    */
    public abstract askForHandoff(handoffTargetId: string): AbstractResponseBuilder<R>;
    /**
     * Check if the user can "transact"
     */
    public abstract askTransactionRequirements(): AbstractResponseBuilder<R>;
    /**
     * Ask the platform to query the delivery address
     *
     * @param response The reason for the delivery address ("To know where to send the order")
     */
    public abstract askForDeliveryAddress(response?: string | SimpleResponse): AbstractResponseBuilder<R>;
    /**
     *
     * @param paymentParameters (google payment or merchant)
     * @param order the order description
     */
    public abstract askForTransactionDecision(paymentParameters: PaymentParameters, order: OrderDescription): AbstractResponseBuilder<R>;
    /**
     *
     * @param response To announce the order was completed ("Your order ${conv.data.UNIQUE_ORDER_ID} is all set!")
     * @param order the order description
     */
    public abstract askForOrderUpdate(response: string | SimpleResponse, order: OrderDescription): AbstractResponseBuilder<R>;
    /**
     * Build the response
     *
     * @returns The built response
     */
    public abstract build(): R;
}
