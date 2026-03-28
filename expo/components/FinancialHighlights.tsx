import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react-native';

const CHART_HEIGHT = 200;

type FinancialFilter = 'Revenue' | 'EPS' | 'Assets' | 'Debt' | 'Cash Flow' | 'ROE';

const filters: FinancialFilter[] = ['Revenue', 'EPS', 'Assets', 'Debt', 'Cash Flow', 'ROE'];

interface FinancialMetric {
  values: number[];
  periods: string[];
  unit: string;
  change: string;
  isPositive: boolean;
}

interface FinancialData {
  symbol: string;
  name: string;
  color: string;
  metrics: {
    Revenue: FinancialMetric;
    EPS: FinancialMetric;
    Assets: FinancialMetric;
    Debt: FinancialMetric;
    'Cash Flow': FinancialMetric;
    ROE: FinancialMetric;
  };
}

const financialData: FinancialData[] = [
  {
    symbol: 'ADNOCDRILL',
    name: 'ADNOC Drilling',
    color: '#3b82f6',
    metrics: {
      Revenue: {
        values: [12.5, 14.2, 16.8, 18.3, 19.7],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+12.3%',
        isPositive: true,
      },
      EPS: {
        values: [2.1, 2.8, 3.2, 3.9, 4.2],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+7.7%',
        isPositive: true,
      },
      Assets: {
        values: [45.2, 48.7, 52.1, 56.8, 61.3],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+7.9%',
        isPositive: true,
      },
      Debt: {
        values: [8.5, 7.9, 7.2, 6.8, 6.1],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '-10.3%',
        isPositive: true,
      },
      'Cash Flow': {
        values: [5.2, 6.8, 8.1, 9.4, 10.2],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+8.5%',
        isPositive: true,
      },
      ROE: {
        values: [12.5, 15.2, 18.7, 21.3, 23.8],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: '%',
        change: '+11.7%',
        isPositive: true,
      },
    },
  },
  {
    symbol: 'ADNOCGAS',
    name: 'ADNOC Gas',
    color: '#10b981',
    metrics: {
      Revenue: {
        values: [8.7, 9.5, 11.2, 12.8, 14.1],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+10.2%',
        isPositive: true,
      },
      EPS: {
        values: [1.8, 2.1, 2.6, 2.9, 3.1],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+6.9%',
        isPositive: true,
      },
      Assets: {
        values: [32.1, 35.4, 38.9, 42.3, 45.7],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+8.0%',
        isPositive: true,
      },
      Debt: {
        values: [6.2, 5.8, 5.1, 4.7, 4.2],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '-10.6%',
        isPositive: true,
      },
      'Cash Flow': {
        values: [3.8, 4.5, 5.2, 6.1, 6.8],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+11.5%',
        isPositive: true,
      },
      ROE: {
        values: [10.2, 12.8, 15.4, 17.9, 19.6],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: '%',
        change: '+9.5%',
        isPositive: true,
      },
    },
  },
  {
    symbol: 'ADNOCLS',
    name: 'ADNOC Logistics',
    color: '#f59e0b',
    metrics: {
      Revenue: {
        values: [4.2, 4.8, 5.5, 6.1, 6.7],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+9.8%',
        isPositive: true,
      },
      EPS: {
        values: [1.2, 1.5, 1.8, 2.1, 2.3],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+9.5%',
        isPositive: true,
      },
      Assets: {
        values: [18.5, 20.1, 22.3, 24.8, 27.2],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+9.7%',
        isPositive: true,
      },
      Debt: {
        values: [3.8, 3.5, 3.1, 2.8, 2.4],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '-14.3%',
        isPositive: true,
      },
      'Cash Flow': {
        values: [2.1, 2.6, 3.2, 3.8, 4.3],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+13.2%',
        isPositive: true,
      },
      ROE: {
        values: [8.5, 10.2, 12.8, 15.1, 17.4],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: '%',
        change: '+15.2%',
        isPositive: true,
      },
    },
  },
  {
    symbol: 'ADNOCDIST',
    name: 'ADNOC Distribution',
    color: '#8b5cf6',
    metrics: {
      Revenue: {
        values: [15.8, 17.2, 19.5, 21.8, 23.4],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+7.3%',
        isPositive: true,
      },
      EPS: {
        values: [2.8, 3.2, 3.7, 4.1, 4.4],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+7.3%',
        isPositive: true,
      },
      Assets: {
        values: [28.5, 31.2, 34.8, 38.1, 41.7],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+9.4%',
        isPositive: true,
      },
      Debt: {
        values: [5.2, 4.8, 4.3, 3.9, 3.4],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '-12.8%',
        isPositive: true,
      },
      'Cash Flow': {
        values: [4.5, 5.2, 6.1, 7.0, 7.8],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+11.4%',
        isPositive: true,
      },
      ROE: {
        values: [14.2, 16.8, 19.5, 22.1, 24.7],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: '%',
        change: '+11.8%',
        isPositive: true,
      },
    },
  },
  {
    symbol: 'BOROUGE',
    name: 'Borouge',
    color: '#ef4444',
    metrics: {
      Revenue: {
        values: [6.8, 7.5, 8.9, 9.8, 10.2],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+4.1%',
        isPositive: true,
      },
      EPS: {
        values: [1.5, 1.8, 2.2, 2.4, 2.5],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+4.2%',
        isPositive: true,
      },
      Assets: {
        values: [22.1, 24.5, 27.8, 30.2, 32.1],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+6.3%',
        isPositive: true,
      },
      Debt: {
        values: [4.5, 4.1, 3.7, 3.2, 2.8],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '-12.5%',
        isPositive: true,
      },
      'Cash Flow': {
        values: [2.8, 3.2, 3.8, 4.2, 4.5],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'AED ',
        change: '+7.1%',
        isPositive: true,
      },
      ROE: {
        values: [9.2, 11.5, 13.8, 15.2, 16.1],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: '%',
        change: '+5.9%',
        isPositive: true,
      },
    },
  },
  {
    symbol: 'FERTIGLOBE',
    name: 'Fertiglobe',
    color: '#06b6d4',
    metrics: {
      Revenue: {
        values: [3.2, 3.8, 4.5, 5.1, 5.6],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'USD ',
        change: '+9.8%',
        isPositive: true,
      },
      EPS: {
        values: [0.8, 1.1, 1.4, 1.7, 1.9],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'USD ',
        change: '+11.8%',
        isPositive: true,
      },
      Assets: {
        values: [12.5, 14.2, 16.8, 18.9, 21.1],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'USD ',
        change: '+11.6%',
        isPositive: true,
      },
      Debt: {
        values: [2.8, 2.5, 2.1, 1.8, 1.5],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'USD ',
        change: '-16.7%',
        isPositive: true,
      },
      'Cash Flow': {
        values: [1.5, 1.9, 2.4, 2.8, 3.2],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: 'USD ',
        change: '+14.3%',
        isPositive: true,
      },
      ROE: {
        values: [7.8, 9.5, 12.1, 14.8, 16.9],
        periods: ['2020', '2021', '2022', '2023', '2024'],
        unit: '%',
        change: '+14.2%',
        isPositive: true,
      },
    },
  },
];

