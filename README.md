# Hot Shot Logistics Mobile App (React Native) - Security Enhanced

A cross-platform mobile app for a hot shot logistics business.  
Built with React Native and designed for customers and drivers with comprehensive security measures.

## 🔒 Security Features

This application implements robust security measures to protect user data and prevent common vulnerabilities:

- **Input Validation**: All user inputs are validated and sanitized to prevent XSS attacks
- **Data Masking**: Sensitive information like phone numbers and emails are masked in the UI
- **Authentication Framework**: Secure login system with permission-based access control
- **Error Handling**: Comprehensive error handling without exposing sensitive information
- **Security Linting**: ESLint security plugin for code quality and vulnerability detection
- **Dependency Security**: Regular security audits and vulnerability fixes

## Features

- **Customer Home**: Create shipments, track shipments, view order history
- **Create Shipment**: Enter pickup, drop-off, and cargo details with validation
- **Track Shipment**: See current status and driver location with secure ID validation
- **Driver Home**: View and update assigned jobs with secure job management
- **Authentication**: Secure login with role-based permissions

## Security Implementation

### Input Validation
- Shipment IDs: Alphanumeric format, 6-12 characters
- Addresses: Safe characters only, max 200 characters
- Descriptions: Validated content, max 500 characters
- Phone/Email: Pattern validation with masking for display

### Data Protection
- XSS prevention through HTML tag removal
- Dangerous character sanitization
- Malicious content detection
- Secure data masking utilities

### Authentication & Authorization
- Role-based access control (Customer/Driver)
- Permission-based feature access
- Secure session management
- Protected route components

## Getting Started

1. Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

2. Run security audit:
    ```bash
    npm run audit
    ```

3. Run security linting:
    ```bash
    npm run lint:security
    ```

4. Run tests:
    ```bash
    npm test
    ```

5. Run the app:
    ```bash
    npx expo start
    ```
    or, if using pure React Native CLI:
    ```bash
    npx react-native run-android
    npx react-native run-ios
    ```

## Security Scripts

- `npm run audit` - Check for dependency vulnerabilities
- `npm run audit:fix` - Automatically fix security issues
- `npm run lint:security` - Run security-focused linting
- `npm test` - Run security and component tests

## Project Structure

```
src/
├── screens/              # UI Components with security validations
│   ├── CustomerHome.js   # Customer dashboard
│   ├── CreateShipment.js # Secure shipment creation form
│   ├── TrackShipment.js  # Secure shipment tracking
│   ├── DriverHome.js     # Driver job management
│   ├── LoginScreen.js    # Secure authentication
│   └── __tests__/        # Component tests
├── navigation/           # App navigation
├── context/             # Authentication context
├── utils/               # Security utilities
│   ├── security.js      # Security functions and validation
│   └── __tests__/       # Security utility tests
```

## Security Documentation

See [SECURITY.md](./SECURITY.md) for detailed security implementation documentation.

## Configuration Files

- `.eslintrc.security.js` - Security linting configuration
- `SECURITY.md` - Comprehensive security documentation
- `.gitignore` - Enhanced with React Native security exclusions

## Development Guidelines

### Input Handling
- Always validate user inputs using the security utilities
- Sanitize inputs before processing or display
- Use maximum length limits on all text inputs
- Implement proper error handling with user-friendly messages

### Authentication
- Use the AuthContext for user state management
- Implement permission checks for sensitive features
- Always validate user sessions on sensitive operations

### API Security (When Implementing Backend)
- Use HTTPS only for all API communications
- Implement proper authentication tokens
- Add request signing for sensitive operations
- Use rate limiting and timeout configurations

## Demo Access

The app includes demo login credentials for testing:
- **Customer Demo**: customer@demo.com / demo123
- **Driver Demo**: driver@demo.com / demo123

## Logo

Replace `assets/logo.png` with your cartoony truck logo!

---

## Next Steps

- Connect to your .NET Core backend with security headers
- Add Google Maps integration with secure API key management
- Implement biometric authentication
- Add encryption for local data storage
- Set up security monitoring and logging

---

## Security Compliance

This application follows:
- OWASP Mobile Security Guidelines
- React Native Security Best Practices
- Industry standard input validation
- Secure authentication patterns


