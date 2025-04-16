'use client';

import React from 'react';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0e0e2c] via-[#1c1246] to-[#240b36] text-white font-sans px-6 py-16 flex flex-col items-center justify-center">
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

        <button className="mt-10 px-8 py-4 text-lg font-bold rounded-2xl shadow-md bg-yellow-500 hover:bg-yellow-400 text-black transition-all duration-300">
          Mint Your License Now
        </button>

        <div className="mt-12 text-sm text-gray-500">
          Powered by <span className="text-white font-semibold">LuxoraNova</span> | LUXBot Engine | Web3 Ready
        </div>
      </div>

      {/* Floating LUXBot */}
      <div className="fixed bottom-6 right-6 animate-fade-in">
        <button className="bg-[#ffeb3b] text-black px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
          💬 Ask LUXBot
        </button>
      </div>
    </main>
  );
}
