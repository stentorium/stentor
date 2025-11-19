[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-event/src](../README.md) / EventService

# Class: EventService

Defined in: [packages/stentor-service-event/src/EventService.ts:79](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L79)

## Implements

- [`ErrorService`](../../../stentor/src/interfaces/ErrorService.md)

## Constructors

### Constructor

> **new EventService**(`stream`, `prefix`): `EventService`

Defined in: [packages/stentor-service-event/src/EventService.ts:89](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L89)

#### Parameters

##### stream

[`AbstractEventStream`](AbstractEventStream.md) | [`EventServiceProps`](../interfaces/EventServiceProps.md) | `EventStream`[]

##### prefix

[`EventPrefix`](../interfaces/EventPrefix.md) = `{}`

#### Returns

`EventService`

## Methods

### addStream()

> **addStream**(`newStream`): `void`

Defined in: [packages/stentor-service-event/src/EventService.ts:116](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L116)

Add a new stream to send the events to

#### Parameters

##### newStream

`EventStream`

#### Returns

`void`

***

### addPrefix()

> **addPrefix**(`prefix`): `void`

Defined in: [packages/stentor-service-event/src/EventService.ts:126](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L126)

Adds an object that is appended every event that is sent.
All previous events added will not contain this prefix.
If the key already exists in the prefix, then it will be replaced.

#### Parameters

##### prefix

[`EventPrefix`](../interfaces/EventPrefix.md)

The object that is appended to each event flushed.

#### Returns

`void`

***

### request()

> **request**(`request`): `Event`

Defined in: [packages/stentor-service-event/src/EventService.ts:134](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L134)

Logs a Request object.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

The request to log.

#### Returns

`Event`

***

### requestResponse()

> **requestResponse**(`request`, `response`): `Event`\<\{ `request`: [`Request`](../../../stentor/src/type-aliases/Request.md); `response`: [`Response`](../../../stentor/src/type-aliases/Response.md); `tag?`: `string`; \}\>

Defined in: [packages/stentor-service-event/src/EventService.ts:197](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L197)

Logs a request & response event

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

##### response

[`Response`](../../../stentor/src/type-aliases/Response.md)

#### Returns

`Event`\<\{ `request`: [`Request`](../../../stentor/src/type-aliases/Request.md); `response`: [`Response`](../../../stentor/src/type-aliases/Response.md); `tag?`: `string`; \}\>

***

### error()

> **error**(`error`): `ErrorEvent`

Defined in: [packages/stentor-service-event/src/EventService.ts:210](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L210)

#### Parameters

##### error

`Error`

#### Returns

`ErrorEvent`

#### Implementation of

[`ErrorService`](../../../stentor/src/interfaces/ErrorService.md).[`error`](../../../stentor/src/interfaces/ErrorService.md#error)

***

### message()

> **message**(`name`, `message?`): `MessageEvent`

Defined in: [packages/stentor-service-event/src/EventService.ts:217](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L217)

#### Parameters

##### name

`string`

##### message?

`string`

#### Returns

`MessageEvent`

***

### event()

#### Call Signature

> **event**(`stentorEvent`): `Event`\<`any`\>

Defined in: [packages/stentor-service-event/src/EventService.ts:233](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L233)

Add an event that will be sent to all event streams.

##### Parameters

###### stentorEvent

`Event`\<`any`\>

##### Returns

`Event`\<`any`\>

#### Call Signature

> **event**(`type`, `name`, `payload?`, `keys?`): `Event`\<`any`\>

Defined in: [packages/stentor-service-event/src/EventService.ts:234](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L234)

Add an event that will be sent to all event streams.

##### Parameters

###### type

`EventType`

###### name

`string`

###### payload?

`string` | `object`

###### keys?

`Record`\<`string`, `unknown`\>

##### Returns

`Event`\<`any`\>

***

### flush()

> **flush**(): `Promise`\<`void`\>

Defined in: [packages/stentor-service-event/src/EventService.ts:268](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L268)

#### Returns

`Promise`\<`void`\>
