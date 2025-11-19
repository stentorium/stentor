[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / onWebPage

# Function: onWebPage()

> **onWebPage**(`request`, `pattern`): `boolean`

Defined in: [packages/stentor-request/src/RequestConditionalCheck.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/RequestConditionalCheck.ts#L30)

Checks the requests attributes to see if the request originated when the 
user was on a website that matches the provied pattern.

## Parameters

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

Request object

### pattern

`string`

A string that will be matched against the request.attributes.currentUrl key, for example "google.com"

## Returns

`boolean`

- True if they are on a website that matches the pattern, false if not.
