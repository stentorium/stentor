[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-runtime/src](../README.md) / main

# Function: main()

> **main**(`requestBody`, `mainContext`, `callback`, `channels`, `dependencies`, `hooks?`): `Promise`\<`void`\>

Defined in: [packages/stentor-runtime/src/main.ts:100](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/main.ts#L100)

The main runtime loop for the assistant application.

## Parameters

### requestBody

`object`

### mainContext

[`RuntimeContext`](../../../stentor/src/interfaces/RuntimeContext.md)

### callback

[`RuntimeCallback`](../../../stentor/src/type-aliases/RuntimeCallback.md)

### channels

[`Channel`](../../../stentor/src/interfaces/Channel.md)[]

### dependencies

[`Dependencies`](../interfaces/Dependencies.md)

### hooks?

`Hooks`

## Returns

`Promise`\<`void`\>
