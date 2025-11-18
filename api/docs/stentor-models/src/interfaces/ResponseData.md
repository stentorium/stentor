[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ResponseData

# Interface: ResponseData

Defined in: [packages/stentor-models/src/Response/Response.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L49)

Additional response metadata.

## Indexable

\[`key`: `string`\]: `string` \| `number` \| `boolean` \| `object`

## Properties

### content?

> `optional` **content**: `string`

Defined in: [packages/stentor-models/src/Response/Response.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L55)

Provides context to the user for select system responses.

Used for SURFACE_CHANGE, ACCOUNT_LINK, or generically to pass information to the client surface.

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Response/Response.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L61)

Provides a title for select system responses.

Used for SURFACE_CHANGE

***

### canFulfill?

> `optional` **canFulfill**: [`CanFulfillIntentResult`](CanFulfillIntentResult.md)

Defined in: [packages/stentor-models/src/Response/Response.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L67)

If a request (see IntentRequest.canFulfill) has canFulfill as true,
this provides information about it's ability to fulfill the request.

***

### expectedPreviousToken?

> `optional` **expectedPreviousToken**: `string`

Defined in: [packages/stentor-models/src/Response/Response.ts:74](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L74)

During media playback, expected previous token is used
as a reference point.  It is used by certain channels
to prevent race condition requests that can occur
when navigating content quickly.
