import React from 'react';
import { motion } from 'framer-motion';
import { mockTrades } from '../utils/mockData';

const SocialFeed: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-neutral mb-4">Community Trades</h2>
      <div className="space-y-4">
        {mockTrades.map((trade, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 border rounded-md"
          >
            <p className="text-sm font-semibold">{trade.user.slice(0, 6)}...{trade.user.slice(-4)}</p>
            <p className="text-sm">
              Swapped {trade.amountIn} {trade.tokenIn} for {trade.amountOut} {trade.tokenOut}
            </p>
            <p className="text-xs text-gray-500">Via {trade.protocol} at {trade.timestamp}</p>
            <button className="mt-2 text-xs text-secondary hover:underline">Follow Trader</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialFeed;