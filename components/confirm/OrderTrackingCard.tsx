import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface OrderTrackingCardProps {
  estimatedTime: string;
  orderId: string;
  notificationMessage: string;
  image?: ImageSourcePropType;
}

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({
  estimatedTime,
  orderId,
  notificationMessage,
  image,
}) => {
  return (
    <View style={styles.container}>
      {/* Image Placeholder */}
      {image ? (
        <Image source={image} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>300 × 300</Text>
        </View>
      )}
      
      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.estimatedTime}>{estimatedTime}</Text>
        <Text style={styles.orderId}>Order ID: {orderId}</Text>
        <Text style={styles.notification}>{notificationMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  placeholderText: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  infoSection: {
    padding: 20,
  },
  estimatedTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  notification: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export default OrderTrackingCard;