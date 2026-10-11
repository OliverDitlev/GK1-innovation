import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { useData } from './dataContext';
import { formatPosted } from './formatPosted';

export default function JobDetailScreen({ route }) {
  const { jobs } = useData();
  const job = jobs.find((j) => j.id === route.params.jobId);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Opslaget findes ikke længere.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!!job.image && <Image source={{ uri: job.image }} style={styles.detailImage} />}
      <Text style={styles.detailCompany}>{job.company}</Text>
      <Text style={styles.detailTitle}>{job.title}</Text>
      <Text style={styles.detailText}>{job.edu} · {job.location}</Text>
      <Text style={styles.detailText}>{job.type} · {job.duration}</Text>
      <Text style={[styles.detailText, { marginTop: 16 }]}>{job.desc}</Text>
      <Text style={styles.jobFooter}>{formatPosted(job.createdAt)}</Text>
    </View>
  );
}
