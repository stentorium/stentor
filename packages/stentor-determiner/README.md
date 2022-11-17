## stentor-determiner

Determine the best possible option from a list based on incoming request and current context.

## Channeled

When we find objects that are channeled, it will:

1. Any objects without channel information defined are treated as available to all channels
2. Objects with channel information defined and satisfy the channel data on the incoming request will be used.
3. Objects with channel information defined that do not satisfy the channel data will be filtered out.
