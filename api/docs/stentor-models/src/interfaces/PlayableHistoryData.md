[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PlayableHistoryData

# Interface: PlayableHistoryData

Defined in: [packages/stentor-models/src/History.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/History.ts#L20)

Historical data for a user's previous listening.

## Properties

### currentTime

> **currentTime**: `number`

Defined in: [packages/stentor-models/src/History.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/History.ts#L26)

The time into playback, in milliseconds, the users is for the current playable.

It is undefined if the playable hasn't started and -1 if it finished playback.

***

### lastPlayed

> **lastPlayed**: `number`

Defined in: [packages/stentor-models/src/History.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/History.ts#L30)

The UNIX timestamp for the last time the item was played.
