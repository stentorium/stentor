[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Channel

# Interface: Channel

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:15

## Properties

### name

> **name**: `string`

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:26

The name of the channel.

This must be alphanumeric characters only, dashes instead of spaces.

For example: "actions-on-google" or "alexa"

This is used in analytics and in some cases platform selection if the platform is provided in the
URL as a query or path parameter.

***

### request

> **request**: `Translator`\<`object`, [`Request`](../type-aliases/Request.md)\>

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:40

Request translator (an instantiated class)

***

### response

> **response**: `Translator`\<`RequestResponse`, `object`\>

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:44

Response translator (an instantiated class)

***

### ~~builder()?~~

> `optional` **builder**: (`props`) => `AbstractResponseBuilder`

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:50

Response builder, this is now deprecated in favor of providing a response translator.

#### Parameters

##### props

`object`

#### Returns

`AbstractResponseBuilder`

#### Deprecated

Provide a response translator instead of a customer builder.  This will be removed in the next major release.

***

### nlu?

> `optional` **nlu**: `NLUService`

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:63

The NLU for the channel

***

### hooks?

> `optional` **hooks**: `ChannelHooks`

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:67

Runtime hooks used by the channel to make any necessary checks or modifications

## Methods

### test()?

> `optional` **test**(`body`): `boolean`

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:36

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

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:59

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

Defined in: packages/stentor-models/lib/Channel/Channel.d.ts:77

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

`Callback`

lambda callback

##### services

###### userStorageService?

[`UserStorageService`](UserStorageService.md)

###### appService?

`any`

#### Returns

`Promise`\<`void`\>
