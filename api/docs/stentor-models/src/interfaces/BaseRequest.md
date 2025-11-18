[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / BaseRequest

# Interface: BaseRequest

Defined in: [packages/stentor-models/src/Request/Request.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L26)

Shared parameters for each Request

## Extended by

- [`AudioPlayerRequest`](AudioPlayerRequest.md)
- [`ChannelActionRequest`](ChannelActionRequest.md)
- [`EventRequest`](EventRequest.md)
- [`InputUnknownRequest`](InputUnknownRequest.md)
- [`IntentRequest`](IntentRequest.md)
- [`LaunchRequest`](LaunchRequest.md)
- [`NotificationPermissionRequest`](NotificationPermissionRequest.md)
- [`OptionSelectRequest`](OptionSelectRequest.md)
- [`PermissionRequest`](PermissionRequest.md)
- [`PlaybackControlRequest`](PlaybackControlRequest.md)
- [`RawQueryRequest`](RawQueryRequest.md)
- [`SessionEndedRequest`](SessionEndedRequest.md)
- [`SignInRequest`](SignInRequest.md)
- [`SurfaceChangeRequest`](SurfaceChangeRequest.md)

## Properties

### type

> **type**: [`RequestTypes`](../type-aliases/RequestTypes.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L30)

Type of the request.

***

### overrideKey?

> `optional` **overrideKey**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L35)

Used during forwarding and redirecting the request to another handler.  When set it
pulls content or paths for this key instead of for the request.

***

### createdTime?

> `optional` **createdTime**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L39)

When the message was created, an ISO-8601 compatible date time string

***

### userId

> **userId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L43)

ID for the user making the request.

***

### deviceId?

> `optional` **deviceId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L47)

Unique identifier provided by the channel for the user's current device.

***

### requestId?

> `optional` **requestId**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L51)

Optional unique identifier for the request provided by the channel.

***

### anonymous?

> `optional` **anonymous**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L58)

The user is anonymous, or a guest.

The user either does not yet have a verified identity or have
chosen to not have any data saved about them.

***

### isNewSession?

> `optional` **isNewSession**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L62)

Is the request a new session.

***

### accessToken?

> `optional` **accessToken**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L66)

Access token from account linking

***

### apiAccess?

> `optional` **apiAccess**: [`ApiAccessData`](ApiAccessData.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:71](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L71)

API access data from the platform
In case there is an APIs that provides services like list management, messaging...

***

### rawQuery?

> `optional` **rawQuery**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:75](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L75)

Raw speech to text (STT) query, not available on all platforms.

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L82)

The platform the request came from.

Example platforms are Google's Dialogflow & Amazon's Lex.

***

### channel?

> `optional` **channel**: `string`

Defined in: [packages/stentor-models/src/Request/Request.ts:86](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L86)

The specific channel that the platform provides.

***

### device?

> `optional` **device**: [`Device`](Device.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:93](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L93)

Information about the device as far as capabilities such as screen or web browser available.

This information is available in two places, also on the context object, until it is removed from the context
in the next major release.

***

### locale?

> `optional` **locale**: [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-models/src/Request/Request.ts:100](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L100)

User's locale, such as us-EN and es-MX.

Possible values for Alexa are defined here: https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-locale
Possible values for Dialogflow are defined here: https://dialogflow.com/docs/reference/language

***

### isBargeIn?

> `optional` **isBargeIn**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:106](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L106)

Is the request a barge in

Currently only set on Google and Dialogflow request

***

### isHealthCheck?

> `optional` **isHealthCheck**: `boolean`

Defined in: [packages/stentor-models/src/Request/Request.ts:112](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L112)

Is the request a health check.

Currently only Google and Dialogflow perform health checks.

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
