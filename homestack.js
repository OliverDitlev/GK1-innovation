import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homescreen';
import JobDetailScreen from './jobDetailScreen';

// Stack Navigator indlejret i Hjem-fanen: Tab -> Stack -> (Jobliste, Jobdetalje)
// Matcher kursets egen metode fra 02_navigation-vejledningen (Tab der indeholder en Stack).
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Jobliste" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Jobopslag' }} />
    </Stack.Navigator>
  );
}
