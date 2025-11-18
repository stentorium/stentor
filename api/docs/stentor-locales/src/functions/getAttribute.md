[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / getAttribute

# Function: getAttribute()

> **getAttribute**\<`L`, `Return`\>(`attribute?`, `locale?`, `localeObj?`): `Return`

Defined in: [packages/stentor-locales/src/getAttribute.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/getAttribute.ts#L20)

This will return the property at the given attribute based on the locale provided.

For example, if locale is undefined, then the default attribute will be returned.

If locale is a Language, then the overriding locales will be searched.  If found at that language, it will be returned.
If not found at that language, then the default will be returned.

If locale is a dialect, then the overriding dialect will be searched. If found at that dialect, it will be returned.
If not found at that dialect, then the overriding language of the dialect will be searched. If found at that language, it will be returned.
If not found at that language, then the default will be returned.

## Type Parameters

### L

`L` *extends* `Localizable`\<`any`\>

### Return

`Return`

## Parameters

### attribute?

keyof `L`

### locale?

[`Locale`](../type-aliases/Locale.md)

### localeObj?

`L`

## Returns

`Return`
