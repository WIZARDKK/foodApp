import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface PromoCardProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  backgroundColor?: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ 
  title, 
  description, 
  image, 
  backgroundColor = '#EF4444' 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]}
      activeOpacity={0.9}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image 
        source={image}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 140,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  image: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 128,
    height: '100%',
  },
});

export default PromoCard;