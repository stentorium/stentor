[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / RuntimeContext

# Interface: RuntimeContext

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L5)

## Properties

### ~~ovai?~~

> `optional` **ovai**: [`StudioContext`](StudioContext.md)

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L11)

Context specific to One Voice AI

#### Deprecated

Deprecated in favor of studio key.

***

### studio?

> `optional` **studio**: [`StudioContext`](StudioContext.md)

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L15)

Context specific to the setup within OC Studio

***

### appData?

> `optional` **appData**: [`AppRuntimeData`](AppRuntimeData.md)

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L19)

App data used at runtime.

***

### headers?

> `optional` **headers**: `any`

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L23)

The headers for the request

***

### environment?

> `optional` **environment**: `string`

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L33)

Current environment

***

### rawBody?

> `optional` **rawBody**: `string`

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L41)

The request body as a string.

This is extremely important when verifying the payload comes from Alexa.  It must
be exactly how it comes in.  It cannot be JSON.parsed then JSON.stringified as
the order is important for certification.

## Methods

### getRemainingTimeInMillis()?

> `optional` **getRemainingTimeInMillis**(): `number`

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L29)

Optional, for functions as a service, it gets the remaining execution time.

#### Returns

`number`

The remaining execution time of the function

***

### buildResponse()?

> `optional` **buildResponse**(`code`, `result`): `object`

Defined in: [packages/stentor-models/src/Runtime/RuntimeContext.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Runtime/RuntimeContext.ts#L48)

Builds the response for the specific platform

#### Parameters

##### code

`number`

##### result

`object`

#### Returns

`object`
