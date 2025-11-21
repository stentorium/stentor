# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.66.37 (2025-11-21)

### Bug Fixes

* **LexServiceV2**: Fix setContext failure when botId is missing ([#2795](https://github.com/stentorium/stentor/issues/2795))
  - Add validation for required botId and botAliasId configuration
  - Implement graceful degradation when Lex client is not available
  - Add local context storage as fallback when Lex sync fails
  - Provide clear error messages and logging for debugging
  - Maintain backward compatibility with existing working configurations

### Features

* **LexServiceV2**: Add comprehensive NLU service implementation
  - Support for Amazon Lex V2 runtime API
  - Configuration through constructor or environment variables
  - Context management with automatic cleanup
  - Service status monitoring and diagnostics
  - Production-ready error handling and logging

### Documentation

* Add comprehensive README with usage examples and configuration options
* Include troubleshooting guide for common configuration issues
* Document AWS permissions required for Lex V2 integration