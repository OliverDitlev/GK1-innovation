import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useData } from './dataContext';
import { UNIVERSITIES } from './educations';
import JobCard from './jobCard';

export default function SearchScreen() {
  const { jobs } = useData();
  const [selectedUni, setSelectedUni] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [query, setQuery] = useState('');

  const resetAll = () => {
    setSelectedUni(null);
    setSelectedLine(null);
  };


  if (!selectedUni) {
    const trimmedQuery = query.trim().toLowerCase();
    const results = jobs.filter((job) => job.title.toLowerCase().includes(trimmedQuery));

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Søg</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#9AA3B2" />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Søg efter stilling"
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

        {trimmedQuery ? (
          results.length === 0 ? (
            <Text style={styles.emptyText}>Ingen stillinger matcher "{query.trim()}".</Text>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => <JobCard job={item} />}
              keyboardShouldPersistTaps="handled"
            />
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
          renderItem={({ item }) => <JobCard job={item} />}
        />
      )}
    </View>
  );
}