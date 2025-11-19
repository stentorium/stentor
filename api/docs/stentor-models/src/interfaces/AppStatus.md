[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AppStatus

# Interface: AppStatus

Defined in: [packages/stentor-models/src/App/AppStatus.ts:71](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L71)

The status of the App

## Extended by

- [`FullAppStatus`](FullAppStatus.md)

## Properties

### type

> **type**: [`AppStatusType`](../type-aliases/AppStatusType.md)

Defined in: [packages/stentor-models/src/App/AppStatus.ts:75](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L75)

Status type

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/stentor-models/src/App/AppStatus.ts:79](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L79)

The time when the status was set

***

### email

> **email**: `string`

Defined in: [packages/stentor-models/src/App/AppStatus.ts:83](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L83)

The email of the user/admin who set the status

***

### notes

> **notes**: `string`

Defined in: [packages/stentor-models/src/App/AppStatus.ts:87](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/App/AppStatus.ts#L87)

Any notes set by the admin when the status was set.
