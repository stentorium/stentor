[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler/src](../README.md) / AbstractHandler

# Abstract Class: AbstractHandler\<C, D, F, R\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L30)

The AbstractHandler takes in intents and translates them to responses.

All handlers must extend the AbstractHandler.

## Extended by

- [`ConversationHandler`](ConversationHandler.md)

## Type Parameters

### C

`C` *extends* [`Content`](../../../stentor/src/interfaces/Content.md) = [`Content`](../../../stentor/src/interfaces/Content.md)

### D

`D` *extends* [`Data`](../../../stentor/src/interfaces/Data.md) = [`Data`](../../../stentor/src/interfaces/Data.md)

### F

`F` *extends* [`Forward`](../../../stentor/src/interfaces/Forward.md) = [`Forward`](../../../stentor/src/interfaces/Forward.md)

### R

`R` *extends* [`Redirect`](../../../stentor/src/interfaces/Redirect.md) = [`Redirect`](../../../stentor/src/interfaces/Redirect.md)

## Implements

- `RequestHandler`
- [`Handler`](../../../stentor/src/interfaces/Handler.md)\<`C`, `D`, `F`, `R`\>

## Constructors

### Constructor

> **new AbstractHandler**\<`C`, `D`, `F`, `R`\>(`props`): `AbstractHandler`\<`C`, `D`, `F`, `R`\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:63](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L63)

#### Parameters

##### props

[`Handler`](../../../stentor/src/interfaces/Handler.md)\<`C`, `D`, `F`, `R`\>

#### Returns

`AbstractHandler`\<`C`, `D`, `F`, `R`\>

## Properties

### type

> `readonly` **type**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L37)

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`type`](../../../stentor/src/interfaces/Handler.md#type)

***

### intentId

> `readonly` **intentId**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L39)

The ID of the intent, typically a combination of the name
and a random string.

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`intentId`](../../../stentor/src/interfaces/Handler.md#intentid)

***

### appId

> `readonly` **appId**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L41)

The ID for the app the intent belongs to.

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`appId`](../../../stentor/src/interfaces/Handler.md#appid)

***

### organizationId

> `readonly` **organizationId**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L43)

The organization ID for the app of which this intent belongs.

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`organizationId`](../../../stentor/src/interfaces/Handler.md#organizationid)

***

### createdAt

> `readonly` **createdAt**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L45)

ISO-8601 string of when the intent was created.

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`createdAt`](../../../stentor/src/interfaces/Handler.md#createdat)

***

### content

> `readonly` **content**: `C`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L47)

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`content`](../../../stentor/src/interfaces/Handler.md#content)

***

### data

> **data**: `D`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L49)

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`data`](../../../stentor/src/interfaces/Handler.md#data)

***

### forward

> `readonly` **forward**: `F`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L51)

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`forward`](../../../stentor/src/interfaces/Handler.md#forward)

***

### redirect

> `readonly` **redirect**: `R`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L53)

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`redirect`](../../../stentor/src/interfaces/Handler.md#redirect)

***

### name?

> `readonly` `optional` **name**: `string`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L55)

The human readable name of the intent.

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`name`](../../../stentor/src/interfaces/Handler.md#name)

***

### slots?

> `readonly` `optional` **slots**: `Slot`[]

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:57](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L57)

The slots defined within the utterance patterns
and their Entity types.

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`slots`](../../../stentor/src/interfaces/Handler.md#slots)

***

### ~~slotTypes?~~

> `readonly` `optional` **slotTypes**: `SlotTypeMap`

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L59)

A map of the slot type definition.

#### Deprecated

Use Entities

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`slotTypes`](../../../stentor/src/interfaces/Handler.md#slottypes)

***

### permissions?

> `readonly` `optional` **permissions**: `UserDataType`[]

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L61)

#### Implementation of

[`Handler`](../../../stentor/src/interfaces/Handler.md).[`permissions`](../../../stentor/src/interfaces/Handler.md#permissions)

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

#### Implementation of

`RequestHandler.canHandleRequest`

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

***

### handleRequest()

> **handleRequest**(`request`, `context`): `Promise`\<`void`\>

Defined in: [packages/stentor-handler/src/AbstractHandler/Handler.ts:279](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler/src/AbstractHandler/Handler.ts#L279)

Handles the incoming request.  Sets the necessary responses and saves the necessary items
to storage.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### context

[`Context`](../../../stentor/src/interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`RequestHandler.handleRequest`
