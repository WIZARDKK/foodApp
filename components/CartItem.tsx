import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
  image?: ImageSourcePropType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  customization,
  image,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View style={styles.container}>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>
      )}
      
      <View style={styles.contentContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {customization && (
            <Text style={styles.customization}>{customization}</Text>
          )}
        </View>
        
        <View style={styles.quantitySection}>
          <TouchableOpacity
            onPress={() => onDecrease(id)}
            style={styles.quantityButton}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={18} color="#1F2937" />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{quantity}</Text>
          
          <TouchableOpacity
            onPress={() => onIncrease(id)}
            style={styles.quantityButton}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={18} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  customization: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    minWidth: 20,
    textAlign: 'center',
  },
});

export default CartItem;