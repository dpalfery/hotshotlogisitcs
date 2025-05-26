import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function CreateShipment() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [details, setDetails] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Shipment</Text>
      <Text>Pickup Address:</Text>
      <TextInput style={styles.input} value={pickup} onChangeText={setPickup} placeholder="Enter pickup address" />
      <Text>Drop-off Address:</Text>
      <TextInput style={styles.input} value={dropoff} onChangeText={setDropoff} placeholder="Enter drop-off address" />
      <Text>Cargo Details:</Text>
      <TextInput style={styles.input} value={details} onChangeText={setDetails} placeholder="Describe the cargo" />
      <Text>Special Notes:</Text>
      <TextInput style={styles.input} value={notes} onChangeText={setNotes} placeholder="Any special notes?" />
      <Button title="Request Quote" onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 15 },
});