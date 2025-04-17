'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function isUUID(str) {
  return str && typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

function isSlug(str) {
  return str && typeof str === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
}

function slugToTitle(slug) {
  return typeof slug === 'string'
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';
}

async function connectWallet() {
  try {
    const chainId = '0x13881';
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13881',
              chainName: 'Polygon Mumbai Testnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
              blockExplorerUrls: ['https://mumbai.polygonscan.com/']
            }
          ]
        });
      } catch (addError) {
        console.error('Failed to add Polygon Mumbai network', addError);
      }
    } else {
      console.error('Failed to switch to the network', switchError.message);
    }
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
    const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const userId = params?.userId;

    if (!userId || typeof userId !== 'string' || (!isUUID(userId) && !isSlug(userId))) {
      console.warn("Invalid userId:", userId);
      setInvalid(true);

      const timer = setTimeout(() => {
        router.push('/');
      }, 10000);

      return () => clearTimeout(timer);
    }

    const userLabel = isUUID(userId) ? userId : slugToTitle(userId);

    fetch(`/api/users/${userLabel}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch(() => setInvalid(true))
      .finally(() => setLoading(false));
  }, [params, router]);

  if (invalid) return (
    <div className="p-8 text-center text-red-500">
      <img src="/logo.svg" alt="LuxoraNova Logo" className="mx-auto mb-4 w-24 h-24" />
      Invalid or Missing User ID
      <div className="mt-4">
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-5 py-2 rounded-lg shadow-md hover:opacity-90 mr-2"
        >
          Go Home
        </button>
        <button
          onClick={() => router.refresh()}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600"
        >
          Retry
        </button>
      </div>
    </div>
  );

  if (loading) return <div className="p-8 text-center">Loading user...</div>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">User Profile</h1>
      <button onClick={connectWallet} className="bg-indigo-600 text-white px-4 py-2 rounded mb-4">Connect Wallet</button>
      {userData ? (
        <pre className="bg-gray-100 p-4 rounded text-sm mt-2">
          {JSON.stringify(userData, null, 2)}
        </pre>
      ) : (
        <div className="text-red-500">User Not Found</div>
      )}
    </div>
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
