[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-event/src](../README.md) / wrapCallback

# Function: wrapCallback()

> **wrapCallback**(`event`, `lambdaCallback`): [`RuntimeCallback`](../../../stentor/src/type-aliases/RuntimeCallback.md)

Defined in: [packages/stentor-service-event/src/EventService.ts:294](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-event/src/EventService.ts#L294)

This function will wrap the callback to allow flushing the events to the streams just before
the callback is sent to the real one.

## Parameters

### event

[`EventService`](../classes/EventService.md)

The event service to flush when the callback is called.

### lambdaCallback

[`RuntimeCallback`](../../../stentor/src/type-aliases/RuntimeCallback.md)

The original callback to wrap

## Returns

[`RuntimeCallback`](../../../stentor/src/type-aliases/RuntimeCallback.md)

A new Lambda callback that can be used in replace of the original
