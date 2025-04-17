'use client';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Page() {
  const rawSearchParams = useSearchParams();

  const searchParams = useMemo(() => {
    const entries = rawSearchParams?.entries?.();
    return entries ? Object.fromEntries(entries) : {};
  }, [rawSearchParams]);

  return <div>{searchParams?.ref}</div>;
}