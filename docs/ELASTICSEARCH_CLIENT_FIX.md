# Elasticsearch Client Error Fix

## Issue Description

Production Lambda functions are experiencing errors when trying to close Elasticsearch connections:

```
Error closing ES client. TypeError: Cannot read properties of undefined (reading 'close')
```

This error occurs in external packages (like `stentor-events-analytics`) that are not part of this repository but depend on Stentor utilities.

## Root Cause

The error happens when:
1. An Elasticsearch client instance is `undefined` or `null`
2. The client object exists but doesn't have a `close` method
3. The client was already closed or garbage collected

## Solution

We've added defensive utilities to `stentor-utils` that can be used by external packages to safely handle ES client operations.

### New Utilities

#### `safeCloseESClient(client, logger?)`

Safely closes an Elasticsearch client with proper error handling:

```typescript
import { safeCloseESClient } from 'stentor-utils';

// Instead of:
// await client.close(); // Can throw if client is undefined

// Use:
await safeCloseESClient(client, logger);
```

#### `createSafeESClient(createClient, logger?)`

Creates a wrapper around ES client initialization:

```typescript
import { createSafeESClient } from 'stentor-utils';

const { client, safeClose } = createSafeESClient(
  () => new Client({ /* config */ }),
  logger
);

// Use client normally...
// When done:
await safeClose(); // Safe cleanup
```

#### `isValidESClient(client)`

Checks if a client is properly initialized:

```typescript
import { isValidESClient } from 'stentor-utils';

if (isValidESClient(client)) {
  // Safe to use client.close()
}
```

## Applying the Fix to External Packages

For packages like `stentor-events-analytics`, update the ES client usage:

### Before (Problematic):
```typescript
export class EventsAnalyticsService {
  private client: Client;

  async close() {
    await this.client.close(); // Can fail if client is undefined
  }
}
```

### After (Fixed):
```typescript
import { safeCloseESClient } from 'stentor-utils';

export class EventsAnalyticsService {
  private client: Client;

  async close() {
    await safeCloseESClient(this.client, this.logger);
  }
}
```

## Deployment Steps

1. Update `stentor-utils` dependency in external packages
2. Replace direct `client.close()` calls with `safeCloseESClient()`
3. Test in staging environment
4. Deploy to production

## Prevention

- Always use the safe utilities for ES client operations
- Add proper null checks before client operations
- Use TypeScript strict mode to catch potential undefined access
- Consider using the `createSafeESClient` wrapper for new implementations

## Related

- Original issue: #2790
- Analytics service removal: #128