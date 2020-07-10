import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Donaciones from './Donaciones';

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Tienda') {
            iconName = focused
              ? 'ios-cart'
              : 'ios-cart';
          } else if (route.name === 'Software') {
            iconName = focused ? 'ios-rocket' : 'ios-rocket';
          } else if (route.name === 'Apps') {
            iconName = focused ? 'ios-phone-portrait' : 'ios-phone-portrait';
          } else if (route.name === 'Webs') {
            iconName = focused ? 'ios-desktop' : 'ios-desktop';
          } 

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#038cdf',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Donaciones" component={ Donaciones } name="Donaciones" />
      </Tab.Navigator>
  );
}

export default Index;