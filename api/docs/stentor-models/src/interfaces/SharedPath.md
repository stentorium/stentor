[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SharedPath

# Interface: SharedPath

Defined in: [packages/stentor-models/src/Path/Path.ts:64](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L64)

Shared parameters on a path.

## Extends

- `Partial`\<[`Actionable`](Actionable.md)\>.`Partial`\<[`Conditioned`](Conditioned.md)\>

## Extended by

- [`ExecutablePath`](ExecutablePath.md)
- [`HistoricalPath`](HistoricalPath.md)
- [`PreviousHandlerPath`](PreviousHandlerPath.md)

## Properties

### actions?

> `optional` **actions**: [`StorageAction`](StorageAction.md)[]

Defined in: [packages/stentor-models/src/Action/Actionable.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Action/Actionable.ts#L12)

#### Inherited from

[`Actionable`](Actionable.md).[`actions`](Actionable.md#actions)

***

### conditions?

> `optional` **conditions**: `string` \| [`Conditions`](Conditions.md)

Defined in: [packages/stentor-models/src/Conditional.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L73)

Conditions to be met.

Can either be a Conditions object or a string such as "foo('bar') || false"

#### Inherited from

[`Conditioned`](Conditioned.md).[`conditions`](Conditioned.md#conditions)

***

### data?

> `optional` **data**: `object`

Defined in: [packages/stentor-models/src/Path/Path.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L66)

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Path/Path.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L72)

Optional platform filter for the path.

If set, the path will only apply to the specified platform.
