[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / RequestHandler

# Interface: RequestHandler

Defined in: [packages/stentor-models/src/RequestHandler.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/RequestHandler.ts#L5)

## Methods

### canHandleRequest()

> **canHandleRequest**(`request`, `context`): `boolean`

Defined in: [packages/stentor-models/src/RequestHandler.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/RequestHandler.ts#L13)

If it can handle the request.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

Potential request for the handler

##### context

[`Context`](Context.md)

Context for the request

#### Returns

`boolean`

If the handler can handle the provided request with given context

***

### handleRequest()

> **handleRequest**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/RequestHandler.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/RequestHandler.ts#L21)

Handle the give request with provided context.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

Request to be handled

##### context

[`Context`](Context.md)

Context the request is handled within

#### Returns

`Promise`\<`void`\>

Promise that returns void when the execution is complete
