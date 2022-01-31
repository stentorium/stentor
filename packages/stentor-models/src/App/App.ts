/*! Copyright (c) 2019, XAPPmedia */
import { ChannelData } from "../Channel";
import { ImageSpecification } from "../Display";
import { KnowledgebaseData } from "../Knowledgebase";
import { Locale, Localizable } from "../Locale";
import { Location } from "../Location";
import { NLUData } from "../NLU";
import { AppDataStreamsMap } from "./AppDataStreams";
import { AppEndpointMap } from "./AppEndpoint";
import { AppPlatformDataMap } from "./AppPlatformData";
import { AppStatus } from "./AppStatus";

export interface FullAppStatus extends AppStatus {
    /**
     * History of the app's status
     */
    statusHistory?: AppStatus[];
}

/**
 * An app locale is a description of an app as it will appear to users in other countries.
 */
export type LocaleSpecificApp = Partial<
    Pick<
        App,
        | "name"
        | "summary"
        | "description"
        | "alexaCategory"
        | "invocationName"
        | "examplePhrases"
        | "keywords"
        | "icon"
        | "smallIcon"
        | "largeIcon"
        | "termsOfUseUrl"
        | "privacyPolicyUrl"
    >
>;

export interface AppRuntimeData {
    /**
     * The title of the app.
     */
    title?: string;
    /**
     * This is the list of images available to anything where image is appropriate. Builders will pick and choose.
     */
    backgroundImage?: ImageSpecification[];
}

/**
 * App represents a set of publishing data and configuration data
 * for running the app.
 */
export interface App extends Localizable<LocaleSpecificApp> {
    /**
     * The name of the app.
     *
     * Must be a minimum of two characters and maximum of 50 characters.
     */
    name: string;
    /**
     * The ID for the application
     */
    appId: string;
    /**
     * @deprecated
     */
    organizationId?: string;
    /**
     * The Alexa skill identifier.
     *
     * @deprecated Use channels instead.
     */
    alexaSkillId?: string;
    /**
     * The Alexa category
     *
     * @deprecated Use channels instead.
     */
    alexaCategory?: string;
    /**
     * The project-id for the Action on Google project.
     *
     * @deprecated Use channels instead
     */
    actionsOnGoogleId?: string;
    /**
     * The client access token for Dialogflow that allows you to
     *
     * @deprecated Use channels instead
     */
    dialogflowClientToken?: string;
    /**
     * The developer access token for Dialogflow that allows you to CRUD intents.
     *
     * @deprecated Use channels instead
     */
    dialogflowDeveloperToken?: string;
    /**
     * The invocation name.
     *
     * This can be overridden for each individual channels.
     *
     */
    invocationName?: string;
    /**
     * The summary of the app.
     *
     * Shorter than the description, maximum 160 characters.
     *
     */
    summary?: string;
    /**
     * The description for the app.
     *
     * The description cannot be more than 4000 characters.
     *
     */
    description?: string;
    /**
     * Example phrases the help users know how to use the app.
     *
     * At least three are required for publication.
     *
     */
    examplePhrases?: string[];
    /**
     * Keywords to help when searching directories for the app
     *
     * Max of 30 keywords are allowed.
     *
     */
    keywords?: string[];
    /**
     * The URL where the app is served
     *
     * @deprecated Use channels instead
     */
    endPoint?: string | AppEndpointMap;
    /**
     * URL to the original icon file before transformation.
     *
     * Aspect ratio must be 1:1 and minimum dimensions are 512x512.
     */
    icon?: string;
    /**
     * A large icon for the app, 512x512 PNG
     *
     * Required for some channels, such as Alexa
     */
    largeIcon?: string;
    /**
     * A medium icon for the app, 192x192 PNG.
     *
     * Required for some channels, such as Actions On Google
     */
    mediumIcon?: string;
    /**
     * A small icon for the app, 108x108 PNG
     *
     * Required for some channels, such as Alexa
     */
    smallIcon?: string;
    /**
     * URL of the original banner image with aspect ratio of 16:9 and minimum dimensions of 1920x1080.
     *
     * Required for some channels, such as Actions on Google
     * 
     */
    banner?: string;
    /**
     * Banner that is 1920x1080.
     *
     * Required for some channels, such as Actions on Google
     *
     */
    largeBanner?: string;
    /**
     * URL to the privacy policy for the app
     *
     */
    privacyPolicyUrl?: string;
    /**
     * URL to the terms of use for the app
     *
     */
    termsOfUseUrl?: string;
    /**
     * Testing instructions for the app
     *
     */
    testingInstructions?: string;
    /**
     * Channel specific data for the app.
     *
     * @deprecated Use channels instead
     */
    platformData?: AppPlatformDataMap;
    /**
     * Channels for the app.
     *
     * Channels may have their own NLU and or Knowledgebase 
     * 
     * Upgrade from platformData as it allows to publish the same
     * assistant app multiple times to the same channel.
     *
     */
    channels?: ChannelData[];
    /**
     * The NLU available to the assistant application.
     * 
     */
    nlu?: NLUData[];
    /**
     * Knowledgebase available to the assistant application.
     * 
     * @alpha This feature is currently under development
     */
    knowledgebase?: KnowledgebaseData[];
    /**
     * Data streams for the app.
     *
     * A data stream is outgoing data hookups, typically analytics platforms.
     *
     */
    dataStreams?: AppDataStreamsMap;
    /**
     * Physical location associated with the app.
     */
    location?: Location;
    /**
     * The type of the account linking. This tells us how to redeem the token for PII.
     *
     * @deprecated Use channels instead
     */
    accountLinkType?: string;
    /**
     * This is the locale in which the app is primarily focused on. The app will publish to this locale with the
     * data provided. Items which can be overwritten can be placed in the "locale" section with the local necessary.
     *
     * @defaultValue "en"
     */
    defaultLocale?: Locale;
    /**
     * This is a series of locales that the apps supports.  These can override the
     * items that are in the original App.  The items in the main app are used as defaults if they
     * are not provided by this locale.
     */
    locales?: Partial<Record<Locale, LocaleSpecificApp>>;
    /**
     * Runtime data - anything you need from the app level metadata
     */
    runtimeData?: AppRuntimeData;
}
