'use client';

import React from 'react';

interface MintReceiptModalProps {
  txHash: string;
  wallet: string;
  cloneName: string;
  priceInEth: string;
  onClose: () => void;
}

const MintReceiptModal: React.FC<MintReceiptModalProps> = ({ txHash, wallet, cloneName, priceInEth, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">🎉 Mint Successful</h2>
        <p><strong>Wallet:</strong> {wallet}</p>
        <p><strong>Clone:</strong> {cloneName}</p>
        <p><strong>Price:</strong> {priceInEth} ETH</p>
        <p><strong>Txn Hash:</strong> <a className="text-blue-500 underline" href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">View on Etherscan</a></p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MintReceiptModal;
