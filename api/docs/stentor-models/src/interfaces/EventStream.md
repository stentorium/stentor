[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / EventStream

# Interface: EventStream

Defined in: [packages/stentor-models/src/Events/EventStream.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/EventStream.ts#L8)

An event stream is a collection of events that eventually get dispatched to a particular
endpoint.

## Methods

### addEvent()

> **addEvent**(`event`): `void`

Defined in: [packages/stentor-models/src/Events/EventStream.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/EventStream.ts#L14)

Add an event to the stream.  This will not be sent until the event is flushed.

#### Parameters

##### event

[`Event`](Event.md)\<`any`\>

The event to send.

#### Returns

`void`

***

### flush()

> **flush**(): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/Events/EventStream.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/EventStream.ts#L18)

Send all the events to the end of the stream.

#### Returns

`Promise`\<`void`\>
