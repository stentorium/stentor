[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / UserStorageService

# Interface: UserStorageService

Defined in: [packages/stentor-models/src/Services/UserStorageService.ts:4](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/UserStorageService.ts#L4)

## Methods

### get()

> **get**(`id`): `Promise`\<[`Storage`](Storage.md)\>

Defined in: [packages/stentor-models/src/Services/UserStorageService.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/UserStorageService.ts#L11)

Get the storage for the provided ID

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`Storage`](Storage.md)\>

***

### create()

> **create**(`id`, `storage`): `Promise`\<[`Storage`](Storage.md)\>

Defined in: [packages/stentor-models/src/Services/UserStorageService.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/UserStorageService.ts#L19)

Creates the storage for the provided ID

#### Parameters

##### id

`string`

##### storage

[`Storage`](Storage.md)

#### Returns

`Promise`\<[`Storage`](Storage.md)\>

***

### update()

> **update**(`id`, `storage`): `Promise`\<[`Storage`](Storage.md)\>

Defined in: [packages/stentor-models/src/Services/UserStorageService.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/UserStorageService.ts#L27)

Update the storage for the provided ID with provided storage.

#### Parameters

##### id

`string`

##### storage

[`Storage`](Storage.md)

#### Returns

`Promise`\<[`Storage`](Storage.md)\>
