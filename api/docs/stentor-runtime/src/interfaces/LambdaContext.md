[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-runtime/src](../README.md) / LambdaContext

# Interface: LambdaContext

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:132](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L132)

Lambda Context

## See

https://docs.aws.amazon.com/en_pv/lambda/latest/dg/nodejs-prog-model-context.html

## Properties

### functionName

> **functionName**: `string`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:134](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L134)

***

### functionVersion

> **functionVersion**: `string`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:135](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L135)

***

### invokedFunctionArn

> **invokedFunctionArn**: `string`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:136](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L136)

***

### callbackWaitsForEmptyEventLoop

> **callbackWaitsForEmptyEventLoop**: `boolean`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:137](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L137)

## Methods

### getRemainingTimeInMillis()

> **getRemainingTimeInMillis**(): `number`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:133](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L133)

#### Returns

`number`
