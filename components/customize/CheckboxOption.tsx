import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  price?: number;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ 
  label, 
  checked, 
  onToggle, 
  price 
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.containerChecked]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
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
  containerChecked: {
    borderColor: '#EF4444',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    borderColor: '#EF4444',
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

export default CheckboxOption;