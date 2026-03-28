import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MessageCircle, 
  Heart, 
  Share, 
  MoreHorizontal,
  Clock,
  TrendingUp,
  Award,
  Users
} from 'lucide-react-native';

const feedData = [
  {
    id: 1,
    type: 'announcement',
    title: 'ADNOC Achieves Record Production Milestone',
    content: 'We are proud to announce that ADNOC has reached a new production milestone of 4.5 million barrels per day, reinforcing our position as a leading energy company.',
    timestamp: '2 hours ago',
    likes: 245,
    comments: 18,
    shares: 32,
    icon: TrendingUp,
  },
  {
    id: 2,
    type: 'sustainability',
    title: 'Green Energy Initiative Launch',
    content: 'Today marks the launch of our ambitious green energy initiative, investing $15 billion in renewable energy projects over the next decade.',
    timestamp: '5 hours ago',
    likes: 189,
    comments: 24,
    shares: 41,
    icon: Award,
  },
  {
    id: 3,
    type: 'community',
    title: 'Employee Recognition Program',
    content: 'Celebrating our outstanding employees who have contributed to our success. This quarter, we recognize 150+ team members across all divisions.',
    timestamp: '1 day ago',
    likes: 312,
    comments: 45,
    shares: 28,
    icon: Users,
  },
  {
    id: 4,
    type: 'announcement',
    title: 'New Partnership Agreement Signed',
    content: 'ADNOC has signed a strategic partnership agreement with leading international energy companies to expand our global reach and technological capabilities.',
    timestamp: '2 days ago',
    likes: 156,
    comments: 12,
    shares: 19,
    icon: TrendingUp,
  },
];

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>ADNOC Feed</Text>
          <Text style={styles.headerSubtitle}>Latest updates & announcements</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {feedData.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postInfo}>
                <View style={styles.iconContainer}>
                  <post.icon color="#2563eb" size={20} />
                </View>
                <View style={styles.postMeta}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <View style={styles.timestampContainer}>
                    <Clock color="#6b7280" size={14} />
                    <Text style={styles.timestamp}>{post.timestamp}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <MoreHorizontal color="#6b7280" size={20} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.postContent}>{post.content}</Text>
            
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart color="#6b7280" size={18} />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle color="#6b7280" size={18} />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Share color="#6b7280" size={18} />
                <Text style={styles.actionText}>{post.shares}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
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
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postMeta: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    color: '#6b7280',
    fontSize: 12,
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});