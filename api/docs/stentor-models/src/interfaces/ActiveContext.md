[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ActiveContext

# Interface: ActiveContext

Defined in: [packages/stentor-models/src/Response/Response.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L20)

Active Context Object

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Response/Response.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L24)

Name of the context

***

### parameters?

> `optional` **parameters**: `object`

Defined in: [packages/stentor-models/src/Response/Response.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L28)

Parameters passed around with the context

#### Index Signature

\[`key`: `string`\]: `string`

***

### timeToLive

> **timeToLive**: `object`

Defined in: [packages/stentor-models/src/Response/Response.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L31)

#### timeToLiveInSeconds?

> `optional` **timeToLiveInSeconds**: `number`

How long in seconds for the context to stay alive.

 Note: Not supported on Dialogflow

#### turnsToLive?

> `optional` **turnsToLive**: `number`

How many conversational turns to keep the context alive.
