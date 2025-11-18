[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-logger/src](../README.md) / registerWinstonLogger

# Function: registerWinstonLogger()

> **registerWinstonLogger**(`winstonLogger`): `void`

Defined in: [packages/stentor-logger/src/logger.ts:346](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-logger/src/logger.ts#L346)

Register a Winston logger instance for use by stentor-logger.
This allows implementors to provide their own Winston configuration
without stentor-logger having Winston as a required dependency.

## Parameters

### winstonLogger

`any`

A Winston logger instance

## Returns

`void`
