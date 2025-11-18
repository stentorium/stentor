[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / RelativeDateTime

# Interface: RelativeDateTime

Defined in: [packages/stentor-models/src/DateTime/RelativeDateTime.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/DateTime/RelativeDateTime.ts#L53)

A relative date time contains data about relative dates such as "yesterday" or "last year".

Typically, this object is then converted to a DateTime or DateTimeRange at runtime.

## Properties

### relativity

> **relativity**: `string`

Defined in: [packages/stentor-models/src/DateTime/RelativeDateTime.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/DateTime/RelativeDateTime.ts#L58)

The relative date.  It can be just "LAST_WEEKEND" but can also be "${LAST_WEEKEND}", "${LAST_SUNDAY}T12:00:00",
"${LAST_FRIDAY}T12:00:00 --\> ${LAST_SATURDAY}T12:00:00" or "${LAST_FRIDAY}T12:00:00/${LAST_SATURDAY}T12:00:00"

***

### amount?

> `optional` **amount**: `number`

Defined in: [packages/stentor-models/src/DateTime/RelativeDateTime.ts:59](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/DateTime/RelativeDateTime.ts#L59)
