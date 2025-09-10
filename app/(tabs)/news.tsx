import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Calendar, Clock, Filter } from 'lucide-react-native';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  time: string;
  category: string;
  company: 'ADNOC Distribution' | 'ADNOC Gas' | 'ADNOC Drilling' | 'ADNOC Group';
  companyColor: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'ADNOC Distribution Reports Strong Q4 2024 Performance',
    summary: 'Record fuel sales and retail expansion drive exceptional quarterly results.',
    date: '2024-12-15',
    time: '09:30',
    category: 'Financial',
    company: 'ADNOC Distribution',
    companyColor: '#10b981',
  },
  {
    id: 2,
    title: 'ADNOC Gas Advances Blue Ammonia Production',
    summary: 'New facility to produce low-carbon ammonia for global export markets.',
    date: '2024-12-14',
    time: '14:15',
    category: 'Sustainability',
    company: 'ADNOC Gas',
    companyColor: '#3b82f6',
  },
  {
    id: 3,
    title: 'ADNOC Drilling Expands Fleet with Advanced Rigs',
    summary: 'Investment in cutting-edge drilling technology to enhance operational efficiency.',
    date: '2024-12-12',
    time: '11:45',
    category: 'Operations',
    company: 'ADNOC Drilling',
    companyColor: '#f59e0b',
  },
  {
    id: 4,
    title: 'ADNOC Group Launches Digital Transformation Initiative',
    summary: 'Comprehensive digitalization program across all business units.',
    date: '2024-12-10',
    time: '16:20',
    category: 'Technology',
    company: 'ADNOC Group',
    companyColor: '#8b5cf6',
  },
  {
    id: 5,
    title: 'ADNOC Distribution Opens 50 New Service Stations',
    summary: 'Strategic expansion continues with new locations across the UAE.',
    date: '2024-12-08',
    time: '10:15',
    category: 'Expansion',
    company: 'ADNOC Distribution',
    companyColor: '#10b981',
  },
  {
    id: 6,
    title: 'ADNOC Gas Signs Major LNG Supply Agreement',
    summary: 'Long-term contract secured with Asian energy partners.',
    date: '2024-12-05',
    time: '13:30',
    category: 'Commercial',
    company: 'ADNOC Gas',
    companyColor: '#3b82f6',
  },
];

type FilterOption = 'All News' | 'ADNOC Distribution' | 'ADNOC Gas' | 'ADNOC Drilling' | 'ADNOC Group';

const filterOptions: FilterOption[] = [
  'All News',
  'ADNOC Distribution',
  'ADNOC Gas', 
  'ADNOC Drilling',
  'ADNOC Group'
];

export default function NewsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All News');

  const filteredNews = useMemo(() => {
    if (selectedFilter === 'All News') {
      return newsData;
    }
    return newsData.filter(news => news.company === selectedFilter);
  }, [selectedFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Latest News</Text>
          <Text style={styles.headerSubtitle}>Stay updated with ADNOC Group</Text>
        </View>
      </LinearGradient>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Filter color="#6b7280" size={18} />
          <Text style={styles.filterTitle}>Filter by Company</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterContent}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterButton,
                selectedFilter === option && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(option)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === option && styles.filterButtonTextActive
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredNews.map((news) => (
          <TouchableOpacity key={news.id} style={styles.newsCard}>
            <View style={styles.newsHeader}>
              <View style={styles.badgeContainer}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{news.category}</Text>
                </View>
                <View style={[styles.companyTag, { backgroundColor: news.companyColor }]}>
                  <Text style={styles.companyTagText}>{news.company}</Text>
                </View>
              </View>
              <View style={styles.dateTime}>
                <View style={styles.dateTimeItem}>
                  <Calendar color="#6b7280" size={14} />
                  <Text style={styles.dateTimeText}>{news.date}</Text>
                </View>
                <View style={styles.dateTimeItem}>
                  <Clock color="#6b7280" size={14} />
                  <Text style={styles.dateTimeText}>{news.time}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.newsTitle}>{news.title}</Text>
            <Text style={styles.newsSummary}>{news.summary}</Text>
            
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
              <ArrowLeft color="#2563eb" size={16} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
        {filteredNews.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No news found for {selectedFilter}</Text>
          </View>
        )}
        
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
  newsCard: {
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
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'column',
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
  },
  companyTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  companyTagText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  filterScrollView: {
    paddingLeft: 20,
  },
  filterContent: {
    paddingRight: 20,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  dateTime: {
    alignItems: 'flex-end',
    gap: 4,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTimeText: {
    color: '#6b7280',
    fontSize: 12,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsSummary: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readMoreText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});