---
id: handlers
title: Handler System
---

# Handler System

Handlers are the core building blocks for conversation logic in Stentor. Each handler is responsible for processing a specific intent and generating appropriate responses.

## Overview

The handler system provides a flexible, modular approach to managing conversation flow. Handlers:

- Process incoming user requests (intents)
- Generate appropriate responses
- Manage conversation state and context
- Control conversation flow through forwarding and redirects
- Handle edge cases like unknown input and repeats

## Handler Types

### ConversationHandler

The most basic handler for simple request/response interactions:

```typescript
import { ConversationHandler } from "stentor-handler";

class MyHandler extends ConversationHandler {
  // Most functionality is inherited from AbstractHandler
  // Override methods as needed for custom behavior
}
```

### Custom Handlers

For specialized logic, extend `AbstractHandler`:

```typescript
import { AbstractHandler } from "stentor-handler";

class CustomHandler extends AbstractHandler {
  async handleRequest(request: Request, context: Context): Promise<Response> {
    // Custom request processing logic
    const response = this.responseBuilder
      .respond("Hello from custom handler!")
      .build();
    return response;
  }

  canHandleRequest(request: Request, context: Context): boolean {
    // Custom logic to determine if this handler can process the request
    return request.intentId === this.intentId;
  }
}
```

## Handler Structure

A handler is defined by a configuration object with the following properties:

```typescript
interface Handler {
  intentId: string;           // Unique intent identifier
  appId: string;              // Application ID
  organizationId: string;     // Organization ID
  name?: string;              // Human-readable name
  type: string;               // Handler class type
  content?: Content;          // Response content for different intents
  data?: Data;                // Handler data/configuration
  forward?: Forward;          // Forwarding rules
  redirect?: Redirect;        // Redirect rules
  permissions?: UserDataType[]; // Required user data permissions
}
```

### Handler Content

Handlers define responses in a `content` object keyed by intentId:

```typescript
{
  content: {
    ["LaunchRequest"]: [
      {
        outputSpeech: {
          ssml: "<speak>Welcome to my app!</speak>",
          displayText: "Welcome to my app!"
        },
        reprompt: {
          ssml: "<speak>What would you like to do?</speak>",
          displayText: "What would you like to do?"
        }
      }
    ]
  }
}
```

## Key Handler Methods

### handleRequest()

Main entry point for processing requests:

```typescript
async handleRequest(request: Request, context: Context): Promise<Response> {
  // 1. Check redirects/gates
  const redirectPath = this.redirectingPathForRequest(request, context);
  if (redirectPath) {
    // Handle redirect
  }

  // 2. Check forwarding
  const forwardPath = this.forwardingPathForRequest(request, context);
  if (forwardPath) {
    // Forward to another handler
  }

  // 3. Process request and build response
  const response = this.responseBuilder
    .respond(this.content[request.intentId])
    .build();

  return response;
}
```

### canHandleRequest()

Determines if the handler can process a request:

```typescript
canHandleRequest(request: Request, context: Context): boolean {
  // Check if this handler's intentId matches the request
  return request.intentId === this.intentId ||
         this.content.hasOwnProperty(request.intentId);
}
```

### forwardingPathForRequest()

Finds forwarding path for a request:

```typescript
forwardingPathForRequest(request: Request, context: Context): string | undefined {
  // Check forward rules and return intentId to forward to
  if (this.forward && this.forward.conditions) {
    // Evaluate conditions
    // Return target intentId if conditions met
  }
  return undefined;
}
```

### redirectingPathForRequest()

Finds redirect path (gate conditions):

```typescript
redirectingPathForRequest(request: Request, context: Context): string | undefined {
  // Check redirect gates
  // Return intentId if gate condition fails
  return undefined;
}
```

## Handler Registration

Handlers are registered with the Assistant using `withHandlers()`:

```typescript
import { Assistant } from "stentor";
import { MyHandler } from "./MyHandler";

const assistant = new Assistant()
  .withHandlers([
    MyHandler  // Handler class
  ]);

// Or with key-value mapping (for obfuscated code)
assistant.withHandlers({
  "MyHandler": MyHandler
});
```

## Handler Lifecycle

1. **Request Received** - Runtime receives request from platform
2. **Channel Translation** - Channel translates to Stentor format
3. **Handler Selection** - HandlerManager/Factory selects appropriate handler
4. **Request Processing** - Handler's `handleRequest()` processes the request
5. **Response Building** - Response is constructed using response builder
6. **Channel Translation** - Response translated back to platform format

## Advanced Features

### Input Unknown Handling

