[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / compileResponse

# Function: compileResponse()

> **compileResponse**(`response`, `request`, `context`, `additionalContext?`, `macros?`): [`Response`](../type-aliases/Response.md)

Defined in: packages/stentor-response/lib/compileResponse.d.ts:25

Compiles a templated response with provided request and context.

In order for the template to compile, it must contain ${} with
json paths within the mustaches.  For example, a string such as:

"Hello ${ $.request.slots.NAME.value }"

will be transformed to "Hello Bob" when passed an intent request
with a slot "NAME" and value "Bob"

## Parameters

### response

[`Response`](../type-aliases/Response.md)

Response to be compiled

### request

[`Request`](../type-aliases/Request.md)

Request to pull information from for compilation

### context

[`Context`](../interfaces/Context.md)

Context to pull information from for compilation

### additionalContext?

`Record`\<`string`, `unknown`\>

Additional, optional, context to pull information from for compilation

### macros?

`MacroMap`

## Returns

[`Response`](../type-aliases/Response.md)
