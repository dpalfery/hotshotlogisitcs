import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { SecurityUtils, SECURITY_CONFIG } from "../utils/security";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, isLoading } = useAuth();

  const handleEmailChange = (text) => {
    const sanitized = SecurityUtils.sanitizeInput(text);
    setEmail(sanitized);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text); // Don't sanitize password as it may contain special chars
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !SecurityUtils.validateInput(email, SECURITY_CONFIG.PATTERNS.EMAIL)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Check for malicious content
    if (SecurityUtils.containsMaliciousContent(email)) {
      newErrors.email = "Invalid characters detected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      Alert.alert(
        "Validation Error",
        "Please correct the errors before continuing",
      );
      return;
    }

    const result = await login({
      email: email.toLowerCase().trim(),
      password: password,
    });

    if (result.success) {
      Alert.alert("Welcome!", `Logged in as ${result.user.role}`);
    }
  };

  const handleDemoLogin = (userType) => {
    const demoCredentials = {
      customer: { email: "customer@demo.com", password: "demo123" },
      driver: { email: "driver@demo.com", password: "demo123" },
    };

    let credentials = null;
    if (userType === "customer") {
      credentials = demoCredentials.customer;
    } else if (userType === "driver") {
      credentials = demoCredentials.driver;
    }

    if (credentials) {
      setEmail(credentials.email);
      setPassword(credentials.password);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Hot Shot Logistics</Text>
        <Text style={styles.subtitle}>Secure Login</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={100}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={50}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Demo Access</Text>
          <View style={styles.demoButtons}>
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => handleDemoLogin("customer")}
            >
              <Text style={styles.demoButtonText}>Customer Demo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => handleDemoLogin("driver")}
            >
              <Text style={styles.demoButtonText}>Driver Demo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.securityNotice}>
          <Text style={styles.securityText}>
            🔒 Secure login with input validation and XSS protection
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  inputError: {
    borderColor: "#ff5252",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff5252",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 15,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: "#2196f3",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  demoSection: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },
  demoButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  demoButton: {
    flex: 1,
    backgroundColor: "#4caf50",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
  },
  demoButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  securityNotice: {
    backgroundColor: "#e8f5e8",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
  },
  securityText: {
    fontSize: 12,
    color: "#2e7d32",
    textAlign: "center",
  },
});
