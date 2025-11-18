[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Message

# Interface: Message

Defined in: [packages/stentor-models/src/Message.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Message.ts#L7)

## Properties

### createdTime

> **createdTime**: `string`

Defined in: [packages/stentor-models/src/Message.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Message.ts#L11)

The time the message was created

***

### from?

> `optional` **from**: [`UserProfile`](UserProfile.md)

Defined in: [packages/stentor-models/src/Message.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Message.ts#L15)

Who the message is from

***

### to?

> `optional` **to**: [`UserProfile`](UserProfile.md)[]

Defined in: [packages/stentor-models/src/Message.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Message.ts#L19)

Who the message is two, it can be to multiple recipients.

***

### message

> **message**: `string`

Defined in: [packages/stentor-models/src/Message.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Message.ts#L23)

A simple version of the message.  It will not include displays or SSML if the original message includes it.

***

### response?

> `optional` **response**: [`ResponseOutput`](ResponseOutput.md)

Defined in: [packages/stentor-models/src/Message.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Message.ts#L27)

Optional, more detailed information about the message

***

### attributes?

> `optional` **attributes**: `object`

Defined in: [packages/stentor-models/src/Message.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Message.ts#L33)

Optional, additional attributes that can exist on the message.

Useful to pass additional context.
