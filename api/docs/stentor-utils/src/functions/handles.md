[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / handles

# Function: handles()

> **handles**(`intent`, `id`, `how?`): `boolean`

Defined in: [packages/stentor-utils/src/handler.ts:149](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/handler.ts#L149)

Does the provided Intent / Handler handle the provided ID in some way or another.

This checks redirect, content, & forward for the ID as a key.

Optionally, you can specify if you only want to check either redirect, content, or forward.  The
default is to check all three.

## Parameters

### intent

[`Intent`](../../../stentor/src/interfaces/Intent.md) | [`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

### id

`string`

### how?

[`HandledIn`](../enumerations/HandledIn.md) = `HandledIn.Any`

## Returns

`boolean`
