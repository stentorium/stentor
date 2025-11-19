[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / StringExpander

# Class: StringExpander

Defined in: [packages/stentor-utils/src/string/StringExpander.ts:42](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/string/StringExpander.ts#L42)

Expands strings when the pattern {option0|option1} is found within the string.

If either ${VAR} or the alexa-utterances {-|VAR} is within the string, it preserved and
converted to ${} by default.

## Constructors

### Constructor

> **new StringExpander**(`props?`): `StringExpander`

Defined in: [packages/stentor-utils/src/string/StringExpander.ts:46](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/string/StringExpander.ts#L46)

#### Parameters

##### props?

[`StringExpanderProps`](StringExpanderProps.md)

#### Returns

`StringExpander`

## Methods

### expand()

> **expand**(`str`): `string`[]

Defined in: [packages/stentor-utils/src/string/StringExpander.ts:55](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/string/StringExpander.ts#L55)

#### Parameters

##### str

`string`

#### Returns

`string`[]
