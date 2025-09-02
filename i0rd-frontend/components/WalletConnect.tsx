// components/WalletConnect.tsx
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setError(null);
      } catch (err) {
        console.error('Wallet connection failed:', err);
        setError('Failed to connect wallet. Please try again.');
      }
    } else {
      setError('Please install MetaMask or another Web3 wallet.');
    }
  };

  useEffect(() => {
    // Check if wallet is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div>
      <button
        onClick={connectWallet}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default WalletConnect;