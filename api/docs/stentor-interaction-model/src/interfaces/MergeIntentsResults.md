[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / MergeIntentsResults

# Interface: MergeIntentsResults

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:168](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L168)

## Extends

- [`MergePatternsResults`](MergePatternsResults.md).[`MergeSlotsResult`](MergeSlotsResult.md)

## Extended by

- [`MergeModelsResults`](MergeModelsResults.md)

## Properties

### totalAddedPatterns?

> `optional` **totalAddedPatterns**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:174](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L174)

Number of patterns added to the primary from the seconday

#### Inherited from

[`MergePatternsResults`](MergePatternsResults.md).[`totalAddedPatterns`](MergePatternsResults.md#totaladdedpatterns)

***

### addedPatterns?

> `optional` **addedPatterns**: `string`[]

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:178](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L178)

List of of added patterns.

#### Inherited from

[`MergePatternsResults`](MergePatternsResults.md).[`addedPatterns`](MergePatternsResults.md#addedpatterns)

***

### totalOverlappedPatterns?

> `optional` **totalOverlappedPatterns**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:182](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L182)

Number of patterns that overlapped and were ignored

#### Inherited from

[`MergePatternsResults`](MergePatternsResults.md).[`totalOverlappedPatterns`](MergePatternsResults.md#totaloverlappedpatterns)

***

### totalAddedSlots?

> `optional` **totalAddedSlots**: `number`

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L5)

#### Inherited from

[`MergeSlotsResult`](MergeSlotsResult.md).[`totalAddedSlots`](MergeSlotsResult.md#totaladdedslots)

***

### addedSlots?

> `optional` **addedSlots**: `Slot`[]

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L6)

#### Inherited from

[`MergeSlotsResult`](MergeSlotsResult.md).[`addedSlots`](MergeSlotsResult.md#addedslots)

***

### totalIgnoredSlots?

> `optional` **totalIgnoredSlots**: `number`

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L7)

#### Inherited from

[`MergeSlotsResult`](MergeSlotsResult.md).[`totalIgnoredSlots`](MergeSlotsResult.md#totalignoredslots)

***

### ignoredSlots?

> `optional` **ignoredSlots**: `Slot`[]

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L8)

#### Inherited from

[`MergeSlotsResult`](MergeSlotsResult.md).[`ignoredSlots`](MergeSlotsResult.md#ignoredslots)
