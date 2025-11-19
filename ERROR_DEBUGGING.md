# Error Debugging Guide for Stentor Applications

This guide helps developers debug errors that occur when using the Stentor framework, particularly with knowledge base services like StudioService.

## Common Error: Empty Error Objects in Logs

### Problem
If you see error logs like:
```
AppHandlerKnowldgebaseService: Error in FAQ Query: - {}
```

This indicates that:
1. An error occurred in a knowledge base service call
2. The error details are not being properly captured or logged
3. The error handling in your application code needs improvement

### Root Cause
This typically happens when:
- Application code catches errors but doesn't properly extract error details
- Error objects are stringified without accessing the actual error message
- Custom handler code doesn't implement proper error logging

### Solution

#### 1. Improve Error Handling in Custom Handlers

If you have custom handler classes that wrap StudioService, ensure proper error handling:

```typescript
// ❌ Bad - loses error details
try {
    const result = await this.knowledgeBaseService.faq(query);
    // ... process result
} catch (error) {
    console.error(`${this.constructor.name}: Error in FAQ Query: - ${JSON.stringify(error)}`);
}

// ✅ Good - preserves error details  
try {
    const result = await this.knowledgeBaseService.faq(query);
    // ... process result
} catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(`${this.constructor.name}: Error in FAQ Query: ${errorMessage}`);
    if (errorStack) {
        console.error(`Stack trace: ${errorStack}`);
    }
    
    // Re-throw with better context
    throw new Error(`FAQ query failed for "${query}": ${errorMessage}`);
}
```

#### 2. Enhanced StudioService Error Messages

As of this update, the StudioService methods (`faq()`, `search()`, `rag()`) now provide enhanced error messages that include:
- The original query that caused the error
- Specific error types (network, abort, HTTP status codes)
- Full response details for debugging

#### 3. Check for Typos in Class Names

The error message shows "AppHandlerKnowldgebaseService" (missing 'e' in 'Knowledge'). This suggests:
- A typo in your custom handler class name
- The error is coming from application-specific code, not the framework

Search your application code for:
```bash
grep -r "KnowldgebaseService" /path/to/your/app
grep -r "Error in FAQ Query" /path/to/your/app
```

#### 4. Debugging Steps

1. **Enable detailed logging** in your application
2. **Check network connectivity** to the Studio API endpoints
3. **Verify authentication tokens** are valid and not expired
4. **Review API response formats** - ensure they match expected StudioFAQResponse interface
5. **Test with simple queries** first to isolate the issue

#### 5. Framework Improvements

The following improvements have been made to help with debugging:

- Enhanced error messages in all StudioService methods
- Query context included in all error messages
- Specific error types for different failure scenarios
- Better error chaining to preserve original error information

### Testing Your Error Handling

Use the new test file `StudioService.errorHandling.test.ts` as a reference for testing error scenarios in your application.

## Prevention

1. **Always include query context** in error messages
2. **Use proper error object inspection** - check `error.message` and `error.stack`
3. **Implement comprehensive error logging** at all integration points
4. **Test error scenarios** during development
5. **Monitor error patterns** in production to catch issues early

## Need Help?

If you continue to see empty error objects after implementing these improvements:
1. Check your application's error handling patterns
2. Review network infrastructure and API connectivity  
3. Enable debug logging in the Stentor runtime
4. Consider adding custom error monitoring and alerting