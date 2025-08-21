export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
}

export interface SwapQuote {
  protocol: string;
  amountOut: string;
  fee: string;
  priceImpact: string;
}

export interface Trade {
  user: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  protocol: string;
  timestamp: string;
}

export interface PaymentOption {
  type: '0' | '1' | '2';
  label: string;
  description: string;
  token?: string;
}

export interface Window {
  ethereum?: any;
}