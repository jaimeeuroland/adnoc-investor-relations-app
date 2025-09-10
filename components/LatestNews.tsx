import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  categoryColor: string;
  image: string;
}

const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'ADNOC Group Accelerates Low-Carbon Hydrogen Projects',
    date: 'July 30, 2025',
    category: 'ADNOC Group',
    categoryColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'ADNOC Announces Transfer of 24.9% OMV Shareholding to XRG',
    date: 'July 30, 2025',
    category: 'ADNOC Group',
    categoryColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'ADNOC L&S Receives Marine Money\'s Deal of the Year Award for Strategic Acquisition of Navi...',
    date: 'July 30, 2025',
    category: 'ADNOC L&S',
    categoryColor: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
  },
  {
    id: '4',
    title: 'Fertiglobe Reports Resilient Q2 2025 Results, Reinforces Shareholder Commitment with A...',
    date: 'July 30, 2025',
    category: 'Fertiglobe',
    categoryColor: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop'
  },
  {
    id: '5',
    title: 'Borouge Announces $193 Million Q2 2025 Net Profit Support by Successful Plant Turnaround; Re...',
    date: 'July 30, 2025',
    category: 'Borouge',
    categoryColor: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=300&h=200&fit=crop'
  },
];

export function LatestNews() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest News</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>view all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.newsList}>
        {newsData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.newsItem}>
            <View style={styles.newsContent}>
              <View style={[styles.categoryBadge, { backgroundColor: item.categoryColor, alignSelf: 'flex-start', marginBottom: 8 }]}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {item.title}
              </Text>
              
              <View style={styles.newsFooter}>
                <Text style={styles.newsDate}>{item.date}</Text>
              </View>
            </View>
            
            <Image source={{ uri: item.image }} style={styles.newsImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  newsList: {
    gap: 16,
  },
  newsItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsContent: {
    flex: 1,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 22,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  newsDate: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '400',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '600',
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
});