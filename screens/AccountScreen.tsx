import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileHeader from '../components/myaccount/ProfileHeader';
import MenuItem from '../components/myaccount/MenuItem';
import LogoutButton from '../components/myaccount/LogoutButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Account'>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing screen will open here');
  };

  const handleMyOrders = () => {
    Alert.alert('My Orders', 'Orders screen will open here');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Payment methods screen will open here');
  };

  const handleDeliveryAddresses = () => {
    Alert.alert('Delivery Addresses', 'Addresses screen will open here');
  };

  const handleProfileSettings = () => {
    Alert.alert('Profile Settings', 'Settings screen will open here');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => console.log('Logged out'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
        <View style={styles.backButton} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <ProfileHeader
          name="Alex Johnson"
          email="alex.johnson@example.com"
          onEditProfile={handleEditProfile}
        />

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="receipt-outline"
            iconColor="#EF4444"
            iconBgColor="#FEE2E2"
            title="My Orders"
            onPress={handleMyOrders}
          />

          <MenuItem
            icon="card-outline"
            iconColor="#EF4444"
            iconBgColor="#FEE2E2"
            title="Payment Methods"
            onPress={handlePaymentMethods}
          />

          <MenuItem
            icon="home-outline"
            iconColor="#EF4444"
            iconBgColor="#FEE2E2"
            title="Delivery Addresses"
            onPress={handleDeliveryAddresses}
          />

          <MenuItem
            icon="settings-outline"
            iconColor="#EF4444"
            iconBgColor="#FEE2E2"
            title="Profile Settings"
            onPress={handleProfileSettings}
          />
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <LogoutButton onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutContainer: {
    paddingHorizontal: 20,
  },
});

export default AccountScreen;