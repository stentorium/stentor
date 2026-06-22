# Safe Logging Utilities

This document describes the new logging utilities designed to prevent Lambda errors caused by large object serialization and log truncation issues.

## Problem Description

The original issue was caused by Lambda functions attempting to log large DynamoDB events containing app objects with long URLs, large arrays, and complex nested structures. This resulted in:

1. JSON stringification errors
2. Log truncation mid-stream  
3. Lambda execution failures
4. Memory issues with circular references

## Solution

The new logging utilities provide safe serialization and logging capabilities:

### Core Utilities

#### `safeStringify(obj, maxSize?)`
Safely converts objects to JSON strings with protection against:
- Circular references
- Extremely large strings
- Large arrays
- Serialization errors
- Memory exhaustion

```typescript
import { safeStringify } from 'stentor-utils';

const largeObject = {
  data: "x".repeat(50000),
  array: Array(1000).fill("item"),
  circular: null
};
largeObject.circular = largeObject;

const safeJson = safeStringify(largeObject); // Won't crash or truncate unexpectedly
```

#### `safeEventLog(prefix, obj, level?)`
Safely logs events with appropriate console methods:

```typescript
import { safeEventLog } from 'stentor-utils';

safeEventLog("Event:", dynamoEvent, "log");
safeEventLog("Error:", errorInfo, "error");
```

#### `logLambdaError(error, context?)`
Enhanced error logging for Lambda functions:

```typescript
import { logLambdaError } from 'stentor-utils';

try {
  // Lambda function code
} catch (error) {
  logLambdaError(error, { eventData, userId, requestId });
  throw error;
}
```

### DynamoDB Event Utilities

#### `logDynamoEvent(event)`
Specifically designed to safely log DynamoDB events:

```typescript
import { logDynamoEvent } from 'stentor-utils';

const dynamoEvent = {
  eventType: "MODIFY",
  eventName: "dynamo-app-updated",
  properties: {
    type: "MODIFY",
    newApp: {
      appId: "app123",
      templateType: "OC_STUDIO_STARTER_TEMPLATE",
      examplePhrases: ["phrase1", "phrase2", /*... many more ...*/],
      keywords: ["XAPP", "XAPPmedia", "XAPP AI"],
      icon: "https://very-long-url.com/path/to/icon.png",
      "stentor:search:needsReIndex": false
    }
  }
};

logDynamoEvent(dynamoEvent); // Safely logs with smart truncation
```

#### `withSafeDynamoEventLogging(handler)`
Wrapper for Lambda handlers that automatically detects and safely logs DynamoDB events:

```typescript
import { withSafeDynamoEventLogging } from 'stentor-utils';

const originalHandler = async (event, context) => {
  // Your Lambda function logic
  return { success: true };
};

// Wrap your handler
export const handler = withSafeDynamoEventLogging(originalHandler);
```

## Integration Examples

### For Existing Lambda Functions

If you have a Lambda function that processes DynamoDB events and is experiencing the truncation issue:

```typescript
// Before (problematic)
export const handler = async (event, context) => {
  console.log("Event:", JSON.stringify(event)); // Can cause truncation/errors
  // ... rest of function
};

// After (safe)
import { withSafeDynamoEventLogging } from 'stentor-utils';

const processEvent = async (event, context) => {
  // Your existing logic here
  return result;
};

export const handler = withSafeDynamoEventLogging(processEvent);
```

### For Event Processing Pipelines

```typescript
import { logDynamoEvent, safeEventLog } from 'stentor-utils';

export const processAppUpdate = async (dynamoEvent) => {
  // Log the incoming event safely
  logDynamoEvent(dynamoEvent);
  
  try {
    // Process the event
    const result = await updateApplicationData(dynamoEvent.properties.newApp);
    
    safeEventLog("Processing complete:", { 
      eventName: dynamoEvent.eventName,
      appId: dynamoEvent.properties?.newApp?.appId,
      success: true 
    });
    
    return result;
  } catch (error) {
    logLambdaError(error, { event: dynamoEvent });
    throw error;
  }
};
```

## Configuration

### Default Limits

- Maximum JSON size: 100KB
- Maximum field length: 10KB  
- Maximum array preview: 100 items
- URL truncation: 200 characters

### Custom Limits

```typescript
import { safeStringify } from 'stentor-utils';

// Custom size limit
const json = safeStringify(largeObject, 50 * 1024); // 50KB limit
```

## Benefits

1. **Prevents Lambda Crashes**: No more JSON stringification errors
2. **Consistent Logging**: Predictable log output regardless of data size
3. **Memory Efficient**: Prevents memory exhaustion from large objects
4. **Debug Friendly**: Includes truncation metadata for debugging
5. **Backward Compatible**: Drop-in replacement for existing logging

## Migration Guide

1. **Identify Problem Areas**: Look for `console.log(JSON.stringify(event))` patterns
2. **Replace Direct Logging**: Use `safeEventLog` instead of `console.log`
3. **Wrap Lambda Handlers**: Use `withSafeDynamoEventLogging` for DynamoDB processors
4. **Update Error Handling**: Use `logLambdaError` for consistent error logging
5. **Test Thoroughly**: Verify logging works with your largest expected payloads

## Testing

The utilities include comprehensive tests covering:
- Large object handling
- Circular reference detection
- Array truncation
- URL truncation  
- Error scenarios
- Memory efficiency

Run tests with:
```bash
yarn test logging
yarn test dynamo-event-utils
```