import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoSectionProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
});

export default InfoSection;