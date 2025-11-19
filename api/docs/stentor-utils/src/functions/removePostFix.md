[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / removePostFix

# Function: removePostFix()

> **removePostFix**(`original`, `postFix`): `string`

Defined in: [packages/stentor-utils/src/string/removePostFix.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/string/removePostFix.ts#L14)

Removes a postfix from a string if it exists.  If the postfix does not exist then 
the string is passed through unedited.

For example, when passed "foo" and post fix "_bar", "foo" will be returned.  
If you pass "foo_bar" and "_bar" then "_bar" will be removed and "foo" will be returned.

## Parameters

### original

`string`

### postFix

`string`

## Returns

`string`
