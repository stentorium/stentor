[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / CrmResponse

# Interface: CrmResponse

Defined in: [packages/stentor-models/src/Crm.ts:54](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L54)

## Properties

### status

> **status**: `"Success"` \| `"Failure"`

Defined in: [packages/stentor-models/src/Crm.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L58)

Was the lead creation request successful

***

### message?

> `optional` **message**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L62)

Potentially helpful message if there was a failure

***

### refId?

> `optional` **refId**: `string`

Defined in: [packages/stentor-models/src/Crm.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Crm.ts#L66)

A reference to the lead in the CRM
