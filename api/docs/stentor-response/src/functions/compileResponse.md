[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-response/src](../README.md) / compileResponse

# Function: compileResponse()

> **compileResponse**(`response`, `request`, `context`, `additionalContext?`, `macros?`): [`Response`](../../../stentor/src/type-aliases/Response.md)

Defined in: [packages/stentor-response/src/compileResponse.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/compileResponse.ts#L36)

Compiles a templated response with provided request and context.

In order for the template to compile, it must contain ${} with
json paths within the mustaches.  For example, a string such as:

"Hello ${ $.request.slots.NAME.value }"

will be transformed to "Hello Bob" when passed an intent request
with a slot "NAME" and value "Bob"

## Parameters

### response

[`Response`](../../../stentor/src/type-aliases/Response.md)

Response to be compiled

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

Request to pull information from for compilation

### context

[`Context`](../../../stentor/src/interfaces/Context.md)

Context to pull information from for compilation

### additionalContext?

`Record`\<`string`, `unknown`\>

Additional, optional, context to pull information from for compilation

### macros?

`MacroMap`

## Returns

[`Response`](../../../stentor/src/type-aliases/Response.md)
