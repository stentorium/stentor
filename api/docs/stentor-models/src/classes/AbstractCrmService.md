[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AbstractCrmService

# Class: AbstractCrmService

Defined in: [packages/stentor-models/src/Services/CrmService.ts:206](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L206)

## Implements

- [`CrmService`](../interfaces/CrmService.md)

## Constructors

### Constructor

> **new AbstractCrmService**(`props`): `AbstractCrmService`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:215](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L215)

#### Parameters

##### props

[`CrmServiceAvailabilitySettings`](../interfaces/CrmServiceAvailabilitySettings.md)

#### Returns

`AbstractCrmService`

## Properties

### availableDays?

> `protected` `optional` **availableDays**: [`DayOfWeek`](../type-aliases/DayOfWeek.md)[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:207](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L207)

***

### blockedDays?

> `protected` `optional` **blockedDays**: [`DateTime`](../interfaces/DateTime.md)[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:209](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L209)

***

### maxTotalDailyAppointments?

> `protected` `optional` **maxTotalDailyAppointments**: `number`

Defined in: [packages/stentor-models/src/Services/CrmService.ts:211](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L211)

***

### delayedJobTypes?

> `protected` `optional` **delayedJobTypes**: `string`[]

Defined in: [packages/stentor-models/src/Services/CrmService.ts:213](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L213)

## Methods

### send()

> **send**(`externalLead`, `extras?`): `Promise`\<[`CrmResponse`](../interfaces/CrmResponse.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:233](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L233)

Send information about a lead to the CRM.

This can be used to either create a lead or append data to an existing lead.

The existing lead can be determined by the refId on the ExternalLead information or by attempting to match data such as email or phone number.

#### Parameters

##### externalLead

[`ExternalLead`](../interfaces/ExternalLead.md)

Lead information

##### extras?

`Record`\<`string`, `unknown`\>

Optional additional metadata to pass to the CRM

#### Returns

`Promise`\<[`CrmResponse`](../interfaces/CrmResponse.md)\>

#### Implementation of

[`CrmService`](../interfaces/CrmService.md).[`send`](../interfaces/CrmService.md#send)

***

### getAvailability()

> **getAvailability**(`range`, `options?`): `Promise`\<[`CrmServiceAvailability`](../interfaces/CrmServiceAvailability.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:240](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L240)

Returns availability for scheduling an appointment with the business.

#### Parameters

##### range

[`DateTimeRange`](../interfaces/DateTimeRange.md)

##### options?

[`CrmServiceAvailabilityOptions`](../interfaces/CrmServiceAvailabilityOptions.md)

#### Returns

`Promise`\<[`CrmServiceAvailability`](../interfaces/CrmServiceAvailability.md)\>

#### Implementation of

[`CrmService`](../interfaces/CrmService.md).[`getAvailability`](../interfaces/CrmService.md#getavailability)

***

### getJobType()

> **getJobType**(`message`, `externalLead?`): `Promise`\<[`CrmServiceJobType`](../interfaces/CrmServiceJobType.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:247](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L247)

Returns the job type (id) for the free text job description (AI call usually)

#### Parameters

##### message

`string`

##### externalLead?

[`ExternalLead`](../interfaces/ExternalLead.md)

#### Returns

`Promise`\<[`CrmServiceJobType`](../interfaces/CrmServiceJobType.md)\>

#### Implementation of

[`CrmService`](../interfaces/CrmService.md).[`getJobType`](../interfaces/CrmService.md#getjobtype)

***

### ~~update()?~~

> `optional` **update**(`externalLead`, `extras?`): `Promise`\<[`CrmResponse`](../interfaces/CrmResponse.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:254](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L254)

Updates a lead if the user provides more information after the lead has been sent.

It leverages the refId on the externalLead, which is originally provided in the CrmResponse to properly

#### Parameters

##### externalLead

[`ExternalLead`](../interfaces/ExternalLead.md)

##### extras?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<[`CrmResponse`](../interfaces/CrmResponse.md)\>

#### Deprecated

Use send with a refId on the externalLead and call send() again.  This will update.

#### Implementation of

[`CrmService`](../interfaces/CrmService.md).[`update`](../interfaces/CrmService.md#update)
