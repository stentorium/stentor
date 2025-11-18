[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / mergeIntents

# Function: mergeIntents()

> **mergeIntents**(`primary`, `secondary`, `results?`): [`Intent`](../../../stentor/src/interfaces/Intent.md)

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L72)

Merge the properties of two intents.

The first intent being the primary, and the second being the
secondary.  Values from the primary are preferred
over the secondary.

## Parameters

### primary

[`Intent`](../../../stentor/src/interfaces/Intent.md)

### secondary

[`Intent`](../../../stentor/src/interfaces/Intent.md)

### results?

[`MergeIntentsResults`](../interfaces/MergeIntentsResults.md)

## Returns

[`Intent`](../../../stentor/src/interfaces/Intent.md)
