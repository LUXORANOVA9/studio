'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { isUUID, isSlug, slugToTitle } from '../lib/utils';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

async function connectWallet() {
  try {
    const chainId = '0x13881';
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    });
    toast.success('Connected to Mumbai');
    return new ethers.providers.Web3Provider(window.ethereum).getSigner();
  } catch (err) {
    toast.error('Wallet connection failed');
    throw err;
  }
}

async function mintLicense(cloneName, signer) {
  try {
    const contract = new ethers.Contract(
      '0x984190d20714618138C8bD1E031C3678FC40dbB0',
      [
        {
          inputs: [{ internalType: 'string', name: 'cloneName', type: 'string' }],
          name: 'mintLicense',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      signer
    );
    const tx = await contract.mintLicense(cloneName, {
      value: ethers.utils.parseEther('0.01')
    });
    await tx.wait();
    toast.success('License Minted!');
    await fetch('https://luxoranova-fallback.firebaseio.com/mints.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cloneName, txHash: tx.hash, time: new Date().toISOString() })
    });
  } catch (err) {
    toast.error('Mint failed');
    console.error(err);
  }
}

async function logFallbackHit(userId) {
  try {
    await fetch('https://luxoranova-fallback.firebaseio.com/logs.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, timestamp: new Date().toISOString() })
    });
  } catch (err) {
    console.warn('Failed to log fallback hit:', err);
  }
}

export default function HydratedParamsPage() {
  const rawParams = useParams();
  const router = useRouter();
  const params = useMemo(() => (rawParams && typeof rawParams === 'object' ? { ...rawParams } : {}), [rawParams]);
  const [userData, setUserData] = useState(null);
  const [fallbackData] = useState({ name: 'Unknown User', bio: 'No data available.' });
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (!params || !params.userId) {
      setInvalid(true);
      return;
    }
    const userId = params?.userId;
    if (!userId || typeof userId !== 'string' || (!isUUID(userId) && !isSlug(userId))) {
      setInvalid(true);
      logFallbackHit(userId);
      const timer = setTimeout(() => router.push('/'), 10000);
      return () => clearTimeout(timer);
    }
    const userLabel = isUUID(userId) ? userId : slugToTitle(userId);
    const fetch = () => Promise.reject(new Error("Simulated API failure"));

    fetch(`/api/users/fail_${userLabel}`)
      .then((res) => {
        if (!res.ok) throw new Error('Simulated failure');
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => {
        console.error('API fetch failed:', err);
        setUserData(null);
        logFallbackHit(userLabel);
      })
      .finally(() => setLoading(false));
  }, [params, router]);

  if (invalid) {
    return (
      <motion.div className="p-8 text-center text-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.img src="/assets/brand-logo.svg" alt="LuxoraNova Logo" className="mx-auto mb-4 w-24 h-24" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} />
        Invalid or Missing User ID
        <div className="mt-4">
          <button onClick={() => router.push('/')} className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-5 py-2 rounded-lg shadow-md hover:opacity-90 mr-2">Go Home</button>
          <button onClick={() => router.refresh()} className="bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600">Retry</button>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded mb-4 mx-auto" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <motion.div className="p-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="text-xl font-bold">User Profile</h1>
      <button onClick={async () => {
        const signer = await connectWallet();
        await mintLicense(userData?.name || 'AI Scheduler', signer);
      }} className="bg-indigo-600 text-white px-4 py-2 rounded mb-4">Mint License</button>
      <div className="bg-white rounded-xl shadow p-6 mt-4 text-left space-y-2">
        <div><strong>Name:</strong> {userData?.name || fallbackData.name}</div>
        <div><strong>Email:</strong> {userData?.email || 'Not available'}</div>
        <div><strong>Bio:</strong> {userData?.bio || fallbackData.bio}</div>
      </div>
    </motion.div>
  );
}

export async function generateStaticParams() {
  return [];
}

export async function notFound() {
  return {
    redirect: {
      destination: '/404',
      permanent: false
    }
  };
}
