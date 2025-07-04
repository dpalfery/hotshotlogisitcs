import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// Security utilities
const validateShipmentId = (id) => {
  if (typeof id !== "string") return false;
  // Alphanumeric shipment ID validation (6-12 characters)
  return /^[A-Z0-9]{6,12}$/.test(id.toUpperCase());
};

const sanitizeShipmentId = (id) => {
  if (typeof id !== "string") return "";
  return id.toUpperCase().replace(/[^A-Z0-9]/g, "");
};

export default function TrackShipment({ navigation }) {
  const [shipmentId, setShipmentId] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock shipment data for demonstration
  const mockShipmentData = {
    JOB001SHIP: {
      id: "JOB001SHIP",
      status: "In Transit",
      pickup: "123 Main St, City A",
      dropoff: "456 Oak Ave, City B",
      currentLocation: "Highway 101, Mile Marker 45",
      eta: "2 hours 30 minutes",
      driverName: "John D.",
      driverPhone: "+1-XXX-XXX-XX89", // Partially masked for security
    },
    JOB002SHIP: {
      id: "JOB002SHIP",
      status: "Delivered",
      pickup: "789 Pine Rd, City C",
      dropoff: "321 Elm St, City D",
      currentLocation: "Delivered",
      eta: "Completed",
      driverName: "Jane S.",
      driverPhone: "+1-XXX-XXX-XX45",
    },
  };

  const handleShipmentIdChange = (text) => {
    const sanitized = sanitizeShipmentId(text);
    setShipmentId(sanitized);
    setError("");
  };

  const trackShipment = async () => {
    if (!shipmentId.trim()) {
      setError("Please enter a shipment ID");
      return;
    }

    if (!validateShipmentId(shipmentId)) {
      setError("Invalid shipment ID format. Use 6-12 alphanumeric characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = mockShipmentData[shipmentId];
      if (data) {
        setShipmentData(data);
      } else {
        setError("Shipment not found. Please check your ID and try again.");
        setShipmentData(null);
      }
    } catch (err) {
      setError("Failed to track shipment. Please try again later.");
      setShipmentData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleContactDriver = () => {
    if (!shipmentData) return;

    Alert.alert(
      "Contact Driver",
      `Contact ${shipmentData.driverName} at ${shipmentData.driverPhone}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => {
            // TODO: Implement secure calling mechanism
            Alert.alert("Info", "Calling driver...");
          },
        },
      ],
    );
  };

  const handleSupport = () => {
    Alert.alert("Customer Support", "Contact customer support?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Call Support",
        onPress: () => {
          // TODO: Implement secure support contact
          Alert.alert("Info", "Connecting to support...");
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Track Shipment</Text>

      <View style={styles.searchSection}>
        <Text style={styles.label}>Enter Shipment ID:</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={shipmentId}
          onChangeText={handleShipmentIdChange}
          placeholder="e.g., JOB001SHIP"
          maxLength={12}
          autoCapitalize="characters"
          autoCorrect={false}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? "Tracking..." : "Track Shipment"}
            onPress={trackShipment}
            disabled={loading || !shipmentId.trim()}
          />
        </View>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196f3" />
          <Text style={styles.loadingText}>Tracking your shipment...</Text>
        </View>
      )}

      {shipmentData && (
        <View style={styles.shipmentInfo}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Shipment Details</Text>
            <Text style={styles.infoText}>ID: {shipmentData.id}</Text>
            <Text style={styles.infoText}>Status: {shipmentData.status}</Text>
            <Text style={styles.infoText}>From: {shipmentData.pickup}</Text>
            <Text style={styles.infoText}>To: {shipmentData.dropoff}</Text>
          </View>

          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Current Location:</Text>
            <Text style={styles.locationText}>
              {shipmentData.currentLocation}
            </Text>
            <Text style={styles.mapSubtext}>
              [Map integration would show driver location]
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>ETA: {shipmentData.eta}</Text>
            <Text style={styles.infoText}>
              Driver: {shipmentData.driverName}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <Button title="Contact Driver" onPress={handleContactDriver} />
            <Button title="Support" onPress={handleSupport} />
          </View>
        </View>
      )}
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
  searchSection: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  inputError: {
    borderColor: "#ff5252",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff5252",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 15,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  shipmentInfo: {
    gap: 15,
  },
  infoCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  mapPlaceholder: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 15,
  },
  mapText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196f3",
    textAlign: "center",
    marginBottom: 10,
  },
  mapSubtext: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    gap: 10,
  },
});
