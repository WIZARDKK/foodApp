import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  price?: number;
}

const RadioOption: React.FC<RadioOptionProps> = ({ 
  label, 
  selected, 
  onSelect, 
  price 
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          {price !== undefined && price > 0 && (
            <Text style={styles.price}>+${price.toFixed(2)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  containerSelected: {
    borderColor: '#EF4444',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  radioSelected: {
    borderColor: '#EF4444',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  price: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default RadioOption;