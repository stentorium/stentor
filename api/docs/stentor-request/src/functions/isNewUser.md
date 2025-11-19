[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / isNewUser

# Function: isNewUser()

> **isNewUser**(`context`): `boolean`

Defined in: [packages/stentor-request/src/SystemConditionalCheck.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/SystemConditionalCheck.ts#L28)

Returns true if the user is new.

This will be true for the duration of the user's first session, not just
the first interaction.

It looks for the session storage key SESSION_STORAGE_NEW_USER = "new_user" to exist and be true.

## Parameters

### context

[`Context`](../../../stentor/src/interfaces/Context.md)

## Returns

`boolean`
