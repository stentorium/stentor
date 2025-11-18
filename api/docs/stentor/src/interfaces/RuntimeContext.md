[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / RuntimeContext

# Interface: RuntimeContext

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:4

## Properties

### ~~ovai?~~

> `optional` **ovai**: `StudioContext`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:10

Context specific to One Voice AI

#### Deprecated

Deprecated in favor of studio key.

***

### studio?

> `optional` **studio**: `StudioContext`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:14

Context specific to the setup within OC Studio

***

### appData?

> `optional` **appData**: `AppRuntimeData`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:18

App data used at runtime.

***

### headers?

> `optional` **headers**: `any`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:22

The headers for the request

***

### environment?

> `optional` **environment**: `string`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:32

Current environment

***

### rawBody?

> `optional` **rawBody**: `string`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:40

The request body as a string.

This is extremely important when verifying the payload comes from Alexa.  It must
be exactly how it comes in.  It cannot be JSON.parsed then JSON.stringified as
the order is important for certification.

## Methods

### getRemainingTimeInMillis()?

> `optional` **getRemainingTimeInMillis**(): `number`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:28

Optional, for functions as a service, it gets the remaining execution time.

#### Returns

`number`

The remaining execution time of the function

***

### buildResponse()?

> `optional` **buildResponse**(`code`, `result`): `object`

Defined in: packages/stentor-models/lib/Runtime/RuntimeContext.d.ts:47

Builds the response for the specific platform

#### Parameters

##### code

`number`

##### result

`object`

#### Returns

`object`
