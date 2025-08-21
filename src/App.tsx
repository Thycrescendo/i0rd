import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WalletConnect from './components/WalletConnect';
import SwapInterface from './components/SwapInterface';
import SocialFeed from './components/SocialFeed';
import OnboardingModal from './components/OnboardingModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleConnect = (eoaAddress: string, aaAddress: string) => {
    setIsConnected(true);
    toast.success(`Connected! Wallet: ${eoaAddress.slice(0, 6)}...${eoaAddress.slice(-4)}`);
  };

  const handleSwap = (tokenIn: string, tokenOut: string, amount: string, paymentType: string) => {
    toast.success(`Swapped ${amount} ${tokenIn} for ${tokenOut} using payment type ${paymentType}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-neutral mb-8"
      >
        i0rd on 0G
      </motion.header>
      <WalletConnect onConnect={handleConnect} />
      {isConnected && (
        <div className="flex flex-col md:flex-row gap-6 mt-6 w-full max-w-4xl">
          <SwapInterface onSwap={handleSwap} />
          <SocialFeed />
        </div>
      )}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;