export function FinancialHighlights({ testID }: { testID?: string }) {
  const [selectedFilter, setSelectedFilter] = useState<FinancialFilter>('Revenue');

  const renderChart = (company: typeof financialData[0]) => {
    const metric = company.metrics[selectedFilter];
    const maxValue = Math.max(...metric.values);
    const minValue = Math.min(...metric.values);
    const range = maxValue - minValue;
    
    return (
      <View key={company.symbol} style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.companyName}>{company.name}</Text>
          <View style={styles.currentValueContainer}>
            <Text style={styles.currentValue}>
              {metric.unit}{metric.values[metric.values.length - 1]}
            </Text>
            <View style={[styles.changeIndicator, { backgroundColor: metric.isPositive ? '#10b981' : '#ef4444' }]}>
              {metric.isPositive ? (
                <TrendingUp size={12} color="white" />
              ) : (
                <TrendingDown size={12} color="white" />
              )}
              <Text style={styles.changeText}>{metric.change}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.chartArea}>
          <View style={styles.chartBars}>
            {metric.values.map((value: number, index: number) => {
              const height = range > 0 ? ((value - minValue) / range) * 120 + 20 : 70;
              return (
                <View key={`${company.symbol}-${metric.periods[index]}`} style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar,
                      { 
                        height,
                        backgroundColor: company.color,
                      }
                    ]} 
                  />
                  <Text style={styles.barLabel}>{metric.periods[index]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <BarChart3 size={24} color="#1e40af" />
          <Text style={styles.title}>Financial Highlights</Text>
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chartsContainer}
      >
        {financialData.map(renderChart)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    gap: 8,
    paddingRight: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeFilterButton: {
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeFilterText: {
    color: 'white',
  },
  chartsContainer: {
    gap: 16,
    paddingRight: 20,
  },
  chartContainer: {
    width: 300,
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
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  currentValueContainer: {
    alignItems: 'flex-end',
  },
  currentValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 2,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  chartArea: {
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    paddingHorizontal: 8,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
});