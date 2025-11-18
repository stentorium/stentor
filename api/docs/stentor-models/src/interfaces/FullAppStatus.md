[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / FullAppStatus

# Interface: FullAppStatus

Defined in: [packages/stentor-models/src/App/App.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L13)

The status of the App

## Extends

- [`AppStatus`](AppStatus.md)

## Properties

### statusHistory?

> `optional` **statusHistory**: [`AppStatus`](AppStatus.md)[]

Defined in: [packages/stentor-models/src/App/App.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/App.ts#L17)

History of the app's status

***

### type

> **type**: [`AppStatusType`](../type-aliases/AppStatusType.md)

Defined in: [packages/stentor-models/src/App/AppStatus.ts:75](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L75)

Status type

#### Inherited from

[`AppStatus`](AppStatus.md).[`type`](AppStatus.md#type)

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/stentor-models/src/App/AppStatus.ts:79](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L79)

The time when the status was set

#### Inherited from

[`AppStatus`](AppStatus.md).[`timestamp`](AppStatus.md#timestamp)

***

### email

> **email**: `string`

Defined in: [packages/stentor-models/src/App/AppStatus.ts:83](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L83)

The email of the user/admin who set the status

#### Inherited from

[`AppStatus`](AppStatus.md).[`email`](AppStatus.md#email)

***

### notes

> **notes**: `string`

Defined in: [packages/stentor-models/src/App/AppStatus.ts:87](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L87)

Any notes set by the admin when the status was set.

#### Inherited from

[`AppStatus`](AppStatus.md).[`notes`](AppStatus.md#notes)
