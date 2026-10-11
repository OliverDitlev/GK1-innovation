import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyJobsScreen from './myJobsScreen';
import JobFormScreen from './jobFormScreen';

const Stack = createNativeStackNavigator();

export default function MyJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyJobsList" component={MyJobsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="JobForm"
        component={JobFormScreen}
        options={({ route }) => ({ title: route.params?.jobId ? 'Rediger opslag' : 'Nyt opslag' })}
      />
    </Stack.Navigator>
  );
}
