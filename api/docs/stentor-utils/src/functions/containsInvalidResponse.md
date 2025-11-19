[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / containsInvalidResponse

# Function: containsInvalidResponse()

> **containsInvalidResponse**(`intent`): [`ContainsInvalidResponseResult`](../interfaces/ContainsInvalidResponseResult.md)

Defined in: [packages/stentor-utils/src/handler.ts:242](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/handler.ts#L242)

Checks to see if any of the responses within the handler
has invalid XML within the SSML fields.

## Parameters

### intent

[`Intent`](../../../stentor/src/interfaces/Intent.md) | [`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

## Returns

[`ContainsInvalidResponseResult`](../interfaces/ContainsInvalidResponseResult.md)
