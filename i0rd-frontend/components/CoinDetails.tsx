// components/CoinDetails.tsx
import React, { useState } from 'react';
import { Coin, Transaction } from '../types';
import { motion } from "framer-motion";

interface CoinDetailsProps {
  coin: Coin;
}

const CoinDetails: React.FC<CoinDetailsProps> = ({ coin }) => {
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError(null);
    const newTransaction: Transaction = {
      type,
      amount: parseFloat(amount),
      price: coin.price,
      timestamp: new Date().toISOString(),
      status: 'completed',
      hash: `mock-tx-${Math.random().toString(36).slice(2)}`,
    };
    setTransactions([newTransaction, ...transactions]);
    setAmount('');
  };

  return (
    <motion.div
        initial={{opacity: 0, x: 20 }}
        animate={{opacity: 1, x: 0}}
        transition={{ duration: 0.3}}
        className="bg-gray-800 p-4 rounded shadow-md"
    >
       <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{coin.name} ({coin.symbol})</h2>
      <p>Price: ${coin.price.toFixed(2)}</p>
      <p>Market Cap: ${coin.marketCap.toLocaleString()}</p>
      <p>24h Volume: ${coin.volume.toLocaleString()}</p>
      <p>24h Change: <span className={coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
        {coin.change24h.toFixed(2)}%
      </span></p>
      <div className="mt-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to trade"
          className="bg-gray-700 text-white p-2 rounded w-full mb-2"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex space-x-2">
          <button
            onClick={() => handleTrade('buy')}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex-1"
          >
            Buy
          </button>
          <button
            onClick={() => handleTrade('sell')}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex-1"
          >
            Sell
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Transaction History</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {transactions.map((tx) => (
              <li key={tx.hash} className="bg-gray-700 p-2 rounded">
                <p>{tx.type.toUpperCase()}: {tx.amount} {coin.symbol} at ${tx.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400">{tx.timestamp}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Technical Analysis (Coming Soon)</h3>
        <p>AI-driven insights will be available in future updates.</p>
      </div>
    </div>
    </motion.div>
  );
};

export default CoinDetails;