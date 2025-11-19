[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Message

# Interface: Message

Defined in: packages/stentor-models/lib/Message.d.ts:4

## Properties

### createdTime

> **createdTime**: `string`

Defined in: packages/stentor-models/lib/Message.d.ts:8

The time the message was created

***

### from?

> `optional` **from**: `UserProfile`

Defined in: packages/stentor-models/lib/Message.d.ts:12

Who the message is from

***

### to?

> `optional` **to**: `UserProfile`[]

Defined in: packages/stentor-models/lib/Message.d.ts:16

Who the message is two, it can be to multiple recipients.

***

### message

> **message**: `string`

Defined in: packages/stentor-models/lib/Message.d.ts:20

A simple version of the message.  It will not include displays or SSML if the original message includes it.

***

### response?

> `optional` **response**: [`ResponseOutput`](ResponseOutput.md)

Defined in: packages/stentor-models/lib/Message.d.ts:24

Optional, more detailed information about the message

***

### attributes?

> `optional` **attributes**: `object`

Defined in: packages/stentor-models/lib/Message.d.ts:30

Optional, additional attributes that can exist on the message.

Useful to pass additional context.
