// Security configuration and constants
export const SECURITY_CONFIG = {
  // Input validation patterns
  PATTERNS: {
    SHIPMENT_ID: /^[A-Z0-9]{6,12}$/,
    ADDRESS: /^[a-zA-Z0-9\s,.'-]{1,200}$/,
    DESCRIPTION: /^[a-zA-Z0-9\s,.'\-!?()]{1,500}$/,
    NOTES: /^[a-zA-Z0-9\s,.'\-!?()]{0,300}$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Input length limits
  LIMITS: {
    ADDRESS_MAX: 200,
    DESCRIPTION_MAX: 500,
    NOTES_MAX: 300,
    SHIPMENT_ID_MAX: 12,
    SHIPMENT_ID_MIN: 6,
  },

  // Security headers for API calls
  HEADERS: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },

  // Session configuration
  SESSION: {
    TIMEOUT_MINUTES: 30,
    REFRESH_THRESHOLD_MINUTES: 5,
  },

  // Error messages (sanitized for user display)
  ERRORS: {
    INVALID_INPUT: 'Invalid input format. Please check your entry.',
    UNAUTHORIZED: 'Access denied. Please login again.',
    SERVER_ERROR: 'Service temporarily unavailable. Please try again later.',
    NETWORK_ERROR: 'Connection error. Please check your internet connection.',
    VALIDATION_FAILED: 'Please correct the errors before submitting.',
  },
};

// Security utility functions
export const SecurityUtils = {
  // Sanitize input to prevent XSS
  sanitizeInput: (input) => {
    if (typeof input !== 'string') {
      return '';
    }
    return input
      .trim()
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '') // Remove <script> blocks and their content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>''&]/g, ''); // Remove potentially dangerous characters
  },

  // Validate input against pattern
  validateInput: (input, pattern) => {
    if (typeof input !== 'string') {
      return false;
    }
    const sanitized = SecurityUtils.sanitizeInput(input);
    return pattern.test(sanitized);
  },

  // Generate secure random string for IDs
  generateSecureId: (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Mask sensitive data for display
  maskSensitiveData: (data, type) => {
    if (typeof data !== 'string') {
      return '';
    }

    switch (type) {
      case 'phone':
        return data.replace(
          /(\+?[1-9]\d{0,2})-?(\d{3})-?(\d{3})-?(\d{2})(\d{2})/,
          '$1-XXX-XXX-XX$5',
        );
      case 'email': {
        const [username, domain] = data.split('@');
        if (username && domain) {
          const maskedUsername =
            username.charAt(0) + 'X'.repeat(username.length - 1);
          return `${maskedUsername}@${domain}`;
        }
        return data;
      }
      default:
        return data;
    }
  },

  // Check if string contains potentially malicious content
  containsMaliciousContent: (input) => {
    if (typeof input !== 'string') {
      return false;
    }

    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i,
      /vbscript:/i,
    ];

    return maliciousPatterns.some((pattern) => pattern.test(input));
  },
};

// Authentication helper
export const AuthUtils = {
  // Check if user session is valid (placeholder implementation)
  isAuthenticated: () => {
    // TODO: Implement proper token validation
    return true; // Placeholder
  },

  // Get current user context (placeholder implementation)
  getCurrentUser: () => {
    // TODO: Implement secure user context retrieval
    return {
      id: 'user_123',
      role: 'customer', // or 'driver'
      permissions: ['view_shipments', 'create_shipments'],
    };
  },

  // Check user permissions
  hasPermission: (permission) => {
    const user = AuthUtils.getCurrentUser();
    return user && user.permissions && user.permissions.includes(permission);
  },
};
