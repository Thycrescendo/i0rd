// contexts/CoinContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Coin } from '../types';

interface CoinContextType {
  selectedCoin: Coin | null;
  setSelectedCoin: (coin: Coin | null) => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  return (
    <CoinContext.Provider value={{ selectedCoin, setSelectedCoin }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) throw new Error('useCoin must be used within a CoinProvider');
  return context;
};