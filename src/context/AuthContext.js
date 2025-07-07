import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { SecurityUtils } from '../utils/security';

// Authentication Context
const AuthContext = createContext(null);

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication state
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      // TODO: Check for stored authentication token
      // TODO: Validate token with backend
      // For now, simulate check
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authenticated state for demo
      setIsAuthenticated(false); // Set to false to require login
      setIsLoading(false);
    } catch (error) {
      console.error('Auth state check failed:', error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Validate credentials format
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(credentials.email)) {
        throw new Error('Invalid email format');
      }

      // Sanitize input
      const sanitizedEmail = SecurityUtils.sanitizeInput(credentials.email);

      setIsLoading(true);

      // TODO: Implement actual authentication API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login
      const mockUser = {
        id: SecurityUtils.generateSecureId(8),
        email: sanitizedEmail,
        role: sanitizedEmail.includes('driver') ? 'driver' : 'customer',
        permissions: sanitizedEmail.includes('driver')
          ? ['view_jobs', 'update_jobs', 'update_location']
          : ['create_shipments', 'view_shipments', 'track_shipments'],
      };

      setUser(mockUser);
      setIsAuthenticated(true);

      // TODO: Store secure authentication token
      // await SecureStore.setItemAsync('authToken', token);

      return { success: true, user: mockUser };
    } catch (error) {
      Alert.alert('Login Failed', error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // TODO: Invalidate token on backend
      // TODO: Clear stored authentication data
      // await SecureStore.deleteItemAsync('authToken');

      setUser(null);
      setIsAuthenticated(false);

      Alert.alert('Logged Out', 'You have been successfully logged out.');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Error', 'Failed to logout properly.');
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (permission) => {
    return user && user.permissions && user.permissions.includes(permission);
  };

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission,
    checkAuthState,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-Order Component for protected routes
export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return null; // TODO: Return loading component
    }

    if (!isAuthenticated) {
      return null; // TODO: Return login component
    }

    return <Component {...props} />;
  };
};

// Permission guard component
export const PermissionGuard = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return fallback;
  }

  return children;
};
