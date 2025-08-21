import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 max-w-lg"
      >
        <h2 className="text-2xl font-bold text-neutral mb-4">Welcome to i0rd!</h2>
        <p className="text-sm text-gray-600 mb-4">
          i0rd makes DeFi trading simple. Here's how to get started:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
          <li>Connect your wallet or use social login (Google, Twitter, etc.).</li>
          <li>Select tokens to swap and choose the best rate from top protocols.</li>
          <li>Use our gasless swaps (first 5 free!) or pay with tokens.</li>
          <li>Share your trades and follow top traders in the community feed.</li>
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full px-4 py-2 text-white font-semibold rounded-lg bg-secondary hover:bg-primary"
        >
          Got It!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingModal;