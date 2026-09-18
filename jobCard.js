import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useSaved } from './savedContext';

// onPress er valgfri: HomeScreen sender den (navigerer til jobdetalje),
// SavedScreen/SearchScreen sender den ikke (kortet er så kun til at gemme/vise, ikke navigere)
export default function JobCard({ job, onPress }) {
  const { savedIds, toggleSave } = useSaved();
  const saved = savedIds.has(job.id);

  return (
    <TouchableOpacity style={styles.jobCard} onPress={onPress} disabled={!onPress} activeOpacity={onPress ? 0.7 : 1}>
      <Image source={{ uri: job.image }} style={styles.jobImage} />
      <View style={styles.jobInfo}>
        <View style={styles.jobHeaderRow}>
          <Text style={styles.jobCompany}>{job.company}</Text>
          <TouchableOpacity onPress={() => toggleSave(job.id)}>
            <Text style={saved ? styles.heartActive : styles.heartInactive}>♥</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobMeta}>{job.edu} · {job.location}</Text>
        <Text style={styles.jobDesc} numberOfLines={2}>{job.desc}</Text>
        <Text style={styles.jobFooter}>{job.type} · {job.duration} · {job.posted}</Text>
      </View>
    </TouchableOpacity>
  );
}
