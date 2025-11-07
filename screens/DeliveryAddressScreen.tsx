import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from '../components/address/MapView';
import AddressInput from '../components/address/AddressInput';
import AddressTypeSelector from '../components/address/AddressTypeSelector';
import ConfirmAddressButton from '../components/address/ConfirmAddressButton';

type AddressType = 'Home' | 'Work' | 'Other';

type DeliveryAddressScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DeliveryAddress'>;

interface DeliveryAddressScreenProps {
  navigation: DeliveryAddressScreenNavigationProp;
}

const DeliveryAddressScreen: React.FC<DeliveryAddressScreenProps> = ({ navigation }) => {
  // Form state
  const [streetAddress, setStreetAddress] = useState('123 Main Street');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('Metropolis');
  const [zipCode, setZipCode] = useState('12345');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [addressType, setAddressType] = useState<AddressType>('Home');
  const [loading, setLoading] = useState(false);

  const handleUseCurrentLocation = () => {
    Alert.alert(
      'Use Current Location',
      'This will use your GPS to get your current address.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Allow',
          onPress: () => {
            // Simulate getting location
            Alert.alert('Success', 'Location updated successfully');
          },
        },
      ]
    );
  };

  const handleConfirm = () => {
    // Validate required fields
    if (!streetAddress || !city || !zipCode) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate back to Checkout and pass the updated address
      navigation.navigate('Checkout', {
        address: {
          street: streetAddress,
          city: city,
          zipCode: zipCode,
        },
      });
    }, 1500);
  };

  const handleBack = () => {
    // Navigate back to Checkout and pass current (possibly edited) address so Checkout can update
    navigation.navigate('Checkout', {
      address: {
        street: streetAddress,
        city: city,
        zipCode: zipCode,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Map View */}
          <MapView onUseCurrentLocation={handleUseCurrentLocation} />

          {/* Address Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address Details</Text>

            <AddressInput
              label="Street Address"
              value={streetAddress}
              onChangeText={setStreetAddress}
              placeholder="123 Main Street"
              required
            />

            <AddressInput
              label="Apartment, Suite, etc."
              value={apartment}
              onChangeText={setApartment}
              placeholder="e.g. Apt #4B"
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <AddressInput
                  label="City"
                  value={city}
                  onChangeText={setCity}
                  placeholder="Metropolis"
                  required
                />
              </View>

              <View style={styles.halfWidth}>
                <AddressInput
                  label="ZIP Code"
                  value={zipCode}
                  onChangeText={setZipCode}
                  placeholder="12345"
                  keyboardType="number-pad"
                  required
                />
              </View>
            </View>

            {/* Address Type Selector */}
            <AddressTypeSelector
              selectedType={addressType}
              onSelectType={setAddressType}
            />

            {/* Delivery Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsLabel}>Add delivery instructions</Text>
              <View style={styles.instructionsInputContainer}>
                <Text style={styles.instructionsInput}>
                  {deliveryInstructions || (
                    <Text style={styles.instructionsPlaceholder}>
                      e.g. Leave at the front door
                    </Text>
                  )}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <ConfirmAddressButton
            onPress={handleConfirm}
            loading={loading}
            disabled={!streetAddress || !city || !zipCode || loading}
          />
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
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
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  instructionsContainer: {
    marginBottom: 24,
  },
  instructionsLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  instructionsInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  instructionsInput: {
    fontSize: 16,
    color: '#111827',
  },
  instructionsPlaceholder: {
    color: '#9CA3AF',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
});

export default DeliveryAddressScreen;