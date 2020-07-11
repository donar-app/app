import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Inicio from './src/views/inicio/Index';
import Login from './src/views/auth/Login';
import Registro from './src/views/auth/Registro';
import Dashboard from './src/views/dashboard/Index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Registro" component={Registro} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}