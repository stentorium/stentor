[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AlexaPlatformData

# Interface: AlexaPlatformData

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L51)

Alexa specific data required for publication

## Extends

- [`BaseData`](BaseData.md)

## Properties

### directoryListing?

> `optional` **directoryListing**: `string`

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L19)

URL for the directory listing

#### Inherited from

[`BaseData`](BaseData.md).[`directoryListing`](BaseData.md#directorylisting)

***

### platform

> **platform**: `"alexa"`

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L52)

The platform

#### Overrides

[`BaseData`](BaseData.md).[`platform`](BaseData.md#platform)

***

### category?

> `optional` **category**: `string`

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L59)

Part of the Alexa Skill Manifest, th category communicates
what type of functionality the skill performs.

See [https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation](https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation)

***

### privacyAndCompliance?

> `optional` **privacyAndCompliance**: `Pick`\<[`PrivacyAndCompliance`](PrivacyAndCompliance.md), keyof [`RequiredAlexaPrivacyAndCompliance`](RequiredAlexaPrivacyAndCompliance.md)\>

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:65](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L65)

Part of the Alexa Skill Manifest.

See [https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation](https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation)

***

### distributionMode?

> `optional` **distributionMode**: `"PUBLIC"` \| `"PRIVATE"`

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:71](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L71)

Part of the Alexa Skill Manifest publishing information, either "PUBLIC" or "PRIVATE".

See [https://developer.amazon.com/docs/smapi/skill-manifest.html](https://developer.amazon.com/docs/smapi/skill-manifest.html)

***

### isAvailableWorldwide?

> `optional` **isAvailableWorldwide**: `boolean`

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:78](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L78)

Part of the Alexa Skill Manifest publishing information, if true
the skill will be distributed in all countries covered by the specified locales.

See [https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation](https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation)

***

### distributionCountries?

> `optional` **distributionCountries**: `string`[]

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:86](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L86)

Part of the Alexa Skill Manifest publishing information, when isAvailableWorldwide is
false this must be specified.  It is an array of ISO 3166-1 alpha-2 format country strings
where the skill can be distributed.

See [https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation](https://developer.amazon.com/docs/smapi/skill-manifest.html#publishinginformation)

***

### permissions?

> `optional` **permissions**: `object`[]

Defined in: [packages/stentor-models/src/App/AppPlatformData.ts:92](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppPlatformData.ts#L92)

Part of the Alexa Skill Manifest, an array of named permissions that the skill can use.

See [https://developer.amazon.com/docs/smapi/skill-manifest.html#permissions](https://developer.amazon.com/docs/smapi/skill-manifest.html#permissions)

#### name

> **name**: `string`
