[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-event/src](../README.md) / AbstractEventStream

# Abstract Class: AbstractEventStream

Defined in: [packages/stentor-service-event/src/AbstractEventStream.ts:4](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/AbstractEventStream.ts#L4)

## Extended by

- [`ConsoleStream`](ConsoleStream.md)
- [`FirehoseStream`](FirehoseStream.md)
- [`KinesisStream`](KinesisStream.md)
- [`SNSStream`](SNSStream.md)

## Implements

- `EventStream`

## Constructors

### Constructor

> **new AbstractEventStream**(): `AbstractEventStream`

Defined in: [packages/stentor-service-event/src/AbstractEventStream.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/AbstractEventStream.ts#L7)

#### Returns

`AbstractEventStream`

## Methods

### addEvent()

> **addEvent**(`event`): `void`

Defined in: [packages/stentor-service-event/src/AbstractEventStream.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/AbstractEventStream.ts#L11)

Add an event to the stream.  This will not be sent until the event is flushed.

#### Parameters

##### event

`Event`\<`any`\>

The event to send.

#### Returns

`void`

#### Implementation of

`EventStream.addEvent`

***

### flush()

> **flush**(): `Promise`\<`void`\>

Defined in: [packages/stentor-service-event/src/AbstractEventStream.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/AbstractEventStream.ts#L15)

Send all the events to the end of the stream.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`EventStream.flush`

***

### flushEvents()

> `abstract` `protected` **flushEvents**(`event`): `Promise`\<`void`\>

Defined in: [packages/stentor-service-event/src/AbstractEventStream.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/AbstractEventStream.ts#L21)

#### Parameters

##### event

`Event`\<`any`\>[]

#### Returns

`Promise`\<`void`\>
