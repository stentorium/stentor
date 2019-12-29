/*! Copyright (c) 2019, XAPPmedia */
import { UserDataValue } from "../Context";
import { Device } from "../Device";
import { Card, ImageSpecification, ListItem } from "../Display";
import { PlayableMedia } from "../Media";
import { ApiAccessData } from "../Request";
import { CanFulfillIntentResult } from "../Response";
import { SuggestionTypes } from "../Suggestion";
import { UserDataType } from "../UserData";
import { Response, SimpleResponse } from "./Response";
import { ResponseOutput } from "./ResponseOutput";

export interface ResponseBuilderProps {
    device: Readonly<Device>;
    /**
     * Sets the background image for some channels with display surfaces.
     *
     * @deprecated In favor of setting the background image on the channel.
     * @type {ImageSpecification[]}
     * @memberof ResponseBuilderProps
     */
    backgroundImage?: ImageSpecification[];
    /**
     * Sets the title for some channels with display surfaces.
     *
     * @deprecated In favor of setting the title directly on the channel.
     * @type {string}
     * @memberof ResponseBuilderProps
     */
    assistantTitle?: string;
}

export abstract class AbstractResponseBuilder<R = any> {
    /**
     * Information about the device capabilities.  Use to determine
     * if you can present display information or play media.
     *
     * @protected
     * @type {Readonly<Device>}
     * @memberof AbstractResponseBuilder
     */
    protected readonly device: Readonly<Device>;
    /**
     * Do not use.
     * @deprecated
     * @protected
     * @type {ImageSpecification[]}
     * @memberof AbstractResponseBuilder
     */
    protected readonly backgroundImage?: ImageSpecification[];
    /**
     * Do not use.
     *
     * @protected
     * @type {string}
     * @memberof AbstractResponseBuilder
     */
    protected readonly assistantTitle?: string;
    /**
     * The response that will be communicated to the user
     *
     * @readonly
     * @type {Readonly<Response>}
     * @memberof ResponseBuilder
     */
    get response(): Readonly<Response<ResponseOutput>> | undefined {
        return this._response;
    }
    protected _response: Response<ResponseOutput>;

    /**
     * Tag used by supported 3rd party analytics to track the response.
     */
    public tag: string | undefined;

    constructor(props: ResponseBuilderProps) {
        this.tag = undefined;
        this.device = props.device;
        this._response = {};
    }
    /**
     * Respond to the user.
     *
     * Can contain just an output speech but can also contain an reprompt.
     *
     * @abstract
     * @param {Response} response
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract respond(response: Response): AbstractResponseBuilder<R>;
    /**
     * Say something to the user.
     *
     * @abstract
     * @param {(string | ResponseOutput)} ssml
     * @param {boolean} [append]
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract say(ssml: string | ResponseOutput, append?: boolean): AbstractResponseBuilder<R>;
    /**
     * Provide a reprompt, necessary if you want to "ask" something
     *
     * @abstract
     * @param {(string | ResponseOutput)} ssml
     * @param {boolean} [append]
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract reprompt(ssml: string | ResponseOutput, append?: boolean): AbstractResponseBuilder<R>;
    /**
     * Provide a card
     *
     * @abstract
     * @param {Card} card
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract withCard(card: Card): AbstractResponseBuilder<R>;
    /**
     * Provide a list (vertical selection)
     *
     * @param {ListItem[]} items
     * @param {string} title
     * @returns {AbstractResponseBuilder<R>}
     */
    abstract withList(items: ListItem[], title?: string): AbstractResponseBuilder<R>;
    /**
     * Provide a carousel (horizontal selection)
     * @param {ListItem[]} items
     * @returns {AbstractResponseBuilder<R>}
     */
    abstract withCarousel(items: ListItem[]): AbstractResponseBuilder<R>;
    /**
     * Provide suggestions for the user.
     *
     * Limited support across platforms for this at the moment, only Google Assistant.
     *
     * @abstract
     * @param {(SuggestionTypes | SuggestionTypes[])} suggestion
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract withSuggestions(
        suggestion: SuggestionTypes | SuggestionTypes[],
        append?: boolean
    ): AbstractResponseBuilder<R>;
    /**
     * Build intent pre-fetch results aka "CanFulfillRequest"
     * @param options
     */
    abstract withCanFulfill(results: CanFulfillIntentResult): AbstractResponseBuilder<R>;

    /******************************
     * Audio Specific Responses   *
     ******************************/

    /**
     * Play the provided audio
     *
     * @param {Playable} playable
     * @returns
     *
     * @memberOf AlexaResponseBuilder
     */
    abstract play(playable: PlayableMedia, offset?: number): AbstractResponseBuilder<R>;
    /**
     * Play a playlist
     *
     * Note: Only supported by Actions on Google at the moment.  If attempting to use this function on
     * Alexa, only the first item in the playlist will be played.
     *
     * @abstract
     * @param {(Playlist<PlayableMedia> | PlayableMedia[])} playlist
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract playPlaylist(playlist: Array<PlayableMedia> | PlayableMedia[]): AbstractResponseBuilder<R>;
    /**
     * Stop the current audio
     *
     * @abstract
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract stop(): AbstractResponseBuilder<R>;
    /**
     * Enqueue the next audio
     *
     * @abstract
     * @param {PlayableMedia} next
     * @param {PlayableMedia} current
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract enqueue(next: PlayableMedia, current: PlayableMedia): AbstractResponseBuilder<R>;
    /**
     * The number of playables that can be sent at once. Override it if the platform handles more.
     *
     * @returns {number}
     */
    public mediaQueueSize(): number {
        return 1;
    }

    /********************************************
     * Account Linking & Permission Responses   *
     ********************************************/

    /**
     * Request acct linking
     *
     * @param {string} ttsQuestion
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract askForAccountLinking(response?: string | SimpleResponse): AbstractResponseBuilder<R>;
    /**
     * Request notification to intent
     *
     * @beta This is a beta feature.
     * @param {string} intentId
     * @returns {AbstractResponseBuilder<R>}
     * @memberof ResponseBuilder
     */
    abstract askForNotification(intentId?: string): AbstractResponseBuilder<R>;
    /**
     *
     * @param {string} tts
     * @param {string} notificationLabel
     * @returns {AbstractResponseBuilder<R>}
     */
    abstract askForSurfaceChange(
        response?: string | SimpleResponse,
        notificationLabel?: string
    ): AbstractResponseBuilder<R>;
    /**
     * Request access to shopping lists
     * @param tts
     * @returns {AbstractResponseBuilder<R>}
     */
    abstract askForListAccess(response?: string | SimpleResponse): AbstractResponseBuilder<R>;
    /**
     * Chase down the user profile data
     * @param userDataType
     * @returns {Promise<UserDataValue>}
     */
    abstract askForUserData(userDataType: UserDataType, accessData?: ApiAccessData): Promise<UserDataValue>;
    /**
     * Build the response
     *
     * @abstract
     * @returns {T}
     * @memberof ResponseBuilder
     */
    abstract build(): R;
}
