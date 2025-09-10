import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const highlights = [
  { title: 'Value Chain Overview', color: '#2563eb' },
  { title: 'Group Milestones', color: '#2563eb' },
  { title: 'ESG Report', color: '#2563eb' },
];

export function GroupHighlights() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Group Highlights</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.highlightsContainer}
      >
        {highlights.map((highlight, index) => (
          <TouchableOpacity key={index} style={styles.highlightButton}>
            <Text style={styles.highlightText}>{highlight.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  highlightsContainer: {
    gap: 12,
  },
  highlightButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  highlightText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
});