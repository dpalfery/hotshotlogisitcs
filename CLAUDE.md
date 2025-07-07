# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run tests
npm test

# Run linting
npm run lint

# Run security-focused linting
npm run lint:security

# Security audit checks
npm run audit
npm run audit:fix
```

## React Native Setup

This is a React Native application. To run:

```bash
# Using Expo
npx expo start

# Using React Native CLI
npx react-native run-android
npx react-native run-ios
```

## Architecture Overview

This is a security-focused logistics mobile app built with React Native. The app serves both customers and drivers with role-based access control.

### Key Components Structure

- **Authentication System**: Context-based authentication with role-based permissions (`src/context/AuthContext.js`)
- **Security Layer**: Comprehensive input validation, sanitization, and XSS prevention (`src/utils/security.js`)
- **Navigation**: Stack-based navigation with protected routes (`src/navigation/`)
- **Screens**: Role-specific screens for customers and drivers (`src/screens/`)

### Security Architecture

The app implements defense-in-depth security:

1. **Input Validation**: All user inputs are validated using regex patterns defined in `SECURITY_CONFIG.PATTERNS`
2. **Data Sanitization**: HTML tag removal and dangerous character filtering via `SecurityUtils.sanitizeInput()`
3. **Permission System**: Role-based access control with granular permissions
4. **Authentication Context**: Centralized auth state management with secure token handling (TODO: backend integration)

### Key Security Utilities

- `SecurityUtils.sanitizeInput()` - XSS prevention
- `SecurityUtils.validateInput()` - Pattern-based validation
- `SecurityUtils.maskSensitiveData()` - Data masking for display
- `SecurityUtils.containsMaliciousContent()` - Malicious content detection

### Authentication Flow

1. Login credentials are validated and sanitized
2. User role is determined (customer/driver) based on email pattern
3. Permissions are assigned based on role
4. Authentication state is managed through React Context

### Testing Strategy

- Component tests in `__tests__/` directories
- Security utility tests for validation functions
- Uses Jest with React Native preset

## Important Notes

- All user inputs must be validated using the security utilities
- Use `AuthContext` for authentication state management
- Implement permission checks using `hasPermission()` for sensitive features
- Demo credentials: customer@demo.com/demo123, driver@demo.com/demo123
- The app is designed for future backend integration with .NET Core