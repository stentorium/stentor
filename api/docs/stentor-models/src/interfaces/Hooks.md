[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Hooks

# Interface: Hooks

Defined in: [packages/stentor-models/src/Runtime/Hooks.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/Hooks.ts#L12)

Hooks are used to provide the opportunity to modify or log runtime data at different points in the lifecycle.

## Methods

### preExecution()?

> `optional` **preExecution**(`event`, `context`, `callback`): `Promise`\<\{ `event`: `object`; `context`: [`RuntimeContext`](RuntimeContext.md); `callback`: [`RuntimeCallback`](../type-aliases/RuntimeCallback.md); \}\>

Defined in: [packages/stentor-models/src/Runtime/Hooks.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/Hooks.ts#L24)

Once the channel is selected and before the request is translated, the preExecution hook is called.

This can be used for pre-execution modifications or checks.  If an error is thrown, it will be caught and
returned.  If you return undefined, all execution will halt without throwing an error (feel free to call the callback yourself).

#### Parameters

##### event

`object`

##### context

[`RuntimeContext`](RuntimeContext.md)

##### callback

[`RuntimeCallback`](../type-aliases/RuntimeCallback.md)

#### Returns

`Promise`\<\{ `event`: `object`; `context`: [`RuntimeContext`](RuntimeContext.md); `callback`: [`RuntimeCallback`](../type-aliases/RuntimeCallback.md); \}\>

Promise that either returns undefined to halt execution or the parameters back.

***

### postRequestTranslation()?

> `optional` **postRequestTranslation**(`request`): `Promise`\<[`Request`](../type-aliases/Request.md)\>

Defined in: [packages/stentor-models/src/Runtime/Hooks.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/Hooks.ts#L38)

This hook is called directly after the request is translated for the channel.

This can be an opportunity to modify the request but the request must be returned to
continue operation.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

The request after it has been translated

#### Returns

`Promise`\<[`Request`](../type-aliases/Request.md)\>

Promise that passes back the request

***

### postContextCreation()?

> `optional` **postContextCreation**(`request`, `context`): `Promise`\<\{ `request`: [`Request`](../type-aliases/Request.md); `context`: [`Context`](Context.md); \}\>

Defined in: [packages/stentor-models/src/Runtime/Hooks.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/Hooks.ts#L45)

This hook, if provided is called after the request is translated then immediately after the context is created.  This happens immediately before the handler is deteremined.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](Context.md)

#### Returns

`Promise`\<\{ `request`: [`Request`](../type-aliases/Request.md); `context`: [`Context`](Context.md); \}\>

***

### preResponseTranslation()?

> `optional` **preResponseTranslation**(`request`, `response`, `storage`): `Promise`\<\{ `request`: [`Request`](../type-aliases/Request.md); `response`: [`AbstractResponseBuilder`](../classes/AbstractResponseBuilder.md); `storage`: [`Storage`](Storage.md); \}\>

Defined in: [packages/stentor-models/src/Runtime/Hooks.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/Hooks.ts#L55)

This hook is called before the response is translated for the channel.

Last chance to tweak the platform independent response or collect some data from the request/response (transcript).

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### response

[`AbstractResponseBuilder`](../classes/AbstractResponseBuilder.md)

##### storage

[`Storage`](Storage.md)

#### Returns

`Promise`\<\{ `request`: [`Request`](../type-aliases/Request.md); `response`: [`AbstractResponseBuilder`](../classes/AbstractResponseBuilder.md); `storage`: [`Storage`](Storage.md); \}\>
