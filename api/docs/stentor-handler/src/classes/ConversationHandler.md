[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler/src](../README.md) / ConversationHandler

# Class: ConversationHandler

Defined in: [packages/stentor-handler/src/ConversationHandler.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/ConversationHandler.ts#L11)

The most basic implementation of an abstract handler, the conversation handler
facilitates basic back and forth, request & response, with users.

## Extends

- [`AbstractHandler`](AbstractHandler.md)

## Constructors

### Constructor

> **new ConversationHandler**(`props`): `ConversationHandler`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:63](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L63)

#### Parameters

##### props

[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>

#### Returns

`ConversationHandler`

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`constructor`](AbstractHandler.md#constructor)

## Properties

### type

> `readonly` **type**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L37)

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`type`](AbstractHandler.md#type)

***

### intentId

> `readonly` **intentId**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L39)

The ID of the intent, typically a combination of the name
and a random string.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`intentId`](AbstractHandler.md#intentid)

***

### appId

> `readonly` **appId**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L41)

The ID for the app the intent belongs to.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`appId`](AbstractHandler.md#appid)

***

### organizationId

> `readonly` **organizationId**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L43)

The organization ID for the app of which this intent belongs.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`organizationId`](AbstractHandler.md#organizationid)

***

### createdAt

> `readonly` **createdAt**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L45)

ISO-8601 string of when the intent was created.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`createdAt`](AbstractHandler.md#createdat)

***

### content

> `readonly` **content**: [`Content`](../../../stentor/src/interfaces/Content.md)

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L47)

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`content`](AbstractHandler.md#content)

***

### data

> **data**: [`Data`](../../../stentor/src/interfaces/Data.md)

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L49)

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`data`](AbstractHandler.md#data)

***

### forward

> `readonly` **forward**: [`Forward`](../../../stentor/src/interfaces/Forward.md)

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L51)

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`forward`](AbstractHandler.md#forward)

***

### redirect

> `readonly` **redirect**: [`Redirect`](../../../stentor/src/interfaces/Redirect.md)

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L53)

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`redirect`](AbstractHandler.md#redirect)

***

### name?

> `readonly` `optional` **name**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L55)

The human readable name of the intent.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`name`](AbstractHandler.md#name)

***

### slots?

> `readonly` `optional` **slots**: `Slot`[]

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:57](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L57)

The slots defined within the utterance patterns
and their Entity types.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`slots`](AbstractHandler.md#slots)

***

### ~~slotTypes?~~

> `readonly` `optional` **slotTypes**: `SlotTypeMap`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L59)

A map of the slot type definition.

#### Deprecated

Use Entities

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`slotTypes`](AbstractHandler.md#slottypes)

***

### permissions?

> `readonly` `optional` **permissions**: `UserDataType`[]

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L61)

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`permissions`](AbstractHandler.md#permissions)

## Methods

### isOwnRequest()

> **isOwnRequest**(`request`): `boolean`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:86](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L86)

Determines if the request is for itself.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

#### Returns

`boolean`

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`isOwnRequest`](AbstractHandler.md#isownrequest)

***

### canHandleRequest()

> **canHandleRequest**(`request`, `context`): `boolean`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:97](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L97)

In order to determine if another handler needs to be requested, we need to see if the
current handler can handle the request.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`boolean`

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`canHandleRequest`](AbstractHandler.md#canhandlerequest)

***

### forwardingPathForRequest()

> **forwardingPathForRequest**(`request`, `context`): `Promise`\<`ExecutablePath`\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:126](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L126)

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

[`AbstractHandler`](AbstractHandler.md).[`forwardingPathForRequest`](AbstractHandler.md#forwardingpathforrequest)

***

### redirectingPathForRequest()

> **redirectingPathForRequest**(`request`, `context`): `Promise`\<`ExecutablePath`\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:139](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L139)

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

[`AbstractHandler`](AbstractHandler.md).[`redirectingPathForRequest`](AbstractHandler.md#redirectingpathforrequest)

***

### canHandleInputUnknown()

> **canHandleInputUnknown**(`request`, `context`): `boolean`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:151](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L151)

Can handle InputUnknown

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`boolean`

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`canHandleInputUnknown`](AbstractHandler.md#canhandleinputunknown)

***

### repeat()

> `protected` **repeat**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:176](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L176)

Repeats the last uttered response.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`repeat`](AbstractHandler.md#repeat)

***

### inputUnknown()

> `protected` **inputUnknown**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:197](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L197)

Handles the situation where the handler

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`inputUnknown`](AbstractHandler.md#inputunknown)

***

### ~~start()~~

> **start**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:269](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L269)

Kicks off the handler, typically called when the intent associated with the
handler is requested.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Deprecated

- Use handleRequest(), this is now just a wrapper that calls handleRequest()

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`start`](AbstractHandler.md#start)

***

### handleRequest()

> **handleRequest**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-handler/src/ConversationHandler.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/ConversationHandler.ts#L12)

Handles the incoming request.  Sets the necessary responses and saves the necessary items
to storage.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`AbstractHandler`](AbstractHandler.md).[`handleRequest`](AbstractHandler.md#handlerequest)
