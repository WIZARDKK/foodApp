import React, { useEffect, useState } from 'react';
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
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import CartItem from '../components/CartItem';
import PromoCodeInput from '../components/PromoCodeInput';
import OrderSummary from '../components/OrderSummary';
import CheckoutButton from '../components/CheckoutButton';
import EmptyCart from '../components/EmptyCart';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Cart'>;
}

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
  image?: any;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: '1',
      name: 'Classic Cheeseburger',
      price: 12.50,
      quantity: 1,
      customization: 'Extra cheese, No onions',
    },
    {
      id: '2',
      name: 'Side of Fries',
      price: 4.00,
      quantity: 1,
      customization: 'Large',
      image: { uri: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200' },
    },
    {
      id: '3',
      name: 'Vanilla Milkshake',
      price: 6.00,
      quantity: 1,
      customization: 'Whipped Cream',
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleIncrease = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    setCartItems(items => {
      const item = items.find(i => i.id === id);
      if (item && item.quantity === 1) {
        // Remove item if quantity becomes 0
        return items.filter(i => i.id !== id);
      }
      return items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleApplyPromoCode = (code: string) => {
    // Simulate promo code validation
    if (code.toUpperCase() === 'SAVE10') {
      const subtotal = calculateSubtotal();
      setDiscount(subtotal * 0.1); // 10% discount
      Alert.alert('Success', 'Promo code applied! You saved 10%');
    } else {
      Alert.alert('Invalid Code', 'This promo code is not valid.');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const taxes = subtotal * 0.125; // 12.5% tax
  const deliveryFee = 5.0;
  const total = subtotal + taxes + deliveryFee - discount;

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // If navigated with a new order, merge it into cartItems
  useEffect(() => {
    const newOrder = route?.params?.newOrder;
    if (newOrder) {
      setCartItems(items => {
        // If item with same id exists, increase quantity
        const existing = items.find(i => i.id === newOrder.id);
        if (existing) {
          return items.map(i =>
            i.id === newOrder.id ? { ...i, quantity: i.quantity + newOrder.quantity } : i
          );
        }
        return [{ ...newOrder }, ...items];
      });
    }
  }, [route?.params?.newOrder]);

  const handleBrowseMenu = () => {
    navigation.navigate('Home');
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <View style={styles.backButton} />
        </View>

        <EmptyCart onBrowseMenu={handleBrowseMenu} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.backButton} />
      </View>

      {/* Cart Items */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.itemsSection}>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              {...item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <PromoCodeInput onApply={handleApplyPromoCode} />
        </View>

        {/* Order Summary */}
        <OrderSummary
          subtotal={subtotal}
          taxes={taxes}
          deliveryFee={deliveryFee}
          discount={discount}
        />
      </ScrollView>

      {/* Checkout Button */}
      <CheckoutButton
        total={total}
        onPress={handleCheckout}
        loading={loading}
        disabled={cartItems.length === 0}
      />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  itemsSection: {
    marginBottom: 8,
  },
  promoSection: {
    marginBottom: 24,
  },
});

export default CartScreen;