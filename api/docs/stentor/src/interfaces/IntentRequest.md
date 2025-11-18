[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / IntentRequest

# Interface: IntentRequest

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:79

Request for a particular intent.

For Alexa see [https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#intentrequest](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#intentrequest)

## Extends

- `BaseRequest`.`SentimentedRequest`

## Properties

### type

> **type**: `"INTENT_REQUEST"`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:83

The type of an intent request is always "INTENT_REQUEST"

#### Overrides

`BaseRequest.type`

***

### intentId

> **intentId**: `string`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:89

The ID of the matched intent.

A value of NLU_RESULT_PLACEHOLDER will send the IntentRequest through an NLU service if one is provided.

***

### sessionId

> **sessionId**: `string`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:96

The ID of the user's current session.

A session is typically defined by the channel is on but it is typically a set
of requests and responses that are linked together.

***

### slots?

> `optional` **slots**: [`RequestSlotMap`](RequestSlotMap.md)

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:100

Slots for the intent.

***

### matchConfidence?

> `optional` **matchConfidence**: `number`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:108

Confidence level of the intent match.  On a scale from 0-1 where 1 is the highest confidence of a match.

[https://docs.aws.amazon.com/lex/latest/dg/confidence-scores.html](https://docs.aws.amazon.com/lex/latest/dg/confidence-scores.html)
[https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-concept-prediction-score](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-concept-prediction-score)
[https://cloud.google.com/dialogflow/es/docs/intents-matching#confidence](https://cloud.google.com/dialogflow/es/docs/intents-matching#confidence)

***

### activeContexts?

> `optional` **activeContexts**: `ActiveContext`[]

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:112

Current active contexts.

***

### isBargeIn?

> `optional` **isBargeIn**: `boolean`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:116

Is the request a barge-in, did the user interupt the assistants response.

#### Overrides

`BaseRequest.isBargeIn`

***

### canFulfill?

> `optional` **canFulfill**: `boolean`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:120

A meta, preliminary request that is more for understanding if the assistant can provide an answer or not.

***

### data?

> `optional` **data**: [`Data`](Data.md)

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:124

Optional data that can be added to the request

***

### ~~knowledgeAnswer?~~

> `optional` **knowledgeAnswer**: `KnowledgeAnswer`

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:131

**`Beta`**

A unique request provided by a question answering system.

#### Deprecated

- Will be removed in next major version. Use the newer knowledgeBaseResult which has more information.

***

### knowledgeBaseResult?

> `optional` **knowledgeBaseResult**: [`KnowledgeBaseResult`](KnowledgeBaseResult.md)

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:137

**`Beta`**

Results returned from a knowledge base such as AWS Kendra.

***

### attachments?

> `optional` **attachments**: `RequestAttachment`[]

Defined in: packages/stentor-models/lib/Request/IntentRequest.d.ts:143

**`Beta`**

Uploads from the request

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

***

### sentimentAnalysis?

> `optional` **sentimentAnalysis**: `object`

Defined in: packages/stentor-models/lib/Request/Request.d.ts:133

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

`SentimentedRequest.sentimentAnalysis`
