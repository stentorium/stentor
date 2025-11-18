[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-locales/src](../README.md) / LOCALE\_REGEX

# Variable: LOCALE\_REGEX

> `const` **LOCALE\_REGEX**: `RegExp`

Defined in: [packages/stentor-locales/src/Constants.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-locales/src/Constants.ts#L14)

Dialogflow follows the language tag specifications here:

https://tools.ietf.org/html/rfc2616#section-3.10

Alexa does not specify a specification it falls under, but so far,
all locales fit the same pattern.

And while the specification says that it can be only ALPHA characters, there is at least
one language tag in Google that does not follow this pattern (es-419).  So we must include
numbers as well for any subtag.
