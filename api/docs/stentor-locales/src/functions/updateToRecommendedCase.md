[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / updateToRecommendedCase

# Function: updateToRecommendedCase()

> **updateToRecommendedCase**(`dirty`): [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-locales/src/updateToRecommendedCase.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/updateToRecommendedCase.ts#L14)

Updates a language code to the recommended case, lower case language codes and upper case country codes.

NOTE! Only tags that consist of language-CountryCode are supported, others will be passed through.

## Parameters

### dirty

`string`

## Returns

[`Locale`](../type-aliases/Locale.md)

## See

https://tools.ietf.org/html/rfc1766
