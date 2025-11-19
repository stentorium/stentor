[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / requestToMessage

# Function: requestToMessage()

> **requestToMessage**(`request`, `appId?`): [`Message`](../../../stentor/src/interfaces/Message.md)

Defined in: [packages/stentor-utils/src/transcript.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/transcript.ts#L14)

Turns a user's request into a message

## Parameters

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

The request from the user

### appId?

`string`

Default to "bot", used in to field as the receiver of the message

## Returns

[`Message`](../../../stentor/src/interfaces/Message.md)
