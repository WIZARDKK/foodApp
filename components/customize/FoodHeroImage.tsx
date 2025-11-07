import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface FoodHeroImageProps {
  image: ImageSourcePropType;
}

const FoodHeroImage: React.FC<FoodHeroImageProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default FoodHeroImage;