[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / MergeModelsResults

# Interface: MergeModelsResults

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:102](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L102)

## Extends

- [`MergeIntentsResults`](MergeIntentsResults.md)

## Properties

### mergedIntents?

> `optional` **mergedIntents**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:106](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L106)

The number of intents that were merged

***

### addedIntents?

> `optional` **addedIntents**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:110](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L110)

The number of new intents added from the primary to the secondary

***

### totalAddedPatterns?

> `optional` **totalAddedPatterns**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:174](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L174)

Number of patterns added to the primary from the seconday

#### Inherited from

[`MergeIntentsResults`](MergeIntentsResults.md).[`totalAddedPatterns`](MergeIntentsResults.md#totaladdedpatterns)

***

### addedPatterns?

> `optional` **addedPatterns**: `string`[]

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:178](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L178)

List of of added patterns.

#### Inherited from

[`MergeIntentsResults`](MergeIntentsResults.md).[`addedPatterns`](MergeIntentsResults.md#addedpatterns)

***

### totalOverlappedPatterns?

> `optional` **totalOverlappedPatterns**: `number`

Defined in: [packages/stentor-interaction-model/src/Intent/merge.ts:182](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/merge.ts#L182)

Number of patterns that overlapped and were ignored

#### Inherited from

[`MergeIntentsResults`](MergeIntentsResults.md).[`totalOverlappedPatterns`](MergeIntentsResults.md#totaloverlappedpatterns)

***

### totalAddedSlots?

> `optional` **totalAddedSlots**: `number`

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L5)

#### Inherited from

[`MergeIntentsResults`](MergeIntentsResults.md).[`totalAddedSlots`](MergeIntentsResults.md#totaladdedslots)

***

### addedSlots?

> `optional` **addedSlots**: `Slot`[]

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L6)

#### Inherited from

[`MergeIntentsResults`](MergeIntentsResults.md).[`addedSlots`](MergeIntentsResults.md#addedslots)

***

### totalIgnoredSlots?

> `optional` **totalIgnoredSlots**: `number`

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L7)

#### Inherited from

[`MergeIntentsResults`](MergeIntentsResults.md).[`totalIgnoredSlots`](MergeIntentsResults.md#totalignoredslots)

***

### ignoredSlots?

> `optional` **ignoredSlots**: `Slot`[]

Defined in: [packages/stentor-interaction-model/src/Slot/merge.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Slot/merge.ts#L8)

#### Inherited from

[`MergeIntentsResults`](MergeIntentsResults.md).[`ignoredSlots`](MergeIntentsResults.md#ignoredslots)
