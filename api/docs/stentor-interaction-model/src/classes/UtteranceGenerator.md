[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / UtteranceGenerator

# Class: UtteranceGenerator

Defined in: [packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts#L27)

## Constructors

### Constructor

> **new UtteranceGenerator**(`props?`): `UtteranceGenerator`

Defined in: [packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts#L31)

#### Parameters

##### props?

[`UtteranceGeneratorProps`](../interfaces/UtteranceGeneratorProps.md)

#### Returns

`UtteranceGenerator`

## Methods

### forIntent()

> **forIntent**(`intent`, `locale?`): `string`[]

Defined in: [packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts#L38)

#### Parameters

##### intent

[`Intent`](../../../stentor/src/interfaces/Intent.md)

##### locale?

[`Locale`](../../../stentor-locales/src/type-aliases/Locale.md)

#### Returns

`string`[]

***

### forPatterns()

> **forPatterns**(`utterancePatterns`, `substitutions?`): `string`[]

Defined in: [packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts:80](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts#L80)

#### Parameters

##### utterancePatterns

`string`[]

##### substitutions?

#### Returns

`string`[]
