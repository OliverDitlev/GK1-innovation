import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { useData } from './dataContext';
import JobCard from './jobCard';

export default function HomeScreen({ navigation }) {
  const { jobs } = useData();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Jobify</Text>
      {jobs.length === 0 ? (
        <Text style={styles.emptyText}>Der er ingen jobopslag endnu.</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
