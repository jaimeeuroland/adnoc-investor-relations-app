import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

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
  const [chartWidth, setChartWidth] = useState<number>(0);
  const chartHeight = 30;

  // Generate a pseudo intraday random-walk series per symbol for visual consistency
  const data = useMemo(() => {
    const length = 28;
    let last = 50;
    const points: number[] = [];
    for (let i = 0; i < length; i++) {
      const delta = (Math.random() * 14) - 7;
      last = Math.max(5, Math.min(95, last + delta));
      points.push(last);
    }
    return points;
  }, [stock.symbol]);

  const polylinePoints = useMemo(() => {
    if (!chartWidth || data.length === 0) return '';
    const stepX = chartWidth / (data.length - 1);
    return data
      .map((value, index) => {
        const x = index * stepX;
        const y = (1 - value / 100) * chartHeight;
        return `${x},${y}`;
      })
      .join(' ');
  }, [chartWidth, data]);

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
      <View style={styles.chartContainer} onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}>
        <Svg width="100%" height="100%">
          <Polyline
            points={polylinePoints}
            fill="none"
            stroke={stock.isPositive ? '#10b981' : '#ef4444'}
            strokeWidth={2}
            strokeOpacity={0.9}
          />
        </Svg>
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
});