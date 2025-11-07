import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import DeliveryAddress from '../components/checkout/DeliveryAddress';
import DeliveryInstructions from '../components/checkout/DeliveryInstructions';
import OrderSummaryCheckout from '../components/checkout/OrderSummaryCheckout';
import PaymentMethod from '../components/checkout/PaymentMethod';
import PlaceOrderButton from '../components/checkout/PlaceOrderButton';

type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

interface CheckoutScreenProps {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: any;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation, route }) => {
  // Address state (prefill from route params if provided)
  const initialAddress = route?.params?.address ?? {
    street: '2118 Thornridge Cir...',
    city: 'Connecticut',
    zipCode: '35624',
  };
  const [address, setAddress] = useState(initialAddress);

  useEffect(() => {
    if (route?.params?.address) {
      setAddress(route.params.address);
    }
  }, [route?.params?.address]);

  // Order state
  const [orderItems] = useState<OrderItem[]>([
    {
      id: '1',
      name: 'Pepperoni Pizza',
      price: 12.99,
      quantity: 1,
      image: { uri: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200' },
    },
    {
      id: '2',
      name: 'Coca-Cola',
      price: 1.50,
      quantity: 2,
      image: { uri: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200' },
    },
  ]);

  // Delivery instructions
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Payment state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Loading state
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.50;
  const total = subtotal + deliveryFee;

  const handleChangeAddress = () => {
    // Navigate to Delivery Address screen where user can change or add an address
    navigation.navigate('DeliveryAddress');
  };

  const handlePlaceOrder = () => {
    // Validate payment info if card is selected
    if (selectedPaymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv) {
        Alert.alert('Invalid Payment', 'Please fill in all card details');
        return;
      }
    }

    setLoading(true);
    
    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      // Navigate to order confirmation screen
      navigation.navigate('OrderConfirmation');
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setExpiryDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiryDate(cleaned);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.backButton} />
      </View>

      {/* KeyboardAvoidingView wrapper */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.scrollInnerContainer}>
        {/* Delivery Address */}
        <DeliveryAddress
          address={address.street}
          city={address.city}
          zipCode={address.zipCode}
          mapImage={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-118.2437,34.0522,11,0/400x200@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' }}
          onChangeAddress={handleChangeAddress}
        />

        {/* Delivery Instructions */}
        <DeliveryInstructions
          value={deliveryInstructions}
          onChangeText={setDeliveryInstructions}
        />

        {/* Order Summary */}
        <OrderSummaryCheckout
          items={orderItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
        />

        {/* Payment Method */}
        <PaymentMethod
          selectedMethod={selectedPaymentMethod}
          onSelectMethod={setSelectedPaymentMethod}
          cardNumber={cardNumber}
          expiryDate={expiryDate}
          cvv={cvv}
          onCardNumberChange={formatCardNumber}
          onExpiryDateChange={formatExpiryDate}
          onCvvChange={setCvv}
        />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* Place Order Button */}
        <View style={styles.buttonContainer}>
          <PlaceOrderButton
            total={total}
            onPress={handlePlaceOrder}
            loading={loading}
            disabled={loading}
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  scrollInnerContainer: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
});

export default CheckoutScreen;