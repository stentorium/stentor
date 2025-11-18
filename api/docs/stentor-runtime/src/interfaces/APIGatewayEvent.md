[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-runtime/src](../README.md) / APIGatewayEvent

# Interface: APIGatewayEvent

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:112](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L112)

Event for an API Gateway Proxy Integration

## See

https://docs.aws.amazon.com/en_pv/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

## Properties

### resource

> **resource**: `string`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:113](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L113)

***

### path

> **path**: `string`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:114](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L114)

***

### httpMethod

> **httpMethod**: `string`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:115](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L115)

***

### headers

> **headers**: `object`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:116](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L116)

#### Index Signature

\[`header`: `string`\]: `string`

***

### multiValueHeaders

> **multiValueHeaders**: `object`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:117](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L117)

#### Index Signature

\[`header`: `string`\]: `string`[]

***

### queryStringParameters

> **queryStringParameters**: `object`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:118](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L118)

#### Index Signature

\[`key`: `string`\]: `string`

***

### multiValueQueryStringParameters

> **multiValueQueryStringParameters**: `object`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:119](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L119)

#### Index Signature

\[`key`: `string`\]: `string`[]

***

### pathParameters

> **pathParameters**: `object`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:120](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L120)

#### Index Signature

\[`key`: `string`\]: `string`

***

### stageVariables

> **stageVariables**: `object`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:121](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L121)

#### Index Signature

\[`key`: `string`\]: `string`

***

### requestContext

> **requestContext**: `any`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:122](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L122)

***

### body

> **body**: `string`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:123](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L123)

***

### isBase64Encoded

> **isBase64Encoded**: `boolean`

Defined in: [packages/stentor-runtime/src/ContextUtils.ts:124](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/ContextUtils.ts#L124)
