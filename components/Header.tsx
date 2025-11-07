import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  location: string;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ location, onProfilePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={24} color="#EF4444" />
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>Delivering to</Text>
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
        <Ionicons name="person-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 8,
    flex: 1,
  },
  labelText: {
    fontSize: 12,
    color: '#6B7280',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  profileButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;