[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-runtime/src](../README.md) / Dependencies

# Interface: Dependencies

Defined in: [packages/stentor-runtime/src/main.ts:79](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L79)

Runtime dependencies

## Properties

### eventService?

> `optional` **eventService**: `EventService`

Defined in: [packages/stentor-runtime/src/main.ts:80](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L80)

***

### crmService?

> `optional` **crmService**: [`CrmService`](../../../stentor/src/interfaces/CrmService.md)

Defined in: [packages/stentor-runtime/src/main.ts:81](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L81)

***

### smsService?

> `optional` **smsService**: `SMSService`

Defined in: [packages/stentor-runtime/src/main.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L82)

***

### handlerFactory

> **handlerFactory**: [`HandlerFactory`](../../../stentor/src/classes/HandlerFactory.md)

Defined in: [packages/stentor-runtime/src/main.ts:83](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L83)

***

### handlerService

> **handlerService**: `HandlerService`

Defined in: [packages/stentor-runtime/src/main.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L84)

***

### piiService?

> `optional` **piiService**: `PIIService`

Defined in: [packages/stentor-runtime/src/main.ts:85](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L85)

***

### userStorageService

> **userStorageService**: [`UserStorageService`](../../../stentor/src/interfaces/UserStorageService.md)

Defined in: [packages/stentor-runtime/src/main.ts:86](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L86)

***

### knowledgeBaseServices?

> `optional` **knowledgeBaseServices**: `object`

Defined in: [packages/stentor-runtime/src/main.ts:87](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L87)

#### Index Signature

\[`matchIntentId`: `string`\]: `KnowledgeBaseDependency`
