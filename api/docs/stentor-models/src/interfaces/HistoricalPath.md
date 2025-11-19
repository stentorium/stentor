[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / HistoricalPath

# Interface: HistoricalPath

Defined in: [packages/stentor-models/src/Path/Path.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L41)

When compiled, it will move the user back to a previous handler
they already visited.

It always calls the start() method of the historical handler.

## Extends

- [`SharedPath`](SharedPath.md)

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

### historicalIndex

> **historicalIndex**: `number`

Defined in: [packages/stentor-models/src/Path/Path.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L47)

The number of handlers to go back into the history of.

This is typically just one and can be no more than 10.

***

### data?

> `optional` **data**: `object`

Defined in: [packages/stentor-models/src/Path/Path.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L66)

#### Inherited from

[`SharedPath`](SharedPath.md).[`data`](SharedPath.md#data)

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Path/Path.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L72)

Optional platform filter for the path.

If set, the path will only apply to the specified platform.

#### Inherited from

[`SharedPath`](SharedPath.md).[`platform`](SharedPath.md#platform)
