[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ExecutablePath

# Interface: ExecutablePath

Defined in: [packages/stentor-models/src/Path/Path.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L13)

An executable path defines exactly where an incoming request will be routed to.

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

### type?

> `optional` **type**: `"START"`

Defined in: [packages/stentor-models/src/Path/Path.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L24)

Type of path.

Setting type to START changes the request so that
handler.start() is called.

Not setting the type passes the request straight
through, requiring the new handler to handle the
request as is.

***

### intentId

> **intentId**: `string`

Defined in: [packages/stentor-models/src/Path/Path.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L28)

The ID of the handler to forward or redirect the request to

***

### slots?

> `optional` **slots**: [`RequestSlotMap`](RequestSlotMap.md)

Defined in: [packages/stentor-models/src/Path/Path.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L33)

Optional, if redirecting or forwarding to a handler that is expecting slots,
set these to pre-populate them on the request.

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
