import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

// Modtager det valgte job via route.params, sendt fra HomeScreen ved navigation.navigate()
export default function JobDetailScreen({ route }) {
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: job.image }} style={styles.detailImage} />
      <Text style={styles.detailCompany}>{job.company}</Text>
      <Text style={styles.detailTitle}>{job.title}</Text>
      <Text style={styles.detailText}>{job.edu} · {job.location}</Text>
      <Text style={styles.detailText}>{job.type} · {job.duration}</Text>
      <Text style={[styles.detailText, { marginTop: 16 }]}>{job.desc}</Text>
      <Text style={styles.jobFooter}>{job.posted}</Text>
    </View>
  );
}
