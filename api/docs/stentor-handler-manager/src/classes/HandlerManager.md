[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler-manager/src](../README.md) / HandlerManager

# Class: HandlerManager

Defined in: [packages/stentor-handler-manager/src/HandlerManager.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-manager/src/HandlerManager.ts#L12)

## Constructors

### Constructor

> **new HandlerManager**(`props`): `HandlerManager`

Defined in: [packages/stentor-handler-manager/src/HandlerManager.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-manager/src/HandlerManager.ts#L17)

#### Parameters

##### props

###### service

`HandlerService`

###### factory

[`HandlerFactory`](../../../stentor/src/classes/HandlerFactory.md)

#### Returns

`HandlerManager`

## Methods

### from()

> **from**(`request`, `context`): `Promise`\<[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

Defined in: [packages/stentor-handler-manager/src/HandlerManager.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-manager/src/HandlerManager.ts#L45)

Build the request handler, either from what is on storage or
requests the appropriate handler from the request handler service.

TODO: This method is huge, it could use some refactoring.  One odd thing we
will want to address is the fact it modifies the request & context that is
passed in instead of making new ones and passing them out as well.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

Current request

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

Current context

#### Returns

`Promise`\<[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>
