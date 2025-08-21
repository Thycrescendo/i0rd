import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

const WalletConnect: React.FC<{ onConnect: (address: string, aaAddress: string) => void }> = ({ onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask or another Web3 wallet.');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const aaAddress = `0xAA${userAddress.slice(2, 10)}...${userAddress.slice(-8)}`; // Mock AA address
      setAddress(userAddress);
      setIsConnected(true);
      onConnect(userAddress, aaAddress);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error('Failed to connect wallet.');
      console.error(error);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={connectWallet}
      className="px-4 py-2 bg-neon-green text-dark-navy rounded-lg font-semibold"
    >
      {isConnected ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </motion.button>
  );
};

export default WalletConnect;