[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SentimentedRequest

# Interface: SentimentedRequest

Defined in: [packages/stentor-models/src/Request/Request.ts:131](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/Request.ts#L131)

A request with sentiment analysis information

## Extended by

- [`InputUnknownRequest`](InputUnknownRequest.md)
- [`IntentRequest`](IntentRequest.md)

## Properties

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
