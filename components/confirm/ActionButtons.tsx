import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionButtonsProps {
  onViewReceipt: () => void;
  onContactSupport: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onViewReceipt,
  onContactSupport,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onViewReceipt}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>View Receipt</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={onContactSupport}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});

export default ActionButtons;