[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / mergeModels

# Function: mergeModels()

> **mergeModels**(`primary`, `secondary`, `results?`): [`Intent`](../../../stentor/src/interfaces/Intent.md)[]

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:123](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L123)

Merges two models (arrays of Intents).

It looks for opportunities to merge based on a common intentId.

## Parameters

### primary

[`Intent`](../../../stentor/src/interfaces/Intent.md)[]

### secondary

[`Intent`](../../../stentor/src/interfaces/Intent.md)[]

### results?

[`MergeModelsResults`](../interfaces/MergeModelsResults.md) = `{}`

## Returns

[`Intent`](../../../stentor/src/interfaces/Intent.md)[]
