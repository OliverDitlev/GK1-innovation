import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useData, useSaved, ROLES } from './dataContext';
import { formatPosted } from './formatPosted';

export default function JobCard({ job, onPress }) {
  const { currentUser } = useData();
  const { savedIds, toggleSave } = useSaved();
  const saved = savedIds.has(job.id);
  const canSave = currentUser?.role === ROLES.JOBSEEKER;

  return (
    <TouchableOpacity style={styles.jobCard} onPress={onPress} disabled={!onPress} activeOpacity={onPress ? 0.7 : 1}>
      {job.image ? (
        <Image source={{ uri: job.image }} style={styles.jobImage} />
      ) : (
        <View style={[styles.jobImage, styles.imagePlaceholder]}>
          <Ionicons name="briefcase-outline" size={28} color="#9AA3B2" />
        </View>
      )}
      <View style={styles.jobInfo}>
        <View style={styles.jobHeaderRow}>
          <Text style={styles.jobCompany}>{job.company}</Text>
          {canSave && (
            <TouchableOpacity onPress={() => toggleSave(job.id)}>
              <Text style={saved ? styles.heartActive : styles.heartInactive}>♥</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobMeta}>{job.edu} · {job.location}</Text>
        <Text style={styles.jobDesc} numberOfLines={2}>{job.desc}</Text>
        <Text style={styles.jobFooter}>{job.type} · {job.duration} · {formatPosted(job.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}
