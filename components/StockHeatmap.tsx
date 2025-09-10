import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { heatmapStockData, TimePeriod, HeatmapStock } from '@/constants/stockData';

interface StockHeatmapProps {
  testID?: string;
}

interface HeatmapCellProps {
  stock: HeatmapStock;
  selectedPeriod: TimePeriod;
}

const HeatmapCell: React.FC<HeatmapCellProps> = ({ stock, selectedPeriod }) => {
  const performance = stock.performance[selectedPeriod];
  const changePercent = parseFloat(performance.changePercent.replace('%', '').replace('+', ''));
  
  const getIntensity = (percent: number): number => {
    const absPercent = Math.abs(percent);
    if (absPercent >= 20) return 1;
    if (absPercent >= 15) return 0.8;
    if (absPercent >= 10) return 0.6;
    if (absPercent >= 5) return 0.4;
    if (absPercent >= 2) return 0.2;
    return 0.1;
  };

  const intensity = getIntensity(changePercent);
  const backgroundColor = performance.isPositive 
    ? `rgba(34, 197, 94, ${intensity})`
    : `rgba(239, 68, 68, ${intensity})`;

  return (
    <TouchableOpacity 
      style={[styles.heatmapCell, { backgroundColor }]}
      testID={`heatmap-cell-${stock.symbol}`}
    >
      <View style={styles.cellHeader}>
        <Text style={styles.symbolText}>{stock.symbol}</Text>
        {performance.isPositive ? (
          <TrendingUp size={12} color={performance.isPositive ? '#22c55e' : '#ef4444'} />
        ) : (
          <TrendingDown size={12} color={performance.isPositive ? '#22c55e' : '#ef4444'} />
        )}
      </View>
      <Text style={styles.companyName} numberOfLines={2}>{stock.name}</Text>
      <Text style={styles.priceText}>{stock.price} {stock.currency}</Text>
      <Text style={[
        styles.changeText,
        { color: performance.isPositive ? '#22c55e' : '#ef4444' }
      ]}>
        {performance.changePercent}
      </Text>
    </TouchableOpacity>
  );
};

export const StockHeatmap: React.FC<StockHeatmapProps> = ({ testID }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1D');
  
  const timePeriods: TimePeriod[] = ['1D', '5D', '1W', '3M', '6M', '1Y'];

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.title}>Stock Performance Heatmap</Text>
        <Text style={styles.subtitle}>Real-time performance across ADNOC Group companies</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {timePeriods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.filterButton,
              selectedPeriod === period && styles.filterButtonActive
            ]}
            onPress={() => setSelectedPeriod(period)}
            testID={`period-filter-${period}`}
          >
            <Text style={[
              styles.filterButtonText,
              selectedPeriod === period && styles.filterButtonTextActive
            ]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.heatmapGrid}>
        {heatmapStockData.map((stock) => (
          <HeatmapCell 
            key={stock.symbol} 
            stock={stock} 
            selectedPeriod={selectedPeriod}
          />
        ))}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Performance Scale</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: 'rgba(239, 68, 68, 0.8)' }]} />
            <Text style={styles.legendText}>Strong Decline</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: 'rgba(239, 68, 68, 0.3)' }]} />
            <Text style={styles.legendText}>Decline</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: 'rgba(156, 163, 175, 0.3)' }]} />
            <Text style={styles.legendText}>Neutral</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: 'rgba(34, 197, 94, 0.3)' }]} />
            <Text style={styles.legendText}>Growth</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: 'rgba(34, 197, 94, 0.8)' }]} />
            <Text style={styles.legendText}>Strong Growth</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    gap: 8,
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
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  heatmapCell: {
    width: '47%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  cellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  symbolText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  companyName: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 14,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  legend: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#6b7280',
  },
});