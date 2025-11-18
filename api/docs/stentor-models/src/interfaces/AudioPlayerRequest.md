[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AudioPlayerRequest

# Interface: AudioPlayerRequest

Defined in: [packages/stentor-models/src/Request/AudioPlayerRequest.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AudioPlayerRequest.ts#L26)

AudioPlayer requests handle audio life-cycle events such as playback started, playback stopped,
playback failed, etc.

See [https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-audioplayer-interface-reference#requests](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/custom-audioplayer-interface-reference#requests)

## Extends

- [`BaseRequest`](BaseRequest.md)

## Properties

### type

> **type**: `"AUDIO_PLAYER_REQUEST"`

Defined in: [packages/stentor-models/src/Request/AudioPlayerRequest.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AudioPlayerRequest.ts#L27)

Type of the request.

#### Overrides

[`BaseRequest`](BaseRequest.md).[`type`](BaseRequest.md#type)

***

### event

> **event**: [`AudioPlayerEvent`](../type-aliases/AudioPlayerEvent.md)

Defined in: [packages/stentor-models/src/Request/AudioPlayerRequest.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AudioPlayerRequest.ts#L28)

***

### token

> **token**: `string`

Defined in: [packages/stentor-models/src/Request/AudioPlayerRequest.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AudioPlayerRequest.ts#L29)

***

### offsetInMilliseconds

> **offsetInMilliseconds**: `number`

Defined in: [packages/stentor-models/src/Request/AudioPlayerRequest.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AudioPlayerRequest.ts#L30)

***

### errorType?

> `optional` **errorType**: `string`

Defined in: [packages/stentor-models/src/Request/AudioPlayerRequest.ts:34](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AudioPlayerRequest.ts#L34)

Only available when an AudioPlayerPlaybackFailedEvent

***

### errorMessage?

> `optional` **errorMessage**: `string`

Defined in: [packages/stentor-models/src/Request/AudioPlayerRequest.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/AudioPlayerRequest.ts#L38)

Only available when an AudioPlayerPlaybackFailedEvent

***

### overrideKey?

> `optional` **overrideKey**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L35)

Used during forwarding and redirecting the request to another handler.  When set it
pulls content or paths for this key instead of for the request.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`overrideKey`](BaseRequest.md#overridekey)

***

### createdTime?

> `optional` **createdTime**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L39)

When the message was created, an ISO-8601 compatible date time string

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`createdTime`](BaseRequest.md#createdtime)

***

### userId

> **userId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L43)

ID for the user making the request.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`userId`](BaseRequest.md#userid)

***

### deviceId?

> `optional` **deviceId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L47)

Unique identifier provided by the channel for the user's current device.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`deviceId`](BaseRequest.md#deviceid)

***

### requestId?

> `optional` **requestId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L51)

Optional unique identifier for the request provided by the channel.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`requestId`](BaseRequest.md#requestid)

***

### anonymous?

> `optional` **anonymous**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L58)

The user is anonymous, or a guest.

The user either does not yet have a verified identity or have
chosen to not have any data saved about them.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`anonymous`](BaseRequest.md#anonymous)

***

### isNewSession?

> `optional` **isNewSession**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L62)

Is the request a new session.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`isNewSession`](BaseRequest.md#isnewsession)

***

### accessToken?

> `optional` **accessToken**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L66)

Access token from account linking

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`accessToken`](BaseRequest.md#accesstoken)

***

### apiAccess?

> `optional` **apiAccess**: [`ApiAccessData`](ApiAccessData.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:71](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L71)

API access data from the platform
In case there is an APIs that provides services like list management, messaging...

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`apiAccess`](BaseRequest.md#apiaccess)

***

### rawQuery?

> `optional` **rawQuery**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:75](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L75)

Raw speech to text (STT) query, not available on all platforms.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`rawQuery`](BaseRequest.md#rawquery)

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L82)

The platform the request came from.

Example platforms are Google's Dialogflow & Amazon's Lex.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`platform`](BaseRequest.md#platform)

***

### channel?

> `optional` **channel**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:86](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L86)

The specific channel that the platform provides.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`channel`](BaseRequest.md#channel)

***

### device?

> `optional` **device**: [`Device`](Device.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:93](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L93)

Information about the device as far as capabilities such as screen or web browser available.

This information is available in two places, also on the context object, until it is removed from the context
in the next major release.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`device`](BaseRequest.md#device)

***

### locale?

> `optional` **locale**: [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:100](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L100)

User's locale, such as us-EN and es-MX.

Possible values for Alexa are defined here: https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-locale
Possible values for Dialogflow are defined here: https://dialogflow.com/docs/reference/language

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`locale`](BaseRequest.md#locale)

***

### isBargeIn?

> `optional` **isBargeIn**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:106](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L106)

Is the request a barge in

Currently only set on Google and Dialogflow request

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`isBargeIn`](BaseRequest.md#isbargein)

***

### isHealthCheck?

> `optional` **isHealthCheck**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:112](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L112)

Is the request a health check.

Currently only Google and Dialogflow perform health checks.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`isHealthCheck`](BaseRequest.md#ishealthcheck)

***

### attributes?

> `optional` **attributes**: `Record`\<`string`, `unknown`\>

Defined in: [packages/stentor-models/src/Request/Request.ts:125](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L125)

Optional request attributes to be passed through on the request.

If the channel supports it, it will be populated.

Some common keys that are use are, all optional:

* 
* currentUrl - For channels installed on websites, contains window.location.href information on where the user is
* isLocal - Boolean for if the currentUrl is to localhost.  If it is true then most likely currentUrl will be undefined.
* environment - Used to override the environment

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`attributes`](BaseRequest.md#attributes)
