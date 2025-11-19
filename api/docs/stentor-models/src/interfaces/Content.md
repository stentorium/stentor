[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Content

# Interface: Content

Defined in: [packages/stentor-models/src/Handler/Content.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Content.ts#L9)

Base content map for the handler.

All handlers have contextual help and cancel content

## Indexable

\[`key`: `string`\]: [`Response`](../type-aliases/Response.md)[]

All remaining content must be an array of string keys corresponding to an array of responses.

## Properties

### CancelIntent?

> `optional` **CancelIntent**: [`Response`](../type-aliases/Response.md)[]

Defined in: [packages/stentor-models/src/Handler/Content.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Content.ts#L13)

Used when the user says "cancel" or "exit"

***

### HelpIntent?

> `optional` **HelpIntent**: [`Response`](../type-aliases/Response.md)[]

Defined in: [packages/stentor-models/src/Handler/Content.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Content.ts#L18)

Used when the user asks for help, opportunity to provide contextual help based
on the current handler.
