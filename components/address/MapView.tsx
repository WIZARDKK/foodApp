import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MapViewProps {
  mapImage?: ImageSourcePropType;
  onUseCurrentLocation: () => void;
}

const MapView: React.FC<MapViewProps> = ({ mapImage, onUseCurrentLocation }) => {
  return (
    <View style={styles.container}>
      {/* Map Image or Placeholder */}
      {mapImage ? (
        <Image source={mapImage} style={styles.map} resizeMode="cover" />
      ) : (
        <View style={styles.mapPlaceholder}>
          <Ionicons name="location" size={48} color="#EF4444" />
          <Text style={styles.placeholderText}>300 × 300</Text>
        </View>
      )}

      {/* Use Current Location Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={onUseCurrentLocation}
        activeOpacity={0.9}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="locate" size={20} color="#EF4444" />
        </View>
        <Text style={styles.buttonText}>Use Current Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  placeholderText: {
    fontSize: 20,
    color: '#9CA3AF',
    marginTop: 8,
  },
  locationButton: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -100 }],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});

export default MapView;