Handlers can define strategies for when user input can't be matched:

```typescript
{
  content: {
    ["InputUnknown"]: [
      {
        name: "InputUnknownGlobal",
        outputSpeech: {
          ssml: "<speak>I didn't understand that. Could you try again?</speak>"
        }
      }
    ]
  }
}
```

Configuration strategies:
- `REPROMPT` - Re-ask the previous question
- `GLOBAL` - Use global input unknown response

### Forwarding

Route to different handlers based on conditions:

```typescript
{
  forward: {
    conditions: [
      {
        should: "gt",
        value: 5,
        path: "{{data.counter}}",
        intentId: "ThresholdReachedIntent"
      }
    ]
  }
}
```

### Redirects

Gate logic that must pass before handling:

```typescript
{
  redirect: {
    conditions: [
      {
        should: "eq",
        value: undefined,
        path: "{{context.user.email}}",
        intentId: "RequestEmailIntent"
      }
    ]
  }
}
```

### Session Management

Track state across turns:

```typescript
async handleRequest(request: Request, context: Context): Promise<Response> {
  // Read from session
  const counter = context.session.get("counter") || 0;

  // Update session
  context.session.set("counter", counter + 1);

  // Session is automatically persisted between turns
}
```

### Context Management

Access user data and conversation context:

```typescript
async handleRequest(request: Request, context: Context): Promise<Response> {
  // Access user data
  const userId = context.user.userId;
  const email = context.user.email;

  // Access device info
  const canPlayAudio = context.device.canPlayAudio;

  // Access storage
  const userData = await context.storage.read(userId);
}
```

### Repeat Functionality

Re-play previous response on repeat intent:

```typescript
class MyHandler extends ConversationHandler {
  async handleRequest(request: Request, context: Context): Promise<Response> {
    if (request.intentId === "AMAZON.RepeatIntent") {
      // Return previous response from history
      return this.getRepeatResponse(context);
    }

    // Normal handling
    return super.handleRequest(request, context);
  }
}
```

## Response Building

Handlers use a response builder to construct responses:

```typescript
this.responseBuilder
  .respond("Hello!")                    // Add speech output
  .reprompt("What would you like?")     // Add reprompt
  .withCard({                           // Add visual card
    title: "Welcome",
    content: "Welcome to my app"
  })
  .withSuggestions(["Option 1", "Option 2"])  // Add quick replies
  .build();
```

## Handler Data

Store handler-specific configuration in the `data` property:

```typescript
{
  data: {
    maxAttempts: 3,
    defaultGreeting: "Hello!",
    customSettings: {
      feature: "enabled"
    }
  }
}
```

Access in handler code:

```typescript
const maxAttempts = this.data?.maxAttempts || 3;
```

## Permissions

Request user data permissions:

```typescript
{
  permissions: ["USER_NAME", "EMAIL_ADDRESS"]
}
```

This triggers permission request flows on supported platforms.

## Best Practices

1. **Single Responsibility**: Each handler should manage one logical intent
2. **Content Configuration**: Use `content` for responses rather than hardcoding
3. **Error Handling**: Always handle error cases gracefully
4. **Context Awareness**: Leverage context for personalization
5. **Testing**: Write unit tests for your handlers
6. **Reusability**: Extract common logic to utility functions
7. **Type Safety**: Use TypeScript interfaces from stentor-models

## Example Handler

```typescript
import { ConversationHandler } from "stentor-handler";
import { Request, Response, Context } from "stentor-models";

export class GreetingHandler extends ConversationHandler {
  async handleRequest(request: Request, context: Context): Promise<Response> {
    // Get user name from context
    const userName = context.user?.name || "there";

    // Build personalized response
    const response = this.responseBuilder
      .respond(`Hello ${userName}! Welcome back.`)
      .reprompt("What can I help you with today?")
      .withCard({
        title: "Welcome",
        content: `Hello ${userName}!`
      })
      .build();

    // Track usage in session
    context.session.set("lastGreeting", new Date().toISOString());

    return response;
  }
}
```

## Reference Files

View the source code on GitHub:
- AbstractHandler: `packages/stentor-handler/src/AbstractHandler/Handler.ts`
- ConversationHandler: `packages/stentor-handler/src/ConversationHandler.ts`
- Handler Interface: `packages/stentor-models/src/Handler/Handler.ts`
- Handler Tests: `packages/stentor-handler/src/__test__/ConversationHandler.test.ts`

## Next Steps

- Learn about [Custom Channels](./CustomChannels.md)
- Explore the [Getting Started](./GettingStarted.md) guide
