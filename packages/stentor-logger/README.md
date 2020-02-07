## stentor-logger

Simple logging library built on top of Winston for :mega: stentor.

## Usage

```
import { log } from "stentor-logger"

log().debug("Hello");
log().debug({foo:true});
log().info("Payload %o", request);
log().warn("uh oh");
log.error(new Error("bar"));

```

## Configuration

You can configure the loggers behavior with the following environment variables:

```
OVAI_LOG_LEVEL="debug"
```

Or "info", "warn", or "error".

```
OVAI_LOG_PII="true"
```

To log PII, by default all detected PII is redacted.

```
OVAI_LOG_PII_MASK_PARTIAL="true"
```

When set to true, it will mask a majority of the PII but leave some characters unmasked. For example: (123) 456 7890 goes to (###) ### 7890.
By default, all characters are masked.

```
OVAI_LOG_PII_ERRORS="true"
```

Only used by OVAI developers to help debug errors while attempting to redact PII.
