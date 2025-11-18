[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Localizable

# Interface: Localizable\<O\>

Defined in: [packages/stentor-models/src/Locale/Localizable.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Locale/Localizable.ts#L9)

An object that has a default locale and separate localalized versions.

## Extended by

- [`App`](App.md)
- [`Intent`](Intent.md)
- [`ResponseOutput`](ResponseOutput.md)

## Type Parameters

### O

`O` *extends* [`LocaleObject`](../type-aliases/LocaleObject.md)

## Properties

### defaultLocale?

> `optional` **defaultLocale**: [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-models/src/Locale/Localizable.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Locale/Localizable.ts#L10)

***

### locales?

> `optional` **locales**: `Partial`\<`Record`\<[`Locale`](../type-aliases/Locale.md), `Partial`\<`O`\>\>\>

Defined in: [packages/stentor-models/src/Locale/Localizable.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Locale/Localizable.ts#L11)
