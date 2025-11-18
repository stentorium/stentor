[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Device

# Interface: Device

Defined in: packages/stentor-models/lib/Device.d.ts:20

Describes the capability of the device where the
request originated.

It also provides insight to how you can respond to the
current request as it isn't always possible to return
speech.

## Properties

### ~~channel~~

> **channel**: `string`

Defined in: packages/stentor-models/lib/Device.d.ts:26

The channel the user is on.

#### Deprecated

Use the channel on the request object instead

***

### audioSupported

> **audioSupported**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:30

If the device is capable of playing audio.

***

### canPlayAudio

> **canPlayAudio**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:34

If the current request can be responded to with audio.

***

### videoSupported

> **videoSupported**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:38

If the device is capable of playing video.

***

### canPlayVideo

> **canPlayVideo**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:42

If the current request can be responded to with video.

***

### canSpeak

> **canSpeak**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:47

If the device (and current request) can be responded to
with speech

***

### canThrowCard

> **canThrowCard**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:51

If the device (and current request) can throw a card

***

### canTransferCall

> **canTransferCall**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:57

If the device is capable to transfer calls (usually to an live agent).

Telephony channels typically can perform this.

***

### hasScreen

> **hasScreen**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:64

If the device has a screen.

Used to determine if we can link accounts on Google
or return display interfaces on Alexa.

***

### hasWebBrowser

> **hasWebBrowser**: `boolean`

Defined in: packages/stentor-models/lib/Device.d.ts:70

If the device has web browser capability

Google assistant app has it, hub doesn't

***

### displayData?

> `optional` **displayData**: `DisplayData`

Defined in: packages/stentor-models/lib/Device.d.ts:76

Display data

Used to tell a little bit more about the display type if data is available

***

### mediaPlayerStatus?

> `optional` **mediaPlayerStatus**: `MediaPlayerStatus`

Defined in: packages/stentor-models/lib/Device.d.ts:80

Some channels and devices also support media playback
