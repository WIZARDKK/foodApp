import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: ImageSourcePropType;
}

interface OrderSummaryCheckoutProps {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
}

const OrderSummaryCheckout: React.FC<OrderSummaryCheckoutProps> = ({
  items,
  subtotal,
  deliveryFee,
}) => {
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>
      
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            {item.image && (
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
              </View>
            )}
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}×</Text>
            </View>
            
            <Text style={styles.itemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.divider} />
      
      {/* Totals */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Subtotal</Text>
        <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Delivery Fee</Text>
        <Text style={styles.totalValue}>${deliveryFee.toFixed(2)}</Text>
      </View>
      
      <View style={[styles.totalRow, styles.finalTotal]}>
        <Text style={styles.finalTotalLabel}>Total</Text>
        <Text style={styles.finalTotalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  itemsContainer: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 13,
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 15,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  finalTotal: {
    marginTop: 8,
    marginBottom: 0,
  },
  finalTotalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
});

export default OrderSummaryCheckout;