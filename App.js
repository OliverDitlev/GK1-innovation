import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SavedProvider } from './savedContext';
import HomeStack from './homestack';
import SavedScreen from './savedScreen';
import SearchScreen from './searchscreen';
import ProfileScreen from './profilescreen';

const Tab = createBottomTabNavigator();

// Ikonnavne matcher Ionicons-biblioteket. Se alle muligheder på icons.expo.fyi
const ICONS = {
  Hjem: 'home',
  Gemte: 'heart',
  Søg: 'search',
  Profil: 'person',
};

export default function App() {
  return (
    <SavedProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#1B3A6B',
            tabBarInactiveTintColor: '#9AA3B2',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Tab.Screen name="Hjem" component={HomeStack} />
          <Tab.Screen name="Gemte" component={SavedScreen} />
          <Tab.Screen name="Søg" component={SearchScreen} />
          <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SavedProvider>
  );
}