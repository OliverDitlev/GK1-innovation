import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DataProvider, useData, ROLES } from './dataContext';
import { styles } from './styles';
import HomeStack from './homestack';
import SavedScreen from './savedScreen';
import SearchStack from './searchStack';
import ProfileStack from './profileStack';
import MyJobsStack from './myJobsStack';
import AuthStack from './authStack';

const Tab = createBottomTabNavigator();
// Definerer ikonerne for hver fane
const ICONS = {
  Hjem: 'home',
  Gemte: 'heart',
  Søg: 'search',
  'Mine opslag': 'briefcase',
  Profil: 'person',
};
//her håndtere login satus og mulig navigation baseret på rolle
function AppTabs() {
  const { loading, error, currentUser } = useData();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1B3A6B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Kunne ikke indlæse data: {String(error.message ?? error)}</Text>
      </View>
    );
  }

  if (!currentUser) {
    return <AuthStack />;
  }

  const isCompany = currentUser.role === ROLES.COMPANY;

  return (
    <Tab.Navigator
      key={currentUser.id}
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
      {isCompany ? (
        <Tab.Screen name="Mine opslag" component={MyJobsStack} />
      ) : (
        <Tab.Screen name="Gemte" component={SavedScreen} />
      )}
      <Tab.Screen name="Søg" component={SearchStack} />
      <Tab.Screen name="Profil" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </DataProvider>
  );
}
