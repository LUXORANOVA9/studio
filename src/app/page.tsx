'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Sidebar from '@/components/Sidebar'; // Corrected path
import Card from '@/components/Card';     // Corrected path

// This is the standard way to define a Page component in Next.js App Router
// It receives searchParams as a prop automatically.
export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  // --- IMPORTANT ---
  // Even if you DON'T use searchParams in this specific page,
  // defining the function signature like this ensures Next.js
  // handles the prop correctly and avoids the direct access error.
  // You can safely log them or ignore them if unused.
  console.log('Received searchParams:', searchParams);
  // const specificParam = searchParams?.yourParamName;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '20px', marginLeft: '250px', backgroundColor: '#192841' /* Rich Navy */ }}>
        {/* Your page content goes here */}
        <h1>Dashboard</h1>
        <Card title="Overview">
          {/* Card content */}
          <p>Place dashboard widgets and content here.</p>
          {/* Example of potentially using a searchParam */}
          {searchParams?.message && <p>Message from URL: {searchParams.message}</p>}
        </Card>
        {/* Add more cards or components */}
      </main>
    </div>
  );
}
