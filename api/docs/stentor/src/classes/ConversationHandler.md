[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / ConversationHandler

# Class: ConversationHandler

Defined in: packages/stentor-handler/lib/ConversationHandler.d.ts:10

The most basic implementation of an abstract handler, the conversation handler
facilitates basic back and forth, request & response, with users.

## Extends

- [`AbstractHandler`](AbstractHandler.md)

## Constructors

### Constructor

> **new ConversationHandler**(`props`): `ConversationHandler`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:21

#### Parameters

##### props

[`Handler`](../interfaces/Handler.md)\<[`Content`](../interfaces/Content.md), [`Data`](../interfaces/Data.md), [`Forward`](../interfaces/Forward.md), [`Redirect`](../interfaces/Redirect.md)\>

#### Returns

`ConversationHandler`

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`constructor`](AbstractHandler.md#constructor)

## Properties

### type

> `readonly` **type**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:8

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`type`](AbstractHandler.md#type)

***

### intentId

> `readonly` **intentId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:9

The ID of the intent, typically a combination of the name
and a random string.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`intentId`](AbstractHandler.md#intentid)

***

### appId

> `readonly` **appId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:10

The ID for the app the intent belongs to.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`appId`](AbstractHandler.md#appid)

***

### organizationId

> `readonly` **organizationId**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:11

The organization ID for the app of which this intent belongs.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`organizationId`](AbstractHandler.md#organizationid)

***

### createdAt

> `readonly` **createdAt**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:12

ISO-8601 string of when the intent was created.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`createdAt`](AbstractHandler.md#createdat)

***

### content

> `readonly` **content**: [`Content`](../interfaces/Content.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:13

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`content`](AbstractHandler.md#content)

***

### data

> **data**: [`Data`](../interfaces/Data.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:14

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`data`](AbstractHandler.md#data)

***

### forward

> `readonly` **forward**: [`Forward`](../interfaces/Forward.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:15

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`forward`](AbstractHandler.md#forward)

***

### redirect

> `readonly` **redirect**: [`Redirect`](../interfaces/Redirect.md)

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:16

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`redirect`](AbstractHandler.md#redirect)

***

### name?

> `readonly` `optional` **name**: `string`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:17

The human readable name of the intent.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`name`](AbstractHandler.md#name)

***

### slots?

> `readonly` `optional` **slots**: `Slot`[]

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:18

The slots defined within the utterance patterns
and their Entity types.

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`slots`](AbstractHandler.md#slots)

***

### ~~slotTypes?~~

> `readonly` `optional` **slotTypes**: `SlotTypeMap`

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:19

A map of the slot type definition.

#### Deprecated

Use Entities

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`slotTypes`](AbstractHandler.md#slottypes)

***

### permissions?

> `readonly` `optional` **permissions**: `UserDataType`[]

Defined in: packages/stentor-handler/lib/AbstractHandler/Handler.d.ts:20

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`permissions`](AbstractHandler.md#permissions)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`isOwnRequest`](AbstractHandler.md#isownrequest)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`canHandleRequest`](AbstractHandler.md#canhandlerequest)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`forwardingPathForRequest`](AbstractHandler.md#forwardingpathforrequest)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`redirectingPathForRequest`](AbstractHandler.md#redirectingpathforrequest)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`canHandleInputUnknown`](AbstractHandler.md#canhandleinputunknown)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`repeat`](AbstractHandler.md#repeat)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`inputUnknown`](AbstractHandler.md#inputunknown)

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

#### Inherited from

[`AbstractHandler`](AbstractHandler.md).[`start`](AbstractHandler.md#start)

***

### handleRequest()

> **handleRequest**(`request`, `context`): `Promise`\<`void`\>

Defined in: packages/stentor-handler/lib/ConversationHandler.d.ts:11

Handles the incoming request.  Sets the necessary responses and saves the necessary items
to storage.

#### Parameters

##### request

[`Request`](../type-aliases/Request.md)

##### context

[`Context`](../interfaces/Context.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`AbstractHandler`](AbstractHandler.md).[`handleRequest`](AbstractHandler.md#handlerequest)
