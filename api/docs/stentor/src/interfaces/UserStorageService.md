[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / UserStorageService

# Interface: UserStorageService

Defined in: packages/stentor-models/lib/Services/UserStorageService.d.ts:3

## Methods

### get()

> **get**(`id`): `Promise`\<[`Storage`](Storage.md)\>

Defined in: packages/stentor-models/lib/Services/UserStorageService.d.ts:10

Get the storage for the provided ID

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`Storage`](Storage.md)\>

***

### create()

> **create**(`id`, `storage`): `Promise`\<[`Storage`](Storage.md)\>

Defined in: packages/stentor-models/lib/Services/UserStorageService.d.ts:18

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

Defined in: packages/stentor-models/lib/Services/UserStorageService.d.ts:26

Update the storage for the provided ID with provided storage.

#### Parameters

##### id

`string`

##### storage

[`Storage`](Storage.md)

#### Returns

`Promise`\<[`Storage`](Storage.md)\>
