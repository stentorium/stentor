[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / getResponse

# Function: getResponse()

> **getResponse**(`content`, `request`, `context`, `additionalContext?`, `macros?`): [`Response`](../type-aliases/Response.md)

Defined in: packages/stentor-response/lib/getResponse.d.ts:16

Get the compiled response from the provided
content, request and context.

In order to leverage slot filling, you must pass in a Handler for content.

## Parameters

### content

[`Content`](../interfaces/Content.md) | [`Response`](../type-aliases/Response.md)[] | [`Handler`](../interfaces/Handler.md)\<[`Content`](../interfaces/Content.md), [`Data`](../interfaces/Data.md), [`Forward`](../interfaces/Forward.md), [`Redirect`](../interfaces/Redirect.md)\>

### request

[`Request`](../type-aliases/Request.md)

### context

[`Context`](../interfaces/Context.md)

### additionalContext?

`Record`\<`string`, `unknown`\>

Additional variables that can be injected to be used during compilation.

### macros?

`MacroMap`

Custom macros that are using either in compiling the response or determining the response with conditionals

## Returns

[`Response`](../type-aliases/Response.md)
