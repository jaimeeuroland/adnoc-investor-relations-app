export interface Stock {
  symbol: string;
  price: string;
  currency: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export interface HeatmapStock {
  symbol: string;
  name: string;
  price: string;
  currency: string;
  performance: {
    '1D': { change: string; changePercent: string; isPositive: boolean };
    '5D': { change: string; changePercent: string; isPositive: boolean };
    '1W': { change: string; changePercent: string; isPositive: boolean };
    '3M': { change: string; changePercent: string; isPositive: boolean };
    '6M': { change: string; changePercent: string; isPositive: boolean };
    '1Y': { change: string; changePercent: string; isPositive: boolean };
  };
}

export type TimePeriod = '1D' | '5D' | '1W' | '3M' | '6M' | '1Y';

export const stockData: Stock[] = [
  {
    symbol: 'ADNOCDRILL',
    price: '58.92',
    currency: 'AED',
    change: '+0.14',
    changePercent: '+0.23%',
    isPositive: true,
  },
  {
    symbol: 'ADNOCGAS',
    price: '58.92',
    currency: 'AED',
    change: '+0.14',
    changePercent: '+0.23%',
    isPositive: true,
  },
  {
    symbol: 'ADNOCLS',
    price: '58.92',
    currency: 'AED',
    change: '+0.14',
    changePercent: '+0.23%',
    isPositive: true,
  },
];

export const heatmapStockData: HeatmapStock[] = [
  {
    symbol: 'ADNOCDRILL',
    name: 'ADNOC Drilling',
    price: '58.92',
    currency: 'AED',
    performance: {
      '1D': { change: '+0.14', changePercent: '+0.23%', isPositive: true },
      '5D': { change: '+2.85', changePercent: '+5.08%', isPositive: true },
      '1W': { change: '-1.42', changePercent: '-2.35%', isPositive: false },
      '3M': { change: '+8.75', changePercent: '+17.42%', isPositive: true },
      '6M': { change: '+12.34', changePercent: '+26.51%', isPositive: true },
      '1Y': { change: '+15.67', changePercent: '+36.24%', isPositive: true },
    },
  },
  {
    symbol: 'ADNOCGAS',
    name: 'ADNOC Gas',
    price: '42.15',
    currency: 'AED',
    performance: {
      '1D': { change: '-0.25', changePercent: '-0.59%', isPositive: false },
      '5D': { change: '+1.85', changePercent: '+4.58%', isPositive: true },
      '1W': { change: '+0.95', changePercent: '+2.30%', isPositive: true },
      '3M': { change: '-2.45', changePercent: '-5.49%', isPositive: false },
      '6M': { change: '+5.67', changePercent: '+15.54%', isPositive: true },
      '1Y': { change: '+8.92', changePercent: '+26.85%', isPositive: true },
    },
  },
  {
    symbol: 'ADNOCLS',
    name: 'ADNOC Logistics',
    price: '35.78',
    currency: 'AED',
    performance: {
      '1D': { change: '+0.45', changePercent: '+1.27%', isPositive: true },
      '5D': { change: '-0.85', changePercent: '-2.32%', isPositive: false },
      '1W': { change: '+1.25', changePercent: '+3.62%', isPositive: true },
      '3M': { change: '+4.15', changePercent: '+13.12%', isPositive: true },
      '6M': { change: '+2.89', changePercent: '+8.79%', isPositive: true },
      '1Y': { change: '+6.45', changePercent: '+22.01%', isPositive: true },
    },
  },
  {
    symbol: 'ADNOCDIST',
    name: 'ADNOC Distribution',
    price: '28.45',
    currency: 'AED',
    performance: {
      '1D': { change: '+0.12', changePercent: '+0.42%', isPositive: true },
      '5D': { change: '+1.15', changePercent: '+4.21%', isPositive: true },
      '1W': { change: '-0.65', changePercent: '-2.23%', isPositive: false },
      '3M': { change: '+3.25', changePercent: '+12.89%', isPositive: true },
      '6M': { change: '+4.78', changePercent: '+20.18%', isPositive: true },
      '1Y': { change: '+7.23', changePercent: '+34.05%', isPositive: true },
    },
  },
  {
    symbol: 'BOROUGE',
    name: 'Borouge',
    price: '19.85',
    currency: 'AED',
    performance: {
      '1D': { change: '-0.35', changePercent: '-1.73%', isPositive: false },
      '5D': { change: '+0.75', changePercent: '+3.93%', isPositive: true },
      '1W': { change: '+0.45', changePercent: '+2.32%', isPositive: true },
      '3M': { change: '-1.25', changePercent: '-5.92%', isPositive: false },
      '6M': { change: '+2.15', changePercent: '+12.14%', isPositive: true },
      '1Y': { change: '+3.89', changePercent: '+24.39%', isPositive: true },
    },
  },
  {
    symbol: 'FERTIGLOBE',
    name: 'Fertiglobe',
    price: '12.67',
    currency: 'USD',
    performance: {
      '1D': { change: '+0.08', changePercent: '+0.63%', isPositive: true },
      '5D': { change: '-0.45', changePercent: '-3.43%', isPositive: false },
      '1W': { change: '+0.25', changePercent: '+2.01%', isPositive: true },
      '3M': { change: '+1.85', changePercent: '+17.11%', isPositive: true },
      '6M': { change: '+0.95', changePercent: '+8.10%', isPositive: true },
      '1Y': { change: '+2.34', changePercent: '+22.67%', isPositive: true },
    },
  },
];