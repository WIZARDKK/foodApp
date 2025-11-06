import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface ButtonProps {
  icon?: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  icon, 
  label, 
  variant = 'secondary', 
  onPress,
  active = false 
}) => {
  const isPrimary = variant === 'primary' || active;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isPrimary ? styles.primaryButton : styles.secondaryButton]}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  primaryButton: {
    backgroundColor: '#EF4444',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  primaryLabel: {
    color: '#FFFFFF',
  },
  secondaryLabel: {
    color: '#1F2937',
  },
});

export default Button;