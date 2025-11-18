[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Channel

# Interface: Channel

Defined in: [packages/stentor-models/src/Channel/Channel.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L19)

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Channel/Channel.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L30)

The name of the channel.

This must be alphanumeric characters only, dashes instead of spaces.

For example: "actions-on-google" or "alexa"

This is used in analytics and in some cases platform selection if the platform is provided in the
URL as a query or path parameter.

***

### request

> **request**: `Translator`\<`object`, [`Request`](../type-aliases/Request.md)\>

Defined in: [packages/stentor-models/src/Channel/Channel.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L44)

Request translator (an instantiated class)

***

### response

> **response**: `Translator`\<[`RequestResponse`](RequestResponse.md), `object`\>

Defined in: [packages/stentor-models/src/Channel/Channel.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L48)

Response translator (an instantiated class)

***

### ~~builder()?~~

> `optional` **builder**: (`props`) => [`AbstractResponseBuilder`](../classes/AbstractResponseBuilder.md)

Defined in: [packages/stentor-models/src/Channel/Channel.ts:54](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L54)

Response builder, this is now deprecated in favor of providing a response translator.

#### Parameters

##### props

`object`

#### Returns

[`AbstractResponseBuilder`](../classes/AbstractResponseBuilder.md)

#### Deprecated

Provide a response translator instead of a customer builder.  This will be removed in the next major release.

***

### nlu?

> `optional` **nlu**: [`NLUService`](NLUService.md)

Defined in: [packages/stentor-models/src/Channel/Channel.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L67)

The NLU for the channel

***

### hooks?

> `optional` **hooks**: [`ChannelHooks`](../type-aliases/ChannelHooks.md)

Defined in: [packages/stentor-models/src/Channel/Channel.ts:71](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L71)

Runtime hooks used by the channel to make any necessary checks or modifications

## Methods

### test()?

> `optional` **test**(`body`): `boolean`

Defined in: [packages/stentor-models/src/Channel/Channel.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L40)

Optional function that tests the incoming request to see if it is a request for the channel.

It returns true if the request is for the channel.

If one isn't provided, it will rely on the name to determine the channel.

#### Parameters

##### body

`object`

#### Returns

`boolean`

***

### capabilities()

> **capabilities**(`body`): [`Device`](Device.md)

Defined in: [packages/stentor-models/src/Channel/Channel.ts:63](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L63)

Determine the capabilities and contextual information
related to the device the user is accessing the channel on.

#### Parameters

##### body

`object`

#### Returns

[`Device`](Device.md)

***

### handlerHook()?

> `optional` **handlerHook**(`handler`, `event`, `context`, `callback`, `services`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/Channel/Channel.ts:81](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channel.ts#L81)

Lambda event interceptor (right after the event)

#### Parameters

##### handler

(`event`, `context`, `callback`) => `Promise`\<`void`\>

Stentor handler function

##### event

`any`

raw lambda event

##### context

[`RuntimeContext`](RuntimeContext.md)

lambda context

##### callback

[`Callback`](../type-aliases/Callback.md)

lambda callback

##### services

###### userStorageService?

[`UserStorageService`](UserStorageService.md)

###### appService?

`any`

#### Returns

`Promise`\<`void`\>
