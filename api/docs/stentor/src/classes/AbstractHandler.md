[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / AbstractHandler

# Abstract Class: AbstractHandler\<C, D, F, R\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:7

The AbstractHandler takes in intents and translates them to responses.

All handlers must extend the AbstractHandler.

## Extended by

- [`DelegatingHandler`](../../../stentor-handler-delegating/src/classes/DelegatingHandler.md)
- [`ConversationHandler`](ConversationHandler.md)

## Type Parameters

### C

`C` *extends* [`Content`](../interfaces/Content.md) = [`Content`](../interfaces/Content.md)

### D

`D` *extends* [`Data`](../interfaces/Data.md) = [`Data`](../interfaces/Data.md)

### F

`F` *extends* [`Forward`](../interfaces/Forward.md) = [`Forward`](../interfaces/Forward.md)

### R

`R` *extends* [`Redirect`](../interfaces/Redirect.md) = [`Redirect`](../interfaces/Redirect.md)

## Implements

- `RequestHandler`
- [`Handler`](../interfaces/Handler.md)\<`C`, `D`, `F`, `R`\>

## Constructors

### Constructor

> **new AbstractHandler**\<`C`, `D`, `F`, `R`\>(`props`): `AbstractHandler`\<`C`, `D`, `F`, `R`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:21

#### Parameters

##### props

[`Handler`](../interfaces/Handler.md)\<`C`, `D`, `F`, `R`\>

#### Returns

`AbstractHandler`\<`C`, `D`, `F`, `R`\>

## Properties

### type

> `readonly` **type**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:8

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`type`](../interfaces/Handler.md#type)

***

### intentId

> `readonly` **intentId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:9

The ID of the intent, typically a combination of the name
and a random string.

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`intentId`](../interfaces/Handler.md#intentid)

***

### appId

> `readonly` **appId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:10

The ID for the app the intent belongs to.

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`appId`](../interfaces/Handler.md#appid)

***

### organizationId

> `readonly` **organizationId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:11

The organization ID for the app of which this intent belongs.

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`organizationId`](../interfaces/Handler.md#organizationid)

***

### createdAt

> `readonly` **createdAt**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:12

ISO-8601 string of when the intent was created.

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`createdAt`](../interfaces/Handler.md#createdat)

***

### content

> `readonly` **content**: `C`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:13

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`content`](../interfaces/Handler.md#content)

***

### data

> **data**: `D`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:14

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`data`](../interfaces/Handler.md#data)

***

### forward

> `readonly` **forward**: `F`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:15

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`forward`](../interfaces/Handler.md#forward)

***

### redirect

> `readonly` **redirect**: `R`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:16

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`redirect`](../interfaces/Handler.md#redirect)

***

### name?

> `readonly` `optional` **name**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:17

The human readable name of the intent.

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`name`](../interfaces/Handler.md#name)

***

### slots?

> `readonly` `optional` **slots**: `Slot`[]

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:18

The slots defined within the utterance patterns
and their Entity types.

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`slots`](../interfaces/Handler.md#slots)

***

### ~~slotTypes?~~

> `readonly` `optional` **slotTypes**: `SlotTypeMap`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:19

A map of the slot type definition.

#### Deprecated

Use Entities

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`slotTypes`](../interfaces/Handler.md#slottypes)

***

### permissions?

> `readonly` `optional` **permissions**: `UserDataType`[]

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:20

#### Implementation of

[`Handler`](../interfaces/Handler.md).[`permissions`](../interfaces/Handler.md#permissions)

## Methods

### isOwnRequest()

> **isOwnRequest**(`request`): `boolean`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:25

Determines if the request is for itself.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

#### Returns

`boolean`

***

### canHandleRequest()

> **canHandleRequest**(`request`, `context`): `boolean`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:32

In order to determine if another handler needs to be requested, we need to see if the
current handler can handle the request.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`boolean`

#### Implementation of

`RequestHandler.canHandleRequest`

***

### forwardingPathForRequest()

> **forwardingPathForRequest**(`request`, `context`): `Promise`\<`ExecutablePath`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:40

Get the forwarding path for the provided request.

Returns undefined if a path could not be found.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`Promise`\<`ExecutablePath`\>

***

### redirectingPathForRequest()

> **redirectingPathForRequest**(`request`, `context`): `Promise`\<`ExecutablePath`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:48

Check if we have redirects (applied before handling the request). Usually some gate condition.

Returns undefined if a path could not be found.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`Promise`\<`ExecutablePath`\>

***

### canHandleInputUnknown()

> **canHandleInputUnknown**(`request`, `context`): `boolean`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:55

Can handle InputUnknown

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`boolean`

***

### repeat()

> `protected` **repeat**(`request`, `context`): `Promise`\<`void`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:61

Repeats the last uttered response.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

***

### inputUnknown()

> `protected` **inputUnknown**(`request`, `context`): `Promise`\<`void`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:70

Handles the situation where the handler

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

***

### ~~start()~~

> **start**(`request`, `context`): `Promise`\<`void`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:77

Kicks off the handler, typically called when the intent associated with the
handler is requested.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Deprecated

- Use handleRequest(), this is now just a wrapper that calls handleRequest()

***

### handleRequest()

> **handleRequest**(`request`, `context`): `Promise`\<`void`\>

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:84

Handles the incoming request.  Sets the necessary responses and saves the necessary items
to storage.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`RequestHandler.handleRequest`
