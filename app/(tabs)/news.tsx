import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,

  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Filter, ExternalLink } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  time: string;
  category: string;
  company: 'ADNOC Distribution' | 'ADNOC Gas' | 'ADNOC Drilling' | 'ADNOC Group';
  companyColor: string;
  link: string;
  source: string;
}

interface SerpNewsItem {
  position: number;
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
  thumbnail?: string;
}

interface SerpApiResponse {
  news_results: SerpNewsItem[];
}

const companyColors = {
  'ADNOC Distribution': '#10b981',
  'ADNOC Gas': '#3b82f6',
  'ADNOC Drilling': '#f59e0b',
  'ADNOC Group': '#8b5cf6',
};

const categorizeNews = (title: string, snippet: string): string => {
  const content = (title + ' ' + snippet).toLowerCase();
  
  if (content.includes('financial') || content.includes('revenue') || content.includes('earnings') || content.includes('profit') || content.includes('quarter')) {
    return 'Financial';
  }
  if (content.includes('sustainability') || content.includes('green') || content.includes('carbon') || content.includes('environment')) {
    return 'Sustainability';
  }
  if (content.includes('drilling') || content.includes('operations') || content.includes('production') || content.includes('facility')) {
    return 'Operations';
  }
  if (content.includes('digital') || content.includes('technology') || content.includes('tech') || content.includes('innovation')) {
    return 'Technology';
  }
  if (content.includes('expansion') || content.includes('new') || content.includes('opens') || content.includes('launch')) {
    return 'Expansion';
  }
  if (content.includes('agreement') || content.includes('contract') || content.includes('partnership') || content.includes('deal')) {
    return 'Commercial';
  }
  return 'General';
};

const identifyCompany = (title: string, snippet: string): 'ADNOC Distribution' | 'ADNOC Gas' | 'ADNOC Drilling' | 'ADNOC Group' => {
  const content = (title + ' ' + snippet).toLowerCase();
  
  if (content.includes('distribution') || content.includes('retail') || content.includes('service station')) {
    return 'ADNOC Distribution';
  }
  if (content.includes('gas') || content.includes('lng') || content.includes('ammonia')) {
    return 'ADNOC Gas';
  }
  if (content.includes('drilling') || content.includes('rig')) {
    return 'ADNOC Drilling';
  }
  return 'ADNOC Group';
};

const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch('https://serpapi.com/search?engine=google_news&q=ADNOC&hl=en&gl=ae&api_key=c13fc79320d8a768980df46c5e3260a662baa4652adccf6acd07e7b67182033c');
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data: SerpApiResponse = await response.json();
    
    return data.news_results?.map((item: SerpNewsItem) => {
      const company = identifyCompany(item.title, item.snippet);
      const category = categorizeNews(item.title, item.snippet);
      const newsDate = new Date(item.date);
      
      return {
        id: item.position.toString(),
        title: item.title,
        summary: item.snippet,
        date: newsDate.toISOString().split('T')[0],
        time: newsDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        category,
        company,
        companyColor: companyColors[company],
        link: item.link,
        source: item.source,
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

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

  const { data: newsData = [], isLoading, error, refetch } = useQuery({
    queryKey: ['adnoc-news'],
    queryFn: fetchNews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const filteredNews = useMemo(() => {
    if (selectedFilter === 'All News') {
      return newsData;
    }
    return newsData.filter(news => news.company === selectedFilter);
  }, [newsData, selectedFilter]);

  const handleReadMore = async (link: string) => {
    if (!link || !link.trim() || link.length > 2000) {
      console.log('Invalid URL provided');
      return;
    }
    
    const sanitizedLink = link.trim();
    
    try {
      const supported = await Linking.canOpenURL(sanitizedLink);
      if (supported) {
        await Linking.openURL(sanitizedLink);
      } else {
        console.log('Cannot open URL:', sanitizedLink);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

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
              onPress={() => {
                if (option && option.trim()) {
                  setSelectedFilter(option);
                }
              }}
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

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}

      >
        {isLoading && newsData.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Loading latest news...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load news</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredNews.map((news) => (
            <TouchableOpacity key={news.id} style={styles.newsCard} onPress={() => handleReadMore(news.link)}>
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
            
            <View style={styles.newsFooter}>
              <Text style={styles.sourceText}>Source: {news.source}</Text>
              <View style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
                <ExternalLink color="#2563eb" size={16} />
              </View>
            </View>
          </TouchableOpacity>
          ))
        )}
        
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sourceText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});