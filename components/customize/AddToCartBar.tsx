import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AddToCartBarProps {
  total: number;
  onAddToCart: () => void;
}

const AddToCartBar: React.FC<AddToCartBarProps> = ({ total, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  button: {
    flex: 2,
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default AddToCartBar;