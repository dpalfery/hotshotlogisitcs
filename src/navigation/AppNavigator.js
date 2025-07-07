import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerHome from '../screens/CustomerHome';
import CreateShipment from '../screens/CreateShipment';
import TrackShipment from '../screens/TrackShipment';
import DriverHome from '../screens/DriverHome';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="CustomerHome">
      <Stack.Screen
        name="CustomerHome"
        component={CustomerHome}
        options={{ title: 'Hot Shot Logistics' }}
      />
      <Stack.Screen
        name="CreateShipment"
        component={CreateShipment}
        options={{ title: 'Create Shipment' }}
      />
      <Stack.Screen
        name="TrackShipment"
        component={TrackShipment}
        options={{ title: 'Track Shipment' }}
      />
      <Stack.Screen
        name="DriverHome"
        component={DriverHome}
        options={{ title: 'Driver Home' }}
      />
    </Stack.Navigator>
  );
}
