import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { JOBS } from './jobs';
import JobCard from './jobCard';

// navigation kommer automatisk fra Stack.Navigator (se homestack.js)
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Jobify</Text>
      <FlatList
        data={JOBS}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate('JobDetail', { job: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
