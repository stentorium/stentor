[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Event

# Interface: Event\<P\>

Defined in: [packages/stentor-models/src/Events/Event.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L8)

The base structure for an Event. An event must be serializable to a string so
it can be reconstructed on the other side.

## Extended by

- [`ErrorEvent`](ErrorEvent.md)
- [`LambdaFinishEvent`](LambdaFinishEvent.md)
- [`MessageEvent`](MessageEvent.md)
- [`RequestEvent`](RequestEvent.md)

## Type Parameters

### P

`P` *extends* `string` \| `boolean` \| `object` \| `number` \| `undefined` = `undefined`

## Indexable

\[`key`: `string`\]: `any`

Any additional keys with which this event contains.

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L12)

The name of this event.

***

### type

> **type**: [`EventType`](../type-aliases/EventType.md)

Defined in: [packages/stentor-models/src/Events/Event.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L16)

The type of event which is being sent.

***

### appId?

> `optional` **appId**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L20)

Application ID

***

### environment?

> `optional` **environment**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L24)

What environment we are in, for example a production or development environment.

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L28)

The platform serving the channel

***

### channel?

> `optional` **channel**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L32)

The channel provided by the platform.

***

### currentHandler?

> `optional` **currentHandler**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L36)

The current handler the user was in at the time of the request.

***

### selectedHandler?

> `optional` **selectedHandler**: `string`

Defined in: [packages/stentor-models/src/Events/Event.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L40)

The handler that was selected based on the request and the current handler.

***

### isHealthCheck?

> `optional` **isHealthCheck**: `boolean`

Defined in: [packages/stentor-models/src/Events/Event.ts:44](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L44)

Is the event from a health check

***

### isNewSession?

> `optional` **isNewSession**: `boolean`

Defined in: [packages/stentor-models/src/Events/Event.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L48)

Is the event the start of a session.

***

### payload?

> `optional` **payload**: `P`

Defined in: [packages/stentor-models/src/Events/Event.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/Event.ts#L52)

A serializable payload to associate with the event.
