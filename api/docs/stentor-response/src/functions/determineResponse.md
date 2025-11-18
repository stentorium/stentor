[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-response/src](../README.md) / determineResponse

# Function: determineResponse()

> **determineResponse**(`responses`, `request`, `context`, `additionalContext?`, `macros?`): [`Response`](../../../stentor/src/type-aliases/Response.md)

Defined in: [packages/stentor-response/src/determineResponse.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/determineResponse.ts#L11)

Determines which response is best based on the provided list of possible responses.

## Parameters

### responses

[`Response`](../../../stentor/src/type-aliases/Response.md)[]

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

### context

[`Context`](../../../stentor/src/interfaces/Context.md)

### additionalContext?

`Record`\<`string`, `unknown`\>

### macros?

`MacroMap`

## Returns

[`Response`](../../../stentor/src/type-aliases/Response.md)
