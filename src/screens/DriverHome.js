import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const ROUTES = [
  { id: '1', origin: 'Warehouse A', destination: 'Customer X', status: 'Ready' },
  { id: '2', origin: 'Depot B', destination: 'Customer Y', status: 'In Progress' },
  { id: '3', origin: 'Hub C', destination: 'Customer Z', status: 'Delivered' },
];

export default function DriverHome() {
  const renderItem = ({ item }) => (
    <View style={styles.routeItem}>
      <Text style={styles.routeText}>
        {item.origin} ➔ {item.destination}
      </Text>
      <Text>Status: {item.status}</Text>
      <Button title="View" onPress={() => {}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Routes</Text>
      <FlatList
        data={ROUTES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  routeItem: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  routeText: { fontWeight: 'bold', marginBottom: 5 },

});
