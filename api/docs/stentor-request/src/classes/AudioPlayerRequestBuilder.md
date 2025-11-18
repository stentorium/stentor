[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / AudioPlayerRequestBuilder

# Class: AudioPlayerRequestBuilder

Defined in: [packages/stentor-request/src/Builders.ts:505](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L505)

Build an AudioPlayerRequest

## Extends

- `AbstractBuilder`\<`AudioPlayerRequest`\>

## Constructors

### Constructor

> **new AudioPlayerRequestBuilder**(): `AudioPlayerRequestBuilder`

#### Returns

`AudioPlayerRequestBuilder`

#### Inherited from

`AbstractBuilder<AudioPlayerRequest>.constructor`

## Methods

### withEvent()

> **withEvent**(`event`): `AudioPlayerRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:513](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L513)

#### Parameters

##### event

`AudioPlayerEvent`

#### Returns

`AudioPlayerRequestBuilder`

***

### withFailure()

> **withFailure**(`type`, `message`): `AudioPlayerRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:523](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L523)

Sets request type to AudioPlayerPlaybackFailed and adds type & message to the request

#### Parameters

##### type

`string`

##### message

`string`

#### Returns

`AudioPlayerRequestBuilder`

***

### playbackStarted()

> **playbackStarted**(): `AudioPlayerRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:531](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L531)

#### Returns

`AudioPlayerRequestBuilder`

***

### playbackStopped()

> **playbackStopped**(): `AudioPlayerRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:536](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L536)

#### Returns

`AudioPlayerRequestBuilder`

***

### withOffset()

> **withOffset**(`offsetInMilliseconds`): `AudioPlayerRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:541](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L541)

#### Parameters

##### offsetInMilliseconds

`number`

#### Returns

`AudioPlayerRequestBuilder`

***

### withToken()

> **withToken**(`token`): `AudioPlayerRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:546](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L546)

#### Parameters

##### token

`string`

#### Returns

`AudioPlayerRequestBuilder`

***

### build()

> **build**(): `AudioPlayerRequest`

Defined in: [packages/stentor-request/src/Builders.ts:551](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L551)

#### Returns

`AudioPlayerRequest`

#### Overrides

`AbstractBuilder.build`
