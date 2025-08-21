import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token, SwapQuote } from '../utils/types';
import { mockTokens, mockQuotes } from '../utils/mockData';
import PaymentSelector from './PaymentSelector';

interface SwapInterfaceProps {
  onSwap: (tokenIn: string, tokenOut: string, amount: string, paymentType: string) => void;
}

const SwapInterface: React.FC<SwapInterfaceProps> = ({ onSwap }) => {
  const [tokenIn, setTokenIn] = useState<Token>(mockTokens[0]);
  const [tokenOut, setTokenOut] = useState<Token>(mockTokens[1]);
  const [amountIn, setAmountIn] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<SwapQuote | null>(null);
  const [paymentType, setPaymentType] = useState<string>('0');

  const handleSwap = () => {
    if (amountIn && selectedQuote) {
      onSwap(tokenIn.symbol, tokenOut.symbol, amountIn, paymentType);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-neutral mb-4">Swap Tokens</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral">From</label>
          <select
            value={tokenIn.symbol}
            onChange={(e) => setTokenIn(mockTokens.find(t => t.symbol === e.target.value)!)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          >
            {mockTokens.map(token => (
              <option key={token.address} value={token.symbol}>{token.symbol}</option>
            ))}
          </select>
          <input
            type="number"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            placeholder="Amount"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral">To</label>
          <select
            value={tokenOut.symbol}
            onChange={(e) => setTokenOut(mockTokens.find(t => t.symbol === e.target.value)!)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          >
            {mockTokens.map(token => (
              <option key={token.address} value={token.symbol}>{token.symbol}</option>
            ))}
          </select>
        </div>
        <PaymentSelector onSelect={(type) => setPaymentType(type)} />
        <div>
          <h3 className="text-sm font-medium text-neutral">Best Quotes</h3>
          <AnimatePresence>
            {mockQuotes.map(quote => (
              <motion.div
                key={quote.protocol}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-3 mt-2 rounded-md border cursor-pointer ${
                  selectedQuote?.protocol === quote.protocol ? 'border-secondary bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedQuote(quote)}
              >
                <p className="font-semibold">{quote.protocol}</p>
                <p className="text-sm">Amount Out: {quote.amountOut} {tokenOut.symbol}</p>
                <p className="text-sm text-gray-500">Fee: {quote.fee} | Price Impact: {quote.priceImpact}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSwap}
          disabled={!amountIn || !selectedQuote}
          className="w-full px-4 py-3 text-white font-semibold rounded-lg bg-secondary hover:bg-primary disabled:bg-gray-300"
        >
          Swap
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SwapInterface;