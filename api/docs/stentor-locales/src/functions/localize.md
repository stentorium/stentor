[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / localize

# Function: localize()

> **localize**\<`L`\>(`localeObj?`, `locale?`): [`Omit`](../type-aliases/Omit.md)\<`L`, keyof `Localizable`\<`any`\>\>

Defined in: [packages/stentor-locales/src/localize.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/localize.ts#L27)

This will flatten a LocaleObj and return the object with the overridden attributes.

## Type Parameters

### L

`L` *extends* `Localizable`\<`any`\>

## Parameters

### localeObj?

`L`

### locale?

[`Locale`](../type-aliases/Locale.md)

## Returns

[`Omit`](../type-aliases/Omit.md)\<`L`, keyof `Localizable`\<`any`\>\>
