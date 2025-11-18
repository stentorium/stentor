[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / determine

# Function: determine()

> **determine**\<`P`\>(`potentials`, `request`, `context`, `additionalContext?`, `macros?`): `P`

Defined in: packages/stentor-determiner/lib/determine.d.ts:11

Determine which of the provided objects is best based on provided request and context.

## Type Parameters

### P

`P` *extends* `object`

## Parameters

### potentials

`P`[]

### request

[`Request`](../type-aliases/Request.md)

### context

[`Context`](../interfaces/Context.md)

### additionalContext?

`Record`\<`string`, `unknown`\>

### macros?

`MacroMap`

## Returns

`P`

The best match from the provided potential matches, undefined if now match could be determined.
