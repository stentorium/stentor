[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-runtime/src](../README.md) / ChannelSelector

# Class: ChannelSelector

Defined in: [packages/stentor-runtime/src/ChannelSelector.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ChannelSelector.ts#L5)

## Constructors

### Constructor

> **new ChannelSelector**(): `ChannelSelector`

#### Returns

`ChannelSelector`

## Methods

### from()

> **from**(`channels`, `request`, `lambdaContext?`): [`Channel`](../../../stentor/src/interfaces/Channel.md)

Defined in: [packages/stentor-runtime/src/ChannelSelector.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ChannelSelector.ts#L13)

Selects a channel from one of the provided based on the request body and infrastructure context.

#### Parameters

##### channels

[`Channel`](../../../stentor/src/interfaces/Channel.md)[]

Array of possible channels

##### request

`object`

The request body.

##### lambdaContext?

[`RuntimeContext`](../../../stentor/src/interfaces/RuntimeContext.md)

#### Returns

[`Channel`](../../../stentor/src/interfaces/Channel.md)
