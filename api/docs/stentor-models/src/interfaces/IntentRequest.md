[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / IntentRequest

# Interface: IntentRequest

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:91](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L91)

Request for a particular intent.

For Alexa see [https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#intentrequest](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#intentrequest)

## Extends

- [`BaseRequest`](BaseRequest.md).[`SentimentedRequest`](SentimentedRequest.md)

## Extended by

- [`AddressIntentRequest`](AddressIntentRequest.md)

## Properties

### type

> **type**: `"INTENT_REQUEST"`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:95](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L95)

The type of an intent request is always "INTENT_REQUEST"

#### Overrides

[`BaseRequest`](BaseRequest.md).[`type`](BaseRequest.md#type)

***

### intentId

> **intentId**: `string`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:101](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L101)

The ID of the matched intent.

A value of NLU_RESULT_PLACEHOLDER will send the IntentRequest through an NLU service if one is provided.

***

### sessionId

> **sessionId**: `string`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:108](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L108)

The ID of the user's current session.

A session is typically defined by the channel is on but it is typically a set
of requests and responses that are linked together.

***

### slots?

> `optional` **slots**: [`RequestSlotMap`](RequestSlotMap.md)

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:112](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L112)

Slots for the intent.

***

### matchConfidence?

> `optional` **matchConfidence**: `number`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:120](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L120)

Confidence level of the intent match.  On a scale from 0-1 where 1 is the highest confidence of a match.

[https://docs.aws.amazon.com/lex/latest/dg/confidence-scores.html](https://docs.aws.amazon.com/lex/latest/dg/confidence-scores.html)
[https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-concept-prediction-score](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-concept-prediction-score)
[https://cloud.google.com/dialogflow/es/docs/intents-matching#confidence](https://cloud.google.com/dialogflow/es/docs/intents-matching#confidence)

***

### activeContexts?

> `optional` **activeContexts**: [`ActiveContext`](ActiveContext.md)[]

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:124](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L124)

Current active contexts.

***

### isBargeIn?

> `optional` **isBargeIn**: `boolean`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:128](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L128)

Is the request a barge-in, did the user interupt the assistants response.

#### Overrides

[`BaseRequest`](BaseRequest.md).[`isBargeIn`](BaseRequest.md#isbargein)

***

### canFulfill?

> `optional` **canFulfill**: `boolean`

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:132](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L132)

A meta, preliminary request that is more for understanding if the assistant can provide an answer or not.

***

### data?

> `optional` **data**: [`Data`](Data.md)

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:136](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L136)

Optional data that can be added to the request

***

### ~~knowledgeAnswer?~~

> `optional` **knowledgeAnswer**: [`KnowledgeAnswer`](KnowledgeAnswer.md)

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:143](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L143)

**`Beta`**

A unique request provided by a question answering system.

#### Deprecated

- Will be removed in next major version. Use the newer knowledgeBaseResult which has more information.

***

### knowledgeBaseResult?

> `optional` **knowledgeBaseResult**: [`KnowledgeBaseResult`](KnowledgeBaseResult.md)

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:149](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L149)

**`Beta`**

Results returned from a knowledge base such as AWS Kendra.

***

### attachments?

> `optional` **attachments**: [`RequestAttachment`](RequestAttachment.md)[]

Defined in: [packages/stentor-models/src/Request/IntentRequest.ts:155](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/IntentRequest.ts#L155)

**`Beta`**

Uploads from the request

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

***

### sentimentAnalysis?

> `optional` **sentimentAnalysis**: `object`

Defined in: [packages/stentor-models/src/Request/Request.ts:135](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L135)

An analysis on the user's query text sentiment

#### sentiment

> **sentiment**: `"POSITIVE"` \| `"NEUTRAL"` \| `"NEGATIVE"` \| `"MIXED"`

An abstracted measure of the sentiment. 

* POSITIVE - Query has positive sentiment
* NEUTRAL - Query has either positive or negative sentiment
* NEGATIVE - Query has negative sentiment
* MIXED - Query has both positive and negative sentiment

#### original?

> `optional` **original**: `string`

The original payload from the sentiment analysis engine stringified

You can use `JSON.parse` on this data to extract more information.

#### Inherited from

[`SentimentedRequest`](SentimentedRequest.md).[`sentimentAnalysis`](SentimentedRequest.md#sentimentanalysis)
