[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / App

# Interface: App

Defined in: [packages/stentor-models/src/App/App.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L56)

App represents a set of publishing data and configuration data
for running the app.

## Extends

- [`Localizable`](Localizable.md)\<[`LocaleSpecificApp`](../type-aliases/LocaleSpecificApp.md)\>

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L62)

The name of the app.

Must be a minimum of two characters and maximum of 50 characters.

***

### appId

> **appId**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L66)

The ID for the application

***

### ~~organizationId?~~

> `optional` **organizationId**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L70)

#### Deprecated

***

### ~~alexaSkillId?~~

> `optional` **alexaSkillId**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:76](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L76)

The Alexa skill identifier.

#### Deprecated

Use channels instead.

***

### ~~alexaCategory?~~

> `optional` **alexaCategory**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L82)

The Alexa category

#### Deprecated

Use channels instead.

***

### ~~actionsOnGoogleId?~~

> `optional` **actionsOnGoogleId**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:88](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L88)

The project-id for the Action on Google project.

#### Deprecated

Use channels instead

***

### ~~dialogflowClientToken?~~

> `optional` **dialogflowClientToken**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:94](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L94)

The client access token for Dialogflow that allows you to

#### Deprecated

Use channels instead

***

### ~~dialogflowDeveloperToken?~~

> `optional` **dialogflowDeveloperToken**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:100](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L100)

The developer access token for Dialogflow that allows you to CRUD intents.

#### Deprecated

Use channels instead

***

### invocationName?

> `optional` **invocationName**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:107](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L107)

The invocation name.

This can be overridden for each individual channels.

***

### summary?

> `optional` **summary**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:114](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L114)

The summary of the app.

Shorter than the description, maximum 160 characters.

***

### description?

> `optional` **description**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:121](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L121)

The description for the app.

The description cannot be more than 4000 characters.

***

### examplePhrases?

> `optional` **examplePhrases**: `string`[]

Defined in: [packages/stentor-models/src/App/App.ts:128](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L128)

Example phrases the help users know how to use the app.

At least three are required for publication.

***

### keywords?

> `optional` **keywords**: `string`[]

Defined in: [packages/stentor-models/src/App/App.ts:135](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L135)

Keywords to help when searching directories for the app

Max of 30 keywords are allowed.

***

### ~~endPoint?~~

> `optional` **endPoint**: `string` \| [`AppEndpointMap`](AppEndpointMap.md)

Defined in: [packages/stentor-models/src/App/App.ts:141](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L141)

The URL where the app is served

#### Deprecated

Use channels instead

***

### icon?

> `optional` **icon**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:147](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L147)

URL to the original icon file before transformation.

Aspect ratio must be 1:1 and minimum dimensions are 512x512.

***

### largeIcon?

> `optional` **largeIcon**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:153](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L153)

A large icon for the app, 512x512 PNG

Required for some channels, such as Alexa

***

### mediumIcon?

> `optional` **mediumIcon**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:159](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L159)

A medium icon for the app, 192x192 PNG.

Required for some channels, such as Actions On Google

***

### smallIcon?

> `optional` **smallIcon**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:165](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L165)

A small icon for the app, 108x108 PNG

Required for some channels, such as Alexa

***

### banner?

> `optional` **banner**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:172](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L172)

URL of the original banner image with aspect ratio of 16:9 and minimum dimensions of 1920x1080.

Required for some channels, such as Actions on Google

***

### largeBanner?

> `optional` **largeBanner**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:179](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L179)

Banner that is 1920x1080.

Required for some channels, such as Actions on Google

***

### privacyPolicyUrl?

> `optional` **privacyPolicyUrl**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:184](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L184)

URL to the privacy policy for the app

***

### termsOfUseUrl?

> `optional` **termsOfUseUrl**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:189](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L189)

URL to the terms of use for the app

***

### testingInstructions?

> `optional` **testingInstructions**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:194](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L194)

Testing instructions for the app

***

### ~~platformData?~~

> `optional` **platformData**: [`AppPlatformDataMap`](AppPlatformDataMap.md)

Defined in: [packages/stentor-models/src/App/App.ts:200](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L200)

Channel specific data for the app.

#### Deprecated

Use channels instead

***

### channels?

> `optional` **channels**: [`ChannelData`](ChannelData.md)[]

Defined in: [packages/stentor-models/src/App/App.ts:210](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L210)

Channels for the app.

Channels may have their own NLU and or Knowledgebase 

Upgrade from platformData as it allows to publish the same
assistant app multiple times to the same channel.

***

### nlu?

> `optional` **nlu**: [`NLUData`](NLUData.md)[]

Defined in: [packages/stentor-models/src/App/App.ts:215](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L215)

The NLU available to the assistant application.

***

### knowledgebase?

> `optional` **knowledgebase**: [`KnowledgebaseData`](KnowledgebaseData.md)[]

Defined in: [packages/stentor-models/src/App/App.ts:221](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L221)

**`Alpha`**

Knowledgebase available to the assistant application.

 This feature is currently under development

***

### dataStreams?

> `optional` **dataStreams**: [`AppDataStreamsMap`](../type-aliases/AppDataStreamsMap.md)

Defined in: [packages/stentor-models/src/App/App.ts:228](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L228)

Data streams for the app.

A data stream is outgoing data hookups, typically analytics platforms.

***

### location?

> `optional` **location**: [`Location`](Location.md)

Defined in: [packages/stentor-models/src/App/App.ts:232](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L232)

Physical location associated with the app.

***

### ~~accountLinkType?~~

> `optional` **accountLinkType**: `string`

Defined in: [packages/stentor-models/src/App/App.ts:238](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L238)

The type of the account linking. This tells us how to redeem the token for PII.

#### Deprecated

Use channels instead

***

### defaultLocale?

> `optional` **defaultLocale**: [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-models/src/App/App.ts:245](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L245)

This is the locale in which the app is primarily focused on. The app will publish to this locale with the
data provided. Items which can be overwritten can be placed in the "locale" section with the local necessary.

#### Default Value

```ts
"en"
```

#### Overrides

[`Localizable`](Localizable.md).[`defaultLocale`](Localizable.md#defaultlocale)

***

### locales?

> `optional` **locales**: `Partial`\<`Record`\<[`Locale`](../type-aliases/Locale.md), [`LocaleSpecificApp`](../type-aliases/LocaleSpecificApp.md)\>\>

Defined in: [packages/stentor-models/src/App/App.ts:251](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L251)

This is a series of locales that the apps supports.  These can override the
items that are in the original App.  The items in the main app are used as defaults if they
are not provided by this locale.

#### Overrides

[`Localizable`](Localizable.md).[`locales`](Localizable.md#locales)

***

### runtimeData?

> `optional` **runtimeData**: [`AppRuntimeData`](AppRuntimeData.md)

Defined in: [packages/stentor-models/src/App/App.ts:255](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L255)

Runtime data - anything you need from the app level metadata
