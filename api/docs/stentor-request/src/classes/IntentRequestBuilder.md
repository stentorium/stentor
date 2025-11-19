[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / IntentRequestBuilder

# Class: IntentRequestBuilder

Defined in: [packages/stentor-request/src/Builders.ts:212](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L212)

Builds an IntentRequest.

The defaults value for the required fields are typically the key name, for example
the default value for the intentId is "intentId".

## Extends

- `AbstractBuilder`\<[`IntentRequest`](../../../stentor/src/interfaces/IntentRequest.md)\>

## Constructors

### Constructor

> **new IntentRequestBuilder**(): `IntentRequestBuilder`

#### Returns

`IntentRequestBuilder`

#### Inherited from

`AbstractBuilder<IntentRequest>.constructor`

## Methods

### canFulfill()

> **canFulfill**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:243](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L243)

Turns the request into a canfulfill intent request.

#### Returns

`IntentRequestBuilder`

***

### onPlatform()

> **onPlatform**(`platform`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:253](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L253)

Set the platform for the request.

#### Parameters

##### platform

`string`

Platform for the request

#### Returns

`IntentRequestBuilder`

***

### onChannel()

> **onChannel**(`channel`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:264](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L264)

Set the channel for the request

#### Parameters

##### channel

`string`

Channel for the request

#### Returns

`IntentRequestBuilder`

***

### withRawQuery()

> **withRawQuery**(`rawQuery`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:274](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L274)

Set the raw query for the request.

#### Parameters

##### rawQuery

`string`

Raw query for the request

#### Returns

`IntentRequestBuilder`

***

### withMatchConfidence()

> **withMatchConfidence**(`confidence`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:285](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L285)

Set the optional match confidence

#### Parameters

##### confidence

`number`

#### Returns

`IntentRequestBuilder`

***

### withUserId()

> **withUserId**(`userId`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:295](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L295)

Set the user ID for the request.

#### Parameters

##### userId

`string`

User ID for the request

#### Returns

`IntentRequestBuilder`

***

### withAPIAccess()

> **withAPIAccess**(`apiAccess`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:305](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L305)

Set the API access data for the request.

#### Parameters

##### apiAccess

`ApiAccessData`

API access data for the request.

#### Returns

`IntentRequestBuilder`

***

### withIntentId()

> **withIntentId**(`intentId`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:317](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L317)

Sets the intentId for the request.

If not set, the default is intentId.

#### Parameters

##### intentId

`string`

Intent ID for the request.

#### Returns

`IntentRequestBuilder`

***

### withDeviceId()

> **withDeviceId**(`deviceId`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:327](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L327)

Add a device ID to the request.

#### Parameters

##### deviceId

`string`

Device ID for the request

#### Returns

`IntentRequestBuilder`

***

### resumeIntent()

> **resumeIntent**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:335](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L335)

Sets the intent request to be for a resume intent.

#### Returns

`IntentRequestBuilder`

***

### nextIntent()

> **nextIntent**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:343](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L343)

Sets the intent request to be for a NextIntent

#### Returns

`IntentRequestBuilder`

***

### previousIntent()

> **previousIntent**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:351](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L351)

Sets the intent request to be for a PreviousIntent

#### Returns

`IntentRequestBuilder`

***

### latestIntent()

> **latestIntent**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:358](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L358)

Sets the intent request to be for a LatestIntent

#### Returns

`IntentRequestBuilder`

***

### repeatIntent()

> **repeatIntent**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:366](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L366)

Sets the intent request to be for a RepeatIntent

#### Returns

`IntentRequestBuilder`

***

### cancel()

> **cancel**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:374](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L374)

Sets the intent request to be for a CancelIntent

#### Returns

`IntentRequestBuilder`

***

### help()

> **help**(): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:382](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L382)

Sets the intent request to be for a HelpIntent

#### Returns

`IntentRequestBuilder`

***

### withSlots()

> **withSlots**(`slots`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:392](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L392)

Add slots to the request.

#### Parameters

##### slots

[`RequestSlotMap`](../../../stentor/src/interfaces/RequestSlotMap.md)

Slots for the request.

#### Returns

`IntentRequestBuilder`

***

### withLocale()

> **withLocale**(`locale`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:402](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L402)

Specify the locale for the request.

#### Parameters

##### locale

[`LanguageTag`](../../../stentor-locales/src/type-aliases/LanguageTag.md)

Locale for the intent request.

#### Returns

`IntentRequestBuilder`

***

### withKnowledgeBaseResult()

> **withKnowledgeBaseResult**(`result`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:413](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L413)

Add a knowledge base result.

#### Parameters

##### result

[`KnowledgeBaseResult`](../../../stentor/src/interfaces/KnowledgeBaseResult.md)

#### Returns

`IntentRequestBuilder`

***

### withAttributes()

> **withAttributes**(`attributes`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:424](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L424)

Append attributes to the request.

#### Parameters

##### attributes

`Record`\<`string`, `unknown`\>

#### Returns

`IntentRequestBuilder`

***

### updateDevice()

> **updateDevice**(`device`): `IntentRequestBuilder`

Defined in: [packages/stentor-request/src/Builders.ts:435](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L435)

Update any or all of the fields on request's device information.

#### Parameters

##### device

`Partial`\<[`Device`](../../../stentor/src/interfaces/Device.md)\>

#### Returns

`IntentRequestBuilder`

***

### build()

> **build**(): [`IntentRequest`](../../../stentor/src/interfaces/IntentRequest.md)

Defined in: [packages/stentor-request/src/Builders.ts:447](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/Builders.ts#L447)

Build the intent request.

#### Returns

[`IntentRequest`](../../../stentor/src/interfaces/IntentRequest.md)

#### Overrides

`AbstractBuilder.build`
