/*! Copyright (c) 2019, XAPPmedia */
import { ChannelData } from "../Channel";
import { ImageSpecification } from "../Display";
import { Locale, Localizable } from "../Locale";
import { Location } from "../Location";
import { NLUData } from "../NLU";
import { IPRights } from "../Organization";
import { TemplateType } from "../Template";
import { AppDataStreamsMap } from "./AppDataStreams";
import { AppEndpointMap } from "./AppEndpoint";
import { AppPlatformDataMap } from "./AppPlatformData";
import { AppStatus } from "./AppStatus";

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

export interface FullAppStatus extends AppStatus {
    /**
     * History of the app's status
     *
     * @type {AppStatus[]}
     * @memberof App
     */
    statusHistory?: AppStatus[];
}

export interface AppRuntimeData {
    /**
     * The title of the app.
     */
    title?: string;
    /**
     * This is the list of images available to anything where image is appropriate. Builders will pick and choose.
     *
     * @type {ImageSpecification}
     * @memberOf App
     */
    backgroundImage?: ImageSpecification[];
}

/**
 * App represents a set of publishing data and configuration data
 * for running the app.
 *
 * @export
 * @interface App
 */
export interface App extends Localizable<LocaleSpecificApp> {
    /**
     * The name of the app.
     *
     * Must be a minimum of two characters and maximum of 50 characters.
     *
     * @type {string}
     * @memberof App
     */
    name: string;
    /**
     * The ID of the organization the app belongs to
     *
     * @type {string}
     * @memberof App
     */
    organizationId: string;
    /**
     * The ID for the application
     *
     * @type {string}
     * @memberof App
     */
    appId: string;
    /**
     * Current status of the app
     *
     * @type {AppStatus}
     * @memberof App
     */
    status?: FullAppStatus;
    /**
     * The Alexa skill identifier.
     *
     * @type {string}
     * @memberof App
     * @deprecated Use channels instead.
     */
    alexaSkillId?: string;
    /**
     * The Alexa category
     *
     * @type {SkillCategories}
     * @memberof App
     * @deprecated Use channels instead.
     */
    alexaCategory?: string;
    /**
     * The project-id for the Action on Google project.
     *
     * @type {string}
     * @memberof App
     * @deprecated Use channels instead
     */
    actionsOnGoogleId?: string;
    /**
     * The client access token for Dialogflow that allows you to
     *
     * @type {string}
     * @memberof App
     * @deprecated Use channels instead
     */
    dialogflowClientToken?: string;
    /**
     * The developer access token for Dialogflow that allows you to CRUD intents.
     *
     * @type {string}
     * @memberof App
     * @deprecated Use channels instead
     */
    dialogflowDeveloperToken?: string;
    /**
     * Type of template the app and its intents
     * adhere to.
     *
     * @type {TemplateType}
     * @memberof App
     */
    templateType?: TemplateType;
    /**
     * The invocation name.
     *
     * This can be overridden for each individual channels.
     *
     * @type {string}
     * @memberof App
     */
    invocationName?: string;
    /**
     * The summary of the app.
     *
     * Shorter than the description, maximum 160 characters.
     *
     * @type {string}
     * @memberof App
     */
    summary?: string;
    /**
     * The description for the app.
     *
     * The description cannot be more than 4000 characters.
     *
     * @type {string}
     * @memberof App
     */
    description?: string;
    /**
     * Example phrases the help users know how to use the app.
     *
     * At least three are required for publication.
     *
     * @type {string[]}
     * @memberof App
     */
    examplePhrases?: string[];
    /**
     * Keywords to help when searching directories for the app
     *
     * Max of 30 keywords are allowed.
     *
     * @type {string[]}
     * @memberof App
     */
    keywords?: string[];
    /**
     * The URL where the app is served
     *
     * @type {string}
     * @memberof App
     * @deprecated Use channels instead
     */
    endPoint?: string | AppEndpointMap;
    /**
     * URL to the original icon file before transformation.
     *
     * Aspect ration must be 1:1 and minimum dimensions are 512x512.
     *
     * @type {string}
     * @memberof App
     */
    icon?: string;
    /**
     * A large icon for the app, 512x512 PNG
     *
     * Required for Alexa
     *
     * @type {string}
     * @memberof App
     */
    largeIcon?: string;
    /**
     * A medium icon for the app, 192x192 PNG.
     *
     * Required for Actions On Google
     *
     * @type {string}
     * @memberof App
     */
    mediumIcon?: string;
    /**
     * A small icon for the app, 108x108 PNG
     *
     * Required for Alexa
     *
     * @type {string}
     * @memberof App
     */
    smallIcon?: string;
    /**
     * URL of the original banner image with aspect ratio of 16:9 and minimum dimensions of 1920x1080.
     *
     * Required by Actions on Google
     *
     * @type {string}
     * @memberof App
     */
    banner?: string;
    /**
     * Banner that is 1920x1080.
     *
     * Required by Actions on Google
     *
     * @type {string}
     * @memberof App
     */
    largeBanner?: string;
    /**
     * URL to the privacy policy for the app
     *
     * @type {string}
     * @memberof App
     */
    privacyPolicyUrl?: string;
    /**
     * URL to the terms of use for the app
     *
     * @type {string}
     * @memberof App
     */
    termsOfUseUrl?: string;
    /**
     * Testing instructions for the app
     *
     * @type {string}
     * @memberof App
     */
    testingInstructions?: string;
    /**
     * Channel specific data for the app.
     *
     * @type {AppPlatformDataMap}
     * @memberof App
     * @deprecated Use channels instead
     */
    platformData?: AppPlatformDataMap;
    /**
     * Channels for the app.
     *
     * Upgrade from platformData as it allows to publish the same
     * assistant app multiple times to the same channel.
     *
     * @type {ChannelData[]}
     * @memberof App
     */
    channels?: ChannelData[];
    /**
     * The NLU available to the assistant application.
     *
     * @type {NLUData[]}
     * @memberof App
     */
    nlu?: NLUData[];
    /**
     * Data streams for the app.
     *
     * A data stream is outgoing data hookups, typically analytics platforms.
     *
     * @type {AppDataStreams}
     * @memberof App
     */
    dataStreams?: AppDataStreamsMap;
    /**
     * Physical location associated with the app.
     *
     * @type {Location}
     * @memberof App
     */
    location?: Location;
    /**
     * The subscription ID that is linked to this app.
     *
     * @type {string}
     * @memberof App
     * @deprecated Will be moving to OVAI specific App model
     */
    stripeSubscriptionId?: string;
    /**
     * Allows app-specific overriding of IPRights
     *
     * @type {IPRights}
     * @memberof App
     * @deprecated Will be moving to OVAI specific App model
     */
    ipRights?: IPRights;
    /**
     * Allows stentor_admins to view and add notes to apps for internal use
     *
     * @type {string}
     * @memberof App
     * @deprecated Will be moving to OVAI specific App model
     */
    internalNotes?: string;
    /**
     * The type of the account linking. This tells us how to redeem the token for PII.
     *
     * @type {string}
     * @memberof App
     * @deprecated Use channels instead
     */
    accountLinkType?: string;
    /**
     * This is the locale in which the app is primarily focused on. The app will publish to this locale with the
     * data provided. Items which can be overwritten can be placed in the "locale" section with the local necessary.
     *
     * Default: "en"
     *
     * @type {Locale}
     * @memberof App
     */
    defaultLocale?: Locale;
    /**
     * This is a series of locales that the apps supports.  These can override the
     * items that are in the original App.  The items in the main app are used as defaults if they
     * are not provided by this locale.
     *
     * @type {Partial<Record<Locale, AppLocale>>}
     * @memberof App
     */
    locales?: Partial<Record<Locale, LocaleSpecificApp>>;
    /**
     * Runtime data - anything you need from the app level metadata
     *
     * @type {AppRuntimeData}
     * @memberof App
     */
    runtimeData?: AppRuntimeData;
}
