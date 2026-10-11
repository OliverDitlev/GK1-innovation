import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './styles';
import { useData } from './dataContext';

export default function LoginScreen({ navigation }) {
  const { login } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Udfyld e-mail og adgangskode.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      await login(email, password);
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.authContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.authLogo}>Jobify</Text>
      <Text style={styles.authSubtitle}>Studiejob og praktik til studerende</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />

      <Text style={styles.label}>Adgangskode</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
        textContentType="password"
        onSubmitEditing={handleLogin}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={busy}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log ind</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.secondaryButtonText}>Opret ny bruger</Text>
      </TouchableOpacity>

      {/* Midlertidigt: demo-brugere fra seedData.js */}
      <Text style={styles.authHint}>
        Demo: demo@jobify.dk (jobsøgende) eller maersk@jobify.dk (virksomhed) — adgangskode demo1234
      </Text>
    </KeyboardAvoidingView>
  );
}
