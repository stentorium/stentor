[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-response/src](../README.md) / getResponse

# Function: getResponse()

> **getResponse**(`content`, `request`, `context`, `additionalContext?`, `macros?`): [`Response`](../../../stentor/src/type-aliases/Response.md)

Defined in: [packages/stentor-response/src/getResponse.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/getResponse.ts#L22)

Get the compiled response from the provided
content, request and context.

In order to leverage slot filling, you must pass in a Handler for content.

## Parameters

### content

[`Content`](../../../stentor/src/interfaces/Content.md) | [`Response`](../../../stentor/src/type-aliases/Response.md)[] | [`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

### context

[`Context`](../../../stentor/src/interfaces/Context.md)

### additionalContext?

`Record`\<`string`, `unknown`\>

Additional variables that can be injected to be used during compilation.

### macros?

`MacroMap`

Custom macros that are using either in compiling the response or determining the response with conditionals

## Returns

[`Response`](../../../stentor/src/type-aliases/Response.md)
