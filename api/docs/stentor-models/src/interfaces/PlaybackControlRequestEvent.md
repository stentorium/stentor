[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PlaybackControlRequestEvent

# Interface: PlaybackControlRequestEvent

Defined in: [packages/stentor-models/src/Events/RequestEvent.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/RequestEvent.ts#L31)

The base structure for an Event. An event must be serializable to a string so
it can be reconstructed on the other side.

## Extends

- [`RequestEvent`](RequestEvent.md)\<[`PlaybackControlRequestPayload`](PlaybackControlRequestPayload.md)\>

## Indexable

\[`key`: `string`\]: `any`

Any additional keys with which this event contains.

## Properties

### appId?

> `optional` **appId**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L20)

Application ID

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`appId`](RequestEvent.md#appid)

***

### environment?

> `optional` **environment**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L24)

What environment we are in, for example a production or development environment.

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`environment`](RequestEvent.md#environment)

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L28)

The platform serving the channel

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`platform`](RequestEvent.md#platform)

***

### channel?

> `optional` **channel**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L32)

The channel provided by the platform.

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`channel`](RequestEvent.md#channel)

***

### currentHandler?

> `optional` **currentHandler**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L36)

The current handler the user was in at the time of the request.

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`currentHandler`](RequestEvent.md#currenthandler)

***

### selectedHandler?

> `optional` **selectedHandler**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L40)

The handler that was selected based on the request and the current handler.

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`selectedHandler`](RequestEvent.md#selectedhandler)

***

### isHealthCheck?

> `optional` **isHealthCheck**: `boolean`

Defined in: [packages/stentor-models/src/Events/Event.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L44)

Is the event from a health check

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`isHealthCheck`](RequestEvent.md#ishealthcheck)

***

### isNewSession?

> `optional` **isNewSession**: `boolean`

Defined in: [packages/stentor-models/src/Events/Event.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L48)

Is the event the start of a session.

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`isNewSession`](RequestEvent.md#isnewsession)

***

### payload?

> `optional` **payload**: [`PlaybackControlRequestPayload`](PlaybackControlRequestPayload.md)

Defined in: [packages/stentor-models/src/Events/Event.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L52)

A serializable payload to associate with the event.

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`payload`](RequestEvent.md#payload)

***

### type

> **type**: `"REQUEST"`

Defined in: [packages/stentor-models/src/Events/RequestEvent.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/RequestEvent.ts#L13)

The type of event which is being sent.

#### Inherited from

[`RequestEvent`](RequestEvent.md).[`type`](RequestEvent.md#type)

***

### name

> **name**: `"PLAYBACK_CONTROL_REQUEST"`

Defined in: [packages/stentor-models/src/Events/RequestEvent.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/RequestEvent.ts#L32)

The name of this event.

#### Overrides

[`RequestEvent`](RequestEvent.md).[`name`](RequestEvent.md#name)
