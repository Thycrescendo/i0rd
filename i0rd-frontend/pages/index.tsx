// pages/index.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ChartGrid from '../components/ChartGrid';
import CoinTabs from '../components/CoinTabs';
import CoinDetails from '../components/CoinDetails';
import { Coin } from '../types';

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartGrid />
          <CoinTabs />
        </div>
        <div>
          {selectedCoin ? (
            <CoinDetails coin={selectedCoin} />
          ) : (
            <div className="bg-gray-800 p-4 rounded shadow-md">
              <p className="text-gray-400">Select a coin to view details.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}