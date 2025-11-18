[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-ovai/src](../README.md) / OVAIService

# Class: OVAIService

Defined in: [packages/stentor-service-ovai/src/OVAIService.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-ovai/src/OVAIService.ts#L14)

## Implements

- `HandlerService`

## Constructors

### Constructor

> **new OVAIService**(`props?`): `OVAIService`

Defined in: [packages/stentor-service-ovai/src/OVAIService.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-ovai/src/OVAIService.ts#L19)

#### Parameters

##### props?

###### baseURL?

`string`

###### token?

`string`

###### appId?

`string`

#### Returns

`OVAIService`

## Methods

### getAll()

> **getAll**(): `Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>[]\>

Defined in: [packages/stentor-service-ovai/src/OVAIService.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-ovai/src/OVAIService.ts#L48)

#### Returns

`Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>[]\>

***

### get()

> **get**(`id`): `Promise`\<`undefined`\> \| `Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

Defined in: [packages/stentor-service-ovai/src/OVAIService.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-ovai/src/OVAIService.ts#L67)

Returns the handler for the provided ID or undefined if not found.

#### Parameters

##### id

Either the ID as a string or an object that has the ID under intentId

`string` | \{ `intentId`: `string`; \}

#### Returns

`Promise`\<`undefined`\> \| `Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

#### Implementation of

`HandlerService.get`

***

### putEvents()

> **putEvents**(`events`): `Promise`\<`void`\>

Defined in: [packages/stentor-service-ovai/src/OVAIService.ts:102](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-ovai/src/OVAIService.ts#L102)

#### Parameters

##### events

`Event`\<`any`\>[]

#### Returns

`Promise`\<`void`\>
