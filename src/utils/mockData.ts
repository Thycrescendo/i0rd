import { Token, SwapQuote, Trade, PaymentOption } from './types';

export const mockTokens: Token[] = [
  { address: '0x1', symbol: 'USDC', name: 'USD Coin', decimals: 6, balance: '1000.5' },
  { address: '0x2', symbol: 'ETH', name: 'Ethereum', decimals: 18, balance: '2.345' },
  { address: '0x3', symbol: 'DAI', name: 'Dai Stablecoin', decimals: 18, balance: '500.0' },
];

export const mockQuotes: SwapQuote[] = [
  { protocol: 'Uniswap V3', amountOut: '995.5', fee: '0.3%', priceImpact: '0.1%' },
  { protocol: 'SushiSwap', amountOut: '990.2', fee: '0.3%', priceImpact: '0.15%' },
  { protocol: 'Curve', amountOut: '992.8', fee: '0.2%', priceImpact: '0.12%' },
];

export const mockTrades: Trade[] = [
  {
    user: '0x123...abc',
    tokenIn: 'ETH',
    tokenOut: 'USDC',
    amountIn: '1.0',
    amountOut: '1800.5',
    protocol: 'Uniswap V3',
    timestamp: '2025-07-01 10:30 AM',
  },
  {
    user: '0x456...def',
    tokenIn: 'DAI',
    tokenOut: 'ETH',
    amountIn: '1000.0',
    amountOut: '0.55',
    protocol: 'SushiSwap',
    timestamp: '2025-07-01 09:15 AM',
  },
];

export const paymentOptions: PaymentOption[] = [
  { type: '0', label: 'Free Swap (First 5)', description: 'Gasless for new users (5 free swaps)' },
  { type: '1', label: 'Partial Sponsorship', description: 'Subsidized gas for frequent traders', token: 'USDC' },
  { type: '2', label: 'Premium Analytics', description: 'Pay with tokens for advanced insights', token: 'ETH' },
];