[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-time/src](../README.md) / activeWithin

# Function: activeWithin()

> **activeWithin**(`context`, `amount`, `format`): `boolean`

Defined in: [packages/stentor-time/src/TimeConditionalCheck.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-time/src/TimeConditionalCheck.ts#L19)

Depending on the provided last active timestamp and current time, has the user
been active within the specified duration.

## Parameters

### context

Contains the last active timestamp

#### lastActiveTimestamp

`number`

### amount

`number`

Duration amount

### format

`DurationFormat`

Format of the duration amount

## Returns

`boolean`
