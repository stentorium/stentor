[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Pii

# Interface: Pii

Defined in: [packages/stentor-models/src/Pii.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L7)

## Properties

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Pii.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L8)

***

### appId?

> `optional` **appId**: `string`

Defined in: [packages/stentor-models/src/Pii.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L10)

***

### phoneNumber?

> `optional` **phoneNumber**: `string`

Defined in: [packages/stentor-models/src/Pii.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L12)

***

### phoneNumberStatus?

> `optional` **phoneNumberStatus**: [`OptStatus`](../type-aliases/OptStatus.md)

Defined in: [packages/stentor-models/src/Pii.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L13)

***

### emailAddress?

> `optional` **emailAddress**: `string`

Defined in: [packages/stentor-models/src/Pii.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L15)

***

### emailAddressStatus?

> `optional` **emailAddressStatus**: [`OptStatus`](../type-aliases/OptStatus.md)

Defined in: [packages/stentor-models/src/Pii.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L16)

***

### customData?

> `optional` **customData**: `any`[]

Defined in: [packages/stentor-models/src/Pii.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L18)

***

### customDataStatus?

> `optional` **customDataStatus**: [`OptStatus`](../type-aliases/OptStatus.md)

Defined in: [packages/stentor-models/src/Pii.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L19)

***

### name?

> `optional` **name**: `string`

Defined in: [packages/stentor-models/src/Pii.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L21)

***

### preciseLocation?

> `optional` **preciseLocation**: `object`

Defined in: [packages/stentor-models/src/Pii.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L22)

#### coordinates?

> `optional` **coordinates**: `object`

##### coordinates.latitude

> **latitude**: `number`

##### coordinates.longitude

> **longitude**: `number`

***

### coarseLocation?

> `optional` **coarseLocation**: `string`

Defined in: [packages/stentor-models/src/Pii.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L28)

***

### pendingSmsJobs?

> `optional` **pendingSmsJobs**: [`SmsDescription`](SmsDescription.md)[]

Defined in: [packages/stentor-models/src/Pii.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L30)

***

### pendingEmailJobs?

> `optional` **pendingEmailJobs**: [`EmailDescription`](EmailDescription.md)[]

Defined in: [packages/stentor-models/src/Pii.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Pii.ts#L31)
