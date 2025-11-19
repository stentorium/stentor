[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-channel/src](../README.md) / TranslateStentorResponse

# Class: TranslateStentorResponse

Defined in: [packages/stentor-channel/src/Translators/TranslateToStentorResponse.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-channel/src/Translators/TranslateToStentorResponse.ts#L7)

## Extends

- `Translator`\<`RequestResponse`, [`Response`](../../../stentor/src/type-aliases/Response.md)\>

## Constructors

### Constructor

> **new TranslateStentorResponse**(): `TranslateStentorResponse`

#### Returns

`TranslateStentorResponse`

#### Inherited from

`Translator<RequestResponse, Response>.constructor`

## Methods

### translate()

> `abstract` **translate**(`requestResponse`): [`Response`](../../../stentor/src/type-aliases/Response.md)

Defined in: [packages/stentor-channel/src/Translators/TranslateToStentorResponse.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-channel/src/Translators/TranslateToStentorResponse.ts#L8)

Translate from F to T.

#### Parameters

##### requestResponse

`RequestResponse`

#### Returns

[`Response`](../../../stentor/src/type-aliases/Response.md)

to

#### Overrides

`Translator.translate`
