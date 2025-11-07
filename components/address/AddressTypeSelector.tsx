import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type AddressType = 'Home' | 'Work' | 'Other';

interface AddressTypeSelectorProps {
  selectedType: AddressType;
  onSelectType: (type: AddressType) => void;
}

const AddressTypeSelector: React.FC<AddressTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const types: AddressType[] = ['Home', 'Work', 'Other'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Save as:</Text>
      <View style={styles.optionsContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.option,
              selectedType === type && styles.optionSelected,
            ]}
            onPress={() => onSelectType(type)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selectedType === type && styles.optionTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: '#EF4444',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
});

export default AddressTypeSelector;