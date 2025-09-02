// pages/api/coins.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Coin } from '../../types';

export default function handler(req: NextApiRequest, res: NextApiResponse<Coin[] | { error: string }>) {
  const { sort } = req.query;

  const mockCoins: Coin[] = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 60000 + Math.random() * 1000,
      marketCap: 1200000000000,
      volume: 40000000000,
      change24h: 2.5 + Math.random() * 2,
      priceHistory: Array.from({ length: 10 }, (_, i) => ({
        time: (Date.now() / 1000 - 86400 * (10 - i)) | 0,
        price: 60000 + Math.random() * 1000 - 500,
      })),
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2500 + Math.random() * 100,
      marketCap: 300000000000,
      volume: 15000000000,
      change24h: -1.2 + Math.random() * 2,
      priceHistory: Array.from({ length: 10 }, (_, i) => ({
        time: (Date.now() / 1000 - 86400 * (10 - i)) | 0,
        price: 2500 + Math.random() * 100 - 50,
      })),
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.35 + Math.random() * 0.05,
      marketCap: 12500000000,
      volume: 300000000,
      change24h: 1.5 + Math.random() * 1,
      priceHistory: Array.from({ length: 10 }, (_, i) => ({
        time: (Date.now() / 1000 - 86400 * (10 - i)) | 0,
        price: 0.35 + Math.random() * 0.05 - 0.025,
      })),
    },
  ];

  try {
    let sortedCoins = [...mockCoins];
    if (sort === 'marketCap') {
      sortedCoins.sort((a, b) => b.marketCap - a.marketCap);
    } else if (sort === 'volume') {
      sortedCoins.sort((a, b) => b.volume - a.volume);
    } else if (sort === 'gainers') {
      sortedCoins.sort((a, b) => b.change24h - a.change24h);
    } else if (sort === 'new') {
      sortedCoins = sortedCoins.slice(0, 2);
    }
    res.status(200).json(sortedCoins);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch coins' });
  }
}