import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatar?: ImageSourcePropType;
  onEditProfile: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  avatar,
  onEditProfile,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={avatar} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={60} color="#9CA3AF" />
          </View>
        )}
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEditProfile}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={16} color="#111827" />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F4D4B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
    color: '#6B7280',
  },
});

export default ProfileHeader;