import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useData } from './dataContext';
import { UNIVERSITIES } from './educations';
import JobCard from './jobCard';

const SEARCH_FIELDS = ['title', 'company', 'location', 'edu', 'type', 'duration', 'desc'];

// et job matcher, hvis hvert ord i søgningen findes i mindst ét af felterne
function matchesQuery(job, words) {
  const haystack = SEARCH_FIELDS.map((field) => job[field] ?? '').join(' ').toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export default function SearchScreen({ navigation }) {
  const { jobs } = useData();
  const [selectedUni, setSelectedUni] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const resetAll = () => {
    setSelectedUni(null);
    setSelectedLine(null);
  };

  const openJob = (job) => navigation.navigate('JobDetail', { jobId: job.id });

  const renderJob = ({ item }) => <JobCard job={item} onPress={() => openJob(item)} />;

  // jobtyper hentes fra de eksisterende opslag, så der kun vises filtre med resultater
  const jobTypes = useMemo(() => [...new Set(jobs.map((job) => job.type).filter(Boolean))], [jobs]);

  if (!selectedUni) {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const isSearching = words.length > 0 || !!selectedType;
    const results = jobs.filter(
      (job) => (!selectedType || job.type === selectedType) && matchesQuery(job, words)
    );

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Søg</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#9AA3B2" />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Stilling, virksomhed, by eller uddannelse"
            placeholderTextColor="#9AA3B2"
            autoCorrect={false}
            returnKeyType="search"
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9AA3B2" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.chipRow}>
          {jobTypes.map((type) => {
            const active = selectedType === type;
            return (
              <TouchableOpacity
                key={type}
                style={active ? styles.chipActive : styles.chip}
                onPress={() => setSelectedType(active ? null : type)}
              >
                <Text style={active ? styles.chipTextActive : styles.chipText}>{type}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isSearching ? (
          results.length === 0 ? (
            <Text style={styles.emptyText}>Ingen jobs matcher din søgning.</Text>
          ) : (
            <>
              <Text style={styles.subheading}>
                {results.length} {results.length === 1 ? 'resultat' : 'resultater'}
              </Text>
              <FlatList
                data={results}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderJob}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
              />
            </>
          )
        ) : (
          <>
            <Text style={styles.subheading}>Eller vælg dit universitet</Text>
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
          </>
        )}
      </View>
    );
  }


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

  const filtered = jobs.filter((job) => job.edu === selectedLine);

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
          renderItem={renderJob}
        />
      )}
    </View>
  );
}
