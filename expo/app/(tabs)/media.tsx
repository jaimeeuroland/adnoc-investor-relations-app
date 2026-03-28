import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Calendar, Eye } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mediaData = [
  {
    id: 1,
    title: 'ADNOC 2030 Strategy Overview',
    duration: '12:45',
    views: '15.2K',
    date: '2024-12-10',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
    type: 'video',
  },
  {
    id: 2,
    title: 'Sustainability Initiatives Presentation',
    duration: '8:30',
    views: '9.8K',
    date: '2024-12-05',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=225&fit=crop',
    type: 'video',
  },
  {
    id: 3,
    title: 'Q4 2024 Earnings Call',
    duration: '45:20',
    views: '22.1K',
    date: '2024-11-28',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop',
    type: 'video',
  },
  {
    id: 4,
    title: 'Innovation in Energy Technology',
    duration: '15:12',
    views: '7.5K',
    date: '2024-11-20',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop',
    type: 'video',
  },
];

export default function MediaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Media Center</Text>
          <Text style={styles.headerSubtitle}>Videos, presentations & more</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mediaGrid}>
          {mediaData.map((media) => (
            <TouchableOpacity key={media.id} style={styles.mediaCard}>
              <View style={styles.thumbnailContainer}>
                <View style={styles.thumbnail}>
                  <View style={styles.playButton}>
                    <Play color="white" size={24} fill="white" />
                  </View>
                </View>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{media.duration}</Text>
                </View>
              </View>
              
              <View style={styles.mediaInfo}>
                <Text style={styles.mediaTitle}>{media.title}</Text>
                
                <View style={styles.mediaStats}>
                  <View style={styles.statItem}>
                    <Eye color="#6b7280" size={14} />
                    <Text style={styles.statText}>{media.views} views</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Calendar color="#6b7280" size={14} />
                    <Text style={styles.statText}>{media.date}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '400',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mediaGrid: {
    gap: 20,
  },
  mediaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#e5e7eb',
  },
  thumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  mediaInfo: {
    padding: 16,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 22,
  },
  mediaStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#6b7280',
    fontSize: 12,
  },
  bottomSpacing: {
    height: 20,
  },
});