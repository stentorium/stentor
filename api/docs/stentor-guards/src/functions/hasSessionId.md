[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-guards/src](../README.md) / hasSessionId

# Function: hasSessionId()

> **hasSessionId**(`request`): request is ChannelActionRequest \| InputUnknownRequest \| IntentRequest \| LaunchRequest \| PermissionRequest \| RawQueryRequest \| SessionEndedRequest

Defined in: [packages/stentor-guards/src/request/guards.ts:259](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-guards/src/request/guards.ts#L259)

Helper function to determine if the request has a sessionID.

## Parameters

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

## Returns

request is ChannelActionRequest \| InputUnknownRequest \| IntentRequest \| LaunchRequest \| PermissionRequest \| RawQueryRequest \| SessionEndedRequest
