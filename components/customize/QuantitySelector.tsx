import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  const canDecrease = quantity > min;
  const canIncrease = quantity < max;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantity</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, !canDecrease && styles.buttonDisabled]}
          onPress={onDecrease}
          disabled={!canDecrease}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="remove" 
            size={20} 
            color={canDecrease ? '#EF4444' : '#D1D5DB'} 
          />
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantity}</Text>

        <TouchableOpacity
          style={[styles.button, !canIncrease && styles.buttonDisabled]}
          onPress={onIncrease}
          disabled={!canIncrease}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="add" 
            size={20} 
            color={canIncrease ? '#EF4444' : '#D1D5DB'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  quantity: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    minWidth: 30,
    textAlign: 'center',
  },
});

export default QuantitySelector;