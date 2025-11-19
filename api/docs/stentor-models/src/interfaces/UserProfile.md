[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / UserProfile

# Interface: UserProfile

Defined in: [packages/stentor-models/src/UserProfile.ts:2](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L2)

## Properties

### id

> **id**: `string`

Defined in: [packages/stentor-models/src/UserProfile.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L6)

Unique userId

***

### name?

> `optional` **name**: `string`

Defined in: [packages/stentor-models/src/UserProfile.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L10)

The first name, or given name, of the user.

***

### email?

> `optional` **email**: `string`

Defined in: [packages/stentor-models/src/UserProfile.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L14)

The email of the user.

***

### notificationGranted?

> `optional` **notificationGranted**: `boolean`

Defined in: [packages/stentor-models/src/UserProfile.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L19)

User granted permission to update
Note: This isn't a piece of data we want to know, but Google uses the permissioning mechanism to grant it.

***

### phone?

> `optional` **phone**: `string`

Defined in: [packages/stentor-models/src/UserProfile.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L21)

***

### preciseLocation?

> `optional` **preciseLocation**: `object`

Defined in: [packages/stentor-models/src/UserProfile.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L23)

#### coordinates?

> `optional` **coordinates**: `object`

##### coordinates.latitude

> **latitude**: `number`

##### coordinates.longitude

> **longitude**: `number`

***

### coarseLocation?

> `optional` **coarseLocation**: `string`

Defined in: [packages/stentor-models/src/UserProfile.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UserProfile.ts#L30)
