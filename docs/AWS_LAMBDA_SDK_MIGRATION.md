# AWS Lambda SDK Version Migration Guide

This document outlines how AWS Lambda's built-in SDK versions relate to our dependency cleanup strategy and the 4-phase AWS SDK v2 to v3 migration.

## Overview

As part of our [4-phase AWS SDK migration](#migration-phases), Phase 4 focused on removing unused AWS SDK v2 dependencies from packages that don't actually use AWS services. Understanding AWS Lambda's built-in SDK support is crucial for optimizing dependencies in serverless environments.

## AWS Lambda Built-in SDK Support

### AWS SDK v2 (Built-in)
AWS Lambda includes AWS SDK v2 **by default** in all Node.js runtimes. This means:

- **No need to bundle AWS SDK v2** in your deployment packages
- **Automatic updates** when AWS updates the runtime
- **Reduced bundle size** for Lambda deployments
- **Consistent SDK versions** across Lambda functions

### Current Lambda Runtime SDK Versions

| Node.js Runtime | AWS SDK v2 Version | AWS SDK v3 Support |
|----------------|-------------------|-------------------|
| nodejs18.x     | ~2.1400.0         | Manual installation required |
| nodejs20.x     | ~2.1600.0         | Manual installation required |
| nodejs22.x     | ~2.1800.0         | Manual installation required |

> **Note**: SDK v3 is not included by default in Lambda runtimes and must be bundled with your deployment package.

### Lambda SDK Best Practices

1. **For AWS SDK v2**: Use the built-in version when possible
   ```javascript
   // No need to install aws-sdk v2 dependency
   const AWS = require('aws-sdk');
   ```

2. **For AWS SDK v3**: Always include in deployment package
   ```javascript
   // Must install @aws-sdk/client-* packages
   import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
   ```

## Impact on Stentor Migration

### Before Phase 4 Cleanup
Many packages unnecessarily included `aws-sdk` v2 dependencies even when:
- They don't use AWS services at all
- They run in Lambda environments where SDK v2 is already available
- The dependencies were legacy artifacts from older configurations

### After Phase 4 Cleanup
Only packages that **actually use AWS services** retain AWS SDK dependencies:

| Package | AWS Services Used | SDK Dependencies |
|---------|------------------|------------------|
| `stentor` | Secrets Manager | AWS SDK v3 hybrid |
| `stentor-user-storage-dynamo` | DynamoDB | v2/v3 hybrid |
| `stentor-service-event` | Kinesis, SNS, Firehose | v2/v3 hybrid |
| `stentor-utils` | ❌ None | ✅ Removed |
| `stentor-address` | ❌ None | ✅ Removed |
| `stentor-runtime` | ❌ None | ✅ Removed |

### Benefits for Lambda Deployments

1. **Smaller Bundle Sizes**: Eliminated unnecessary AWS SDK v2 dependencies
2. **Faster Cold Starts**: Reduced package initialization overhead  
3. **Cleaner Dependencies**: Only essential AWS packages remain
4. **Future-Proof**: Easier migration to SDK v3 when Lambda adds built-in support

## Migration Phases

### ✅ Phase 1: Secrets Manager (stentor)
- Migrated critical Secrets Manager functionality to AWS SDK v3
- Maintained backward compatibility during transition

### ✅ Phase 2: DynamoDB (stentor-user-storage-dynamo)  
- Updated DynamoDB operations to use AWS SDK v3 client
- Hybrid approach for gradual migration

### ✅ Phase 3: Event Services (stentor-service-event)
- Migrated Kinesis, SNS, and Firehose to AWS SDK v3
- Improved error handling and performance

### ✅ Phase 4: Dependency Cleanup
- **Removed unused AWS SDK v2 dependencies** from packages with zero usage
- Packages cleaned: `stentor-utils`, `stentor-address`, `stentor-runtime`
- **Lambda optimization**: Leverages built-in SDK v2 where needed

## Lambda Deployment Recommendations

### For Packages Using AWS Services
```json
{
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.x.x",
    "@aws-sdk/client-sns": "^3.x.x"
  },
  "peerDependencies": {
    "aws-sdk": "^2.0.0"
  }
}
```

### For Packages NOT Using AWS Services
```json
{
  // No AWS SDK dependencies needed
  // Lambda runtime provides SDK v2 if required by other packages
}
```

### Bundle Size Optimization

1. **Use Lambda Layers** for common AWS SDK v3 packages
2. **Tree-shake unused services** in bundling process
3. **Leverage built-in SDK v2** for non-critical operations
4. **Monitor bundle sizes** with tools like `webpack-bundle-analyzer`

## Future Considerations

### When Lambda Adds SDK v3 Built-in Support
- Remove SDK v3 dependencies from packages
- Update to use Lambda's built-in SDK v3
- Further reduce bundle sizes

### Version Compatibility
- Monitor AWS Lambda runtime updates
- Test with new SDK versions before deploying
- Maintain compatibility matrices for different runtimes

## Testing Lambda SDK Dependencies

```bash
# Verify no unused AWS dependencies
yarn audit --groups dependencies
yarn license-check

# Test Lambda deployment bundle size
yarn build
du -sh packages/*/lib/

# Verify Lambda runtime compatibility
# (Deploy to test environment and monitor)
```

## Related Documentation

- [AWS Lambda Runtime Environment](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [Lambda Deployment Package Optimization](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html)

---

*This documentation was created as part of the Phase 4 AWS SDK dependency cleanup to help developers understand the relationship between Lambda's built-in SDK support and our migration strategy.*