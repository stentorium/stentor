[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-channel/src](../README.md) / TranslateStentorRequest

# Class: TranslateStentorRequest

Defined in: [packages/stentor-channel/src/Translators/TranslateStentorRequest.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-channel/src/Translators/TranslateStentorRequest.ts#L5)

## Extends

- `Translator`\<[`Request`](../../../stentor/src/type-aliases/Request.md), [`Request`](../../../stentor/src/type-aliases/Request.md)\>

## Constructors

### Constructor

> **new TranslateStentorRequest**(): `TranslateStentorRequest`

#### Returns

`TranslateStentorRequest`

#### Inherited from

`Translator<Request, Request>.constructor`

## Methods

### translate()

> `abstract` **translate**(`request`): [`Request`](../../../stentor/src/type-aliases/Request.md)

Defined in: [packages/stentor-channel/src/Translators/TranslateStentorRequest.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-channel/src/Translators/TranslateStentorRequest.ts#L6)

Translate from F to T.

#### Parameters

##### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

#### Returns

[`Request`](../../../stentor/src/type-aliases/Request.md)

to

#### Overrides

`Translator.translate`
