[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ErrorPayloadStack

# Interface: ErrorPayloadStack

Defined in: [packages/stentor-models/src/Events/ErrorEvent.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/ErrorEvent.ts#L11)

The individual stack trace line.

We leverage stacktrace-parser to accomplish this, these types
are from https://github.com/errwischt/stacktrace-parser/blob/c91463fd96b4acf962857551235755212dc33e2e/src/index.d.ts#L3

## Properties

### file

> **file**: `string`

Defined in: [packages/stentor-models/src/Events/ErrorEvent.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/ErrorEvent.ts#L12)

***

### methodName

> **methodName**: `string`

Defined in: [packages/stentor-models/src/Events/ErrorEvent.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/ErrorEvent.ts#L13)

***

### arguments

> **arguments**: `string`[]

Defined in: [packages/stentor-models/src/Events/ErrorEvent.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/ErrorEvent.ts#L14)

***

### lineNumber

> **lineNumber**: `number`

Defined in: [packages/stentor-models/src/Events/ErrorEvent.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/ErrorEvent.ts#L15)

***

### column

> **column**: `number`

Defined in: [packages/stentor-models/src/Events/ErrorEvent.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Events/ErrorEvent.ts#L16)
