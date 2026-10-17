import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './loginScreen';
import ProfileFormScreen from './profileFormScreen';

const Stack = createNativeStackNavigator();
// AuthStack håndterer navigationen mellem login og oprettelse af bruger
export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Signup"
        component={ProfileFormScreen}
        initialParams={{ mode: 'create' }}
        options={{ title: 'Opret bruger' }}
      />
    </Stack.Navigator>
  );
}
