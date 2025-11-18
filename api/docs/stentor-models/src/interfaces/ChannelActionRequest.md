[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ChannelActionRequest

# Interface: ChannelActionRequest

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L13)

**`Beta`**

A user initiated action performed on the channel.  The most common is opening a URL.

This can be used to provide a follow up response to the user performing an action or simply for keeping
track of if the URL opened.

 This is new and subject to change

## Extends

- [`BaseRequest`](BaseRequest.md)

## Properties

### type

> **type**: `"CHANNEL_ACTION_REQUEST"`

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L14)

**`Beta`**

Type of the request.

#### Overrides

[`BaseRequest`](BaseRequest.md).[`type`](BaseRequest.md#type)

***

### sessionId?

> `optional` **sessionId**: `string`

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L18)

**`Beta`**

The current session ID

***

### action

> **action**: `string`

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L22)

**`Beta`**

Action taken

***

### referenceId?

> `optional` **referenceId**: `string`

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L26)

**`Beta`**

Optional, reference ID passed back.

***

### uri?

> `optional` **uri**: `string`

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L32)

**`Beta`**

Optional, used differently depending on the action.

Use this for "OPEN_URL" action types.

***

### feedback?

> `optional` **feedback**: `string`

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L37)

**`Beta`**

Optional, used to provide feedback on a posed question such as "How would you rate this experience?"
or "Was the response relevant?"

***

### detail?

> `optional` **detail**: `string`

Defined in: [packages/stentor-models/src/Request/ChannelActionRequest.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/ChannelActionRequest.ts#L41)

**`Beta`**

Optional, open ended detail, can be used for stringified JSON or notes from the end user.

***

### overrideKey?

> `optional` **overrideKey**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L35)

**`Beta`**

Used during forwarding and redirecting the request to another handler.  When set it
pulls content or paths for this key instead of for the request.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`overrideKey`](BaseRequest.md#overridekey)

***

### createdTime?

> `optional` **createdTime**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L39)

**`Beta`**

When the message was created, an ISO-8601 compatible date time string

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`createdTime`](BaseRequest.md#createdtime)

***

### userId

> **userId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L43)

**`Beta`**

ID for the user making the request.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`userId`](BaseRequest.md#userid)

***

### deviceId?

> `optional` **deviceId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L47)

**`Beta`**

Unique identifier provided by the channel for the user's current device.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`deviceId`](BaseRequest.md#deviceid)

***

### requestId?

> `optional` **requestId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L51)

**`Beta`**

Optional unique identifier for the request provided by the channel.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`requestId`](BaseRequest.md#requestid)

***

### anonymous?

> `optional` **anonymous**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L58)

**`Beta`**

The user is anonymous, or a guest.

The user either does not yet have a verified identity or have
chosen to not have any data saved about them.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`anonymous`](BaseRequest.md#anonymous)

***

### isNewSession?

> `optional` **isNewSession**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L62)

**`Beta`**

Is the request a new session.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`isNewSession`](BaseRequest.md#isnewsession)

***

### accessToken?

> `optional` **accessToken**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L66)

**`Beta`**

Access token from account linking

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`accessToken`](BaseRequest.md#accesstoken)

***

### apiAccess?

> `optional` **apiAccess**: [`ApiAccessData`](ApiAccessData.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:71](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L71)

**`Beta`**

API access data from the platform
In case there is an APIs that provides services like list management, messaging...

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`apiAccess`](BaseRequest.md#apiaccess)

***

### rawQuery?

> `optional` **rawQuery**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:75](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L75)

**`Beta`**

Raw speech to text (STT) query, not available on all platforms.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`rawQuery`](BaseRequest.md#rawquery)

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L82)

**`Beta`**

The platform the request came from.

Example platforms are Google's Dialogflow & Amazon's Lex.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`platform`](BaseRequest.md#platform)

***

### channel?

> `optional` **channel**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:86](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L86)

**`Beta`**

The specific channel that the platform provides.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`channel`](BaseRequest.md#channel)

***

### device?

> `optional` **device**: [`Device`](Device.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:93](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L93)

**`Beta`**

Information about the device as far as capabilities such as screen or web browser available.

This information is available in two places, also on the context object, until it is removed from the context
in the next major release.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`device`](BaseRequest.md#device)

***

### locale?

> `optional` **locale**: [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:100](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L100)

**`Beta`**

User's locale, such as us-EN and es-MX.

Possible values for Alexa are defined here: https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-locale
Possible values for Dialogflow are defined here: https://dialogflow.com/docs/reference/language

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`locale`](BaseRequest.md#locale)

***

### isBargeIn?

> `optional` **isBargeIn**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:106](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L106)

**`Beta`**

Is the request a barge in

Currently only set on Google and Dialogflow request

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`isBargeIn`](BaseRequest.md#isbargein)

***

### isHealthCheck?

> `optional` **isHealthCheck**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:112](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L112)

**`Beta`**

Is the request a health check.

Currently only Google and Dialogflow perform health checks.

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`isHealthCheck`](BaseRequest.md#ishealthcheck)

***

### attributes?

> `optional` **attributes**: `Record`\<`string`, `unknown`\>

Defined in: [packages/stentor-models/src/Request/Request.ts:125](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L125)

**`Beta`**

Optional request attributes to be passed through on the request.

If the channel supports it, it will be populated.

Some common keys that are use are, all optional:

* 
* currentUrl - For channels installed on websites, contains window.location.href information on where the user is
* isLocal - Boolean for if the currentUrl is to localhost.  If it is true then most likely currentUrl will be undefined.
* environment - Used to override the environment

#### Inherited from

[`BaseRequest`](BaseRequest.md).[`attributes`](BaseRequest.md#attributes)
