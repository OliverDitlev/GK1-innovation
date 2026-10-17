import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { useData } from './dataContext';
import EducationPicker, { Chip } from './educationPicker';
// her oprettes og redigeres jobopslag. kan kun tilgås af virksomheder
const JOB_TYPES = ['Praktik', 'Studiejob', 'Fuldtid', 'Deltid'];

export default function JobFormScreen({ navigation, route }) {
  const { jobs, currentUser, createJob, updateJob, deleteJob } = useData();
  const existing = jobs.find((j) => j.id === route.params?.jobId);

  const [form, setForm] = useState({
    title: existing?.title ?? '',
    type: existing?.type ?? JOB_TYPES[0],
    duration: existing?.duration ?? '',
    location: existing?.location ?? currentUser?.location ?? '',
    university: existing?.university ?? '',
    edu: existing?.edu ?? '',
    desc: existing?.desc ?? '',
    image: existing?.image ?? '',
  });
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (changes) => setForm((prev) => ({ ...prev, ...changes }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.desc.trim()) {
      setError('Titel og beskrivelse skal udfyldes.');
      return;
    }
    const data = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()]));
    if (existing) {
      await updateJob(existing.id, data);
    } else {
      await createJob(data);
    }
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteJob(existing.id);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.formContainer} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      <Text style={styles.label}>Titel *</Text>
      <TextInput style={styles.input} value={form.title} onChangeText={(title) => set({ title })} />

      <Text style={styles.label}>Type</Text>
      <View style={styles.chipRow}>
        {JOB_TYPES.map((t) => (
          <Chip key={t} label={t} active={t === form.type} onPress={() => set({ type: t })} />
        ))}
      </View>

      <Text style={styles.label}>Varighed / timer</Text>
      <TextInput
        style={styles.input}
        value={form.duration}
        onChangeText={(duration) => set({ duration })}
        placeholder="fx 6 mdr. eller 15 t/uge"
      />

      <Text style={styles.label}>Lokation</Text>
      <TextInput style={styles.input} value={form.location} onChangeText={(location) => set({ location })} />

      <Text style={styles.label}>Målrettet uddannelse</Text>
      <EducationPicker
        university={form.university}
        education={form.edu}
        onChange={({ university, education }) => set({ university, edu: education })}
      />

      <Text style={styles.label}>Beskrivelse *</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        value={form.desc}
        onChangeText={(desc) => set({ desc })}
        multiline
      />

      <Text style={styles.label}>Billede-URL</Text>
      <TextInput
        style={styles.input}
        value={form.image}
        onChangeText={(image) => set({ image })}
        autoCapitalize="none"
        placeholder="https://..."
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{existing ? 'Gem ændringer' : 'Opret opslag'}</Text>
      </TouchableOpacity>

      {existing && (
        <TouchableOpacity style={styles.secondaryButton} onPress={handleDelete}>
          <Text style={styles.dangerText}>{confirmDelete ? 'Tryk igen for at slette' : 'Slet opslag'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
