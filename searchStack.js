import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './searchscreen';
import JobDetailScreen from './jobDetailScreen';

const Stack = createNativeStackNavigator();
// SearchStack gør det muligt at åbne et jobopslag direkte fra søgeresultaterne
export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchMain" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Jobopslag' }} />
    </Stack.Navigator>
  );
}
