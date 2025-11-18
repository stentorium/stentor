[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / History

# Interface: History

Defined in: [packages/stentor-models/src/History.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/History.ts#L41)

History is a map to store information about recent activity for the user by some hashed token that
links back to the content.

For PlayableHistoryData, the token is the token for the track, for HandlerHistoryData the token is the ID of the Handler.

## Indexable

\[`token`: `string`\]: `number` \| [`HistoryData`](../type-aliases/HistoryData.md) \| [`HandlerHistoryData`](HandlerHistoryData.md)[]

Remaining keys will typically be HistoryData or undefined.

lastTrimmed and handler are reserved keys.

## Properties

### lastTrimmed?

> `optional` **lastTrimmed**: `number`

Defined in: [packages/stentor-models/src/History.ts:42](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/History.ts#L42)

***

### handler?

> `optional` **handler**: [`HandlerHistoryData`](HandlerHistoryData.md)[]

Defined in: [packages/stentor-models/src/History.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/History.ts#L43)
