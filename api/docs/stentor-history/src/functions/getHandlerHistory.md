[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-history/src](../README.md) / getHandlerHistory

# Function: getHandlerHistory()

> **getHandlerHistory**(`history`): `HandlerHistoryData`[]

Defined in: [packages/stentor-history/src/getHandlerHistory.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-history/src/getHandlerHistory.ts#L11)

Take in the history, filters out all other history types and then returns
sorted in reverse chronological order (latest is index 0).

## Parameters

### history

[`History`](../interfaces/History.md)

## Returns

`HandlerHistoryData`[]
