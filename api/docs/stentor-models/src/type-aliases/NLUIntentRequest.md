[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / NLUIntentRequest

# Type Alias: NLUIntentRequest

> **NLUIntentRequest** = `Pick`\<[`IntentRequest`](../interfaces/IntentRequest.md), `"type"` \| `"intentId"` \| `"slots"` \| `"matchConfidence"` \| `"knowledgeAnswer"` \| `"knowledgeBaseResult"` \| `"sentimentAnalysis"` \| `"attributes"`\>

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L11)

Slightly smaller intent request without the sessionId and other identifying information.  It also doesn't pass through the original raw query.
