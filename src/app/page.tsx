'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FallbackView() {
  const rawParams = useParams();
  const router = useRouter();

  const params = useMemo(() => {
    return rawParams && typeof rawParams === 'object' ? { ...rawParams } : {};
  }, [rawParams]);

  const userId = params?.userId || 'unknown';
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/');
    }
  }, [countdown, router]);

  useEffect(() => {
    fetch('https://luxoranova-fallback.firebaseio.com/logs.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, timestamp: new Date().toISOString() })
    });

    const interval = setInterval(() => {
      setCountdown((c) => {
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router, userId]);

  return (
    <motion.div className="p-8 text-center text-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.img
        src="/assets/brand-logo.svg"
        alt="LuxoraNova Logo"
        className="mx-auto mb-4 w-24 h-24"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="text-lg font-semibold mb-2 text-[#B91C1C]">
        Invalid or Missing User ID: <strong className="text-black">{userId}</strong>
      </div>
      <p className="text-sm text-gray-600 mb-4">Redirecting in {countdown} seconds...</p>
      <div className="mt-4">
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-5 py-2 rounded-lg shadow-md hover:opacity-90 mr-2"
        >
          Go Home
        </button>
        <button
          onClick={() => router.refresh()}
          className="bg-black text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600"
        >
          Retry
        </button>
      </div>
    </motion.div>
  );
}
