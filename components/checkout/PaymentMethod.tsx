import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PaymentMethodProps {
  selectedMethod: 'card' | 'paypal';
  onSelectMethod: (method: 'card' | 'paypal') => void;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (text: string) => void;
  onExpiryDateChange: (text: string) => void;
  onCvvChange: (text: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  onSelectMethod,
  cardNumber,
  expiryDate,
  cvv,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      
      {/* Credit Card Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedMethod === 'card' && styles.paymentOptionSelected,
        ]}
        onPress={() => onSelectMethod('card')}
        activeOpacity={0.7}
      >
        <View style={styles.radioContainer}>
          <View style={[
            styles.radio,
            selectedMethod === 'card' && styles.radioSelected,
          ]}>
            {selectedMethod === 'card' && (
              <View style={styles.radioInner} />
            )}
          </View>
          
          <View style={styles.iconTextContainer}>
            <View style={styles.cardIconContainer}>
              <Ionicons name="card" size={20} color="#FF6B35" />
            </View>
            <Text style={styles.paymentMethodText}>Credit Card</Text>
          </View>
        </View>
        
        {selectedMethod === 'card' && (
          <View style={styles.cardInputsContainer}>
            <TextInput
              style={styles.fullInput}
              placeholder="Card Number"
              placeholderTextColor="#9CA3AF"
              value={cardNumber}
              onChangeText={onCardNumberChange}
              keyboardType="number-pad"
              maxLength={19}
            />
            
            <View style={styles.rowInputs}>
              <TextInput
                style={[styles.halfInput, styles.halfInputLeft]}
                placeholder="MM/YY"
                placeholderTextColor="#9CA3AF"
                value={expiryDate}
                onChangeText={onExpiryDateChange}
                keyboardType="number-pad"
                maxLength={5}
              />
              
              <TextInput
                style={styles.halfInput}
                placeholder="CVC"
                placeholderTextColor="#9CA3AF"
                value={cvv}
                onChangeText={onCvvChange}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
      
      {/* PayPal Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedMethod === 'paypal' && styles.paymentOptionSelected,
        ]}
        onPress={() => onSelectMethod('paypal')}
        activeOpacity={0.7}
      >
        <View style={styles.radioContainer}>
          <View style={[
            styles.radio,
            selectedMethod === 'paypal' && styles.radioSelected,
          ]}>
            {selectedMethod === 'paypal' && (
              <View style={styles.radioInner} />
            )}
          </View>
          
          <View style={styles.iconTextContainer}>
            <View style={styles.paypalIconContainer}>
              <Text style={styles.paypalIcon}>P</Text>
            </View>
            <Text style={styles.paymentMethodText}>PayPal</Text>
          </View>
        </View>
      </TouchableOpacity>
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
  paymentOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  paymentOptionSelected: {
    borderColor: '#FF6B35',
  },
  radioContainer: {
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
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#FF6B35',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B35',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paypalIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paypalIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0070BA',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cardInputsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  fullInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#111827',
    marginBottom: 12,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#111827',
  },
  halfInputLeft: {
    marginRight: 0,
  },
});

export default PaymentMethod;
