import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { JOBS } from './jobs';
import JobCard from './jobCard';

// Stamdata: 5 universiteter med 10 linjer hver. Udskift/tilføj efter behov.
const UNIVERSITIES = [
  {
    id: 'cbs',
    name: 'CBS',
    lines: ['HA(it.)', 'HA almen', 'HA(jur.)', 'Cand.merc.', 'Erhvervsøkonomi-Jura', 'International Business', 'Business Administration and Digitalization', 'Finance and Investments', 'Marketing', 'Supply Chain Management'],
  },
  {
    id: 'dtu',
    name: 'DTU',
    lines: ['Softwareteknologi', 'Design & Innovation', 'Elektroteknologi', 'Bygningsdesign', 'Matematik og Teknologi', 'Kemiteknologi', 'Miljøteknologi', 'Produktion og Konstruktion', 'Global Business Engineering', 'Cybersikkerhed'],
  },
  {
    id: 'ku',
    name: 'KU',
    lines: ['Datalogi', 'Jura', 'Statskundskab', 'Økonomi', 'Medicin', 'Psykologi', 'Biologi', 'Matematik-Økonomi', 'Historie', 'Kommunikation'],
  },
  {
    id: 'au',
    name: 'AU',
    lines: ['Erhvervsøkonomi', 'Statskundskab', 'Datalogi', 'Molekylærbiologi', 'Psykologi', 'Medievidenskab', 'Jura', 'Fysik', 'Nanoscience', 'Uddannelsesvidenskab'],
  },
  {
    id: 'itu',
    name: 'ITU',
    lines: ['Softwareudvikling', 'Digitale Medier og Design', 'Data Science', 'Software Design', 'Global Business Informatics', 'Datalogi-Økonomi', 'Digital Design og Interaktive Teknologier', 'Softwareteknologi', 'Spiludvikling', 'Forretningsudvikling og IT'],
  },
];

export default function SearchScreen() {
  const [selectedUni, setSelectedUni] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);

  const resetAll = () => {
    setSelectedUni(null);
    setSelectedLine(null);
  };

  // Trin 1: vælg universitet
  if (!selectedUni) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Søg</Text>
        <Text style={styles.subheading}>Vælg dit universitet</Text>
        <FlatList
          data={UNIVERSITIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listRow} onPress={() => setSelectedUni(item)}>
              <Text style={styles.listRowText}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9AA3B2" />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // Trin 2: vælg linje
  if (!selectedLine) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.breadcrumbBack} onPress={() => setSelectedUni(null)}>
          <Ionicons name="chevron-back" size={18} color="#1B3A6B" />
          <Text style={styles.breadcrumbBackText}>{selectedUni.name}</Text>
        </TouchableOpacity>
        <Text style={styles.subheading}>Vælg linje</Text>
        <FlatList
          data={selectedUni.lines}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listRow} onPress={() => setSelectedLine(item)}>
              <Text style={styles.listRowText}>{item}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9AA3B2" />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
  
  const filtered = JOBS.filter((job) => job.edu === selectedLine);

  return (
    <View style={styles.container}>
      <View style={styles.breadcrumbRow}>
        <TouchableOpacity onPress={resetAll}>
          <Text style={styles.breadcrumbText}>Søg</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbSep}> · </Text>
        <TouchableOpacity onPress={() => setSelectedLine(null)}>
          <Text style={styles.breadcrumbText}>{selectedUni.name}</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbSep}> · </Text>
        <Text style={styles.breadcrumbCurrent}>{selectedLine}</Text>
      </View>

      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>Ingen jobs fundet for {selectedLine} endnu.</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <JobCard job={item} />}
        />
      )}
    </View>
  );
}