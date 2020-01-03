/*! Copyright (c) 2019, XAPPmedia */

export interface AppPlatformDataMap {
    alexa?: AlexaPlatformData;
    google?: GooglePlatformData;
}

/**
 * Platform specific information by platform type.
 */
export interface BaseData {
    /**
     * The platform
     */
    platform: string;
    /**
     * URL for the directory listing
     */
    directoryListing?: string;
}

/**
 * Privacy and compliance data required for Alexa
 */
export interface PrivacyAndCompliance {
    allowsPurchases?: boolean;
    usesPersonalInfo?: boolean;
    isChildDirected?: boolean;
    isExportCompliant?: boolean;
    containsAds?: boolean;
    locales?: {
        [locale: string]: {
            privacyPolicyUrl: string;
            termsOfUseUrl: string;
        };
    };
}

// Which of the AlexaPrivacyAndCompliance properties are required
export interface RequiredAlexaPrivacyAndCompliance {
    allowsPurchases: boolean;
    usesPersonalInfo: boolean;
    isChildDirected: boolean;
    isExportCompliant: boolean;
    containsAds: boolean;
}

/**
 * Alexa specific data required for publication
 */
export interface AlexaPlatformData extends BaseData {
    platform: "alexa";
    /**
     * Part of the Alexa Skill Manifest, th category communicates
     * what type of functionality the skill performs.
     *
     * See {@link https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation}
     */
    category?: string;
    /**
     * Part of the Alexa Skill Manifest.
     *
     * See {@link https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation}
     */
    privacyAndCompliance?: Pick<PrivacyAndCompliance, keyof RequiredAlexaPrivacyAndCompliance>;
    /**
     * Part of the Alexa Skill Manifest publishing information, either "PUBLIC" or "PRIVATE".
     *
     * See {@link https://developer.amazon.com/docs/smapi/skill-manifest.html}
     */
    distributionMode?: "PUBLIC" | "PRIVATE";
    /**
     * Part of the Alexa Skill Manifest publishing information, if true
     * the skill will be distributed in all countries covered by the specified locales.
     *
     * See {@link https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation}
     */
    isAvailableWorldwide?: boolean;
    /**
     * Part of the Alexa Skill Manifest publishing information, when isAvailableWorldwide is
     * false this must be specified.  It is an array of ISO 3166-1 alpha-2 format country strings
     * where the skill can be distributed.
     *
     * See {@link https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation}
     */
    distributionCountries?: string[];
    /**
     * Part of the Alexa Skill Manifest, an array of named permissions that the skill can use.
     *
     * See {@link https://developer.amazon.com/docs/smapi/skill-manifest.html#permissions}
     */
    permissions?: { name: string }[];
}

export interface GoogleAdditionalInformationQuestions {
    /**
     * From the copy of the question:
     *
     * Are children under the age of 13 one of the intended audiences of your Actions?
     * If yes, you must join the Actions for Families program. The Actions for Families program allows
     * developers to designate that their Actions are family-friendly, so parents and kids can find trusted,
     * high-quality content more easily on the Google Assistant.
     */
    intendedForUnderThirteen?: boolean;
    /**
     * From the copy of the question:
     *
     * Do your Actions contain alcohol or tobacco-related content?
     * If yes, you must include age verification at the beginning of the conversation.
     * If your Actions mainly sell alcohol or tobacco, you must implement account
     * linking and verify that the user meets legal age requirements.
     */
    alcoholAndTobaccoRelatedContent?: boolean;
}

/**
 * Google specific information required for publication
 */
export interface GooglePlatformData extends BaseData {
    platform: "google";
    additionalInformationQuestions?: GoogleAdditionalInformationQuestions;
}

export interface DialogflowV2Data extends BaseData {
    platform: "dialogflow2";
    projectId: string;
}
