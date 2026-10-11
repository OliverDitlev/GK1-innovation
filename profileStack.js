import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './profilescreen';
import ProfileFormScreen from './profileFormScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={ProfileFormScreen} options={{ title: 'Rediger profil' }} />
    </Stack.Navigator>
  );
}
