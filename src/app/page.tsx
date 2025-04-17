'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isUUID, isSlug, slugToTitle } from '../lib/utils';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import FallbackView from './fallback';

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
    console.error("Connect Wallet Error", err);
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
    console.error("Mint License Error", err);
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

  const params = useMemo(() => {
    return rawParams && typeof rawParams === 'object' ? { ...rawParams } : {};
  }, [rawParams]);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = params?.userId;

          if (!userId || typeof userId !== 'string' || (!isUUID(userId) && !isSlug(userId))) {
            console.warn("Invalid userId:", userId);
            setInvalid(true);
            return;
          }

          const userLabel = isUUID(userId) ? userId : slugToTitle(userId);

          const res = await fetch(`/api/users/${userLabel}`);

          if (!res.ok) {
            console.error(`Failed to fetch user data: ${res.status} ${res.statusText}`);
            throw new Error('User not found');
          }

          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error("API fetch failed:", error);
          setUserData(null);
          setInvalid(true);
        } finally {
          setLoading(false);
        }
      };

      if (params?.userId) {
        fetchUserData();
      }
    }, [params, router]);

  if (invalid) return <FallbackView />;

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
        try {
          const signer = await connectWallet();
          await mintLicense(userData?.name || 'AI Scheduler', signer);
        } catch (e) {
          console.error("Minting process failed", e);
        }
      }} className="bg-indigo-600 text-white px-4 py-2 rounded mb-4">Mint License</button>
      <div className="bg-white rounded-xl shadow p-6 mt-4 text-left space-y-2">
        <div><strong>Name:</strong> {userData?.name || ''}</div>
        <div><strong>Email:</strong> {userData?.email || 'Not available'}</div>
        <div><strong>Bio:</strong> {userData?.bio || 'No bio available'}</div>
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
