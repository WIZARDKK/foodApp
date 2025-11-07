import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import DeliveryAddressScreen from '../screens/DeliveryAddressScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';

export type RootStackParamList = {
  Home: undefined;
  Cart: { newOrder?: { id: string; name: string; price: number; quantity: number; customization?: string; image?: any } } | undefined;
  Account: undefined;
  // Checkout can receive an optional address object when navigating back from DeliveryAddressScreen
  Checkout: { address?: { street: string; city: string; zipCode: string } } | undefined;
  DeliveryAddress: undefined;
  CustomizeBowl: undefined;
  OrderConfirmation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // We'll use custom headers in each screen
      }}
    >
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
  <Stack.Screen name="CustomizeBowl" component={require('../screens/CustomizeBowlScreen').default} />
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;