import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { useData, ROLES } from './dataContext';
import EducationPicker, { Chip } from './educationPicker';
import { ROLE_LABELS } from './profilescreen';

const EMPTY = { name: '', email: '', about: '', university: '', education: '', location: '', password: '', passwordRepeat: '' };

// Bruges både til "Opret ny bruger" (mode = 'create', fra login) og "Rediger profil".
export default function ProfileFormScreen({ navigation, route }) {
  const isCreate = route.params?.mode === 'create';
  const { currentUser, createUser, updateCurrentUser } = useData();

  const [role, setRole] = useState(isCreate ? ROLES.JOBSEEKER : currentUser.role);
  const [form, setForm] = useState(isCreate ? EMPTY : { ...EMPTY, ...currentUser });
  const [error, setError] = useState('');

  const set = (changes) => setForm((prev) => ({ ...prev, ...changes }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError(role === ROLES.COMPANY ? 'Skriv virksomhedens navn.' : 'Skriv dit navn.');
      return;
    }
    if (!form.email.trim()) {
      setError('Skriv en e-mail.');
      return;
    }
    if (isCreate && form.password !== form.passwordRepeat) {
      setError('De to adgangskoder er ikke ens.');
      return;
    }
    const common = { name: form.name.trim(), email: form.email.trim(), about: form.about.trim() };
    const data =
      role === ROLES.JOBSEEKER
        ? { ...common, university: form.university, education: form.education }
        : { ...common, location: form.location.trim() };

    try {
      if (isCreate) {
        // Brugeren logges ind, og App skifter selv til fanerne.
        await createUser({ role, password: form.password, ...data });
      } else {
        await updateCurrentUser(data);
        navigation.goBack();
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ScrollView style={styles.formContainer} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      {isCreate && (
        <>
          <Text style={styles.label}>Brugertype</Text>
          <View style={styles.chipRow}>
            {Object.values(ROLES).map((r) => (
              <Chip key={r} label={ROLE_LABELS[r]} active={r === role} onPress={() => setRole(r)} />
            ))}
          </View>
        </>
      )}

      <Text style={styles.label}>{role === ROLES.COMPANY ? 'Virksomhedsnavn *' : 'Navn *'}</Text>
      <TextInput style={styles.input} value={form.name} onChangeText={(name) => set({ name })} />

      <Text style={styles.label}>E-mail *</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(email) => set({ email })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {isCreate && (
        <>
          <Text style={styles.label}>Adgangskode * (mindst 6 tegn)</Text>
          <TextInput
            style={styles.input}
            value={form.password}
            onChangeText={(password) => set({ password })}
            secureTextEntry
            textContentType="newPassword"
          />
          <Text style={styles.label}>Gentag adgangskode *</Text>
          <TextInput
            style={styles.input}
            value={form.passwordRepeat}
            onChangeText={(passwordRepeat) => set({ passwordRepeat })}
            secureTextEntry
            textContentType="newPassword"
          />
        </>
      )}

      {role === ROLES.JOBSEEKER ? (
        <>
          <Text style={styles.label}>Uddannelse</Text>
          <EducationPicker university={form.university} education={form.education} onChange={set} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Lokation</Text>
          <TextInput style={styles.input} value={form.location} onChangeText={(location) => set({ location })} />
        </>
      )}

      <Text style={styles.label}>Om {role === ROLES.COMPANY ? 'virksomheden' : 'dig'}</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        value={form.about}
        onChangeText={(about) => set({ about })}
        multiline
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{isCreate ? 'Opret bruger' : 'Gem'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
