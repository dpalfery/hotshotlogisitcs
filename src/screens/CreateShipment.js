import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SecurityUtils, SECURITY_CONFIG } from "../utils/security";

// Map input types to validation patterns from SECURITY_CONFIG
const validateInput = (input, type) => {
  switch (type) {
    case "address":
      return SecurityUtils.validateInput(
        input,
        SECURITY_CONFIG.PATTERNS.ADDRESS,
      );
    case "description":
      return SecurityUtils.validateInput(
        input,
        SECURITY_CONFIG.PATTERNS.DESCRIPTION,
      );
    case "notes":
      return SecurityUtils.validateInput(input, SECURITY_CONFIG.PATTERNS.NOTES);
    default:
      return false;
  }
};

// Reuse sanitize helper from SecurityUtils
const sanitizeInput = (input) => SecurityUtils.sanitizeInput(input);

export default function CreateShipment({ navigation }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (setter, value, type) => {
    const sanitized = sanitizeInput(value);
    setter(sanitized);

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [type]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!pickup.trim()) {
      newErrors.pickup = "Pickup address is required";
    } else if (!validateInput(pickup, "address")) {
      newErrors.pickup = "Invalid pickup address format";
    }

    if (!dropoff.trim()) {
      newErrors.dropoff = "Drop-off address is required";
    } else if (!validateInput(dropoff, "address")) {
      newErrors.dropoff = "Invalid drop-off address format";
    }

    if (!details.trim()) {
      newErrors.details = "Cargo details are required";
    } else if (!validateInput(details, "description")) {
      newErrors.details = "Invalid cargo details format";
    }

    if (notes && !validateInput(notes, "notes")) {
      newErrors.notes = "Invalid notes format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert(
        "Validation Error",
        "Please correct the errors before submitting",
      );
      return;
    }

    // TODO: Implement secure API call with proper authentication
    Alert.alert(
      "Quote Request",
      "Your shipment quote request has been submitted securely.",
      [
        {
          text: "OK",
          onPress: () => {
            // Navigate back or to confirmation screen
            if (navigation && navigation.goBack) {
              navigation.goBack();
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Shipment</Text>

      <Text style={styles.label}>Pickup Address: *</Text>
      <TextInput
        style={[styles.input, errors.pickup && styles.inputError]}
        value={pickup}
        onChangeText={(value) => handleInputChange(setPickup, value, "pickup")}
        placeholder="Enter pickup address"
        maxLength={200}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {errors.pickup && <Text style={styles.errorText}>{errors.pickup}</Text>}

      <Text style={styles.label}>Drop-off Address: *</Text>
      <TextInput
        style={[styles.input, errors.dropoff && styles.inputError]}
        value={dropoff}
        onChangeText={(value) =>
          handleInputChange(setDropoff, value, "dropoff")
        }
        placeholder="Enter drop-off address"
        maxLength={200}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {errors.dropoff && <Text style={styles.errorText}>{errors.dropoff}</Text>}

      <Text style={styles.label}>Cargo Details: *</Text>
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          errors.details && styles.inputError,
        ]}
        value={details}
        onChangeText={(value) =>
          handleInputChange(setDetails, value, "details")
        }
        placeholder="Describe the cargo (weight, dimensions, special handling)"
        maxLength={500}
        multiline={true}
        numberOfLines={3}
        autoCapitalize="sentences"
        autoCorrect={false}
      />
      {errors.details && <Text style={styles.errorText}>{errors.details}</Text>}

      <Text style={styles.label}>Special Notes:</Text>
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          errors.notes && styles.inputError,
        ]}
        value={notes}
        onChangeText={(value) => handleInputChange(setNotes, value, "notes")}
        placeholder="Any special notes or instructions?"
        maxLength={300}
        multiline={true}
        numberOfLines={2}
        autoCapitalize="sentences"
        autoCorrect={false}
      />
      {errors.notes && <Text style={styles.errorText}>{errors.notes}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Request Quote" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff5252",
    borderWidth: 2,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#ff5252",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
