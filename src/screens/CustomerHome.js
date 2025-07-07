import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

export default function CustomerHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Hot Shot Logistics</Text>
      <Button
        title="Create New Shipment"
        onPress={() => navigation.navigate("CreateShipment")}
      />
      <Button
        title="Track My Shipments"
        onPress={() => navigation.navigate("TrackShipment")}
      />
      <Button title="Order History" onPress={() => {}} />
      <Button title="Account / Profile" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: { width: 120, height: 80, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
});
