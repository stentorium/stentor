# stentor-service-lex

Amazon Lex service for 📣 stentor

## Overview

This package provides Amazon Lex V2 Natural Language Understanding (NLU) service integration for the Stentor conversational AI framework. It includes robust error handling, graceful degradation, and validation for required configuration parameters.

## Key Features

- **Graceful Degradation**: Continues operation when Lex configuration is incomplete
- **Configuration Validation**: Validates required bot ID and alias ID before operations
- **Local Context Storage**: Maintains context locally when Lex sync is unavailable
- **Comprehensive Error Handling**: Provides clear error messages and fallback behaviors
- **Production Ready**: Includes logging, timeout handling, and cleanup utilities

## Installation

```bash
npm install stentor-service-lex
```

## Configuration

The service can be configured through constructor parameters or environment variables:

### Constructor Configuration

```typescript
import { LexServiceV2 } from 'stentor-service-lex';

const lexService = new LexServiceV2({
  botId: 'your-bot-id',
  botAliasId: 'your-bot-alias-id',
  localeId: 'en_US',
  region: 'us-east-1',
  gracefulDegradation: true
});
```

### Environment Variables

```bash
LEX_BOT_ID=your-bot-id
LEX_BOT_ALIAS_ID=your-bot-alias-id
LEX_LOCALE_ID=en_US
AWS_REGION=us-east-1
```

## Configuration Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `botId` | Yes | - | Amazon Lex V2 Bot ID |
| `botAliasId` | Yes | - | Amazon Lex V2 Bot Alias ID |
| `localeId` | No | `en_US` | Locale for the bot |
| `region` | No | `us-east-1` | AWS region where bot is deployed |
| `gracefulDegradation` | No | `true` | Enable fallback behavior when Lex is unavailable |
| `sessionTimeout` | No | `300` | Session timeout in seconds |

## Usage

### Basic Usage

```typescript
import { LexServiceV2 } from 'stentor-service-lex';

const lexService = new LexServiceV2({
  botId: 'your-bot-id',
  botAliasId: 'your-bot-alias-id'
});

// Query the NLU
const response = await lexService.query('What are my busy days?', {
  sessionId: 'user-session-123',
  userId: 'user-456'
});

// Set context for subsequent queries
await lexService.setContext({
  sessionId: 'user-session-123',
  activeContext: [{
    name: 'BusyDays',
    timeToLive: {
      turnsToLive: 1,
      timeToLiveInSeconds: 2000
    }
  }]
});
```

### Error Handling

The service provides two modes for handling configuration errors:

#### Graceful Degradation (Default)

```typescript
const lexService = new LexServiceV2({
  gracefulDegradation: true  // Default
});

// Even without botId, operations continue with warnings
await lexService.setContext({ 
  activeContext: [{ name: 'TestContext' }] 
}); // Logs warning, stores locally
```

#### Strict Mode

```typescript
const lexService = new LexServiceV2({
  gracefulDegradation: false
});

// Throws error if botId is missing
// Error: "Bot ID (botId) is required to query LexServiceV2"
```

### Monitoring Service Status

```typescript
const status = lexService.getStatus();
console.log(status);
// {
//   configured: true,
//   clientAvailable: true,
//   botId: "your-bot-id",
//   botAliasId: "your-alias-id",
//   contextCount: 2
// }
```

### Context Cleanup

```typescript
// Clean up expired contexts (called automatically)
lexService.cleanupExpiredContexts();
```

## Bug Fix Details

This package specifically addresses the production issue where `LexServiceV2.setContext()` was failing when `botId` was missing from configuration. The fix includes:

1. **Validation**: Checks for required configuration before attempting Lex operations
2. **Graceful Fallback**: Continues operation with local context storage when Lex is unavailable
3. **Clear Logging**: Provides informative warnings instead of cryptic errors
4. **Backward Compatibility**: Existing working configurations continue to function normally

### Before (Broken)

```typescript
// Would throw: "Error: Bot ID (botId) is required to query LexServiceV2"
await lexService.setContext({ 
  activeContext: [{ name: 'BusyDays' }] 
});
```

### After (Fixed)

```typescript
// Logs warning and continues with local context storage
await lexService.setContext({ 
  activeContext: [{ name: 'BusyDays' }] 
}); 
// No error thrown, conversation continues
```

## Dependencies

### Peer Dependencies

- `@aws-sdk/client-lex-runtime-v2`: Amazon Lex V2 client (optional)
- `stentor-models`: Stentor type definitions

### Internal Dependencies

- `stentor-constants`: Constants and enums
- `stentor-logger`: Logging utilities
- `stentor-utils`: Utility functions

## AWS Permissions

When using with AWS Lex V2, ensure your IAM role/user has these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lex:RecognizeText",
        "lex:PutSession"
      ],
      "Resource": "arn:aws:lex:region:account:bot-alias/bot-id/alias-id"
    }
  ]
}
```

## Contributing

1. Follow the existing code style and patterns
2. Add comprehensive tests for new features
3. Update documentation for any API changes
4. Ensure backward compatibility

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## License

Apache 2.0 - See LICENSE.md for details