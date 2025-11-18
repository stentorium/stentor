---
id: getting-started
title: Getting Started
---

# Getting Started with Stentor

Stentor is a conversational AI framework that lets you build voice and chat applications for multiple platforms from a single TypeScript codebase.

## Installation

Install Stentor using npm or yarn:

```bash
npm install stentor
```

Or with yarn:

```bash
yarn add stentor
```

## Quick Start

Here's a simple "Hello World" example to get you started:

```typescript
import { Assistant } from "stentor";

// Create an assistant
const assistant = new Assistant({
  appId: "my-app-id"
});

// Define a simple handler
assistant.addHandler({
  intentId: "LaunchRequest",
  content: {
    ["LaunchRequest"]: [
      {
        outputSpeech: {
          ssml: "<speak>Hello! Welcome to Stentor.</speak>"
        }
      }
    ]
  }
});

// Process a request
const response = await assistant.handleRequest({
  type: "LAUNCH_REQUEST",
  platform: "amazon-alexa",
  sessionId: "session-123",
  userId: "user-456"
});

console.log(response);
```

## Core Concepts

### Assistant

The `Assistant` class is the main entry point for Stentor. It manages handlers, processes requests, and generates responses.

```typescript
import { Assistant } from "stentor";

const assistant = new Assistant({
  appId: "your-app-id",
  // Optional configuration
});
```

### Handlers

Handlers are the building blocks of your conversational application. Each handler processes a specific intent and manages its conversation flow.

```typescript
assistant.addHandler({
  intentId: "HelloIntent",
  content: {
    ["HelloIntent"]: [
      {
        outputSpeech: {
          ssml: "<speak>Hello there!</speak>"
        }
      }
    ]
  }
});
```

Learn more in the [Handlers Guide](./Handlers.md).

### Requests and Responses

Stentor normalizes requests from different platforms (Alexa, Google Assistant, custom channels) into a common format. Responses are automatically translated back to the platform-specific format.

```typescript
const response = await assistant.handleRequest({
  type: "INTENT_REQUEST",
  intentId: "HelloIntent",
  platform: "amazon-alexa",
  sessionId: "session-123",
  userId: "user-456"
});
```

## Multi-Platform Support

Stentor supports multiple conversational platforms out of the box:

- **Amazon Alexa** - Build Alexa skills
- **Google Assistant** - Create Google Actions
- **Custom Channels** - Integrate with any chat platform

All from the same codebase! Learn more about [Custom Channels](./CustomChannels.md).

## Building a Complete Skill

Here's a more complete example with multiple intents:

```typescript
import { Assistant } from "stentor";

const assistant = new Assistant({
  appId: "weather-app"
});

// Launch handler
assistant.addHandler({
  intentId: "LaunchRequest",
  content: {
    ["LaunchRequest"]: [
      {
        outputSpeech: {
          ssml: "<speak>Welcome to Weather App. Ask me about the weather!</speak>"
        },
        reprompt: {
          ssml: "<speak>You can say things like, what's the weather today?</speak>"
        }
      }
    ]
  }
});

// Weather intent handler
assistant.addHandler({
  intentId: "WeatherIntent",
  content: {
    ["WeatherIntent"]: [
      {
        outputSpeech: {
          ssml: "<speak>It's sunny and 75 degrees today!</speak>"
        }
      }
    ]
  }
});

// Help intent
assistant.addHandler({
  intentId: "AMAZON.HelpIntent",
  content: {
    ["AMAZON.HelpIntent"]: [
      {
        outputSpeech: {
          ssml: "<speak>Just ask me about the weather!</speak>"
        }
      }
    ]
  }
});

// Stop/Cancel
assistant.addHandler({
  intentId: "AMAZON.StopIntent",
  content: {
    ["AMAZON.StopIntent"]: [
      {
        outputSpeech: {
          ssml: "<speak>Goodbye!</speak>"
        }
      }
    ]
  }
});

// Export for your platform (Lambda, Express, etc.)
export const handler = async (event: any) => {
  return assistant.handleRequest(event);
};
```

## Using with AWS Lambda (Alexa)

Stentor works seamlessly with AWS Lambda for Alexa skills:

```typescript
import { Assistant } from "stentor";
import { AlexaEvent } from "stentor-models";

const assistant = new Assistant({
  appId: "your-alexa-skill-id"
});

// Add your handlers...

export const handler = async (event: AlexaEvent) => {
  return assistant.handleRequest(event);
};
```

## Using with Express (Custom Channels)

You can also use Stentor with Express for custom chat integrations:

```typescript
import express from "express";
import { Assistant } from "stentor";

const app = express();
const assistant = new Assistant({
  appId: "chat-app"
});

// Add your handlers...

app.post("/webhook", async (req, res) => {
  const response = await assistant.handleRequest({
    type: "INTENT_REQUEST",
    intentId: req.body.intent,
    platform: "custom",
    sessionId: req.body.sessionId,
    userId: req.body.userId
  });

  res.json(response);
});

app.listen(3000);
```

## State Management

Stentor provides built-in state management for maintaining conversation context:

```typescript
assistant.addHandler({
  intentId: "NameIntent",
  async handler(request, response) {
    const name = request.slots?.name?.value;

    // Save to session storage
    request.sessionStore.set("userName", name);

    response.respond({
      outputSpeech: {
        ssml: `<speak>Nice to meet you, ${name}!</speak>`
      }
    });

    return response;
  }
});

assistant.addHandler({
  intentId: "GreetingIntent",
  async handler(request, response) {
    // Retrieve from session storage
    const name = request.sessionStore.get("userName");

    response.respond({
      outputSpeech: {
        ssml: `<speak>Hello ${name || "there"}!</speak>`
      }
    });

    return response;
  }
});
```

## Next Steps

- **[Handlers Guide](./Handlers.md)** - Learn about the handler system in depth
- **[Custom Channels](./CustomChannels.md)** - Integrate with custom chat platforms
- **[API Reference](/api)** - Explore the complete API documentation
- **[Recommended Development Environment](./RecommendedDevelopmentEnvironment.md)** - Set up your development environment

## TypeScript Support

Stentor is written in TypeScript and provides full type definitions. All models and interfaces are available from `stentor-models`:

```typescript
import { Request, Response, Handler } from "stentor-models";

const handler: Handler = {
  intentId: "MyIntent",
  // TypeScript will provide full autocomplete and type checking
  async handler(request: Request, response: Response) {
    // Your logic here
    return response;
  }
};
```

## Resources

- **GitHub**: [https://github.com/stentorium/stentor](https://github.com/stentorium/stentor)
- **npm**: [https://www.npmjs.com/package/stentor](https://www.npmjs.com/package/stentor)
- **Issues**: [https://github.com/stentorium/stentor/issues](https://github.com/stentorium/stentor/issues)

## Getting Help

If you need help or have questions:

1. Check the [API Reference](/api) for detailed documentation
2. Browse the [Guides](./getting-started) for tutorials and best practices
3. Open an issue on [GitHub](https://github.com/stentorium/stentor/issues)
