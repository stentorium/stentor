[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / getAttributeFromLocale

# Function: getAttributeFromLocale()

> **getAttributeFromLocale**\<`T`, `K`\>(`attribute`, `defaultObj`, `locale?`, `locales?`): `Partial`\<`T`\>\[`K`\]

Defined in: [packages/stentor-locales/src/getAttributeFromLocale.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/getAttributeFromLocale.ts#L10)

Returns the value of the given attribute from the locales object based on the provided locale.

If it is not found in the locale object, then it will take it from the default object passed in.

## Type Parameters

### T

`T` *extends* `object`

### K

`K` *extends* `string` \| `number` \| `symbol`

## Parameters

### attribute

`K`

### defaultObj

`T`

### locale?

[`Locale`](../type-aliases/Locale.md)

### locales?

`Partial`\<`Record`\<[`Locale`](../type-aliases/Locale.md), `Partial`\<`T`\>\>\> = `{}`

## Returns

`Partial`\<`T`\>\[`K`\]
