[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ExternalLead

# Interface: ExternalLead

Defined in: [packages/stentor-models/src/Crm.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L9)

## Properties

### userId?

> `optional` **userId**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L13)

The user ID that generated the lead

***

### sessionId?

> `optional` **sessionId**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L17)

The session ID that generated the lead

***

### fields

> **fields**: [`LeadFormField`](LeadFormField.md)[]

Defined in: [packages/stentor-models/src/Crm.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L21)

Fields such as name and email

***

### source?

> `optional` **source**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L25)

Optional source, typically chat-widget or form-widget

***

### company?

> `optional` **company**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L29)

Optional company

***

### transcript?

> `optional` **transcript**: [`Message`](Message.md)[]

Defined in: [packages/stentor-models/src/Crm.ts:34](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L34)

Transcript of the conversation

***

### refId?

> `optional` **refId**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L38)

Optional reference ID in the 3rd party CRM or FSM

***

### jobTypeId?

> `optional` **jobTypeId**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L43)

Optional job type ID in the 3rd party CRM 
(this maybe looked up already as a side effect of the avalability request)

***

### availabilityClassId?

> `optional` **availabilityClassId**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L47)

Optinal id to to identify the availabilty stratego (blocked days ahead, etc)

***

### isAbandoned?

> `optional` **isAbandoned**: `boolean`

Defined in: [packages/stentor-models/src/Crm.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L51)

Is it abandoned (unfinished)?
