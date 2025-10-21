import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Coin } from '../../types';

// Define the CoinGecko API response type
interface CoinGeckoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Coin[] | { error: string }>) {
  const { sort } = req.query;
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: sort === 'marketCap' ? 'market_cap_desc' : sort === 'volume' ? 'volume_desc' : 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: true,
      },
    });

    const coins: Coin[] = response.data.map((coin: CoinGeckoCoin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      change24h: coin.price_change_percentage_24h,
      priceHistory: coin.sparkline_in_7d.price.map((price: number, index: number) => ({
        time: (Date.now() / 1000 - 604800 + index * 3600) | 0,
        price,
      })),
    }));

    res.status(200).json(coins);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch coins from CoinGecko' });
  }
}