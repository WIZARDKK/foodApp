import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import FoodHeroImage from '../components/customize/FoodHeroImage';
import SectionHeader from '../components/customize/SectionHeader';
import RadioOption from '../components/customize/RadioOption';
import CheckboxOption from '../components/customize/CheckboxOption';
import QuantitySelector from '../components/customize/QuantitySelector';
import AddToCartBar from '../components/customize/AddToCartBar';

interface RiceOption {
  id: string;
  name: string;
  price: number;
}

interface ProteinOption {
  id: string;
  name: string;
  price: number;
}

interface ToppingOption {
  id: string;
  name: string;
  price: number;
}

const CustomizeBowlScreen: React.FC = () => {
  // Rice options
  const riceOptions: RiceOption[] = [
    { id: 'white', name: 'White Rice', price: 0 },
    { id: 'brown', name: 'Brown Rice', price: 0 },
    { id: 'quinoa', name: 'Quinoa', price: 2.00 },
  ];

  // Protein options
  const proteinOptions: ProteinOption[] = [
    { id: 'chicken', name: 'Grilled Chicken', price: 0 },
    { id: 'steak', name: 'Steak', price: 3.00 },
    { id: 'tofu', name: 'Tofu', price: 0 },
  ];

  // Topping options
  const toppingOptions: ToppingOption[] = [
    { id: 'avocado', name: 'Avocado', price: 1.50 },
    { id: 'corn', name: 'Corn Salsa', price: 0 },
    { id: 'cheese', name: 'Shredded Cheese', price: 0 },
  ];

  // State
  const [selectedRice, setSelectedRice] = useState<string>('white');
  const [selectedProtein, setSelectedProtein] = useState<string>('chicken');
  const [selectedToppings, setSelectedToppings] = useState<Set<string>>(new Set(['corn']));
  const [quantity, setQuantity] = useState(1);

  const basePrice = 9.00;

  // Calculate total
  const calculateTotal = () => {
    let total = basePrice;

    // Add rice price
    const rice = riceOptions.find(r => r.id === selectedRice);
    if (rice) total += rice.price;

    // Add protein price
    const protein = proteinOptions.find(p => p.id === selectedProtein);
    if (protein) total += protein.price;

    // Add topping prices
    selectedToppings.forEach(toppingId => {
      const topping = toppingOptions.find(t => t.id === toppingId);
      if (topping) total += topping.price;
    });

    return total * quantity;
  };

  const handleToggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toppingId)) {
        newSet.delete(toppingId);
      } else {
        newSet.add(toppingId);
      }
      return newSet;
    });
  };

  const handleAddToCart = () => {
    const rice = riceOptions.find(r => r.id === selectedRice)?.name;
    const protein = proteinOptions.find(p => p.id === selectedProtein)?.name;
    const toppings = Array.from(selectedToppings)
      .map(id => toppingOptions.find(t => t.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const order = {
      id: `custom-${Date.now()}`,
      name: 'Customized Bowl',
      price: Number(calculateTotal().toFixed(2)),
      quantity,
      customization: `Rice: ${rice || ''}; Protein: ${protein || ''}; Toppings: ${toppings || 'None'}`,
      image: { uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop' },
    };

    // Navigate to Cart and pass the new order details
    navigation.navigate('Cart', { newOrder: order });
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CustomizeBowl'>>();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customize Your Bowl</Text>
        <View style={styles.backButton} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <FoodHeroImage
          image={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop' }}
        />

        {/* Choose Your Rice */}
        <View style={styles.section}>
          <SectionHeader title="Choose Your Rice" />
          {riceOptions.map(option => (
            <RadioOption
              key={option.id}
              label={option.name}
              selected={selectedRice === option.id}
              onSelect={() => setSelectedRice(option.id)}
              price={option.price}
            />
          ))}
        </View>

        {/* Choose Your Protein */}
        <View style={styles.section}>
          <SectionHeader title="Choose Your Protein" />
          {proteinOptions.map(option => (
            <RadioOption
              key={option.id}
              label={option.name}
              selected={selectedProtein === option.id}
              onSelect={() => setSelectedProtein(option.id)}
              price={option.price}
            />
          ))}
        </View>

        {/* Add Toppings */}
        <View style={styles.section}>
          <SectionHeader title="Add Toppings" />
          {toppingOptions.map(option => (
            <CheckboxOption
              key={option.id}
              label={option.name}
              checked={selectedToppings.has(option.id)}
              onToggle={() => handleToggleTopping(option.id)}
              price={option.price}
            />
          ))}
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantitySection}>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          />
        </View>
      </ScrollView>

      {/* Add to Cart Bar */}
      <AddToCartBar
        total={calculateTotal()}
        onAddToCart={handleAddToCart}
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
  section: {
    marginBottom: 24,
  },
  quantitySection: {
    marginBottom: 8,
  },
});

export default CustomizeBowlScreen;