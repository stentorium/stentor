[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / CrmService

# Interface: CrmService

Defined in: packages/stentor-models/lib/Services/CrmService.d.ts:134

## Methods

### send()

> **send**(`externalLead`, `extras?`): `Promise`\<`CrmResponse`\>

Defined in: packages/stentor-models/lib/Services/CrmService.d.ts:145

Send information about a lead to the CRM.

This can be used to either create a lead or append data to an existing lead.

The existing lead can be determined by the refId on the ExternalLead information or by attempting to match data such as email or phone number.

#### Parameters

##### externalLead

`ExternalLead`

Lead information

##### extras?

`Record`\<`string`, `unknown`\>

Optional additional metadata to pass to the CRM

#### Returns

`Promise`\<`CrmResponse`\>

***

### ~~update()?~~

> `optional` **update**(`externalLead`, `extras?`): `Promise`\<`CrmResponse`\>

Defined in: packages/stentor-models/lib/Services/CrmService.d.ts:156

Updates a lead if the user provides more information after the lead has been sent.

It leverages the refId on the externalLead, which is originally provided in the CrmResponse to properly

#### Parameters

##### externalLead

`ExternalLead`

##### extras?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`CrmResponse`\>

#### Deprecated

Use send with a refId on the externalLead and call send() again.  This will update.

***

### getAvailability()

> **getAvailability**(`range`, `options?`): `Promise`\<`CrmServiceAvailability`\>

Defined in: packages/stentor-models/lib/Services/CrmService.d.ts:163

Returns availability for scheduling an appointment with the business.

#### Parameters

##### range

[`DateTimeRange`](DateTimeRange.md)

##### options?

`CrmServiceAvailabilityOptions`

#### Returns

`Promise`\<`CrmServiceAvailability`\>

***

### getJobType()

> **getJobType**(`message`, `externalLead?`): `Promise`\<`CrmServiceJobType`\>

Defined in: packages/stentor-models/lib/Services/CrmService.d.ts:169

Returns the job type (id) for the free text job description (AI call usually)

#### Parameters

##### message

`string`

##### externalLead?

`ExternalLead`

#### Returns

`Promise`\<`CrmServiceJobType`\>
