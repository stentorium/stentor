[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / IntentRequestBuilder

# Class: IntentRequestBuilder

Defined in: packages/stentor-request/lib/Builders.d.ts:89

Builds an IntentRequest.

The defaults value for the required fields are typically the key name, for example
the default value for the intentId is "intentId".

## Extends

- `AbstractBuilder`\<[`IntentRequest`](../interfaces/IntentRequest.md)\>

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

Defined in: packages/stentor-request/lib/Builders.d.ts:108

Turns the request into a canfulfill intent request.

#### Returns

`IntentRequestBuilder`

***

### onPlatform()

> **onPlatform**(`platform`): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:114

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

Defined in: packages/stentor-request/lib/Builders.d.ts:121

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

Defined in: packages/stentor-request/lib/Builders.d.ts:127

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

Defined in: packages/stentor-request/lib/Builders.d.ts:134

Set the optional match confidence

#### Parameters

##### confidence

`number`

#### Returns

`IntentRequestBuilder`

***

### withUserId()

> **withUserId**(`userId`): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:140

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

Defined in: packages/stentor-request/lib/Builders.d.ts:146

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

Defined in: packages/stentor-request/lib/Builders.d.ts:154

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

Defined in: packages/stentor-request/lib/Builders.d.ts:160

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

Defined in: packages/stentor-request/lib/Builders.d.ts:164

Sets the intent request to be for a resume intent.

#### Returns

`IntentRequestBuilder`

***

### nextIntent()

> **nextIntent**(): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:168

Sets the intent request to be for a NextIntent

#### Returns

`IntentRequestBuilder`

***

### previousIntent()

> **previousIntent**(): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:172

Sets the intent request to be for a PreviousIntent

#### Returns

`IntentRequestBuilder`

***

### latestIntent()

> **latestIntent**(): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:176

Sets the intent request to be for a LatestIntent

#### Returns

`IntentRequestBuilder`

***

### repeatIntent()

> **repeatIntent**(): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:180

Sets the intent request to be for a RepeatIntent

#### Returns

`IntentRequestBuilder`

***

### cancel()

> **cancel**(): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:184

Sets the intent request to be for a CancelIntent

#### Returns

`IntentRequestBuilder`

***

### help()

> **help**(): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:188

Sets the intent request to be for a HelpIntent

#### Returns

`IntentRequestBuilder`

***

### withSlots()

> **withSlots**(`slots`): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:194

Add slots to the request.

#### Parameters

##### slots

[`RequestSlotMap`](../interfaces/RequestSlotMap.md)

Slots for the request.

#### Returns

`IntentRequestBuilder`

***

### withLocale()

> **withLocale**(`locale`): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:200

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

Defined in: packages/stentor-request/lib/Builders.d.ts:207

Add a knowledge base result.

#### Parameters

##### result

[`KnowledgeBaseResult`](../interfaces/KnowledgeBaseResult.md)

#### Returns

`IntentRequestBuilder`

***

### withAttributes()

> **withAttributes**(`attributes`): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:214

Append attributes to the request.

#### Parameters

##### attributes

`Record`\<`string`, `unknown`\>

#### Returns

`IntentRequestBuilder`

***

### updateDevice()

> **updateDevice**(`device`): `IntentRequestBuilder`

Defined in: packages/stentor-request/lib/Builders.d.ts:221

Update any or all of the fields on request's device information.

#### Parameters

##### device

`Partial`\<[`Device`](../interfaces/Device.md)\>

#### Returns

`IntentRequestBuilder`

***

### build()

> **build**(): [`IntentRequest`](../interfaces/IntentRequest.md)

Defined in: packages/stentor-request/lib/Builders.d.ts:225

Build the intent request.

#### Returns

[`IntentRequest`](../interfaces/IntentRequest.md)

#### Overrides

`AbstractBuilder.build`
