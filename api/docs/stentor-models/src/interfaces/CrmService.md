[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / CrmService

# Interface: CrmService

Defined in: [packages/stentor-models/src/Services/CrmService.ts:154](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L154)

## Methods

### send()

> **send**(`externalLead`, `extras?`): `Promise`\<[`CrmResponse`](CrmResponse.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:165](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L165)

Send information about a lead to the CRM.

This can be used to either create a lead or append data to an existing lead.

The existing lead can be determined by the refId on the ExternalLead information or by attempting to match data such as email or phone number.

#### Parameters

##### externalLead

[`ExternalLead`](ExternalLead.md)

Lead information

##### extras?

`Record`\<`string`, `unknown`\>

Optional additional metadata to pass to the CRM

#### Returns

`Promise`\<[`CrmResponse`](CrmResponse.md)\>

***

### ~~update()?~~

> `optional` **update**(`externalLead`, `extras?`): `Promise`\<[`CrmResponse`](CrmResponse.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:179](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L179)

Updates a lead if the user provides more information after the lead has been sent.

It leverages the refId on the externalLead, which is originally provided in the CrmResponse to properly

#### Parameters

##### externalLead

[`ExternalLead`](ExternalLead.md)

##### extras?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<[`CrmResponse`](CrmResponse.md)\>

#### Deprecated

Use send with a refId on the externalLead and call send() again.  This will update.

***

### getAvailability()

> **getAvailability**(`range`, `options?`): `Promise`\<[`CrmServiceAvailability`](CrmServiceAvailability.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:189](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L189)

Returns availability for scheduling an appointment with the business.

#### Parameters

##### range

[`DateTimeRange`](DateTimeRange.md)

##### options?

[`CrmServiceAvailabilityOptions`](CrmServiceAvailabilityOptions.md)

#### Returns

`Promise`\<[`CrmServiceAvailability`](CrmServiceAvailability.md)\>

***

### getJobType()

> **getJobType**(`message`, `externalLead?`): `Promise`\<[`CrmServiceJobType`](CrmServiceJobType.md)\>

Defined in: [packages/stentor-models/src/Services/CrmService.ts:198](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/CrmService.ts#L198)

Returns the job type (id) for the free text job description (AI call usually)

#### Parameters

##### message

`string`

##### externalLead?

[`ExternalLead`](ExternalLead.md)

#### Returns

`Promise`\<[`CrmServiceJobType`](CrmServiceJobType.md)\>
