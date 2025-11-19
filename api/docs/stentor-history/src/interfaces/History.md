[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-history/src](../README.md) / History

# Interface: History

Defined in: packages/stentor-models/lib/History.d.ts:38

History is a map to store information about recent activity for the user by some hashed token that
links back to the content.

For PlayableHistoryData, the token is the token for the track, for HandlerHistoryData the token is the ID of the Handler.

## Indexable

\[`token`: `string`\]: `number` \| `HandlerHistoryData`[] \| [`HistoryData`](../type-aliases/HistoryData.md)

Remaining keys will typically be HistoryData or undefined.

lastTrimmed and handler are reserved keys.

## Properties

### lastTrimmed?

> `optional` **lastTrimmed**: `number`

Defined in: packages/stentor-models/lib/History.d.ts:39

***

### handler?

> `optional` **handler**: `HandlerHistoryData`[]

Defined in: packages/stentor-models/lib/History.d.ts:40
