# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies (use --legacy-peer-deps due to React Native peer dependencies)
npm install --legacy-peer-deps

# Run the app
npx expo start              # Start Expo dev server
npx react-native run-android   # Run on Android (React Native CLI)
npx react-native run-ios       # Run on iOS (React Native CLI)

# Testing
npm test                    # Run all tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Generate coverage report

# Linting
npm run lint                # Standard ESLint checks
npm run lint:security       # Security-focused linting with eslint-plugin-security

# Security
npm run audit               # Check for dependency vulnerabilities (moderate+ severity)
npm run audit:fix           # Attempt to auto-fix vulnerabilities
```

## Architecture Overview

This is a security-focused logistics mobile app built with React Native and Expo. It serves both customers and drivers with role-based access control.

### Application Structure

The app follows a standard React Native architecture:

**App.js** - Entry point that wraps the app in:
1. `AuthProvider` - Provides authentication context to entire app
2. `NavigationContainer` - React Navigation wrapper
3. `AppNavigator` - Stack-based screen navigation

**Core Directories:**
- `src/context/` - React Context providers (AuthContext)
- `src/navigation/` - Navigation configuration
- `src/screens/` - Screen components (CustomerHome, DriverHome, CreateShipment, TrackShipment, LoginScreen)
- `src/utils/` - Shared utilities (security.js with validation/sanitization functions)

### Authentication System (src/context/AuthContext.js)

**Context-based authentication** with these key functions:
- `login(credentials)` - Validates, sanitizes, and authenticates users. Role is determined by email pattern (driver@* = driver, otherwise customer)
- `logout()` - Clears user state and session
- `hasPermission(permission)` - Checks user permissions
- `useAuth()` - Custom hook to access auth context
- `withAuth(Component)` - HOC for protecting routes
- `PermissionGuard` - Component-level permission checking

**Permissions by Role:**
- Customer: `['create_shipments', 'view_shipments', 'track_shipments']`
- Driver: `['view_jobs', 'update_jobs', 'update_location']`

**Current Implementation:** Mock authentication with demo credentials. TODOs indicate future backend integration with token storage.

### Security Layer (src/utils/security.js)

**SECURITY_CONFIG object** contains:
- `PATTERNS` - Regex patterns for validation (shipment IDs, addresses, descriptions, phone, email)
- `LIMITS` - Length constraints for user inputs
- `HEADERS` - Standard security headers for API calls
- `SESSION` - Session timeout configuration (30 min timeout, 5 min refresh threshold)
- `ERRORS` - Sanitized error messages for user display

**SecurityUtils functions:**
- `sanitizeInput(input)` - Removes HTML tags, script blocks, and dangerous characters to prevent XSS
- `validateInput(input, pattern)` - Validates input against a regex pattern after sanitization
- `generateSecureId(length)` - Creates random alphanumeric IDs
- `maskSensitiveData(data, type)` - Masks phone numbers and emails for display
- `containsMaliciousContent(input)` - Detects script tags, javascript:, event handlers, etc.

**Critical:** All user inputs must be passed through `sanitizeInput()` before processing and `validateInput()` before acceptance.

### Navigation (src/navigation/AppNavigator.js)

Stack-based navigation with these screens:
- CustomerHome (initial route)
- CreateShipment
- TrackShipment
- DriverHome

Note: Navigation does not currently enforce authentication. LoginScreen exists but is not integrated into the navigation flow.

### Testing Configuration

**Jest configuration** (jest.config.js):
- Uses `jsdom` test environment
- Transforms React Native modules through babel-jest
- Coverage collection from `src/**/*.{js,jsx}`
- File mocks for static assets

**Test files location:** `src/**/__tests__/`

### Security Linting (.eslintrc.security.js)

Uses `eslint-plugin-security` with strict rules:
- Detects unsafe regex, eval usage, object injection
- Warns about potential timing attacks, non-literal requires
- Enforces React Native best practices (no unused styles, platform splitting)

**Important:** Run `npm run lint:security` before commits to catch security issues.

### Demo Credentials

- Customer: `customer@demo.com` / `demo123`
- Driver: `driver@demo.com` / `demo123`

Role is determined by email pattern (contains "driver" → driver role, otherwise → customer role).

### Future Backend Integration

The codebase is designed for .NET Core backend integration. Look for `// TODO:` comments indicating:
- Token storage (consider expo-secure-store)
- API authentication calls
- Session validation
- Secure storage of auth tokens