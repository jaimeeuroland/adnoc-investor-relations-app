import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export function FeaturedCard() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop' }}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay} />
          <View style={styles.content}>
            <Text style={styles.title}>2030 Sustainability</Text>
            <Text style={styles.subtitle}>Strategy</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  backgroundImage: {
    height: 160,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});