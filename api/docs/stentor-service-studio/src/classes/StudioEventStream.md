[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-studio/src](../README.md) / StudioEventStream

# Class: StudioEventStream

Defined in: [packages/stentor-service-studio/src/StudioEventStream.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioEventStream.ts#L6)

## Extends

- `AbstractEventStream`

## Constructors

### Constructor

> **new StudioEventStream**(`props`): `StudioEventStream`

Defined in: [packages/stentor-service-studio/src/StudioEventStream.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioEventStream.ts#L8)

#### Parameters

##### props

###### service

[`StudioService`](StudioService.md)

#### Returns

`StudioEventStream`

#### Overrides

`AbstractEventStream.constructor`

## Methods

### addEvent()

> **addEvent**(`event`): `void`

Defined in: packages/stentor-service-event/lib/AbstractEventStream.d.ts:6

Add an event to the stream.  This will not be sent until the event is flushed.

#### Parameters

##### event

`Event`\<`any`\>

The event to send.

#### Returns

`void`

#### Inherited from

`AbstractEventStream.addEvent`

***

### flush()

> **flush**(): `Promise`\<`void`\>

Defined in: packages/stentor-service-event/lib/AbstractEventStream.d.ts:7

Send all the events to the end of the stream.

#### Returns

`Promise`\<`void`\>

#### Inherited from

`AbstractEventStream.flush`

***

### flushEvents()

> **flushEvents**(`events`): `Promise`\<`void`\>

Defined in: [packages/stentor-service-studio/src/StudioEventStream.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioEventStream.ts#L22)

#### Parameters

##### events

`Event`\<`any`\>[]

#### Returns

`Promise`\<`void`\>

#### Overrides

`AbstractEventStream.flushEvents`
