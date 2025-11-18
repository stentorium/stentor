[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-event/src](../README.md) / FirehoseStream

# Class: FirehoseStream

Defined in: [packages/stentor-service-event/src/FirehoseStream.ts:63](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/FirehoseStream.ts#L63)

## Extends

- [`AbstractEventStream`](AbstractEventStream.md)

## Constructors

### Constructor

> **new FirehoseStream**(`deliveryStreamName`, `injectedFirehose`): `FirehoseStream`

Defined in: [packages/stentor-service-event/src/FirehoseStream.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/FirehoseStream.ts#L67)

#### Parameters

##### deliveryStreamName

`string`

##### injectedFirehose

`any` = `globalFirehose`

#### Returns

`FirehoseStream`

#### Overrides

[`AbstractEventStream`](AbstractEventStream.md).[`constructor`](AbstractEventStream.md#constructor)

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

#### Inherited from

[`AbstractEventStream`](AbstractEventStream.md).[`addEvent`](AbstractEventStream.md#addevent)

***

### flush()

> **flush**(): `Promise`\<`void`\>

Defined in: [packages/stentor-service-event/src/AbstractEventStream.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/AbstractEventStream.ts#L15)

Send all the events to the end of the stream.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractEventStream`](AbstractEventStream.md).[`flush`](AbstractEventStream.md#flush)

***

### flushEvents()

> **flushEvents**(`events`): `Promise`\<`void`\>

Defined in: [packages/stentor-service-event/src/FirehoseStream.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/FirehoseStream.ts#L73)

#### Parameters

##### events

`Event`\<`any`\>[]

#### Returns

`Promise`\<`void`\>

#### Overrides

[`AbstractEventStream`](AbstractEventStream.md).[`flushEvents`](AbstractEventStream.md#flushevents)
