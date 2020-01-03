/*! Copyright (c) 2019, XAPPmedia */
/**
 * Analytics
 */
export type BespokenDataStreamType = "bespoken";
export type DashbotDataStreamType = "dashbot";
export type VoiceLabsDataStreamType = "voiceLabs";
export type GoogleAnalyticsDataStreamType = "googleAnalytics";
export type ChatbaseDataStreamType = "chatbase";

/**
 * NLU services
 */
export type LuisType = "luis";
export type DialogflowType = "dialogflow";

/**
 * Types
 */
export type AppDataStreamTypes =
    | BespokenDataStreamType
    | VoiceLabsDataStreamType
    | GoogleAnalyticsDataStreamType
    | ChatbaseDataStreamType
    | LuisType
    | DialogflowType
    | DashbotDataStreamType;

export type AppDataStreamsMap = { [dataStream in AppDataStreamTypes]?: AppDataStream };

export type AppDataStreamsRepo = { [appId in string]?: AppDataStreamsMap };

/**
 * Third (or first) party providers of analytics, metrics, and monitoring
 * that are hooked up to receive transactional information about the app.
 */
export type AppDataStream =
    | BespokenDataStream
    | ChatbaseDataStream
    | GoogleAnalyticsStream
    | VoiceLabsDataStream
    | LuisDataStream
    | DialogflowDataStream
    | DashbotDataStream;

/**
 * Base data stream all data streams extend.
 */
export interface BaseDataStream {
    type: AppDataStreamTypes;
}

/**
 * Data for Bespoken Tools.
 *
 * See {@link https://bespoken.io}
 */
export interface BespokenDataStream extends BaseDataStream {
    type: BespokenDataStreamType;
    token: string;
}

/**
 * Data for Dashbot integration
 *
 * @see https://www.dashbot.io/voicelabs
 */
export interface DashbotDataStream extends BaseDataStream {
    type: DashbotDataStreamType;
    googleToken: string;
    alexaToken: string;
}

/**
 * Data for VoiceLabs
 *
 * @see http://voicelabs.co/
 */
export interface VoiceLabsDataStream extends BaseDataStream {
    type: VoiceLabsDataStreamType;
    googleToken?: string;
    alexaToken?: string;
}

/**
 * Data for Chatbase
 *
 * @see https://www.chatbase.com/
 */
export interface ChatbaseDataStream extends BaseDataStream {
    type: ChatbaseDataStreamType;
    token: string;
}

/**
 * Data for Google Analytics
 *
 * Token will be of format "UA-XXXXXXX"
 *
 * @see https://developer.amazon.com/blogs/alexa/post/TxPQVHWYRKJGXE/how-this-alexa-developer-easily-implemented-google-analytics-to-monitor-skill-performance
 */
export interface GoogleAnalyticsStream extends BaseDataStream {
    type: GoogleAnalyticsDataStreamType;
    token: string;
}

/**
 * Data for Luis NLU
 * 
 * @deprecated Use NLU on the App model
 */
export interface LuisDataStream extends BaseDataStream {
    type: LuisType;
    url: string;
    minimumScore?: number;
}

/**
 * Data for Dialogflow NLU
 * 
 * @deprecated Use NLU on the App model
 */
export interface DialogflowDataStream extends BaseDataStream {
    type: DialogflowType;
    url: string;
    authToken: string;
    minimumScore?: number;
}
