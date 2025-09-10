import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Building2, 
  Users, 
  Target, 
  TrendingUp, 
  Globe, 
  Award,
  BarChart3,
  FileText
} from 'lucide-react-native';

const menuItems = [
  { icon: Building2, title: 'Company Overview', subtitle: 'Learn about ADNOC Group' },
  { icon: Users, title: 'Leadership Team', subtitle: 'Meet our executives' },
  { icon: Target, title: 'Strategy & Vision', subtitle: '2030 strategic goals' },
  { icon: TrendingUp, title: 'Financial Performance', subtitle: 'Latest results & metrics' },
  { icon: Globe, title: 'Global Operations', subtitle: 'Worldwide presence' },
  { icon: Award, title: 'Sustainability', subtitle: 'Environmental commitments' },
  { icon: BarChart3, title: 'Investor Presentations', subtitle: 'Download materials' },
  { icon: FileText, title: 'Annual Reports', subtitle: 'Comprehensive reports' },
];

export default function CenterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>أدنوك</Text>
                <Text style={styles.logoSubtext}>ADNOC</Text>
              </View>
            </View>
          </View>
          <Text style={styles.headerTitle}>ADNOC Group</Text>
          <Text style={styles.headerSubtitle}>Investor Relations Hub</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.iconContainer}>
                <item.icon color="#2563eb" size={24} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
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
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  logoSubtext: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1e40af',
    marginTop: 2,
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
  menuGrid: {
    gap: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  bottomSpacing: {
    height: 20,
  },
});