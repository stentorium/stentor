[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / HandlerFactory

# Class: HandlerFactory

Defined in: packages/stentor-handler-factory/lib/HandlerFactory.d.ts:16

## Constructors

### Constructor

> **new HandlerFactory**(`props?`): `HandlerFactory`

Defined in: packages/stentor-handler-factory/lib/HandlerFactory.d.ts:19

#### Parameters

##### props?

`HandlerFactoryProps`

#### Returns

`HandlerFactory`

## Methods

### fromProps()

> **fromProps**(`props`): [`AbstractHandler`](AbstractHandler.md)\<[`Content`](../interfaces/Content.md), [`Data`](../interfaces/Data.md), [`Forward`](../interfaces/Forward.md), [`Redirect`](../interfaces/Redirect.md)\>

Defined in: packages/stentor-handler-factory/lib/HandlerFactory.d.ts:27

Converts handler properties to the appropriate Handler.

#### Parameters

##### props

[`Handler`](../interfaces/Handler.md)

#### Returns

[`AbstractHandler`](AbstractHandler.md)\<[`Content`](../interfaces/Content.md), [`Data`](../interfaces/Data.md), [`Forward`](../interfaces/Forward.md), [`Redirect`](../interfaces/Redirect.md)\>

#### Static

***

### from()

> **from**(`request`, `context`): [`AbstractHandler`](AbstractHandler.md)\<[`Content`](../interfaces/Content.md), [`Data`](../interfaces/Data.md), [`Forward`](../interfaces/Forward.md), [`Redirect`](../interfaces/Redirect.md)\>

Defined in: packages/stentor-handler-factory/lib/HandlerFactory.d.ts:37

Gets the correct handler from storage.

Depending on if audio is playing or not, the correct
handler is picked off the storage if it is available
or not.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

[`AbstractHandler`](AbstractHandler.md)\<[`Content`](../interfaces/Content.md), [`Data`](../interfaces/Data.md), [`Forward`](../interfaces/Forward.md), [`Redirect`](../interfaces/Redirect.md)\>
