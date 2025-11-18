[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-runtime/src](../README.md) / lambdaAPIGatewayContext

# Function: lambdaAPIGatewayContext()

> **lambdaAPIGatewayContext**(`apiGatewayEvent`, `lambdaContext`): `object`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:146](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L146)

Basic AWS API Gateway lambda proxy format

## Parameters

### apiGatewayEvent

[`APIGatewayEvent`](../interfaces/APIGatewayEvent.md)

### lambdaContext

[`LambdaContext`](../interfaces/LambdaContext.md)

## Returns

`object`

### event

> **event**: `object`

### context

> **context**: [`RuntimeContext`](../../../stentor/src/interfaces/RuntimeContext.md)
