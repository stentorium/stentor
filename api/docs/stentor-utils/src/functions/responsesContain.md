[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / responsesContain

# Function: responsesContain()

> **responsesContain**(`intent`, `character`): `boolean`

Defined in: [packages/stentor-utils/src/handler.ts:217](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/handler.ts#L217)

Does the provided intent or handler have a response that contains the provided
character.

## Parameters

### intent

[`Intent`](../../../stentor/src/interfaces/Intent.md) | [`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

### character

`string`

## Returns

`boolean`
