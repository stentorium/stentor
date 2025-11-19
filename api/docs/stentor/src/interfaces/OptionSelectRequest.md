[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / OptionSelectRequest

# Interface: OptionSelectRequest

Defined in: packages/stentor-models/lib/Request/OptionSelectRequest.d.ts:4

## Extends

- `BaseRequest`

## Properties

### type

> **type**: `"OPTION_SELECT_REQUEST"`

Defined in: packages/stentor-models/lib/Request/OptionSelectRequest.d.ts:5

Type of the request.

#### Overrides

`BaseRequest.type`

***

### intentId

> **intentId**: `"OptionSelect"`

Defined in: packages/stentor-models/lib/Request/OptionSelectRequest.d.ts:9

OptionSelect has a constant ID.

***

### sessionId

> **sessionId**: `string`

Defined in: packages/stentor-models/lib/Request/OptionSelectRequest.d.ts:13

The current session ID

***

### token

> **token**: `string`

Defined in: packages/stentor-models/lib/Request/OptionSelectRequest.d.ts:17

The select option's unique id

***

### title?

> `optional` **title**: `string`

Defined in: packages/stentor-models/lib/Request/OptionSelectRequest.d.ts:23

The textual representation of the selected option.

This is not always available.

***

### index?

> `optional` **index**: `number`

Defined in: packages/stentor-models/lib/Request/OptionSelectRequest.d.ts:29

For the selection of an item in a list, this is the index of the item.

This is not always available.

***

### overrideKey?

> `optional` **overrideKey**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:34

Used during forwarding and redirecting the request to another handler.  When set it
pulls content or paths for this key instead of for the request.

#### Inherited from

`BaseRequest.overrideKey`

***

### createdTime?

> `optional` **createdTime**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:38

When the message was created, an ISO-8601 compatible date time string

#### Inherited from

`BaseRequest.createdTime`

***

### userId

> **userId**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:42

ID for the user making the request.

#### Inherited from

`BaseRequest.userId`

***

### deviceId?

> `optional` **deviceId**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:46

Unique identifier provided by the channel for the user's current device.

#### Inherited from

`BaseRequest.deviceId`

***

### requestId?

> `optional` **requestId**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:50

Optional unique identifier for the request provided by the channel.

#### Inherited from

`BaseRequest.requestId`

***

### anonymous?

> `optional` **anonymous**: `boolean`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:57

The user is anonymous, or a guest.

The user either does not yet have a verified identity or have
chosen to not have any data saved about them.

#### Inherited from

`BaseRequest.anonymous`

***

### isNewSession?

> `optional` **isNewSession**: `boolean`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:61

Is the request a new session.

#### Inherited from

`BaseRequest.isNewSession`

***

### accessToken?

> `optional` **accessToken**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:65

Access token from account linking

#### Inherited from

`BaseRequest.accessToken`

***

### apiAccess?

> `optional` **apiAccess**: `ApiAccessData`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:70

API access data from the platform
In case there is an APIs that provides services like list management, messaging...

#### Inherited from

`BaseRequest.apiAccess`

***

### rawQuery?

> `optional` **rawQuery**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:74

Raw speech to text (STT) query, not available on all platforms.

#### Inherited from

`BaseRequest.rawQuery`

***

### platform?

> `optional` **platform**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:81

The platform the request came from.

Example platforms are Google's Dialogflow & Amazon's Lex.

#### Inherited from

`BaseRequest.platform`

***

### channel?

> `optional` **channel**: `string`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:85

The specific channel that the platform provides.

#### Inherited from

`BaseRequest.channel`

***

### device?

> `optional` **device**: [`Device`](Device.md)

Defined in: packages/stentor-models/lib/Request/Request.d.ts:92

Information about the device as far as capabilities such as screen or web browser available.

This information is available in two places, also on the context object, until it is removed from the context
in the next major release.

#### Inherited from

`BaseRequest.device`

***

### locale?

> `optional` **locale**: [`Locale`](../../../stentor-locales/src/type-aliases/Locale.md)

Defined in: packages/stentor-models/lib/Request/Request.d.ts:99

User's locale, such as us-EN and es-MX.

Possible values for Alexa are defined here: https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-locale
Possible values for Dialogflow are defined here: https://dialogflow.com/docs/reference/language

#### Inherited from

`BaseRequest.locale`

***

### isBargeIn?

> `optional` **isBargeIn**: `boolean`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:105

Is the request a barge in

Currently only set on Google and Dialogflow request

#### Inherited from

`BaseRequest.isBargeIn`

***

### isHealthCheck?

> `optional` **isHealthCheck**: `boolean`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:111

Is the request a health check.

Currently only Google and Dialogflow perform health checks.

#### Inherited from

`BaseRequest.isHealthCheck`

***

### attributes?

> `optional` **attributes**: `Record`\<`string`, `unknown`\>

Defined in: packages/stentor-models/lib/Request/Request.d.ts:124

Optional request attributes to be passed through on the request.

If the channel supports it, it will be populated.

Some common keys that are use are, all optional:

*
* currentUrl - For channels installed on websites, contains window.location.href information on where the user is
* isLocal - Boolean for if the currentUrl is to localhost.  If it is true then most likely currentUrl will be undefined.
* environment - Used to override the environment

#### Inherited from

`BaseRequest.attributes`
