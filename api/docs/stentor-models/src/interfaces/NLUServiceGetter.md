[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / NLUServiceGetter

# Interface: NLUServiceGetter

Defined in: [packages/stentor-models/src/NLU/NLUServiceGetter.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUServiceGetter.ts#L9)

Tests and gets an NLUService based on ChannelData or NLUData

## Methods

### test()

> **test**(`obj`): `boolean`

Defined in: [packages/stentor-models/src/NLU/NLUServiceGetter.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUServiceGetter.ts#L20)

Tests the provided data to see if it is
the proper type for the NLUService that is 
returned by the get() method.

This can be a guard.

#### Parameters

##### obj

[`ChannelData`](ChannelData.md) | [`NLUData`](NLUData.md)

#### Returns

`boolean`

True if the provided data is for setting up the NLUService

***

### get()

> **get**(`obj`): [`NLUService`](NLUService.md)

Defined in: [packages/stentor-models/src/NLU/NLUServiceGetter.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUServiceGetter.ts#L28)

Based on the provided data it will generate 
an NLUService for use.

#### Parameters

##### obj

[`ChannelData`](ChannelData.md) | [`NLUData`](NLUData.md)

#### Returns

[`NLUService`](NLUService.md)
