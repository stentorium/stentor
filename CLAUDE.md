# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a TypeScript monorepo managed by Lerna and Yarn workspaces.

**Build and Development:**
- `yarn build` - Build all packages using Lerna
- `yarn clean` - Clean all build artifacts
- `yarn clean:modules` - Clean node_modules from all packages
- `yarn test` - Run tests across all packages (uses UTC timezone)

**Linting and Quality:**
- `yarn lint` - Lint TypeScript files across packages
- `yarn license-check` - Verify package licenses are compatible
- `yarn version-check` - Check for mismatched versions across packages

**Package Management:**
- `yarn lerna` - Access Lerna commands directly
- `yarn api` - Generate API documentation
- `yarn docs` - Build markdown documentation from API

**Testing Individual Packages:**
Since this is a Lerna monorepo, to test a single package:
- `cd packages/[package-name]` then `yarn test`
- Or use: `lerna run test --scope=stentor-[package-name]`

**Releases:**
- `yarn release` - Production release (creates tags and publishes)
- `yarn release:pre` - Prerelease (requires CIRCLE_BRANCH env var)

## Architecture Overview

Stentor is a conversational AI framework for building voice and chat applications across multiple platforms (Alexa, Google Assistant, etc.).

**Core Packages:**
- `stentor` - Main package with Assistant class, the primary entry point
- `stentor-models` - Core TypeScript interfaces and types shared across all packages
- `stentor-runtime` - Request/response processing engine and main execution logic
- `stentor-handler*` - Handler system for processing intents and managing conversation flow
- `stentor-response` - Response building and templating system
- `stentor-request` - Request parsing and processing utilities

**Platform Integration:**
- `stentor-channel` - Channel abstraction for different platforms
- `stentor-context` - Context management for maintaining conversation state
- `stentor-storage` - Storage abstractions for user data persistence

**Utilities:**
- `stentor-constants` - Shared constants and enums
- `stentor-guards` - Type guards and validation utilities
- `stentor-utils` - General utility functions
- `stentor-logger` - Logging infrastructure
- `stentor-locales` - Internationalization support

**Media and Content:**
- `stentor-media` - Audio/video playlist and media source management
- `stentor-time` - Time-based conditional logic and scheduling

**Services:**
- `stentor-service-*` - External service integrations (Studio, OVAI, events)

**Key Architecture Patterns:**
1. **Monorepo Structure**: All packages are interdependent and published together
2. **Handler-Based**: Conversation logic is organized into handlers that process specific intents
3. **Multi-Channel**: Single codebase supports multiple voice/chat platforms
4. **Type Safety**: Heavy use of TypeScript interfaces defined in stentor-models
5. **Plugin Architecture**: Services and channels can be plugged in as needed

## Development Notes

**TypeScript Configuration:**
- Each package has its own `tsconfig.json`
- Compiled output goes to `lib/` directories
- Source files are in `src/` directories

**Testing:**
- Uses Mocha test framework
- Tests run in UTC timezone (TZ=UTC)
- Test files follow `**/__test__/*.test.ts` pattern

**Package Dependencies:**
- Packages reference each other using workspace dependencies
- Check existing imports before adding new external dependencies
- Common dependencies are managed at the workspace root

**Branch Strategy:**
- Main branch: `master`
- Current working branch: `fix/more-vulnerabilities` (security fixes in progress)