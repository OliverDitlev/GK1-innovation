import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import { useData, ROLES } from './dataContext';

export const ROLE_LABELS = {
  [ROLES.JOBSEEKER]: 'Jobsøgende',
  [ROLES.COMPANY]: 'Virksomhed',
};

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.listRowText}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const { currentUser, logout, resetDatabase } = useData();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setConfirmReset(false);
    await resetDatabase();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.heading}>Profil</Text>

      {currentUser ? (
        <View style={styles.profileCard}>
          <Text style={styles.roleBadge}>{ROLE_LABELS[currentUser.role]}</Text>
          <Text style={styles.detailTitle}>{currentUser.name}</Text>
          <InfoRow label="E-mail" value={currentUser.email} />
          {currentUser.role === ROLES.JOBSEEKER ? (
            <InfoRow
              label="Uddannelse"
              value={[currentUser.university, currentUser.education].filter(Boolean).join(' · ')}
            />
          ) : (
            <InfoRow label="Lokation" value={currentUser.location} />
          )}
          <InfoRow label="Om" value={currentUser.about} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.buttonText}>Rediger profil</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.emptyText}>Ingen bruger valgt.</Text>
      )}

      <TouchableOpacity style={styles.secondaryButton} onPress={logout}>
        <Text style={styles.secondaryButtonText}>Log ud</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
        <Text style={styles.secondaryButtonText}>
          {confirmReset ? 'Tryk igen for at nulstille alt' : 'Nulstil database'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
