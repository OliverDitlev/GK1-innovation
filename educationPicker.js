import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { UNIVERSITIES } from './educations';

function Chip({ label, active, onPress }) {
  return (
    <TouchableOpacity style={active ? styles.chipActive : styles.chip} onPress={onPress}>
      <Text style={active ? styles.chipTextActive : styles.chipText}>{label}</Text>
    </TouchableOpacity>
  );
}

// Vælg universitet og derefter linje. onChange får { university, education }.
export default function EducationPicker({ university, education, onChange }) {
  const uni = UNIVERSITIES.find((u) => u.name === university);

  return (
    <View>
      <View style={styles.chipRow}>
        {UNIVERSITIES.map((u) => (
          <Chip
            key={u.id}
            label={u.name}
            active={u.name === university}
            onPress={() => onChange({ university: u.name, education: '' })}
          />
        ))}
      </View>
      {uni && (
        <View style={styles.chipRow}>
          {uni.lines.map((line) => (
            <Chip
              key={line}
              label={line}
              active={line === education}
              onPress={() => onChange({ university: uni.name, education: line })}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export { Chip };
