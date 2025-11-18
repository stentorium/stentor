---
id: custom-channels
title: Creating Custom Channels
---

# Creating Custom Channels

Channels in Stentor are platform abstractions that translate external platform requests and responses into Stentor's internal format. This guide explains how to create custom channels to integrate new platforms.

## Overview

Each channel bridges communication between external platforms (like Alexa, Google Assistant, or custom platforms) and Stentor's core runtime. A channel is responsible for:

- Detecting if an incoming request belongs to its platform
- Translating platform-specific requests to Stentor's Request format
- Converting Stentor's Response back to the platform's format
- Reporting device capabilities

## Channel Interface

A channel implements the `Channel` interface with the following required properties:

### Required Properties

- **`name`** (string) - Alphanumeric identifier for the channel (e.g., "actions-on-google", "alexa")
- **`test(body: object): boolean`** - Function to detect if incoming request is for this channel
- **`request`** - A Translator instance that converts incoming requests to Stentor's Request format
- **`response`** - A Translator instance that converts Stentor's Response to the platform's format
- **`capabilities(body: object): Device`** - Function returning device capabilities from the request

### Optional Properties

- **`nlu?: NLUService`** - Optional NLU service for the channel
- **`hooks?: ChannelHooks`** - Optional runtime hooks (preExecution, postRequestTranslation, preResponseTranslation)
- **`handlerHook?`** - Optional Lambda event interceptor for special handling
- **`builder?`** (deprecated) - Deprecated response builder pattern

## Implementation Steps

### 1. Create Request Translator

Create a request translator that extends the Translator pattern:

```typescript
import { Translator } from "@xapp/patterns";
import { Request } from "stentor-models";

class MyRequestTranslator extends Translator<object, Request> {
  translate(body: object): Request {
    // Convert platform request to Stentor Request format
    return {
      type: "INTENT_REQUEST",
      intentId: extractIntentId(body),
      sessionId: extractSessionId(body),
      userId: extractUserId(body),
      // ... other Request properties
    };
  }
}
```

### 2. Create Response Translator

Create a response translator for converting Stentor responses:

```typescript
import { Translator } from "@xapp/patterns";
import { Response } from "stentor-models";

class MyResponseTranslator extends Translator<Response, object> {
  translate(response: Response): object {
    // Convert Stentor Response to platform format
    return {
      // Platform-specific response structure
      speech: response.outputSpeech?.ssml,
      displayText: response.outputSpeech?.displayText,
      // ... other platform properties
    };
  }
}
```

### 3. Implement Capabilities Function

The capabilities function extracts device information from the request:

```typescript
function getCapabilities(body: object): Device {
  return {
    canSpeak: true,
    canPlayAudio: checkAudioSupport(body),
    hasScreen: checkScreenSupport(body),
    hasWebBrowser: false,
    channel: "my-platform",
    // ... other device capabilities
  };
}
```

### 4. Create Channel Object

Combine all components into a Channel object:

```typescript
import { Channel } from "stentor-models";

export function MyCustomChannel(): Channel {
  return {
    name: "my-platform",

    test(body): boolean {
      // Detect if request is for this channel
      // Check for platform-specific markers
      return body?.platform === "my-platform" ||
             body?.version?.startsWith("my-platform-");
    },

    request: new MyRequestTranslator(),
    response: new MyResponseTranslator(),

    capabilities(body): Device {
      return {
        canSpeak: true,
        canPlayAudio: true,
        hasScreen: body?.device?.screenAvailable || false,
        channel: "my-platform"
      };
    }
  };
}
```

### 5. Register Channel

Register the channel with your Assistant instance:

```typescript
import { Assistant } from "stentor";
import { MyCustomChannel } from "./MyCustomChannel";

const assistant = new Assistant()
  .withChannels([
    MyCustomChannel()
  ])
  .withHandlers([
    // Your handlers
  ]);
```

## Example: Test Channel

Here's a simplified example from the Stentor test suite:

```typescript
export function TestChannel(): Channel {
  return {
    name: "test-channel",

    test(body): boolean {
      return body?.channel === "test-channel";
    },

    request: new TestRequestTranslator(),
    response: new TestResponseTranslator(),

    capabilities(body): Device {
      return {
        canSpeak: true,
        canPlayAudio: false,
        hasScreen: false,
        channel: "test-channel"
      };
    }
  };
}
```

## Channel Selection

At runtime, Stentor:
1. Receives an incoming request
2. Tests each registered channel using its `test()` function
3. Selects the first channel that returns `true`
4. Uses that channel's translators for the entire request/response cycle

## Advanced Features

### Channel Hooks

Channels can define hooks to intercept and modify behavior:

```typescript
{
  hooks: {
    preExecution: async (request, context) => {
      // Run before handler execution
      console.log("Pre-execution hook");
    },
    postRequestTranslation: async (request, body, context) => {
      // Run after request translation
      return request; // Return modified request
    },
    preResponseTranslation: async (response, context) => {
      // Run before response translation
      return response; // Return modified response
    }
  }
}
```

### NLU Integration

Channels can provide their own NLU service:

```typescript
{
  nlu: {
    query: async (text: string) => {
      // Call your NLU service
      const result = await myNLU.query(text);
      return {
        intentId: result.intent,
        slots: result.entities
      };
    }
  }
}
```

## Best Practices

1. **Unique Identifiers**: Use descriptive, unique channel names
2. **Robust Detection**: Make `test()` specific enough to avoid false positives
3. **Complete Translation**: Ensure all Request/Response properties are mapped
4. **Error Handling**: Handle malformed requests gracefully
5. **Device Capabilities**: Accurately report what the device can do
6. **Testing**: Write comprehensive tests for your translators

## Reference Files

View the source code on GitHub:
- Channel Interface: `packages/stentor-models/src/Channel/Channel.ts`
- Test Channel Example: `packages/stentor/src/__test__/TestChannel.ts`
- Base Channel Implementation: `packages/stentor-channel/src/Channel.ts`

## Next Steps

- Learn about [Handlers](./Handlers.md) to process requests
- Explore the [Getting Started](./GettingStarted.md) guide
