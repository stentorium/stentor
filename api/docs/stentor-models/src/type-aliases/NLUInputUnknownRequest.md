[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / NLUInputUnknownRequest

# Type Alias: NLUInputUnknownRequest

> **NLUInputUnknownRequest** = `Pick`\<[`InputUnknownRequest`](../interfaces/InputUnknownRequest.md), `"type"` \| `"intentId"` \| `"knowledgeBaseResult"` \| `"sentimentAnalysis"` \| `"attributes"`\>

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L16)

Slightly smaller input unknown request without a sessionId and other identifying information.  It also doesn't pass through the original raw query.
