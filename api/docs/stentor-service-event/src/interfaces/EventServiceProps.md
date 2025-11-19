[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-event/src](../README.md) / EventServiceProps

# Interface: EventServiceProps

Defined in: [packages/stentor-service-event/src/EventService.ts:68](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L68)

## Properties

### streams?

> `optional` **streams**: `EventStream` \| `EventStream`[]

Defined in: [packages/stentor-service-event/src/EventService.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L72)

Streams that are to be included with the EventService

***

### prefix?

> `optional` **prefix**: [`EventPrefix`](EventPrefix.md)

Defined in: [packages/stentor-service-event/src/EventService.ts:76](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L76)

Items that are to be appended with each event before they are sent to the stream.
