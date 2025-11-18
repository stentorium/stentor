[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Device

# Interface: Device

Defined in: [packages/stentor-models/src/Device.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L23)

Describes the capability of the device where the
request originated.

It also provides insight to how you can respond to the
current request as it isn't always possible to return
speech.

## Properties

### ~~channel~~

> **channel**: `string`

Defined in: [packages/stentor-models/src/Device.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L29)

The channel the user is on.

#### Deprecated

Use the channel on the request object instead

***

### audioSupported

> **audioSupported**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L33)

If the device is capable of playing audio.

***

### canPlayAudio

> **canPlayAudio**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L37)

If the current request can be responded to with audio.

***

### videoSupported

> **videoSupported**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L41)

If the device is capable of playing video.

***

### canPlayVideo

> **canPlayVideo**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L45)

If the current request can be responded to with video.

***

### canSpeak

> **canSpeak**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:50](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L50)

If the device (and current request) can be responded to
with speech

***

### canThrowCard

> **canThrowCard**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:54](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L54)

If the device (and current request) can throw a card

***

### canTransferCall

> **canTransferCall**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:60](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L60)

If the device is capable to transfer calls (usually to an live agent).

Telephony channels typically can perform this.

***

### hasScreen

> **hasScreen**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:67](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L67)

If the device has a screen.

Used to determine if we can link accounts on Google
or return display interfaces on Alexa.

***

### hasWebBrowser

> **hasWebBrowser**: `boolean`

Defined in: [packages/stentor-models/src/Device.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L73)

If the device has web browser capability

Google assistant app has it, hub doesn't

***

### displayData?

> `optional` **displayData**: [`DisplayData`](DisplayData.md)

Defined in: [packages/stentor-models/src/Device.ts:79](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L79)

Display data

Used to tell a little bit more about the display type if data is available

***

### mediaPlayerStatus?

> `optional` **mediaPlayerStatus**: [`MediaPlayerStatus`](MediaPlayerStatus.md)

Defined in: [packages/stentor-models/src/Device.ts:83](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Device.ts#L83)

Some channels and devices also support media playback
