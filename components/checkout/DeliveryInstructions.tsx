import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface DeliveryInstructionsProps {
  value: string;
  onChangeText: (text: string) => void;
}

const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Instructions</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="e.g. leave at the front door"
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    padding: 16,
    fontSize: 15,
    color: '#111827',
    minHeight: 100,
  },
});

export default DeliveryInstructions;