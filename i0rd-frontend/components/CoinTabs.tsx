// components/CoinTabs.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Coin } from '../types';
import { useCoin } from '../contexts/CoinContext';

const CoinTabs: React.FC = () => {
  const { setSelectedCoin } = useCoin();
  const [activeTab, setActiveTab] = useState('marketCap');
  const [coins, setCoins] = useState<Coin[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('watchlist') || '[]');
    }
    return [];
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Coin[]>('/api/coins', {
          params: { sort: activeTab },
        });
        setCoins(response.data);
      } catch (err) {
        console.error('Error fetching coins:', err);
        setError('Failed to fetch coins. Showing fallback data.');
        setCoins([
          {
            id: 'fallback',
            name: 'Fallback Coin',
            symbol: 'FBC',
            price: 100,
            marketCap: 1000000,
            volume: 50000,
            change24h: 0,
            priceHistory: [
              { time: (Date.now() / 1000 - 86400) | 0, price: 100 },
              { time: (Date.now() / 1000) | 0, price: 105 },
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist]);

  const toggleWatchlist = (coinId: string) => {
    setWatchlist((prev) =>
      prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]
    );
  };

  const filteredCoins = activeTab === 'watchlist'
    ? coins.filter((coin) => watchlist.includes(coin.id))
    : coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex space-x-4 border-b border-gray-700">
          {['marketCap', 'volume', 'gainers', 'new', 'watchlist'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 transition-colors duration-200 ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-400' : 'text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coins..."
          className="bg-gray-700 text-white p-2 rounded mt-2 sm:mt-0 w-full sm:w-64"
        />
      </div>
      {loading && <p className="mt-4 text-gray-400 animate-pulse">Loading coins...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {!loading && !error && filteredCoins.length === 0 && (
        <p className="mt-4 text-gray-400">
          {activeTab === 'watchlist' ? 'Your watchlist is empty.' : 'No coins found.'}
        </p>
      )}
      {!loading && !error && filteredCoins.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredCoins.map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCoin(coin)}
            >
              <h3 className="text-lg font-bold">{coin.name} ({coin.symbol})</h3>
              <p>Price: ${coin.price.toFixed(2)}</p>
              <p>Market Cap: ${coin.marketCap.toLocaleString()}</p>
              <p>24h Change: <span className={coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                {coin.change24h.toFixed(2)}%
              </span></p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(coin.id);
                }}
                className={`mt-2 px-4 py-2 rounded transition-colors ${
                  watchlist.includes(coin.id)
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {watchlist.includes(coin.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinTabs;