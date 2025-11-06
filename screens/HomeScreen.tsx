import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import PromoCard from '../components/PromoCard';
import FoodCard from '../components/FoodCard';
import CartFooter from '../components/CartFooter';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  category: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  const [searchQuery, setSearchQuery] = useState('');

  // Sample food data - Replace with your actual images
  const foodItems: FoodItem[] = [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato, mozzarella, and basil.',
      price: 12.50,
      image: { uri: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' },
      category: 'pizza',
    },
    {
      id: '2',
      name: 'Classic Cheeseburger',
      description: 'Beef patty with cheddar cheese, lettuce, and tomato.',
      price: 9.99,
      image: { uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
      category: 'burgers',
    },
    {
      id: '3',
      name: 'California Roll',
      description: 'Crab, avocado, and cucumber wrapped in seaweed.',
      price: 8.00,
      image: { uri: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400' },
      category: 'sushi',
    },
    {
      id: '4',
      name: 'Spicy Miso Ramen',
      description: 'Rich miso broth with chashu pork and noodles.',
      price: 14.00,
      image: { uri: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
      category: 'ramen',
    },
  ];

  const categories = [
    { id: 'popular', label: 'Popular', icon: 'flame' },
    { id: 'burgers', label: 'Burgers', icon: 'fast-food' },
    { id: 'pizza', label: 'Pizza', icon: 'pizza' },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const addToCart = (id: string) => {
    setCart(prev => {
      const newCart = new Map(prev);
      const currentCount = newCart.get(id) || 0;
      newCart.set(id, currentCount + 1);
      return newCart;
    });
  };

  const getCartTotal = () => {
    let total = 0;
    let itemCount = 0;
    cart.forEach((quantity, itemId) => {
      const item = foodItems.find(f => f.id === itemId);
      if (item) {
        total += item.price * quantity;
        itemCount += quantity;
      }
    });
    return { total, itemCount };
  };

  // Filter items based on search query and selected category
  const getFilteredItems = () => {
    let filtered = foodItems;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category (if not 'popular')
    if (selectedCategory !== 'popular') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    return filtered;
  };

  const filteredItems = getFilteredItems();
  const { total: cartTotal, itemCount: cartItemCount } = getCartTotal();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Header location="123 Main Street, Anytown" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: cartItemCount > 0 ? 120 : 20 }
        ]}
      >
        <SearchBar 
          onChangeText={setSearchQuery}
          placeholder="Search for dishes or restaurants"
        />
        
        {/* Promotional Banners */}
        <View style={styles.promoSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoContainer}
          >
            <PromoCard
              title="50% Off Pizza Mondays"
              description="Enjoy half price on all pizzas every Monday."
              image={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' }}
              backgroundColor="#EF4444"
            />
            <PromoCard
              title="New Smash Burgers"
              description="Try our new smash burgers."
              image={{ uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400' }}
              backgroundColor="#1F2937"
            />
          </ScrollView>
        </View>

        {/* Category Filters */}
        <View style={styles.categorySection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map(category => (
              <Button
                key={category.id}
                icon={
                  <Ionicons 
                    name={category.icon as any} 
                    size={16} 
                    color={selectedCategory === category.id ? '#FFF' : '#000'} 
                  />
                }
                label={category.label}
                active={selectedCategory === category.id}
                onPress={() => {
                  setSelectedCategory(category.id);
                  setSearchQuery(''); // Clear search when changing category
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Section Title */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Popular Near You</Text>
        </View>

        {/* Food Items List */}
        <View style={styles.foodList}>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <FoodCard
                key={item.id}
                {...item}
                isFavorite={favorites.has(item.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {searchQuery.trim() ? 
                  `No results found for "${searchQuery}"` : 
                  'No items found in this category'
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <CartFooter 
        itemCount={cartItemCount}
        totalPrice={cartTotal}
        onViewCart={() => navigation.navigate('Cart')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  promoSection: {
    paddingVertical: 16,
  },
  promoContainer: {
    paddingHorizontal: 20,
  },
  categorySection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoryContainer: {
    gap: 10,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  foodList: {
    paddingHorizontal: 20,
  },
  noResultsContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default HomeScreen;