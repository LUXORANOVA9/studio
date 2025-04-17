'use client';

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';
import { useCopyToClipboard } from 'usehooks-ts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Github } from 'lucide-react';

const CONTRACT_ADDRESS = "0x984190d20714618138C8bD1E031C3678FC40dbB0";
const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "cloneName",
        type: "string"
      }
    ],
    name: "mintLicense",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "luxoranova9",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [minting, setMinting] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [mintReceiptModalOpen, setMintReceiptModalOpen] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [cloneName, setCloneName] = useState("");
  const [priceInEth, setPriceInEth] = useState("");
  const [repoUrl, setRepoUrl] = useState('');
  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0] || "");
      });
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0x13881") {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x13881" }], // Polygon Mumbai
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              alert("Please add Polygon Mumbai to your MetaMask");
            }
            console.error("Failed to switch to the network", switchError.message);
            return;
          }
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (err: any) {
        console.error("Wallet connection failed:", err);
        if (err.code === 4001) {
          alert("User denied account access!");
        } else {
          alert("Wallet connection failed. Check console for details.");
        }
      }
    } else {
      alert("Please install MetaMask or a Web3 wallet to continue.");
    }
  };

  const handleMint = async (cloneName) => {
    if (!walletAddress) {
      toast({
        title: "Error",
        description: "Connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setMinting(true);
      console.log(`Minting clone: ${cloneName}`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.mintLicense(cloneName);
      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);
      setCloneName(cloneName);
      setPriceInEth("100"); // Replace with actual price fetching
      await tx.wait();
      console.log("Transaction confirmed.");
      toast({
        title: "Success",
        description: `${cloneName} license minted successfully!`,
      });
    } catch (err) {
      console.error("Minting failed:", err);
      toast({
        title: "Error",
        description: "Minting failed. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setMinting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0e0e2c] via-[#1c1246] to-[#240b36] text-white font-sans px-6 py-16 flex flex-col items-center">
      <div className="max-w-4xl text-center">
        <img
          src="/logo.svg"
          alt="LuxoraNova Logo"
          className="h-12 mx-auto mb-8 animate-fade-in"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
          Build Your Clone Empire
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Launch fully automated, white-labeled SaaS products backed by our AI engines — the fastest way to scale your digital throne.
        </p>

        <button
          onClick={connectWallet}
          className="mt-10 px-8 py-4 text-lg font-bold rounded-2xl shadow-md bg-yellow-500 hover:bg-yellow-400 text-black transition-all duration-300"
        >
          {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>

        <div className="mt-4 text-sm text-green-400">
          {walletAddress && "Wallet connected successfully!"}
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Powered by <span className="text-white font-semibold">LuxoraNova</span> | LUXBot Engine | Web3 Ready
        </div>
      </div>

      {/* Scrollstorm Clone Store Preview */}
      <section className="w-full mt-24 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-300">Choose Your Clone</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["AI Scheduler", "Crypto Terminal", "Auto CRM"].map((title, index) => (
            <motion.div
              key={index}
              className="bg-[#1e1b2f] rounded-2xl p-6 shadow-xl border-2 border-yellow-400 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-yellow-300 mb-2 flex justify-between">
                <span>{title}</span>
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  Rare
                </span>
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                License this powerful clone and launch instantly with your brand.
              </p>
              <button
                onClick={() => handleMint(title)}
                className="mt-auto px-4 py-2 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-400 disabled:opacity-50"
                disabled={minting}
              >
                {minting ? "Minting..." : "Unlock License"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating LUXBot */}
      <div className="fixed bottom-6 right-6 animate-fade-in">
        <button className="bg-[#ffeb3b] text-black px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
          💬 Ask LUXBot
        </button>
      </div>
    </main>
  );
}
