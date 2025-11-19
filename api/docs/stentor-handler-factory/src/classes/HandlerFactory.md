[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler-factory/src](../README.md) / HandlerFactory

# Class: HandlerFactory

Defined in: [packages/stentor-handler-factory/src/HandlerFactory.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-factory/src/HandlerFactory.ts#L32)

## Constructors

### Constructor

> **new HandlerFactory**(`props?`): `HandlerFactory`

Defined in: [packages/stentor-handler-factory/src/HandlerFactory.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-factory/src/HandlerFactory.ts#L37)

#### Parameters

##### props?

[`HandlerFactoryProps`](../interfaces/HandlerFactoryProps.md)

#### Returns

`HandlerFactory`

## Methods

### fromProps()

> **fromProps**(`props`): [`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

Defined in: [packages/stentor-handler-factory/src/HandlerFactory.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-factory/src/HandlerFactory.ts#L84)

Converts handler properties to the appropriate Handler.

#### Parameters

##### props

[`Handler`](../../../stentor/src/interfaces/Handler.md)

#### Returns

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

#### Static

***

### from()

> **from**(`request`, `context`): [`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

Defined in: [packages/stentor-handler-factory/src/HandlerFactory.ts:115](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-factory/src/HandlerFactory.ts#L115)

Gets the correct handler from storage.

Depending on if audio is playing or not, the correct
handler is picked off the storage if it is available
or not.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>
