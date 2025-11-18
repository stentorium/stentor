[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-response/src](../README.md) / replacePlaceholders

# Function: replacePlaceholders()

> **replacePlaceholders**(`template`, `request`, `context`): `string` \| [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

Defined in: [packages/stentor-response/src/TemplatedResponseOutput.ts:69](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/TemplatedResponseOutput.ts#L69)

Replaces the placeholders in template

Examples: 'hello ${ $.session.car } ${ $.storage.status.cool }. You have uttered: ${ $.request.rawQuery } !'

## Parameters

### template

`string` | [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

### context

[`Context`](../../../stentor/src/interfaces/Context.md)

## Returns

`string` \| [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)
