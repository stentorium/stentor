[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / HandlerService

# Interface: HandlerService

Defined in: [packages/stentor-models/src/Services/HandlerService.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/HandlerService.ts#L10)

The HandlerService provides the assistant application's dialog management with logic and content
in the form of a [Handler](Handler.md).

## Methods

### get()

> **get**(`id`): `Promise`\<[`Handler`](Handler.md)\<[`Content`](Content.md), [`Data`](Data.md), [`Forward`](Forward.md), [`Redirect`](Redirect.md)\>\> \| `Promise`\<`undefined`\>

Defined in: [packages/stentor-models/src/Services/HandlerService.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/HandlerService.ts#L17)

Returns the handler for the provided ID or undefined if not found.

#### Parameters

##### id

Either the ID as a string or an object that has the ID under intentId

`string` | \{ `intentId`: `string`; \}

#### Returns

`Promise`\<[`Handler`](Handler.md)\<[`Content`](Content.md), [`Data`](Data.md), [`Forward`](Forward.md), [`Redirect`](Redirect.md)\>\> \| `Promise`\<`undefined`\>
