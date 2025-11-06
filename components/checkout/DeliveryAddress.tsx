import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DeliveryAddressProps {
  address: string;
  city: string;
  zipCode: string;
  mapImage?: any;
  onChangeAddress: () => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
  address,
  city,
  zipCode,
  mapImage,
  onChangeAddress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>
      
      {/* Map Preview */}
      {mapImage && (
        <View style={styles.mapContainer}>
          <Image 
            source={mapImage} 
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>
      )}
      
      {/* Address Card */}
      <View style={styles.addressCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={24} color="#FF6B35" />
        </View>
        
        <View style={styles.addressInfo}>
          <Text style={styles.addressText} numberOfLines={1}>
            {address}
          </Text>
          <Text style={styles.cityText}>
            {city} {zipCode}
          </Text>
        </View>
        
        <TouchableOpacity 
          onPress={onChangeAddress}
          style={styles.changeButton}
          activeOpacity={0.7}
        >
          <Text style={styles.changeButtonText}>Change</Text>
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
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
    marginRight: 12,
  },
  addressText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cityText: {
    fontSize: 14,
    color: '#6B7280',
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  changeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B35',
  },
});

export default DeliveryAddress;