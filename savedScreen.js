import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import JobCard from './jobCard';
import { useData, useSaved } from './dataContext';

export default function SavedScreen() {
  const { jobs } = useData();
  const { savedIds } = useSaved();
  const saved = jobs.filter((job) => savedIds.has(job.id));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gemte opslag</Text>
      {saved.length === 0 ? (
        <Text style={styles.emptyText}>Du har ikke gemt nogen opslag endnu.</Text>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <JobCard job={item} />}
        />
      )}
    </View>
  );
}
