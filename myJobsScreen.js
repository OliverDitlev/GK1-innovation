import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useData } from './dataContext';
import JobCard from './jobCard';
// viser en liste over alle jobopslag som den nuværende bruger har oprettet
export default function MyJobsScreen({ navigation }) {
  const { jobs, currentUser } = useData();
  const myJobs = jobs.filter((job) => job.companyId === currentUser?.id);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mine opslag</Text>
      <TouchableOpacity style={[styles.button, { marginTop: 0, marginBottom: 12 }]} onPress={() => navigation.navigate('JobForm')}>
        <Text style={styles.buttonText}>+ Opret nyt opslag</Text>
      </TouchableOpacity>
      {myJobs.length === 0 ? (
        <Text style={styles.emptyText}>Du har ikke oprettet nogen opslag endnu.</Text>
      ) : (
        <FlatList
          data={myJobs}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <JobCard job={item} onPress={() => navigation.navigate('JobForm', { jobId: item.id })} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
