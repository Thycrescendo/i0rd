import React from 'react';
import { motion } from 'framer-motion';
import { paymentOptions } from '../utils/mockData';

interface PaymentSelectorProps {
  onSelect: (type: string) => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({ onSelect }) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-neutral">Gas Payment Option</h3>
      <div className="mt-2 space-y-2">
        {paymentOptions.map(option => (
          <motion.div
            key={option.type}
            whileHover={{ scale: 1.02 }}
            className="p-3 border rounded-md cursor-pointer"
            onClick={() => onSelect(option.type)}
          >
            <p className="font-semibold">{option.label}</p>
            <p className="text-sm text-gray-500">{option.description}</p>
            {option.token && <p className="text-sm text-gray-500">Token: {option.token}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSelector;