[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PIIService

# Interface: PIIService

Defined in: [packages/stentor-models/src/Services/PIIService.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L6)

## Properties

### pii

> **pii**: [`Pii`](Pii.md)

Defined in: [packages/stentor-models/src/Services/PIIService.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L7)

## Methods

### loadPii()

> **loadPii**(`token`): `Promise`\<[`Pii`](Pii.md)\>

Defined in: [packages/stentor-models/src/Services/PIIService.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L8)

#### Parameters

##### token

`string`

#### Returns

`Promise`\<[`Pii`](Pii.md)\>

***

### savePii()

> **savePii**(`pii`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/Services/PIIService.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L9)

#### Parameters

##### pii

[`Pii`](Pii.md)

#### Returns

`Promise`\<`void`\>

***

### updatePii()

> **updatePii**(`pii`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/Services/PIIService.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L10)

#### Parameters

##### pii

[`Pii`](Pii.md)

#### Returns

`Promise`\<`void`\>

***

### getPiiForField()

> **getPiiForField**(`field`, `value`): `Promise`\<[`Pii`](Pii.md)[]\>

Defined in: [packages/stentor-models/src/Services/PIIService.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L11)

#### Parameters

##### field

[`CommFieldType`](../type-aliases/CommFieldType.md)

##### value

`string`

#### Returns

`Promise`\<[`Pii`](Pii.md)[]\>

***

### removePii()

> **removePii**(`token?`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/Services/PIIService.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L12)

#### Parameters

##### token?

`string`

#### Returns

`Promise`\<`void`\>

***

### redeem()

> **redeem**(`userDataType`, `accessToken`): `Promise`\<[`UserDataValue`](UserDataValue.md)\>

Defined in: [packages/stentor-models/src/Services/PIIService.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PIIService.ts#L13)

#### Parameters

##### userDataType

[`UserDataType`](../type-aliases/UserDataType.md)

##### accessToken

`string`

#### Returns

`Promise`\<[`UserDataValue`](UserDataValue.md)\>
