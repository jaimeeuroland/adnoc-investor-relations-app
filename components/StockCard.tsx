import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';

interface Stock {
  symbol: string;
  price: string;
  currency: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

interface StockCardProps {
  stock: Stock;
}

export function StockCard({ stock }: StockCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.symbol}>{stock.symbol}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{stock.price}</Text>
        <Text style={styles.currency}>{stock.currency}</Text>
      </View>
      <View style={styles.changeContainer}>
        <Text style={[styles.change, { color: stock.isPositive ? '#10b981' : '#ef4444' }]}>
          {stock.changePercent}
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.miniChart}>
          {[...Array(20)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.chartBar,
                {
                  height: Math.random() * 20 + 5,
                  backgroundColor: stock.isPositive ? '#10b981' : '#ef4444',
                  opacity: 0.3 + Math.random() * 0.7,
                }
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  symbol: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  currency: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 4,
  },
  changeContainer: {
    marginBottom: 12,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    height: 30,
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    gap: 1,
  },
  chartBar: {
    flex: 1,
    borderRadius: 1,
  },
});