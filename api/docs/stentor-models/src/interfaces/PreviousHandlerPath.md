[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PreviousHandlerPath

# Interface: PreviousHandlerPath

Defined in: [packages/stentor-models/src/Path/Path.ts:54](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L54)

The previous handler path will look at the previousHandler on the storage
for a potential match and leverage it when applicable.

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

### previousHandler

> **previousHandler**: `boolean`

Defined in: [packages/stentor-models/src/Path/Path.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L58)

Set to true to request the previous handler paths.

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
