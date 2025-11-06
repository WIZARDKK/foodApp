import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CartFooterProps {
  itemCount: number;
  totalPrice: number;
  onViewCart?: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ 
  itemCount, 
  totalPrice, 
  onViewCart 
}) => {
  if (itemCount === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onViewCart}
        style={styles.button}
        activeOpacity={0.8}
      >
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="cart" size={16} color="#EF4444" />
          </View>
          <Text style={styles.itemText}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
        
        <Text style={styles.priceText}>
          View Cart - ${totalPrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EF4444',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  priceText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CartFooter;