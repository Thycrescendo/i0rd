
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume: number;
  change24h: number;
  priceHistory: { time: number; price: number }[];
}

export interface Transaction {
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  hash: string;
}