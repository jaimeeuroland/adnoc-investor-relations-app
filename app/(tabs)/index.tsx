import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, Bell, Search, TrendingUp } from 'lucide-react-native';
import { StockCard } from '@/components/StockCard';
import { AISearchBar } from '@/components/AISearchBar';
import { GroupHighlights } from '@/components/GroupHighlights';
import { FeaturedCard } from '@/components/FeaturedCard';
import { LatestNews } from '@/components/LatestNews';
import { StockHeatmap } from '@/components/StockHeatmap';
import { FinancialHighlights } from '@/components/FinancialHighlights';
import { stockData } from '@/constants/stockData';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#0f4c75', '#3282b8', '#bbe1fa']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.menuButton}>
            <Menu color="white" size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Bell color="white" size={24} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome to ADNOC Group</Text>
          <Text style={styles.titleText}>Investor Relations</Text>
          
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/tmhzuh5lfirmknnjcxe8a' }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stockSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stockScrollContainer}
          >
            {stockData.map((stock, index) => (
              <StockCard key={index} stock={stock} />
            ))}
          </ScrollView>
        </View>

        <AISearchBar />
        
        <GroupHighlights />
        
        <FeaturedCard />
        
        <LatestNews />
        
        <StockHeatmap testID="stock-heatmap" />
        
        <FinancialHighlights testID="financial-highlights" />
        
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    padding: 8,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 4,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  logoContainer: {
    position: 'absolute',
    right: 0,
    top: -10,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
  },
  stockSection: {
    marginTop: 10,
    paddingBottom: 20,
    zIndex: 1,
  },
  stockScrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  bottomSpacing: {
    height: 20,
  },
});