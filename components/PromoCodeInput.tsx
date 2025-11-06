import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface PromoCodeInputProps {
  onApply: (code: string) => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ onApply }) => {
  const [promoCode, setPromoCode] = useState('');

  const handleApply = () => {
    if (promoCode.trim()) {
      onApply(promoCode.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promo Code</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter promo code"
          placeholderTextColor="#9CA3AF"
          value={promoCode}
          onChangeText={setPromoCode}
          autoCapitalize="characters"
        />
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.8}
        >
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  applyButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});

export default PromoCodeInput;
