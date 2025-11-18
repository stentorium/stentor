[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / RequestEvent

# Interface: RequestEvent\<P\>

Defined in: [packages/stentor-models/src/Events/RequestEvent.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/RequestEvent.ts#L12)

The base structure for an Event. An event must be serializable to a string so
it can be reconstructed on the other side.

## Extends

- [`Event`](Event.md)\<`P`\>

## Extended by

- [`IntentRequestEvent`](IntentRequestEvent.md)
- [`PlaybackControlRequestEvent`](PlaybackControlRequestEvent.md)
- [`AudioPlayerRequestEvent`](AudioPlayerRequestEvent.md)

## Type Parameters

### P

`P` *extends* `object`

## Indexable

\[`key`: `string`\]: `any`

Any additional keys with which this event contains.

## Properties

### appId?

> `optional` **appId**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L20)

Application ID

#### Inherited from

[`Event`](Event.md).[`appId`](Event.md#appid)

***

### environment?

> `optional` **environment**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L24)

What environment we are in, for example a production or development environment.

#### Inherited from

[`Event`](Event.md).[`environment`](Event.md#environment)

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L28)

The platform serving the channel

#### Inherited from

[`Event`](Event.md).[`platform`](Event.md#platform)

***

### channel?

> `optional` **channel**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L32)

The channel provided by the platform.

#### Inherited from

[`Event`](Event.md).[`channel`](Event.md#channel)

***

### currentHandler?

> `optional` **currentHandler**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L36)

The current handler the user was in at the time of the request.

#### Inherited from

[`Event`](Event.md).[`currentHandler`](Event.md#currenthandler)

***

### selectedHandler?

> `optional` **selectedHandler**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L40)

The handler that was selected based on the request and the current handler.

#### Inherited from

[`Event`](Event.md).[`selectedHandler`](Event.md#selectedhandler)

***

### isHealthCheck?

> `optional` **isHealthCheck**: `boolean`

Defined in: [packages/stentor-models/src/Events/Event.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L44)

Is the event from a health check

#### Inherited from

[`Event`](Event.md).[`isHealthCheck`](Event.md#ishealthcheck)

***

### isNewSession?

> `optional` **isNewSession**: `boolean`

Defined in: [packages/stentor-models/src/Events/Event.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L48)

Is the event the start of a session.

#### Inherited from

[`Event`](Event.md).[`isNewSession`](Event.md#isnewsession)

***

### payload?

> `optional` **payload**: `P`

Defined in: [packages/stentor-models/src/Events/Event.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L52)

A serializable payload to associate with the event.

#### Inherited from

[`Event`](Event.md).[`payload`](Event.md#payload)

***

### type

> **type**: `"REQUEST"`

Defined in: [packages/stentor-models/src/Events/RequestEvent.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/RequestEvent.ts#L13)

The type of event which is being sent.

#### Overrides

[`Event`](Event.md).[`type`](Event.md#type)

***

### name

> **name**: [`RequestTypes`](../type-aliases/RequestTypes.md)

Defined in: [packages/stentor-models/src/Events/RequestEvent.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/RequestEvent.ts#L14)

The name of this event.

#### Overrides

[`Event`](Event.md).[`name`](Event.md#name)
