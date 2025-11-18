[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-guards/src](../README.md) / isHandler

# Function: isHandler()

> **isHandler**(`props`): `props is Handler<Content, Data, Forward, Redirect>`

Defined in: [packages/stentor-guards/src/isHandler.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-guards/src/isHandler.ts#L9)

Determine if the request handler props are for a handler.

## Parameters

### props

`number` | `boolean` | `object` | [`Intent`](../../../stentor/src/interfaces/Intent.md) | [`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

## Returns

`props is Handler<Content, Data, Forward, Redirect>`
