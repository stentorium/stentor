[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-determiner/src](../README.md) / determine

# Function: determine()

> **determine**\<`P`\>(`potentials`, `request`, `context`, `additionalContext?`, `macros?`): `P`

Defined in: [packages/stentor-determiner/src/determine.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-determiner/src/determine.ts#L47)

Determine which of the provided objects is best based on provided request and context.

## Type Parameters

### P

`P` *extends* `object`

## Parameters

### potentials

`P`[]

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

### context

[`Context`](../../../stentor/src/interfaces/Context.md)

### additionalContext?

`Record`\<`string`, `unknown`\>

### macros?

`MacroMap`

## Returns

`P`

The best match from the provided potential matches, undefined if now match could be determined.
