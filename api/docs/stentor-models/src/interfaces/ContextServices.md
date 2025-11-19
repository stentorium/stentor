[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ContextServices

# Interface: ContextServices

Defined in: [packages/stentor-models/src/Context.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L28)

These we want to make available for custom handlers

## Properties

### crmService?

> `optional` **crmService**: [`CrmService`](CrmService.md)

Defined in: [packages/stentor-models/src/Context.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L32)

Service for sending information to a CRM

***

### smsService?

> `optional` **smsService**: [`SMSService`](SMSService.md)

Defined in: [packages/stentor-models/src/Context.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L36)

Service for sending text messages

***

### eventService?

> `optional` **eventService**: [`ErrorService`](ErrorService.md)

Defined in: [packages/stentor-models/src/Context.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L40)

Access to the event service for reporting runtime errors.
