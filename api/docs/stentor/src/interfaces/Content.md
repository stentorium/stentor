[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Content

# Interface: Content

Defined in: packages/stentor-models/lib/Handler/Content.d.ts:8

Base content map for the handler.

All handlers have contextual help and cancel content

## Indexable

\[`key`: `string`\]: [`Response`](../type-aliases/Response.md)[]

All remaining content must be an array of string keys corresponding to an array of responses.

## Properties

### CancelIntent?

> `optional` **CancelIntent**: [`Response`](../type-aliases/Response.md)[]

Defined in: packages/stentor-models/lib/Handler/Content.d.ts:12

Used when the user says "cancel" or "exit"

***

### HelpIntent?

> `optional` **HelpIntent**: [`Response`](../type-aliases/Response.md)[]

Defined in: packages/stentor-models/lib/Handler/Content.d.ts:17

Used when the user asks for help, opportunity to provide contextual help based
on the current handler.
