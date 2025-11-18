[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ResponseBuilderProps

# Interface: ResponseBuilderProps

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L14)

## Properties

### device

> **device**: `Readonly`\<[`Device`](Device.md)\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L18)

Capabilities of the current device used by the builder

***

### ~~backgroundImage?~~

> `optional` **backgroundImage**: [`ImageSpecification`](ImageSpecification.md)[]

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L24)

Sets the background image for some channels with display surfaces.

#### Deprecated

In favor of setting the background image on the channel.

***

### ~~assistantTitle?~~

> `optional` **assistantTitle**: `string`

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L30)

Sets the title for some channels with display surfaces.

#### Deprecated

In favor of setting the title directly on the channel.
