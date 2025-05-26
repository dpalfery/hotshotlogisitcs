import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TrackShipment() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Shipment</Text>
      <Text>Shipment ID/Details: [Placeholder]</Text>
      <Text>Status: In Transit</Text>
      <View style={styles.mapPlaceholder}>
        <Text>Map: [Driver Location Placeholder]</Text>
      </View>
      <Text>ETA: [Time]</Text>
      <View style={styles.buttonRow}>
        <Button title="Contact Driver" onPress={() => {}} />
        <Button title="Support" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  mapPlaceholder: { borderWidth: 1, borderColor: '#999', height: 150, justifyContent: 'center', alignItems: 'center', marginVertical: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});