[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-event/src](../README.md) / SNSStream

# Class: SNSStream

Defined in: [packages/stentor-service-event/src/SNSStream.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/SNSStream.ts#L31)

## Extends

- [`AbstractEventStream`](AbstractEventStream.md)

## Constructors

### Constructor

> **new SNSStream**(`topicArn`, `sns`): `SNSStream`

Defined in: [packages/stentor-service-event/src/SNSStream.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/SNSStream.ts#L35)

#### Parameters

##### topicArn

`string`

##### sns

`any` = `globalSNS`

#### Returns

`SNSStream`

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

Defined in: [packages/stentor-service-event/src/SNSStream.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/SNSStream.ts#L41)

#### Parameters

##### events

`Event`\<`any`\>[]

#### Returns

`Promise`\<`void`\>

#### Overrides

[`AbstractEventStream`](AbstractEventStream.md).[`flushEvents`](AbstractEventStream.md#flushevents)
