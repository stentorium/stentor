## stentor-logger

Simple logging library with optional Winston support for 📣 stentor.

By default, stentor-logger provides a console-based fallback logger. If you want enhanced logging features, you can optionally install and register Winston.

## Basic Usage

```typescript
import { log } from "stentor-logger";

log().debug("Hello");
log().debug({foo:true});
log().info("Payload %o", request);
log().warn("uh oh");
log().error(new Error("bar"));
```

## Using with Winston (Optional)

To use Winston features, first install Winston:

```bash
npm install winston logform
```

Then stentor-logger will automatically detect and use Winston if available. You can also manually register a Winston logger:

```typescript
import { registerWinstonLogger } from "stentor-logger";
import { createLogger, format, transports } from "winston";

const customWinstonLogger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" })
  ]
});

registerWinstonLogger(customWinstonLogger);
```

## Configuration

You can configure the loggers behavior with the following environment variables:

```
STENTOR_LOG_LEVEL="debug"
```

Or "info", "warn", or "error".

```
STENTOR_LOG_PII="true"
```

To log PII, by default all detected PII is redacted.

```
STENTOR_LOG_PII_MASK_PARTIAL="true"
```

When set to true, it will mask a majority of the PII but leave some characters unmasked. For example: (123) 456 7890 goes to (###) ### 7890.
By default, all characters are masked.

```
STENTOR_LOG_PII_ERRORS="true"
```

Only used by 📣 stentor developers to help debug errors while attempting to redact PII.
