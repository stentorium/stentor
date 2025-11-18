[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / MergePatternsResults

# Interface: MergePatternsResults

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:170](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L170)

## Extended by

- [`MergeIntentsResults`](MergeIntentsResults.md)

## Properties

### totalAddedPatterns?

> `optional` **totalAddedPatterns**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:174](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L174)

Number of patterns added to the primary from the seconday

***

### addedPatterns?

> `optional` **addedPatterns**: `string`[]

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:178](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L178)

List of of added patterns.

***

### totalOverlappedPatterns?

> `optional` **totalOverlappedPatterns**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:182](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L182)

Number of patterns that overlapped and were ignored
