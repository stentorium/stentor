[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler-delegating/src](../README.md) / DelegatingHandler

# Class: DelegatingHandler

Defined in: [packages/stentor-handler-delegating/src/Handler.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Handler.ts#L19)

This handler can call registered methods outside Stentor.

## Extends

- [`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`DelegatingData`](../interfaces/DelegatingData.md)\>

## Constructors

### Constructor

> **new DelegatingHandler**(`props`): `DelegatingHandler`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:21

#### Parameters

##### props

[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`DelegatingData`](../interfaces/DelegatingData.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

#### Returns

`DelegatingHandler`

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`constructor`](../../../stentor/src/classes/AbstractHandler.md#constructor)

## Properties

### intentId

> `readonly` **intentId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:9

The ID of the intent, typically a combination of the name
and a random string.

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`intentId`](../../../stentor/src/classes/AbstractHandler.md#intentid)

***

### appId

> `readonly` **appId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:10

The ID for the app the intent belongs to.

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`appId`](../../../stentor/src/classes/AbstractHandler.md#appid)

***

### organizationId

> `readonly` **organizationId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:11

The organization ID for the app of which this intent belongs.

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`organizationId`](../../../stentor/src/classes/AbstractHandler.md#organizationid)

***

### createdAt

> `readonly` **createdAt**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:12

ISO-8601 string of when the intent was created.

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`createdAt`](../../../stentor/src/classes/AbstractHandler.md#createdat)

***

### content

> `readonly` **content**: [`Content`](../../../stentor/src/interfaces/Content.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:13

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`content`](../../../stentor/src/classes/AbstractHandler.md#content)

***

### data

> **data**: [`DelegatingData`](../interfaces/DelegatingData.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:14

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`data`](../../../stentor/src/classes/AbstractHandler.md#data)

***

### forward

> `readonly` **forward**: [`Forward`](../../../stentor/src/interfaces/Forward.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:15

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`forward`](../../../stentor/src/classes/AbstractHandler.md#forward)

***

### redirect

> `readonly` **redirect**: [`Redirect`](../../../stentor/src/interfaces/Redirect.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:16

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`redirect`](../../../stentor/src/classes/AbstractHandler.md#redirect)

***

### name?

> `readonly` `optional` **name**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:17

The human readable name of the intent.

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`name`](../../../stentor/src/classes/AbstractHandler.md#name)

***

### slots?

> `readonly` `optional` **slots**: `Slot`[]

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:18

The slots defined within the utterance patterns
and their Entity types.

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`slots`](../../../stentor/src/classes/AbstractHandler.md#slots)

***

### ~~slotTypes?~~

> `readonly` `optional` **slotTypes**: `SlotTypeMap`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:19

A map of the slot type definition.

#### Deprecated

Use Entities

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`slotTypes`](../../../stentor/src/classes/AbstractHandler.md#slottypes)

***

### permissions?

> `readonly` `optional` **permissions**: `UserDataType`[]

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:20

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`permissions`](../../../stentor/src/classes/AbstractHandler.md#permissions)

***

### type

> **type**: `"DelegatingHandlerType"`

Defined in: [packages/stentor-handler-delegating/src/Handler.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Handler.ts#L20)

#### Overrides

[`ConversationHandler`](../../../stentor/src/classes/ConversationHandler.md).[`type`](../../../stentor/src/classes/ConversationHandler.md#type)

## Methods

### isOwnRequest()

> **isOwnRequest**(`request`): `boolean`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:25

Determines if the request is for itself.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

#### Returns

`boolean`

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`isOwnRequest`](../../../stentor/src/classes/AbstractHandler.md#isownrequest)

***

### forwardingPathForRequest()

> **forwardingPathForRequest**(`request`, `context`): `Promise`\<`ExecutablePath`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:40

Get the forwarding path for the provided request.

Returns undefined if a path could not be found.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`ExecutablePath`\>

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`forwardingPathForRequest`](../../../stentor/src/classes/AbstractHandler.md#forwardingpathforrequest)

***

### redirectingPathForRequest()

> **redirectingPathForRequest**(`request`, `context`): `Promise`\<`ExecutablePath`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:48

Check if we have redirects (applied before handling the request). Usually some gate condition.

Returns undefined if a path could not be found.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`ExecutablePath`\>

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`redirectingPathForRequest`](../../../stentor/src/classes/AbstractHandler.md#redirectingpathforrequest)

***

### canHandleInputUnknown()

> **canHandleInputUnknown**(`request`, `context`): `boolean`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:55

Can handle InputUnknown

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`boolean`

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`canHandleInputUnknown`](../../../stentor/src/classes/AbstractHandler.md#canhandleinputunknown)

***

### repeat()

> `protected` **repeat**(`request`, `context`): `Promise`\<`void`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:61

Repeats the last uttered response.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`repeat`](../../../stentor/src/classes/AbstractHandler.md#repeat)

***

### inputUnknown()

> `protected` **inputUnknown**(`request`, `context`): `Promise`\<`void`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:70

Handles the situation where the handler

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`inputUnknown`](../../../stentor/src/classes/AbstractHandler.md#inputunknown)

***

### setHandlerDelegates()

> **setHandlerDelegates**(`handlerDelegates`): `void`

Defined in: [packages/stentor-handler-delegating/src/Handler.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Handler.ts#L29)

Pick out the method this handler should delegate to. The default is the intentId of the handler.

#### Parameters

##### handlerDelegates

#### Returns

`void`

***

### start()

> **start**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-handler-delegating/src/Handler.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Handler.ts#L44)

Call start if we have an override

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`start`](../../../stentor/src/classes/AbstractHandler.md#start)

***

### handleRequest()

> **handleRequest**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-handler-delegating/src/Handler.ts:64](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Handler.ts#L64)

Call the handler method if we have an override

We need to be tricky. Basic services, like cancel/stop, repeat and InputUnknow we still want to use,
but some skills want those two.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`handleRequest`](../../../stentor/src/classes/AbstractHandler.md#handlerequest)

***

### canHandleRequest()

> **canHandleRequest**(`request`, `context`): `boolean`

Defined in: [packages/stentor-handler-delegating/src/Handler.ts:87](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Handler.ts#L87)

Ask the super AND the delegate. One of them should be interested.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`boolean`

#### Overrides

[`AbstractHandler`](../../../stentor/src/classes/AbstractHandler.md).[`canHandleRequest`](../../../stentor/src/classes/AbstractHandler.md#canhandlerequest)
