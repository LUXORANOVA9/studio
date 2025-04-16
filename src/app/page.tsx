'use client';

import { useState } from "react";

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("Please install MetaMask or a Web3 wallet to continue.");
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
          {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}` : "Mint Your License Now"}
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
            <div key={index} className="bg-[#1e1b2f] rounded-2xl p-6 shadow-lg border border-yellow-500 hover:scale-105 transform transition-all duration-300">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">{title}</h3>
              <p className="text-sm text-gray-300 mb-4">
                License this powerful clone and launch instantly with your brand.
              </p>
              <button className="mt-auto px-4 py-2 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-400">
                Unlock License
              </button>
            </div>
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
