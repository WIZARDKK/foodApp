import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import SuccessIcon from '../components/confirm/SuccessIcon';
import OrderTrackingCard from '../components/confirm/OrderTrackingCard';
import OrderSummaryExpandable from '../components/confirm/OrderSummaryExpandable';
import InfoSection from '../components/confirm/InfoSection';
import ActionButtons from '../components/confirm/ActionButtons';
import TrackOrderButton from '../components/confirm/TrackOrderButton';

type OrderConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderConfirmation'>;

interface OrderConfirmationScreenProps {
  navigation: OrderConfirmationScreenNavigationProp;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({ navigation }) => {
  // Order data
  const orderId = '#A582D9B1';
  const estimatedTime = 'Arriving in 25-35 minutes';
  const deliveryAddress = '123 Market St, San Francisco, CA 94103';
  const paymentMethod = 'Paid with Visa ending in •••• 1234';
  const total = 45.50;

  const orderItems: OrderItem[] = [
    { id: '1', name: 'Pepperoni Pizza', price: 12.99, quantity: 1 },
    { id: '2', name: 'Margherita Pizza', price: 11.99, quantity: 1 },
    { id: '3', name: 'Coca-Cola', price: 1.50, quantity: 2 },
  ];

  const handleClose = () => {
    // Navigate back to home screen
    navigation.navigate('Home');
  };

  const handleViewReceipt = () => {
    Alert.alert('View Receipt', 'Receipt screen will open here');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support screen will open here');
  };

  const handleTrackOrder = () => {
    Alert.alert('Track Order', 'Order tracking screen will open here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
        <View style={styles.closeButton} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Icon */}
        <SuccessIcon />

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.thankYouText}>Thanks for your order!</Text>
          <Text style={styles.descriptionText}>
            Your order is being prepared and will be delivered soon.
          </Text>
        </View>

        {/* Order Tracking Card */}
        <View style={styles.cardContainer}>
          <OrderTrackingCard
            estimatedTime={estimatedTime}
            orderId={orderId}
            notificationMessage="We'll notify you when it's on its way."
          />
        </View>

        {/* Order Summary Expandable */}
        <OrderSummaryExpandable items={orderItems} total={total} />

        {/* Delivery Address */}
        <View style={styles.infoContainer}>
          <InfoSection
            title="Delivery Address"
            content={deliveryAddress}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.infoContainer}>
          <InfoSection
            title="Payment Method"
            content={paymentMethod}
          />
        </View>

        {/* Action Buttons */}
        <ActionButtons
          onViewReceipt={handleViewReceipt}
          onContactSupport={handleContactSupport}
        />
      </ScrollView>

      {/* Track Order Button */}
      <View style={styles.buttonContainer}>
        <TrackOrderButton onPress={handleTrackOrder} />
      </View>
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
  closeButton: {
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
    padding: 20,
    paddingTop: 8,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  thankYouText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
});

export default OrderConfirmationScreen;