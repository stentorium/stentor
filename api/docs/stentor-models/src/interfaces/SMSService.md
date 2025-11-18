[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SMSService

# Interface: SMSService

Defined in: [packages/stentor-models/src/Services/SMSService.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/SMSService.ts#L9)

Service to facilitate sending an SMS (text message) to a number.

## Methods

### send()

> **send**(`from`, `to`, `text`): `Promise`\<[`SMSResponse`](SMSResponse.md)\>

Defined in: [packages/stentor-models/src/Services/SMSService.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/SMSService.ts#L10)

#### Parameters

##### from

`string`

##### to

`string`

##### text

`string`

#### Returns

`Promise`\<[`SMSResponse`](SMSResponse.md)\>

***

### sendImage()

> **sendImage**(`from`, `to`, `imageUrl`): `Promise`\<[`SMSResponse`](SMSResponse.md)\>

Defined in: [packages/stentor-models/src/Services/SMSService.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/SMSService.ts#L11)

#### Parameters

##### from

`string`

##### to

`string`

##### imageUrl

`string`

#### Returns

`Promise`\<[`SMSResponse`](SMSResponse.md)\>
